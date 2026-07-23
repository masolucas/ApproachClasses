(function () {
  const sb = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
  const PIN_PREFIX = window.PIN_PREFIX;

  const identifyOverlay = document.getElementById('identify-overlay');
  const uploadOverlay = document.getElementById('upload-overlay');
  const identifyForm = document.getElementById('identify-form');
  const uploadForm = document.getElementById('upload-form');
  const identifyError = document.getElementById('identify-error');
  const uploadError = document.getElementById('upload-error');
  const uploadSuccess = document.getElementById('upload-success');
  const galleryEl = document.getElementById('gallery');
  const statusEl = document.getElementById('status');

  let currentName = '';

  // Prefill name/email from localStorage for convenience (never store the PIN)
  try {
    const cached = JSON.parse(localStorage.getItem('dii_identity') || 'null');
    if (cached) {
      document.getElementById('id-name').value = cached.name || '';
      document.getElementById('id-email').value = cached.email || '';
    }
  } catch (e) {}

  function openIdentify() { identifyError.innerHTML = ''; identifyOverlay.style.display = 'flex'; }
  function closeIdentify() { identifyOverlay.style.display = 'none'; }
  function openUpload() { uploadError.innerHTML = ''; uploadSuccess.innerHTML = ''; uploadOverlay.style.display = 'flex'; }
  function closeUpload() { uploadOverlay.style.display = 'none'; }

  document.getElementById('nav-share').addEventListener('click', (e) => { e.preventDefault(); openIdentify(); });
  document.getElementById('cta-share').addEventListener('click', (e) => { e.preventDefault(); openIdentify(); });
  document.getElementById('identify-close').addEventListener('click', closeIdentify);
  document.getElementById('identify-cancel').addEventListener('click', closeIdentify);
  document.getElementById('upload-close').addEventListener('click', closeUpload);
  document.getElementById('upload-cancel').addEventListener('click', closeUpload);

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  // --- Step 1: identify (sign up new email, or verify PIN for a returning one) ---
  identifyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    identifyError.innerHTML = '';
    const name = document.getElementById('id-name').value.trim();
    const email = document.getElementById('id-email').value.trim().toLowerCase();
    const pin = document.getElementById('id-pin').value.trim();

    if (!/^\d{4}$/.test(pin)) {
      identifyError.innerHTML = `<div class="modal-error">PIN must be exactly 4 digits.</div>`;
      return;
    }

    const submitBtn = document.getElementById('identify-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Checking…';

    const password = PIN_PREFIX + pin;

    try {
      // Always start from a clean slate — important on shared classroom computers.
      await sb.auth.signOut();

      const { data: signUpData, error: signUpError } = await sb.auth.signUp({ email, password });

      if (signUpError) {
        identifyError.innerHTML = `<div class="modal-error">${escapeHtml(signUpError.message)}</div>`;
        return;
      }

      const isNewUser = signUpData?.user?.identities && signUpData.user.identities.length > 0;

      if (!isNewUser) {
        // Email already registered — this PIN attempt needs to be verified for real.
        const { error: signInError } = await sb.auth.signInWithPassword({ email, password });
        if (signInError) {
          identifyError.innerHTML = `<div class="modal-error">That PIN doesn't match this email. Double-check it, or ask your instructor to reset your entry.</div>`;
          return;
        }
      }

      currentName = name;
      localStorage.setItem('dii_identity', JSON.stringify({ name, email }));
      closeIdentify();
      openUpload();
    } catch (err) {
      identifyError.innerHTML = `<div class="modal-error">Network error — please try again.</div>`;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Continue';
    }
  });

  // --- Step 2: upload cover image + song, upsert the gallery entry ---
  uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    uploadError.innerHTML = '';
    uploadSuccess.innerHTML = '';

    const title = document.getElementById('up-title').value.trim();
    const imageFile = document.getElementById('up-image').files[0];
    const audioFile = document.getElementById('up-audio').files[0];

    const submitBtn = document.getElementById('upload-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Publishing…';

    try {
      const { data: userData, error: userError } = await sb.auth.getUser();
      if (userError || !userData?.user) {
        uploadError.innerHTML = `<div class="modal-error">Your session expired — go back and use "Share Yours" again.</div>`;
        return;
      }
      const userId = userData.user.id;

      // Look up any existing entry so we can keep the current file if a new one wasn't provided.
      const { data: existingEntry } = await sb.from('entries').select('*').eq('user_id', userId).maybeSingle();

      let imagePath = existingEntry?.image_path || null;
      let audioPath = existingEntry?.audio_path || null;

      if (imageFile) {
        if (!/^image\//.test(imageFile.type)) { uploadError.innerHTML = `<div class="modal-error">Cover file must be an image.</div>`; return; }
        if (imageFile.size > 8 * 1024 * 1024) { uploadError.innerHTML = `<div class="modal-error">Image must be under 8MB.</div>`; return; }
        const ext = (imageFile.name.split('.').pop() || 'jpg').toLowerCase();
        const path = `${userId}/cover.${ext}`;
        const { error: upErr } = await sb.storage.from('media').upload(path, imageFile, { upsert: true, contentType: imageFile.type });
        if (upErr) { uploadError.innerHTML = `<div class="modal-error">Image upload failed: ${escapeHtml(upErr.message)}</div>`; return; }
        imagePath = path;
      }

      if (audioFile) {
        if (!/^audio\//.test(audioFile.type)) { uploadError.innerHTML = `<div class="modal-error">Song file must be an audio file.</div>`; return; }
        if (audioFile.size > 20 * 1024 * 1024) { uploadError.innerHTML = `<div class="modal-error">Song must be under 20MB.</div>`; return; }
        const ext = (audioFile.name.split('.').pop() || 'mp3').toLowerCase();
        const path = `${userId}/song.${ext}`;
        const { error: upErr } = await sb.storage.from('media').upload(path, audioFile, { upsert: true, contentType: audioFile.type });
        if (upErr) { uploadError.innerHTML = `<div class="modal-error">Song upload failed: ${escapeHtml(upErr.message)}</div>`; return; }
        audioPath = path;
      }

      if (!imagePath || !audioPath) {
        uploadError.innerHTML = `<div class="modal-error">Please provide both a cover image and a song. (Your first submission needs both — later edits can update just one.)</div>`;
        return;
      }

      const { error: upsertError } = await sb.from('entries').upsert({
        user_id: userId,
        name: currentName,
        title,
        image_path: imagePath,
        audio_path: audioPath,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });

      if (upsertError) {
        uploadError.innerHTML = `<div class="modal-error">Couldn't save your entry: ${escapeHtml(upsertError.message)}</div>`;
        return;
      }

      uploadSuccess.innerHTML = `<div class="modal-success">Published! Refreshing the gallery…</div>`;
      await loadEntries();
      setTimeout(closeUpload, 1200);
    } catch (err) {
      uploadError.innerHTML = `<div class="modal-error">Network error — please try again.</div>`;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Publish to Gallery';
    }
  });

  function publicUrl(path) {
    if (!path) return null;
    const { data } = sb.storage.from('media').getPublicUrl(path);
    return data?.publicUrl || null;
  }

  async function loadEntries() {
    try {
      const { data: entries, error } = await sb
        .from('entries')
        .select('name, title, image_path, audio_path, updated_at')
        .order('updated_at', { ascending: false });

      if (error) throw error;

      if (!entries || entries.length === 0) {
        statusEl.textContent = '';
        galleryEl.innerHTML = '';
        galleryEl.insertAdjacentHTML('beforebegin', '<div class="empty-state">No albums yet — be the first to share yours.</div>');
        return;
      }
      statusEl.textContent = '';
      galleryEl.innerHTML = entries.map(entryCard).join('');
    } catch (err) {
      statusEl.textContent = 'Could not load the gallery — try refreshing.';
    }
  }

  function entryCard(e) {
    const imageUrl = publicUrl(e.image_path);
    const audioUrl = publicUrl(e.audio_path);
    const cover = imageUrl
      ? `<img class="cover" src="${imageUrl}" alt="${escapeHtml(e.title || e.name)} cover" loading="lazy" />`
      : `<div class="cover-empty">No cover yet</div>`;
    const audio = audioUrl ? `<audio controls src="${audioUrl}"></audio>` : '';
    return `
      <div class="card">
        ${cover}
        <div class="card-body">
          <div class="card-title">${escapeHtml(e.title || 'Untitled')}</div>
          <div class="card-by">by ${escapeHtml(e.name)}</div>
          ${audio}
        </div>
      </div>
    `;
  }

  // Auto-open the share flow if arriving from Start Here with ?upload=1
  if (new URLSearchParams(location.search).get('upload') === '1') {
    openIdentify();
  }

  loadEntries();
})();

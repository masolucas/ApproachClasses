(function () {
  const $ = (id) => document.getElementById(id);
  const genBtn = $('dii-generate');
  const statusEl = $('dii-status');
  const errorSlot = $('dii-error-slot');
  const outputSlot = $('dii-output-slot');
  const nextStep = $('next-step');

  function fieldVal(id) { return $(id).value.trim(); }

  function buildMetaPrompt(a) {
    return `I'm building a small "concept album" for a class exercise on AI Description. Based on my notes below, write me two ready-to-use AI prompts. Label each one clearly so I can copy them separately.

1. IMAGE PROMPT — a single rich, vivid paragraph (60–100 words) for an AI image generator (I'll use Gemini). Expand my notes into concrete, vivid visual language, but don't invent major new subject matter I didn't mention.
- Subject: ${a.subject || "(use your judgment)"}
- Setting: ${a.setting || "(use your judgment)"}
- Mood / atmosphere: ${a.mood || "(use your judgment)"}
- Visual style: ${a.style || "(use your judgment)"}

2. SONG PROMPT — formatted for Suno. Structure it as: a first line of comma-separated style tags (genre, tempo, instrumentation, mood), then a short paragraph (40–70 words) describing the theme and emotional arc. Don't write full lyrics — just direction.
- Theme: ${a.theme || "(use your judgment)"}
- Genre: ${a.genre || "(use your judgment)"}
- Tempo / emotional arc: ${a.tempo || "(use your judgment)"}
- Instrumentation: ${a.instruments || "(use your judgment)"}

Please format your reply as:

IMAGE PROMPT:
[the image prompt]

SONG PROMPT:
[the song prompt]`;
  }

  function outputBlock(text) {
    const div = document.createElement('div');
    div.className = 'output';
    div.innerHTML = `
      <div class="output-head">
        <span class="output-label">Your Meta-Prompt</span>
        <span class="output-target">→ Paste into Claude</span>
      </div>
      <div class="output-text">${text.replace(/</g, '&lt;')}</div>
      <button class="copy" id="dii-copy-meta">Copy prompt</button>
    `;
    return div;
  }

  function attachCopy(id, text) {
    const btn = document.getElementById(id);
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = 'Copied ✓';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = 'Copy prompt'; btn.classList.remove('copied'); }, 1800);
      });
    });
  }

  genBtn.addEventListener('click', () => {
    const answers = {
      subject: fieldVal('dii-subject'),
      setting: fieldVal('dii-setting'),
      mood: fieldVal('dii-mood'),
      style: fieldVal('dii-style'),
      theme: fieldVal('dii-theme'),
      genre: fieldVal('dii-genre'),
      tempo: fieldVal('dii-tempo'),
      instruments: fieldVal('dii-instruments'),
    };

    const missing = Object.entries(answers).filter(([, v]) => !v);
    errorSlot.innerHTML = '';
    if (missing.length > 4) {
      errorSlot.innerHTML = `<div class="error-box">Fill in at least a few fields on each side — the richer your answers, the richer your meta-prompt.</div>`;
      return;
    }

    const metaPrompt = buildMetaPrompt(answers);

    outputSlot.innerHTML = '';
    outputSlot.appendChild(outputBlock(metaPrompt));
    attachCopy('dii-copy-meta', metaPrompt);

    const reflect = document.createElement('div');
    reflect.className = 'reflect';
    reflect.innerHTML = `<b>Before you paste it in:</b> reread your notes above. Do they say what you actually meant? After Claude gives you the two prompts and you generate in Gemini and Suno, come back to this question: where did the AI's interpretation diverge from your intent — and was that divergence a flaw, or a legitimate creative choice?`;
    outputSlot.appendChild(reflect);

    statusEl.textContent = '';
    nextStep.style.display = 'block';
  });
})();

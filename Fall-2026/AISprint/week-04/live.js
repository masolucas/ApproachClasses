/* AI Sprint · Week 4 live tools · shared helper (Supabase Realtime Broadcast, no tables) */
(function () {
  const cfg = window.AISPRINT_CONFIG || {};
  const Live = {};

  Live.configured = function () {
    return !!(cfg.supabaseUrl && cfg.supabaseAnonKey &&
      !/PASTE|YOUR/i.test(cfg.supabaseUrl + cfg.supabaseAnonKey) && window.supabase && window.supabase.createClient);
  };

  Live.store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} }
  };

  Live.uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
  Live.roomCode = function () {
    const A = "ABCDEFGHJKLMNPQRSTUVWXYZ"; let s = "";
    for (let i = 0; i < 4; i++) s += A[Math.floor(Math.random() * A.length)];
    return s;
  };
  Live.param = (n) => new URLSearchParams(location.search).get(n);
  Live.esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  Live.$ = (s, r) => (r || document).querySelector(s);
  Live.$$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  Live.shuffle = function (a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  Live.joinUrl = (room) => new URL("join.html?room=" + room, location.href).href;

  // Connect to channel "<activity>-<ROOM>". handlers: { events: {name: fn(payload)}, onStatus: fn(status) }
  Live.connect = function (activity, room, handlers) {
    const client = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, { realtime: { params: { eventsPerSecond: 20 } } });
    const ch = client.channel(activity + "-" + room, { config: { broadcast: { self: false, ack: false } } });
    Object.keys(handlers.events || {}).forEach((ev) => {
      ch.on("broadcast", { event: ev }, (msg) => { try { handlers.events[ev](msg.payload || {}); } catch (e) { console.error(e); } });
    });
    ch.subscribe((status) => { handlers.onStatus && handlers.onStatus(status); });
    return {
      send(event, payload) { return ch.send({ type: "broadcast", event, payload }).catch(() => "error"); },
      close() { try { client.removeChannel(ch); } catch (e) {} }
    };
  };

  // Phone side: send with ack. Host replies "ack" {to, mid, ok, reason, ...}.
  Live.acker = function () {
    const pending = {};
    return {
      onAck(p) { const r = pending[p.mid]; if (r) { clearTimeout(r.t); delete pending[p.mid]; r.res(p); } },
      send(conn, event, payload, ms) {
        const mid = Live.uid(); payload.mid = mid;
        return new Promise((res) => {
          pending[mid] = { res, t: setTimeout(() => { delete pending[mid]; res({ ok: false, reason: "No answer from the teacher's screen. Check your Wi-Fi and try again." }); }, ms || 5000) };
          conn.send(event, payload);
        });
      }
    };
  };

  Live.qr = function (el, text) {
    if (!window.qrcode) { el.innerHTML = '<div style="color:#0f2340;font:16px sans-serif;padding:20px">QR code could not load. Use the room code.</div>'; return; }
    const q = window.qrcode(0, "M"); q.addData(text); q.make();
    el.innerHTML = q.createSvgTag({ cellSize: 8, margin: 2, scalable: true });
  };

  Live.statusText = (s) => ({ SUBSCRIBED: "Connected", CHANNEL_ERROR: "Connection error", TIMED_OUT: "Connection timed out", CLOSED: "Disconnected" }[s] || s);

  // Host countdown timer with preset buttons.
  Live.timer = function (el, presets) {
    let end = 0, iv = null;
    el.classList.add("timer");
    el.innerHTML = '<span class="tv" aria-live="off">--:--</span>' +
      presets.map((m) => '<button class="btn sm" data-m="' + m + '">' + m + "m</button>").join("") +
      '<button class="btn sm" data-m="0" aria-label="Stop timer">\u25A0</button>';
    const tv = el.querySelector(".tv");
    function tick() {
      const left = Math.max(0, Math.round((end - Date.now()) / 1000));
      tv.textContent = String(Math.floor(left / 60)).padStart(2, "0") + ":" + String(left % 60).padStart(2, "0");
      if (left === 0) { clearInterval(iv); el.classList.add("done"); }
    }
    el.addEventListener("click", (e) => {
      const b = e.target.closest("button[data-m]"); if (!b) return;
      const m = +b.dataset.m; clearInterval(iv); el.classList.remove("done");
      if (!m) { tv.textContent = "--:--"; return; }
      end = Date.now() + m * 60000; tick(); iv = setInterval(tick, 500);
    });
  };

  Live.notConfiguredHtml = '<div class="warn"><b>Not set up yet.</b> Open <code>config.js</code> and paste your Supabase URL and anon key, then reload this page.</div>';

  window.Live = Live;
})();

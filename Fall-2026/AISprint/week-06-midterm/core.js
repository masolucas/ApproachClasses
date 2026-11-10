/* AI Sprint · Week 6 · Midterm — shared helpers for student.html and host.html */
window.CORE = (function () {
  "use strict";
  // Accept the Week 4 shape (APP_CONFIG) or the AI Sprint live-tool shape (AISPRINT_CONFIG).
  function cfg() {
    const a = window.APP_CONFIG || {}, b = window.AISPRINT_CONFIG || {};
    let url = a.SUPABASE_URL || b.supabaseUrl || "", key = a.SUPABASE_ANON_KEY || b.supabaseAnonKey || "";
    if (url && !/^https?:\/\//.test(url)) url = "https://" + url;
    return { url, key, code: String(a.CLASS_CODE || b.classCode || "AISPRINT-W6").replace(/[^A-Za-z0-9-]/g, "") || "AISPRINT-W6", pin: a.HOST_PIN != null ? String(a.HOST_PIN) : (b.hostPin != null ? String(b.hostPin) : ""), part4: String(a.PART4_URL || b.part4Url || "") };
  }
  // Specific reason the realtime connection cannot start (null = OK).
  function problem() {
    if (typeof window.APP_CONFIG === "undefined" && typeof window.AISPRINT_CONFIG === "undefined") {
      const alt = ["CONFIG", "SUPABASE_CONFIG", "SUPABASE_URL"].filter((k) => typeof window[k] !== "undefined");
      return alt.length ? "config.js defines " + alt.join(", ") + " instead of window.APP_CONFIG." : "config.js did not load. Put it in the same folder as student.html and host.html.";
    }
    const c = cfg();
    if (!c.url || !c.key) return "config.js is missing the Supabase URL or anon key.";
    if (/YOUR[-_]/i.test(c.url + c.key)) return "config.js still has the placeholder values. Paste your Supabase URL and anon key.";
    if (!window.supabase || !window.supabase.createClient) return "The Supabase library did not load. Check the internet connection, then reload.";
    return null;
  }
  // Room codes: 4 letters, no look-alike letters (I, O, L). Each host session gets its own room.
  const ROOM_ABC = "ABCDEFGHJKMNPQRSTUVWXYZ";
  const newRoom = () => Array.from({ length: 4 }, () => ROOM_ABC[Math.floor(Math.random() * ROOM_ABC.length)]).join("");
  const cleanRoom = (s) => String(s || "").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 4);
  const roomOk = (s) => /^[A-Z]{4}$/.test(cleanRoom(s)) && cleanRoom(s).split("").every((ch) => ROOM_ABC.indexOf(ch) > -1);
  let client = null;
  function channel(presenceKey, room) {
    const c = cfg();
    client = client || window.supabase.createClient(c.url, c.key, { realtime: { params: { eventsPerSecond: 20 } } });
    return client.channel("aisprint-w6-" + c.code + "-" + cleanRoom(room), { config: { broadcast: { self: false }, presence: { key: presenceKey } } });
  }
  function drop(ch) { try { if (client && client.removeChannel) client.removeChannel(ch); else if (ch && ch.unsubscribe) ch.unsubscribe(); } catch (e) {} }
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  // tiny inline markup: **bold**, _italic_, *italic*
  const md = (s) => esc(s).replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>").replace(/(^|[\s(])_([^_]+)_/g, "$1<i>$2</i>").replace(/\*([^*]+)\*/g, "<i>$1</i>");
  const plain = (s) => String(s == null ? "" : s).replace(/\*\*([^*]+)\*\*/g, "$1").replace(/(^|[\s(])_([^_]+)_/g, "$1$2").replace(/\*([^*]+)\*/g, "$1");
  const words = (s) => (String(s || "").trim().match(/\S+/g) || []).length;
  const fmtTime = (ts) => new Date(ts).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  const part4Ready = () => /^https?:\/\//i.test(cfg().part4);
  return { part4Ready, newRoom, cleanRoom, roomOk, drop, cfg, problem, channel, esc, md, plain, words, fmtTime };
})();

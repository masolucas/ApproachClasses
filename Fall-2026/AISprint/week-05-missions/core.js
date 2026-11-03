/* AI Sprint · Week 5 · Missions — shared helpers for student.html and host.html */
window.CORE = (function () {
  "use strict";
  // Accept the Week 4 shape (APP_CONFIG) or the AI Sprint live-tool shape (AISPRINT_CONFIG).
  function cfg() {
    const a = window.APP_CONFIG || {}, b = window.AISPRINT_CONFIG || {};
    let url = a.SUPABASE_URL || b.supabaseUrl || "", key = a.SUPABASE_ANON_KEY || b.supabaseAnonKey || "";
    if (url && !/^https?:\/\//.test(url)) url = "https://" + url;
    return { url, key, code: String(a.CLASS_CODE || b.classCode || "AISPRINT-W5").replace(/[^A-Za-z0-9-]/g, "") || "AISPRINT-W5", pin: a.HOST_PIN != null ? String(a.HOST_PIN) : (b.hostPin != null ? String(b.hostPin) : "") };
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
  function channel(presenceKey) {
    const c = cfg();
    const client = window.supabase.createClient(c.url, c.key, { realtime: { params: { eventsPerSecond: 20 } } });
    return client.channel("aisprint-w5-" + c.code, { config: { broadcast: { self: false }, presence: { key: presenceKey } } });
  }
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  // tiny inline markup: **bold**, _italic_, *italic*
  const md = (s) => esc(s).replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>").replace(/(^|[\s(])_([^_]+)_/g, "$1<i>$2</i>").replace(/\*([^*]+)\*/g, "<i>$1</i>");
  const plain = (s) => String(s == null ? "" : s).replace(/\*\*([^*]+)\*\*/g, "$1").replace(/(^|[\s(])_([^_]+)_/g, "$1$2").replace(/\*([^*]+)\*/g, "$1");
  const words = (s) => (String(s || "").trim().match(/\S+/g) || []).length;
  const fmtTime = (ts) => new Date(ts).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  return { cfg, problem, channel, esc, md, plain, words, fmtTime };
})();

// Caption This — shared Supabase config
const SUPABASE_URL = "https://wfkacxgwkdfjdpffnlfc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indma2FjeGd3a2RmamRwZmZubGZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxODk3NTQsImV4cCI6MjA5ODc2NTc1NH0.rRddY5G4mcc4fUj5esG5hz9SHOXU5IcSQeNUd9qodsc";

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const TABLES = {
  games: "caption_this_games",
  players: "caption_this_players",
  situations: "caption_this_situations",
  answerCards: "caption_this_answer_cards",
  memeCards: "caption_this_meme_cards",
  rounds: "caption_this_rounds",
  plays: "caption_this_plays",
  votes: "caption_this_votes",
};

// ---------- helpers shared by host + player ----------

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sample(arr, n) {
  return shuffle(arr).slice(0, n);
}

function makeGameCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no O/0/I/1 confusion
  let code = "";
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function uuid() {
  return crypto.randomUUID();
}

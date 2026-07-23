// Supabase project connection details.
// The anon key is SAFE to be public/committed — it's meant to live in
// frontend code. Real security is enforced by Row Level Security policies
// in the database (see supabase-setup.sql), not by keeping this key secret.

window.SUPABASE_URL = "https://fpctrxkdnscmlpqvbhnn.supabase.co";
window.SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwY3RyeGtkbnNjbWxwcXZiaG5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4Mjk3NzQsImV4cCI6MjEwMDQwNTc3NH0.Y8MROGUd9Sg-2taofndCXCDg-37DPUrlJ0s4zQQ47Kc";

// A fixed prefix so a short 4-digit PIN meets Supabase Auth's minimum
// password length requirement, without changing what the student types.
window.PIN_PREFIX = "wk3-";

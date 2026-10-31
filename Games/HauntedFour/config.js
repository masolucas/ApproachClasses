/* Haunted Four: shared settings for host.html and play.html */

const SUPABASE_URL = 'https://bidcpfxiipkjwlmhptap.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZGNwZnhpaXBrandsbWhwdGFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExMjc4NjAsImV4cCI6MjEwNjcwMzg2MH0.l7ASHyfqTzic_PXmUjVAB4ezGSQS1He95qRrqp5-vs4';

const GAME = {
  cols: 10,        // board width
  rows: 8,         // board height
  seconds: 20,     // time to answer each question
  maxGroups: 6,    // how many groups can join
};

/* Emojis groups can choose from. Each emoji can only be taken by one group. */
const EMOJIS = [
  { e: '🎃', name: 'Jack-o’-Lanterns' },
  { e: '👻', name: 'Ghosts' },
  { e: '💀', name: 'Skulls' },
  { e: '☠️', name: 'Crossbones' },
  { e: '🧛', name: 'Vampires' },
  { e: '🧟', name: 'Zombies' },
  { e: '🕷️', name: 'Spiders' },
  { e: '🕸️', name: 'Spider Webs' },
  { e: '🐈‍⬛', name: 'Black Cats' },
  { e: '🦇', name: 'Bats' },
  { e: '⚰️', name: 'Coffins' },
  { e: '🪦', name: 'Headstones' },
  { e: '🕯️', name: 'Candles' },
  { e: '🍬', name: 'Candies' },
  { e: '🍭', name: 'Lollipops' },
  { e: '🍫', name: 'Chocolates' },
];

/* Disc colors. Each group gets the next free color when it joins,
   so no two groups share a color, whatever emojis they pick.
   Keep at least as many colors as GAME.maxGroups. */
const COLORS = ['#e8772e', '#7c52c2', '#3fa65a', '#c8433a', '#2a9d9a', '#d65a9c'];

const EMOJI = Object.fromEntries(EMOJIS.map(x => [x.e, x]));

/* =========================================================
   Week 4 · AI Enters the Workshop — mission content
   Both pages read this file. Edit text here, not in the HTML.

   Section types:
     text     — instructions (shown on screen only)
     steps    — numbered instructions (screen only)
     prompt   — a prompt students copy into Claude (also printed in the file)
     note     — highlighted box (screen + file)
     rules    — the six contract rules
     field    — a box students type or paste into
     list     — several short numbered inputs
     grid     — table of inputs
     signature — name + date (contract)
   ========================================================= */
window.WEEK = {
  number: 4,
  title: "AI Enters the Workshop",
  term: "Fall 2026",
  course: "Expository Writing with AI",
  school: "Approach International Student Center",
  copyright: "Copyright © 2026 Approach International Student Center, Inc. - Revised on 10/28/2026"
};

window.MISSIONS = [
  /* ---------------------------------------------------- CONTRACT */
  {
    key: "contract",
    tab: "Contract",
    eyebrow: "BEFORE WE START",
    title: ["The AI Writing ", "Contract."],
    meta: "Individual · Read, then sign",
    fileTag: "Contract",
    doneLabel: "Sign the contract",
    intro: "An agreement between the writer and the tool. Read the six rules carefully. When you sign, this page unlocks your first mission.",
    sections: [
      { type: "note", label: "Preamble", body:
        "Artificial intelligence is a powerful writing tool. It can help you brainstorm ideas, organize your thoughts, get feedback on your structure, and learn vocabulary you didn't know. It cannot replace your thinking, your voice, your specific examples, or your judgment as a writer. This contract sets the rules for how AI is used in this course, and how you, as a writer, take responsibility for your own work." },
      { type: "rules", items: [
        ["I will use AI to think with, not to write for me.",
         "AI can help me brainstorm, outline, rephrase, and get feedback. AI will never write the sentences I submit as my own. Every word in my final draft is one I chose to put there."],
        ["I will disclose my use of AI in every assignment.",
         "When I submit work, I will document which AI tools I used, what prompts I gave them, and what I did with the output. Hiding AI use is dishonest. Showing AI use is professional."],
        ["I will evaluate AI suggestions critically, not accept them blindly.",
         "AI is often wrong, generic, or off-tone. When AI gives me a suggestion, I will decide whether to keep it, modify it, or reject it, and I will explain my reasoning. \u201cThe AI said so\u201d is never a justification."],
        ["I will verify AI claims before I trust them.",
         "AI sometimes invents facts, statistics, sources, and quotes that sound real but are not. If AI gives me a piece of information I plan to use, I will check it against a real source. Fabricated facts in my writing are my fault, not the AI's."],
        ["I will protect my voice.",
         "My writing should sound like me. If AI smooths away my style, my accent in writing, or my point of view in ways I don't want, I will push back. AI is a partner, not a replacement."],
        ["I understand the difference between AI-assisted and AI-generated writing.",
         "AI-assisted means: I used AI as a tool while I did the thinking and writing. AI-generated means: AI did the work and I copied it. The first is encouraged. The second is academic dishonesty in this course."]
      ]},
      { type: "note", label: "Acknowledgment", body:
        "I have read these six rules. I understand them. I agree to follow them in this course. By typing my name below, I confirm my agreement." },
      { type: "signature" }
    ]
  },

  /* ---------------------------------------------------- MISSION 1 */
  {
    key: "m1",
    tab: "Mission 1",
    eyebrow: "MISSION 01",
    title: ["Meet Your ", "AI Partner."],
    meta: "Individual, then pairs",
    fileTag: "M1",
    intro: "Your first conversation with Claude. You will ask it what it is good and bad at as a writing partner, then compare its answer with a classmate's.",
    sections: [
      { type: "steps", items: [
        "Open claude.ai in a new tab and start a new chat.",
        "Copy the prompt below and send it to Claude.",
        "Copy the whole exchange (your prompt and Claude's full answer) and paste it in Box 1.",
        "Compare answers with a partner. Were they the same? Different? Write 1–2 sentences in Box 2."
      ]},
      { type: "prompt", text: "I'm an adult student in an expository writing course. What are you good at when you help someone write, and what are you bad at? Give me three examples of each." },
      { type: "field", id: "m1_exchange", label: "Box 1 · Your Claude exchange",
        help: "Paste your prompt and Claude's full response.", rows: 12, required: true },
      { type: "field", id: "m1_partner", label: "Box 2 · Partner comparison",
        help: "1–2 sentences: what did you and your partner notice when you compared your responses?", rows: 3, required: true }
    ]
  },

  /* ---------------------------------------------------- MISSION 2 */
  {
    key: "m2",
    tab: "Mission 2",
    eyebrow: "MISSION 02",
    title: ["What AI ", "Cannot Do."],
    meta: "In pairs · 4 prompts + evaluation grid",
    fileTag: "M2",
    intro: "Run four prompts with your partner. Each one tests something different. Paste each response, then evaluate what the AI did well and badly.",
    sections: [
      { type: "text", body: "Replace any words in [brackets] before you send a prompt. Never type real names or private information." },

      { type: "heading", text: "Prompt 1 · Vague topic" },
      { type: "prompt", text: "Write something about education." },
      { type: "field", id: "m2_p1", label: "Claude's response to Prompt 1", rows: 6, required: true },

      { type: "heading", text: "Prompt 2 · Specific, with an audience" },
      { type: "prompt", text: "Write a 100-word paragraph for high school students in [your home country] about why studying English helps their future career." },
      { type: "field", id: "m2_p2", label: "Claude's response to Prompt 2", rows: 6, required: true },

      { type: "heading", text: "Prompt 3 · Personal experience" },
      { type: "prompt", text: "Write a 100-word paragraph about my grandmother's recipe for [a dish from your culture]. Include the secret ingredient she always added." },
      { type: "field", id: "m2_p3", label: "Claude's response to Prompt 3", rows: 6, required: true },

      { type: "heading", text: "Prompt 4 · Current facts" },
      { type: "prompt", text: "What were the top 3 news stories in [your city] this week?" },
      { type: "text", body: "Then send a follow-up in the same chat:" },
      { type: "prompt", text: "Where did this information come from? List your sources." },
      { type: "field", id: "m2_p4", label: "Claude's response to Prompt 4 and the follow-up", rows: 8, required: true },
      { type: "field", id: "m2_p4_check", label: "Check one source",
        help: "Open one source Claude gave you. Is it real? Does it say what Claude said? If Claude gave no sources, write that.",
        rows: 3, required: true },

      { type: "heading", text: "Evaluation grid" },
      { type: "text", body: "For each prompt, name what the AI did well and what it did badly. Be specific: \u201cgood\u201d and \u201cbad\u201d don't tell us much." },
      { type: "grid", id: "m2_grid",
        cols: ["What did AI do WELL?", "What did AI do BADLY?"],
        rows: ["P1: Vague topic", "P2: Specific + audience", "P3: Personal experience", "P4: Current facts (could you verify it?)"],
        required: true }
    ]
  },

  /* ---------------------------------------------------- MISSION 3 */
  {
    key: "m3",
    tab: "Mission 3",
    eyebrow: "MISSION 03",
    title: ["AI as Your ", "Outline Partner."],
    meta: "Individual · 5 steps",
    fileTag: "M3",
    intro: "You think first, then Claude helps you organize. At the end, you decide what to keep, modify, or reject, and why.",
    sections: [
      { type: "heading", text: "Step 1 · Your topic" },
      { type: "field", id: "m3_topic", label: "The topic you chose", rows: 2, required: true,
        placeholder: "Example: Why English fluency affects career opportunities in the U.S." },

      { type: "heading", text: "Step 2 · Your 5 points, before AI" },
      { type: "note", label: "Don't open Claude yet", body:
        "Write five things you already know or believe about your topic. Keep these as YOUR original ideas, even if AI suggests similar things later. The point of this step is comparison." },
      { type: "list", id: "m3_points", count: 5, label: "Your 5 personal points", required: true },

      { type: "heading", text: "Step 3 · AI brainstorm" },
      { type: "prompt", text: "My topic is: [your topic]. Suggest 5 different angles I could take in a 400-word expository essay. Explain each angle in one sentence." },
      { type: "field", id: "m3_brainstorm", label: "Claude's brainstorm response", help: "Paste the 5 angles Claude suggested.", rows: 8, required: true },

      { type: "heading", text: "Step 4 · AI outline" },
      { type: "prompt", text: "Using angle [number], create a 5-paragraph outline for a 400-word expository essay: an introduction with a thesis statement, three body paragraphs with a topic sentence and supporting points, and a conclusion." },
      { type: "field", id: "m3_outline", label: "Claude's 5-paragraph outline", rows: 10, required: true },

      { type: "heading", text: "Step 5 · Your marked-up outline" },
      { type: "text", body: "Paste the outline again. Put [KEEP], [MODIFY], or [REJECT] before each line, and add your reasoning." },
      { type: "example", lines: [
        ["KEEP", "Topic sentence: \u201cMany U.S. employers now list strong written English as a requirement for client-facing roles.\u201d"],
        ["MODIFY", "Supporting point about salary: too vague. I will replace it with a specific example from my own field."],
        ["REJECT", "Conclusion suggestion: too generic. AI just summarized the intro. I want to end with a personal call to action."]
      ]},
      { type: "field", id: "m3_marked", label: "Your marked-up outline", rows: 12, required: true,
        placeholder: "[KEEP] …\n[MODIFY] …\n[REJECT] …" }
    ]
  },

  /* ---------------------------------------------------- MISSION 4 */
  {
    key: "m4",
    tab: "Mission 4",
    eyebrow: "MISSION 04",
    title: ["Your Words, ", "Their Structure."],
    meta: "Individual · 400-word essay",
    fileTag: "M4",
    intro: "Write a 400-word essay from your marked-up outline. The structure can be AI-informed. The sentences must be yours.",
    sections: [
      { type: "note", label: "The rule for this mission", strong: true, body:
        "Every sentence in this essay is written by you, in your own words. Claude stays closed during this mission." },
      { type: "steps", items: [
        "Open your marked-up outline from Mission 3. Use only the lines you kept or modified.",
        "Write five paragraphs: an introduction with a thesis, three body paragraphs, and a conclusion.",
        "Aim for 400 words. The counter must show between 350 and 450 before you can finish."
      ]},
      { type: "field", id: "m4_title", label: "Essay title", rows: 1, required: true },
      { type: "field", id: "m4_essay", label: "Your essay", rows: 22, required: true,
        minWords: 350, maxWords: 450, showCount: true,
        placeholder: "Leave an empty line between paragraphs." }
    ]
  },

  /* ---------------------------------------------------- MISSION 5 */
  {
    key: "m5",
    tab: "Mission 5",
    eyebrow: "MISSION 05",
    title: ["Same Idea, ", "Different Voice."],
    meta: "Individual · 4 tones + reflection",
    fileTag: "M5",
    intro: "One message, four tones. You will ask Claude to rewrite the same message for different situations, then decide which voice is really yours.",
    sections: [
      { type: "note", label: "The situation (fictional practice)", body:
        "You are responsible for a monthly report due Friday. It will be two days late because a colleague hasn't sent you the data you need. You need to tell your manager." },
      { type: "text", body: "Send these four prompts in the same Claude chat, one at a time. Don't add real names." },

      { type: "heading", text: "Version 1 · Formal" },
      { type: "prompt", text: "Write a formal email to my manager. The monthly report due Friday will be two days late because a colleague hasn't sent me the data I need yet." },
      { type: "field", id: "m5_v1", label: "Claude's formal email", rows: 7, required: true },

      { type: "heading", text: "Version 2 · Casual" },
      { type: "prompt", text: "Now rewrite the same message as a casual Slack message to my manager." },
      { type: "field", id: "m5_v2", label: "Claude's casual Slack message", rows: 5, required: true },

      { type: "heading", text: "Version 3 · Urgent" },
      { type: "prompt", text: "Now rewrite it as an urgent message. My manager needs to act on it today." },
      { type: "field", id: "m5_v3", label: "Claude's urgent message", rows: 5, required: true },

      { type: "heading", text: "Version 4 · Apologetic" },
      { type: "prompt", text: "Now rewrite it as an apologetic email." },
      { type: "field", id: "m5_v4", label: "Claude's apologetic email", rows: 7, required: true },

      { type: "heading", text: "Your 50-word reflection" },
      { type: "field", id: "m5_reflection", label: "Which version sounds most like YOU? Which would you actually send to your real boss? Why?",
        rows: 5, required: true, minWords: 40, showCount: true, target: 50 }
    ]
  },

  /* ---------------------------------------------------- CLOSING */
  {
    key: "closing",
    tab: "Closing",
    eyebrow: "CLOSING",
    title: ["Closing ", "Reflection."],
    meta: "Individual · One paragraph",
    fileTag: "Closing",
    intro: "Look back at today. Be honest: the goal is to capture how your thinking changed.",
    sections: [
      { type: "note", label: "Write one paragraph in response to this question", strong: true, body:
        "How is your relationship with AI as a writing tool different now than when class started today?" },
      { type: "field", id: "cl_reflection", label: "Your reflection", help: "At least 80 words.",
        rows: 10, required: true, minWords: 80, showCount: true }
    ]
  }
];

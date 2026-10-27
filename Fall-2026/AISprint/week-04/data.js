/* AI Sprint · Week 4 · generated from content.js. Edit content.js, not this file. */
window.W4 = {
 "registers": {
  "F": {
   "key": "F",
   "name": "Formal",
   "icon": "🎩",
   "color": "143865",
   "gesture": "Stand up straight, adjust an imaginary tie",
   "when": "People you don't know, senior people, serious or official matters (first contact, complaints, bad news).",
   "clues": "Full forms (I am, do not) · indirect requests · formal words (receive, assist, regarding)"
  },
  "N": {
   "key": "N",
   "name": "Neutral",
   "icon": "🤝",
   "color": "0E6B6B",
   "gesture": "Shake hands",
   "when": "Colleagues and clients you already work with; everyday questions and updates.",
   "clues": "Contractions (I'm, we'll) · direct but polite (Could you…?) · short, clear sentences"
  },
  "P": {
   "key": "P",
   "name": "Persuasive",
   "icon": "🚀",
   "color": "B45309",
   "gesture": "Point forward",
   "when": "When you want the reader to act, agree, or choose you.",
   "clues": "Benefits for the reader (you, your team) · confident words · a clear call to action"
  },
  "X": {
   "key": "X",
   "name": "Too casual",
   "icon": "🧢",
   "color": "C0392B",
   "gesture": "Shrug",
   "when": "Texts to friends. Never for work email.",
   "clues": "Slang (gonna, u, lol) · no greeting or sign-off · ASAP, emojis, !!!"
  }
 },
 "phrases": [
  {
   "fn": "Opening",
   "F": "I am writing to inquire about your services.",
   "N": "I'm reaching out about your services.",
   "P": "I have an idea that could save your team time.",
   "clue": {
    "F": "Full form “I am” + formal verb “inquire”",
    "N": "Contraction “I'm” + everyday verb",
    "P": "Offers a benefit: “save your team time”"
   }
  },
  {
   "fn": "Request",
   "F": "I would be grateful if you could send the quote.",
   "N": "Could you please send the quote?",
   "P": "If you send the quote today, we can sign this week.",
   "clue": {
    "F": "Indirect request: “I would be grateful if…”",
    "N": "Direct but polite question: “Could you please…?”",
    "P": "If + benefit: the reader gets a fast result"
   }
  },
  {
   "fn": "Bad news",
   "F": "We regret to inform you that the order is delayed.",
   "N": "Unfortunately, the order is running late.",
   "P": "While the order is late, we can offer free express delivery.",
   "clue": {
    "F": "Fixed formal chunk: “We regret to inform you”",
    "N": "Simple signal word: “Unfortunately”",
    "P": "Turns bad news into an offer: “While…, we can offer…”"
   }
  },
  {
   "fn": "Apology",
   "F": "Please accept our sincere apologies for the error.",
   "N": "Sorry for the mix-up with your order.",
   "P": "We're sorry, and we want to make it right for you.",
   "clue": {
    "F": "“Please accept our sincere apologies”",
    "N": "Short and friendly: “Sorry for the mix-up”",
    "P": "Apology + promise of action for the reader"
   }
  },
  {
   "fn": "Follow-up",
   "F": "I am writing to follow up on my email of November 3.",
   "N": "Just following up on my last email.",
   "P": "I don't want you to miss this week's special price.",
   "clue": {
    "F": "Full form + exact reference to the earlier email",
    "N": "Relaxed chunk: “Just following up on…”",
    "P": "Creates urgency: “don't want you to miss”"
   }
  },
  {
   "fn": "Closing",
   "F": "I look forward to hearing from you.",
   "N": "Let me know if you have any questions.",
   "P": "Let's schedule a 15-minute call this week.",
   "clue": {
    "F": "Fixed formal closing chunk",
    "N": "Friendly, open offer of help",
    "P": "Clear call to action: “Let's… this week”"
   }
  }
 ],
 "remix": [
  {
   "n": 1,
   "msg": "hey mr johnson, gonna be late 2 the meeting tmrw, traffic lol. start w/o me",
   "target": "F",
   "audience": "A senior manager you have met only once.",
   "model": "Dear Mr. Johnson, I am sorry, but I will be late to tomorrow's meeting because of traffic. Please feel free to start without me. Kind regards,",
   "keep": [
    "late",
    "tomorrow's meeting",
    "traffic",
    "start without me"
   ]
  },
  {
   "n": 2,
   "msg": "yo the invoice u sent is wrong. fix it asap",
   "target": "N",
   "audience": "A supplier you work with every month.",
   "model": "Hi Sam, I think there's a mistake on the invoice you sent. Could you please check it and send a corrected version? Thanks!",
   "keep": [
    "the invoice",
    "it is wrong",
    "please correct it"
   ]
  },
  {
   "n": 3,
   "msg": "u should totally try our new app its super cool",
   "target": "P",
   "audience": "A business owner who has never used your product.",
   "model": "Dear Ms. Chen, I'd love to introduce our new app. It could make your team's daily work faster and easier. Would you like a short demo?",
   "keep": [
    "new app",
    "why it is good for the reader",
    "a next step"
   ]
  },
  {
   "n": 4,
   "msg": "cant do friday. next week maybe?",
   "target": "F",
   "audience": "A client who asked to meet on Friday. (Bonus round)",
   "model": "Dear Mr. Okafor, Thank you for the invitation. Unfortunately, I am not available on Friday. Would it be possible to meet next week instead? Kind regards,",
   "keep": [
    "not available Friday",
    "suggest next week"
   ]
  }
 ],
 "remixScore": [
  {
   "k": "register",
   "label": "Right register",
   "pts": 1
  },
  {
   "k": "info",
   "label": "All key information kept (no new facts)",
   "pts": 1
  },
  {
   "k": "clear",
   "label": "Clear and correct English",
   "pts": 1
  }
 ],
 "remixBonus": "+1 speed bonus for the first team to send (if it scores at least 2).",
 "pairings": [
  {
   "id": "A",
   "client": {
    "team": 1,
    "name": "Maple Street Dental",
    "who": "a small dental office with 6 staff and 8 computers",
    "person": "Office manager: Jordan Reyes",
    "wants": "Reliable IT support that fits the budget.",
    "facts": [
     "8 computers",
     "Budget: up to $400 per month",
     "Front-desk computer runs the appointment system"
    ],
    "secret": "You will accept an upgrade only if it costs $400 per month or less and includes faster help."
   },
   "company": {
    "team": 2,
    "name": "BrightDesk IT Services",
    "who": "an IT support company for small offices",
    "person": "Account manager: Sam Patel",
    "wants": "Keep this client happy and sell the Premium plan.",
    "facts": [
     "Basic plan: $300/month, remote help Mon–Fri 9–5, 1 onsite visit per month",
     "Premium plan: $450/month, 24/7 remote help, response within 2 hours, 3 onsite visits"
    ],
    "secret": "Round 2: the missed visit was a scheduling error at BrightDesk. You may offer a 50% credit ($150) and a priority visit within 24 hours. Round 3: your lowest Premium price is $380/month for the first 6 months."
   },
   "rounds": [
    {
     "first": "client",
     "reg": "N",
     "task": "Ask about monthly IT support for your 8 computers: price, response time, and onsite visits.",
     "reply": "Answer every question with the plan facts. Suggest the plan that fits best.",
     "replyReg": "N"
    },
    {
     "first": "client",
     "reg": "F",
     "task": "You chose the Basic plan. Last Monday the technician missed a scheduled visit. The front-desk computer was down all day and you had to reschedule 12 appointments. Ask for an explanation, a fix, and a credit.",
     "reply": "Apologize formally, explain, and offer a solution (see your secret).",
     "replyReg": "F"
    },
    {
     "first": "company",
     "reg": "P",
     "task": "Persuade the client to upgrade to Premium at a special price.",
     "reply": "Accept, negotiate, or decline politely (see your secret).",
     "replyReg": "N"
    }
   ]
  },
  {
   "id": "B",
   "client": {
    "team": 3,
    "name": "Harbor Light Events",
    "who": "an event-planning company",
    "person": "Event planner: Morgan Lee",
    "wants": "Great food for a one-day conference, on time.",
    "facts": [
     "Conference lunch for 120 guests",
     "Thursday, December 3",
     "At least 30 vegetarian meals"
    ],
    "secret": "Round 3: you plan 4 events next year. You will only sign a deal with a guarantee that food arrives on time."
   },
   "company": {
    "team": 4,
    "name": "FreshTable Catering",
    "who": "a catering company for business events",
    "person": "Sales lead: Alex Kim",
    "wants": "Win repeat business from this event planner.",
    "facts": [
     "Standard lunch: $18 per person",
     "Deluxe lunch: $25 per person",
     "Delivery and setup included",
     "Final numbers needed 7 days before the event"
    ],
    "secret": "Round 2: your delivery van broke down. You may offer a 20% refund on this order OR 25% off the next event. Round 3: your best offer is 10% off all events next year plus a free dessert table at the next event."
   },
   "rounds": [
    {
     "first": "client",
     "reg": "N",
     "task": "Ask about lunch for 120 guests on Thursday, December 3: price per person, menu options, and vegetarian meals.",
     "reply": "Answer with your prices and options. Remind them about the final-numbers deadline.",
     "replyReg": "N"
    },
    {
     "first": "client",
     "reg": "F",
     "task": "At the conference, lunch arrived 45 minutes late and 15 vegetarian meals were missing. Ask for an explanation and a partial refund.",
     "reply": "Apologize formally, explain, and offer a solution (see your secret).",
     "replyReg": "F"
    },
    {
     "first": "company",
     "reg": "P",
     "task": "Persuade the client to sign an Event Partner deal for next year.",
     "reply": "Accept, negotiate, or decline politely (see your secret).",
     "replyReg": "N"
    }
   ]
  },
  {
   "id": "C",
   "client": {
    "team": 5,
    "name": "Lakeside Language Academy",
    "who": "a small language school",
    "person": "Marketing coordinator: Riley Novak",
    "wants": "Good-looking brochures for an open house.",
    "facts": [
     "500 color brochures, two-sided",
     "Open house: Saturday, November 21",
     "Budget: about $400"
    ],
    "secret": "Round 3: you have 4 more events this year. You want to see a sample before any big order."
   },
   "company": {
    "team": 6,
    "name": "PrintPro Solutions",
    "who": "a printing company",
    "person": "Customer manager: Taylor Brooks",
    "wants": "Keep a growing client for the whole year.",
    "facts": [
     "Standard paper: $0.60 per brochure",
     "Premium paper: $0.85 per brochure",
     "Ready in 5 business days",
     "Free delivery on orders over $250"
    ],
    "secret": "Round 2: your printer had a color problem. You may reprint all 500 on premium paper for free, ready in 2 business days. Round 3: your best offer is 15% off all orders for one year plus a free design check."
   },
   "rounds": [
    {
     "first": "client",
     "reg": "N",
     "task": "Ask about 500 two-sided color brochures for your open house on Saturday, November 21: price, paper options, and timing.",
     "reply": "Answer with your prices and timing. Help the client choose.",
     "replyReg": "N"
    },
    {
     "first": "client",
     "reg": "F",
     "task": "The brochures arrived, but the colors are very dark and only 400 of 500 came. The open house is in 3 days. Ask for an explanation and a solution.",
     "reply": "Apologize formally, explain, and offer a solution (see your secret).",
     "replyReg": "F"
    },
    {
     "first": "company",
     "reg": "P",
     "task": "Persuade the client to sign a one-year printing contract.",
     "reply": "Accept, negotiate, or decline politely (see your secret).",
     "replyReg": "N"
    }
   ]
  }
 ],
 "reviewOf": {
  "A": "B",
  "B": "C",
  "C": "A"
 },
 "exchangeTips": [
  "Write your prompt with the register and the facts from your card.",
  "Edit with the checklist. Make it sound like your team, not like a robot.",
  "Fact-check: no new prices, dates, or promises that are not on your card.",
  "Waiting? Read the inbox, fact-check, and plan your next email."
 ]
};

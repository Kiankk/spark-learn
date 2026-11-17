// Content library. Edit/add freely. Card = {e: emoji visual, h: headline, t: text}
// Quiz = {q, o:[options], a: index of correct, w: why}
window.CATS = {
  money:  { name: "Money",        emoji: "💰", color: "#16a34a" },
  mind:   { name: "Self-Growth",  emoji: "🧠", color: "#7c3aed" },
  people: { name: "People Skills",emoji: "🤝", color: "#ea580c" },
  health: { name: "Health",       emoji: "💪", color: "#e11d48" }
};

window.COURSES = [
// ───────────── MONEY ─────────────
{ id:"m1", cat:"money", e:"🌱", title:"Money Basics That Compound", sub:"The habits behind every wealthy person",
  cards:[
   {e:"⏳",h:"Time beats talent",t:"Compound interest means your returns earn returns. $500/month at 7% average growth becomes roughly $600k in 30 years, though you only put in $180k. Starting early matters more than starting big."},
   {e:"🧾",h:"Pay yourself first",t:"Don't save what's left after spending. Automate a transfer to savings/investments the day you get paid. What you never see, you never miss."},
   {e:"🛟",h:"Emergency fund",t:"Build 3-6 months of essential expenses in a boring, accessible account (high-yield savings). It stops one bad month from becoming debt."},
   {e:"🔥",h:"Kill high-interest debt",t:"Credit cards often charge 20%+. Paying one off is a guaranteed 20% return, better than almost any investment. Pay minimums on all, throw extra at the highest rate (avalanche) or smallest balance (snowball, for motivation)."},
   {e:"📊",h:"The 50/30/20 starting point",t:"A simple framework: ~50% needs, 30% wants, 20% saving and debt payoff. It's a starting point, not a law. Adjust to your income and goals."},
   {e:"🎯",h:"Track to know",t:"You can't improve what you don't measure. Review your spending once a week for 10 minutes. Most people find 2-3 'leaks' (subscriptions, delivery) worth hundreds a year."}
  ],
  quiz:[
   {q:"What makes compound interest powerful?",o:["High risk","Returns earn their own returns over time","Bank bonuses"],a:1,w:"Growth builds on previous growth, so time is the key ingredient."},
   {q:"Which debt should you usually attack first?",o:["Lowest interest","Highest interest","Oldest"],a:1,w:"Highest interest costs you the most (avalanche method)."},
   {q:"A typical emergency fund covers…",o:["1 week","3-6 months of essentials","5 years"],a:1,w:"It protects you from job loss or surprise bills."}
  ]},
{ id:"m2", cat:"money", e:"📈", title:"Investing for Normal People", sub:"Simple, boring, effective",
  cards:[
   {e:"🧺",h:"Index funds",t:"An index fund holds hundreds of companies at once (like the S&P 500) at very low fees. Most professional stock pickers fail to beat them over long periods."},
   {e:"💸",h:"Fees are silent killers",t:"A 1% annual fee vs 0.05% can cost you six figures over decades. Check the 'expense ratio' of any fund before buying."},
   {e:"🎢",h:"Volatility is the price",t:"Markets fall 10-20% fairly often and sometimes 30%+. The return you earn is partly payment for tolerating that. Selling in a panic locks in losses."},
   {e:"📅",h:"Dollar-cost averaging",t:"Investing a fixed amount on a schedule means you buy more when prices are low and less when high, and removes the stress of timing the market."},
   {e:"🏦",h:"Use tax-advantaged accounts",t:"In the US: a 401(k) (especially with employer match, which is free money), then an IRA/Roth IRA. Other countries have equivalents. Check yours."},
   {e:"🧪",h:"Diversify",t:"Don't put everything in one stock, sector, or coin. Diversification is the only 'free lunch' in investing. This is general education, not personal financial advice."}
  ],
  quiz:[
   {q:"What does an index fund do?",o:["Picks one winning stock","Holds many companies cheaply","Guarantees profit"],a:1,w:"It gives broad diversification at low cost."},
   {q:"Why is an employer 401(k) match valuable?",o:["It's free money","It's tax-free forever","It's risk-free returns of 0%"],a:0,w:"Not taking the match is like declining part of your salary."},
   {q:"What should you generally do in a market crash?",o:["Panic sell","Stick to your plan","Borrow to trade"],a:1,w:"Selling low locks in losses; time in market beats timing."}
  ]},
{ id:"m3", cat:"money", e:"🧠", title:"Psychology of Spending", sub:"Why you buy what you buy",
  cards:[
   {e:"🛍️",h:"Hedonic adaptation",t:"New things stop feeling exciting fast. A bigger house or car resets your baseline. Experiences and relationships tend to keep their glow longer than objects."},
   {e:"⏱️",h:"The 48-hour rule",t:"Want something non-essential? Wait 48 hours (or 30 days for big items). Most impulse desires fade, saving you thousands."},
   {e:"🪙",h:"Price in hours",t:"Divide the price by your hourly after-tax pay. A $200 jacket might be 10 hours of your life. Still worth it? Sometimes yes. Now it's a conscious choice."},
   {e:"🏷️",h:"Anchoring & fake sales",t:"A '70% off' tag works by anchoring you to an inflated original price. Ask: would I buy this at this price if there were no sale?"},
   {e:"🔁",h:"Subscription creep",t:"Small monthly charges feel painless but add up. Audit subscriptions every quarter and cancel anything you haven't used in 30 days."},
   {e:"👀",h:"Lifestyle inflation",t:"Raises tend to be swallowed by new spending. Commit to saving at least half of every raise and your wealth grows without feeling poorer."}
  ],
  quiz:[
   {q:"What is the 48-hour rule?",o:["Pay within 48 hours","Wait before non-essential purchases","Return items in 48h"],a:1,w:"Delay kills most impulse buys."},
   {q:"Hedonic adaptation means…",o:["New things stop feeling special","Prices adjust to inflation","Debt grows"],a:0,w:"Happiness from purchases fades quickly."},
   {q:"Best response to a raise?",o:["Upgrade everything","Save at least half","Ignore it"],a:1,w:"It fights lifestyle inflation."}
  ]},
// ───────────── SELF-GROWTH ─────────────
{ id:"s1", cat:"mind", e:"🔁", title:"Build Habits That Stick", sub:"Systems over willpower",
  cards:[
   {e:"🪜",h:"Start tiny",t:"Make the habit so small it's impossible to skip: 1 push-up, 1 page, 2 minutes. Consistency builds identity; intensity can come later."},
   {e:"🔗",h:"Habit stacking",t:"Attach a new habit to an existing one: 'After I pour my coffee, I'll write one line in my journal.' The old habit becomes the trigger."},
   {e:"🌍",h:"Design your environment",t:"Make good habits obvious and bad ones hard. Put the book on your pillow; put the phone charger outside the bedroom."},
   {e:"🗳️",h:"Vote for your identity",t:"Each action is a vote for who you are. 'I'm someone who works out' beats 'I want to lose weight.' Identity-based habits last."},
   {e:"🚫",h:"Never miss twice",t:"Missing once is an accident; twice starts a new habit. If you slip, the only rule is to restart the very next day."},
   {e:"📆",h:"Be patient: ~66 days",t:"One study found habits took 18-254 days to form, averaging about 66. Don't judge the habit in week two."}
  ],
  quiz:[
   {q:"What's the best way to start a new habit?",o:["Go extreme","Make it tiny","Rely on motivation"],a:1,w:"Small wins build consistency."},
   {q:"Habit stacking means…",o:["Doing many habits at once","Attaching a habit to an existing one","Tracking in an app"],a:1,w:"An existing habit acts as the cue."},
   {q:"The 'never miss twice' rule says…",o:["Quit after 2 misses","Restart immediately after a miss","Skip weekends"],a:1,w:"It prevents one slip from becoming a spiral."}
  ]},
{ id:"s2", cat:"mind", e:"🎯", title:"Focus in a Distracted World", sub:"Take your attention back",
  cards:[
   {e:"📵",h:"Attention is your asset",t:"Apps are designed by thousands of engineers to keep you scrolling. Treating your attention as a limited resource is the first step to protecting it."},
   {e:"🎧",h:"Deep work blocks",t:"Schedule 60-90 minute blocks with no notifications and one task. Two focused hours often beat eight scattered ones."},
   {e:"🔕",h:"Cut notifications",t:"Turn off all notifications except calls and people. If it matters, someone will call. You choose when to check, not the app."},
   {e:"🍅",h:"Pomodoro",t:"25 minutes focus, 5 minutes break, repeat. A visible timer lowers the barrier to starting hard tasks."},
   {e:"📝",h:"Write it down",t:"Keep a 'distraction pad.' When a random thought hits, jot it and return to work. It frees working memory without breaking flow."},
   {e:"🌅",h:"First hour rule",t:"Avoid your phone for the first hour after waking. You set the day's tone yourself instead of reacting to everyone else's."}
  ],
  quiz:[
   {q:"A good deep-work block length is…",o:["5 min","60-90 min","6 hours"],a:1,w:"Long enough for flow, short enough to sustain."},
   {q:"Which notifications to keep?",o:["All","Only people and calls","Only social"],a:1,w:"Reduces interruption from apps."},
   {q:"The distraction pad is used to…",o:["Plan your week","Capture stray thoughts and keep working","Track screen time"],a:1,w:"It offloads the thought without switching tasks."}
  ]},
{ id:"s3", cat:"mind", e:"🏛️", title:"Stoic Mindset", sub:"Calm under pressure",
  cards:[
   {e:"🎛️",h:"Control what you can",t:"Epictetus: some things are up to us (our judgments, actions) and some aren't (others' opinions, the past, outcomes). Spend energy only on the first group."},
   {e:"🧱",h:"The obstacle is the way",t:"Marcus Aurelius argued that what blocks your path can become your path. Setbacks are training material."},
   {e:"🌧️",h:"Premeditatio malorum",t:"Briefly imagine what could go wrong. You prepare better and feel less shocked if it happens."},
   {e:"🪞",h:"Evening review",t:"Each night ask: What did I do well? What could I do better? What will I do tomorrow? A 3-minute habit for steady improvement."},
   {e:"🔭",h:"View from above",t:"Zoom out. In 5 years, will this matter? Perspective shrinks most problems to size."},
   {e:"⚖️",h:"Pause before reacting",t:"Between event and response is a gap. Take one breath before you answer. The gap is where your character shows."}
  ],
  quiz:[
   {q:"Stoics focus on…",o:["What you can control","Outcomes only","Others' opinions"],a:0,w:"Dichotomy of control."},
   {q:"Premeditatio malorum is…",o:["Positive affirmation","Imagining things going wrong to prepare","Meditation"],a:1,w:"Rehearsing setbacks reduces their sting."},
   {q:"An evening review includes…",o:["Reflecting on what went well/poorly","Checking email","Planning purchases"],a:0,w:"Small daily reflection compounds."}
  ]},
// ───────────── PEOPLE ─────────────
{ id:"p1", cat:"people", e:"🤝", title:"How to Win Friends (Carnegie)", sub:"Timeless principles, visualized",
  cards:[
   {e:"🚫",h:"Don't criticize, condemn or complain",t:"Criticism puts people on the defensive and rarely changes them. Try to understand why people do what they do; understanding is more profitable than condemnation."},
   {e:"🌟",h:"Give honest, sincere appreciation",t:"Everyone craves feeling important. Notice real strengths and say them out loud, specifically. Flattery is fake; appreciation is real."},
   {e:"🎣",h:"Talk in terms of their interests",t:"The way to a person's heart is to talk about what they care about. Ask about their goals and what they're excited about."},
   {e:"😊",h:"Become genuinely interested",t:"You make more friends in two months by being interested in others than in two years by trying to make them interested in you."},
   {e:"🏷️",h:"Remember names",t:"A person's name is the sweetest sound in any language. Repeat it right after hearing it and use it naturally in the conversation."},
   {e:"👂",h:"Be a good listener",t:"Encourage others to talk about themselves. Ask follow-up questions. People remember how listened-to they felt, not what you said."}
  ],
  quiz:[
   {q:"Carnegie's view on criticism?",o:["Useful daily","Rarely works; makes people defensive","Only in public"],a:1,w:"Understanding beats condemning."},
   {q:"The best way to be interesting is to be…",o:["Funny","Interested in others","Rich"],a:1,w:"Genuine interest in people wins friends."},
   {q:"Why remember someone's name?",o:["It signals they matter","It's polite only","It impresses bosses"],a:0,w:"A name is deeply personal."}
  ]},
{ id:"p2", cat:"people", e:"🗣️", title:"Conversation Mastery", sub:"Never run out of things to say",
  cards:[
   {e:"❓",h:"Open-ended questions",t:"Replace 'Did you have a good weekend?' with 'What was the best part of your weekend?' Open questions invite stories, not yes/no."},
   {e:"🔄",h:"The FORD topics",t:"Stuck? Ask about Family, Occupation, Recreation, Dreams. Almost everyone enjoys at least one."},
   {e:"🪞",h:"Reflect and follow up",t:"Repeat a key word they said as a question: 'Hiking?' then 'What got you into it?' Following threads makes conversation flow naturally."},
   {e:"⚖️",h:"Balance share and ask",t:"Aim for a rough 50/50. Share a related story after listening so it feels like a mutual exchange, not an interview."},
   {e:"🧍",h:"Body language",t:"Open posture, relaxed shoulders, eye contact ~60-70% of the time, and a real smile make you approachable before you say a word."},
   {e:"🚪",h:"Exit gracefully",t:"End on a high: 'It was great talking to you, I'm going to grab a drink. Let's catch up soon.' Clean exits make people want to talk again."}
  ],
  quiz:[
   {q:"Which question is better?",o:["Did you like the trip?","What was the highlight of your trip?","Was it fun?"],a:1,w:"Open-ended questions elicit stories."},
   {q:"FORD stands for…",o:["Family, Occupation, Recreation, Dreams","Fun, Ordinary, Real, Direct","Feelings, Opinions, Rants, Dates"],a:0,w:"Four reliably warm topics."},
   {q:"Best way to exit a chat?",o:["Disappear","End positively with a clear reason","Check your phone"],a:1,w:"Positive endings leave a good impression."}
  ]},
{ id:"p3", cat:"people", e:"🧲", title:"Influence & Charisma", sub:"Presence, persuasion, confidence",
  cards:[
   {e:"🔁",h:"Reciprocity",t:"People feel compelled to return favors. Give first: help, share, introduce. Don't keep score, but know generosity builds trust."},
   {e:"🙋",h:"Warmth + competence",t:"Research shows we judge people on two axes: warmth (can I trust them?) and competence (can they deliver?). Charismatic people show both."},
   {e:"🐢",h:"Slow down",t:"Speaking slower, with pauses, signals confidence. Rushing signals anxiety. Leave a beat of silence before key points."},
   {e:"💬",h:"Say 'we', not 'you'",t:"In disagreements, framing problems as shared ('How do we solve this?') reduces resistance compared with 'You always...'."},
   {e:"🙏",h:"Admit mistakes quickly",t:"Owning an error fast defuses tension and builds credibility. 'I was wrong, here's how I'll fix it' is a power move."},
   {e:"✨",h:"Be present",t:"Put the phone away and give full attention. Presence is rare, so it feels like a gift."}
  ],
  quiz:[
   {q:"Two traits people judge you on?",o:["Warmth and competence","Wealth and looks","Humor and height"],a:0,w:"Trust plus ability."},
   {q:"Speaking slower signals…",o:["Boredom","Confidence","Confusion"],a:1,w:"Pauses add weight to words."},
   {q:"Reciprocity means…",o:["People return favors","Money back guarantee","Mirror posture"],a:0,w:"Give first to build goodwill."}
  ]},
// ───────────── HEALTH ─────────────
{ id:"h1", cat:"health", e:"😴", title:"Sleep Like a Pro", sub:"The cheapest performance enhancer",
  cards:[
   {e:"🕰️",h:"Consistency first",t:"Go to bed and wake up at the same time every day, even weekends. A stable body clock improves sleep quality more than most gadgets."},
   {e:"☀️",h:"Morning light",t:"Get 10-30 minutes of outdoor light within an hour of waking. It anchors your circadian rhythm and helps you feel sleepy at night."},
   {e:"☕",h:"Caffeine cutoff",t:"Caffeine's half-life is ~5-6 hours. A 3 pm coffee means half is still in your system at 9 pm. Many people sleep better stopping by noon-2 pm."},
   {e:"🌡️",h:"Cool, dark, quiet",t:"Aim for a bedroom around 16-19°C (60-67°F), blackout curtains, and low noise. Your body needs to drop its core temperature to sleep."},
   {e:"📱",h:"Wind down",t:"Dim lights and avoid doomscrolling for the last 30-60 minutes. Stimulating content and bright screens delay sleepiness."},
   {e:"🎯",h:"7-9 hours",t:"Most adults need 7-9 hours. Chronic short sleep is linked to worse mood, focus, immunity, and weight regulation. If you struggle persistently, talk to a doctor."}
  ],
  quiz:[
   {q:"The most important sleep habit?",o:["Fancy mattress","Consistent schedule","Naps"],a:1,w:"A steady body clock matters most."},
   {q:"Caffeine half-life is about…",o:["30 min","5-6 hours","24 hours"],a:1,w:"Late coffee can disrupt sleep."},
   {q:"Ideal bedroom temp?",o:["Warm","Cool (16-19°C)","Hot"],a:1,w:"Core temperature must drop to sleep."}
  ]},
{ id:"h2", cat:"health", e:"🥗", title:"Eat Smarter, Not Stricter", sub:"Nutrition without the noise",
  cards:[
   {e:"🥩",h:"Protein first",t:"Protein keeps you fuller and preserves muscle. A common target is ~1.6 g per kg of body weight for active people, less for others. Check with a professional for your needs."},
   {e:"🥦",h:"Mostly whole foods",t:"Build meals from foods with one ingredient: vegetables, fruit, beans, eggs, fish, meat, nuts, whole grains. Ultra-processed foods make overeating easy."},
   {e:"💧",h:"Hydrate",t:"Thirst can feel like hunger. Drink water through the day; pale-yellow urine is a simple hydration check."},
   {e:"🍽️",h:"80% rule",t:"Eat slowly and stop when you're about 80% full. Fullness signals take ~20 minutes to reach your brain."},
   {e:"🧂",h:"Sugar sneaks",t:"Sugary drinks are the easiest calories to cut. Check labels: 'added sugars' are the number that matters."},
   {e:"🔄",h:"Consistency over perfection",t:"The 80/20 approach works: eat well most of the time and enjoy the rest. Extreme diets fail because they can't be sustained."}
  ],
  quiz:[
   {q:"Why prioritize protein?",o:["Fills you and preserves muscle","It's cheap","Zero calories"],a:0,w:"Satiety and muscle maintenance."},
   {q:"Best default food choice?",o:["Whole, minimally processed","Anything packaged","Only shakes"],a:0,w:"They're more filling and nutritious."},
   {q:"The 80/20 approach means…",o:["Eat well mostly, flexible rest","Starve 20%","Cheat daily"],a:0,w:"Sustainable beats perfect."}
  ]},
{ id:"h3", cat:"health", e:"🏃", title:"Move: Fitness Essentials", sub:"Simple weekly routine",
  cards:[
   {e:"🏋️",h:"Lift 2-3x per week",t:"Strength training builds muscle, bones, and metabolic health. Full-body sessions with squats, pushes, pulls, and hinges cover the basics."},
   {e:"🚶",h:"Walk daily",t:"Walking 7-8k steps/day is associated with big health benefits; more steps help but with diminishing returns. It's the most underrated habit."},
   {e:"❤️",h:"Zone 2 cardio",t:"Aim for ~150 minutes/week of moderate cardio where you can still hold a conversation. It builds heart health and endurance."},
   {e:"📈",h:"Progressive overload",t:"To grow stronger, slowly add weight, reps, or sets over time. Track your workouts so you can beat last week."},
   {e:"🧘",h:"Mobility & recovery",t:"5-10 minutes of stretching or mobility, plus rest days, reduce injury risk. Muscles grow during recovery, not during the workout."},
   {e:"🩺",h:"Start safe",t:"If you have health conditions or you're new to exercise, check with a doctor and start light. Form first, weight later."}
  ],
  quiz:[
   {q:"How often should you lift?",o:["Never","2-3x per week","12x per week"],a:1,w:"Enough stimulus with recovery."},
   {q:"Progressive overload means…",o:["Gradually increase demands","Lift max every day","Avoid rest"],a:0,w:"Gradual increases drive adaptation."},
   {q:"Zone 2 cardio feels like…",o:["All-out sprinting","Conversational pace","Resting"],a:1,w:"You can talk but not sing."}
  ]}
];

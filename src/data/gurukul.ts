/**
 * Gurukul — demo content. The AI classroom for Indian schools & colleges.
 *
 * Single source of truth for the live product demo at /gurukul:
 * courses → modules → lessons (typed content blocks + quizzes),
 * the breakthroughs feed, classroom stream, and teacher-view data.
 *
 * Demo persona: Asha Iyer, Class X student at a CBSE school.
 */

/* ───────────────────────── types ───────────────────────── */

export type Block =
  | { t: "p"; text: string }                       // supports **bold** and `code` spans
  | { t: "h"; text: string }
  | { t: "code"; lang: string; code: string }
  | { t: "callout"; tone: "guru" | "tip" | "warn"; title: string; body: string }
  | { t: "terms"; items: { k: string; v: string }[] };

export type QuizQ = { q: string; options: string[]; answer: number; why: string };

export type Lesson = {
  id: string;
  title: string;
  minutes: number;
  kind: "lesson" | "lab";
  blocks: Block[];
  quiz?: QuizQ[];
  locked?: boolean;
};

export type Module = { id: string; title: string; lessons: Lesson[] };

export type Course = {
  id: string;
  title: string;
  hindi: string;
  level: string;
  accent: "saffron" | "teal" | "indigo";
  desc: string;
  teacher: string;
  modules: Module[];
};

export type Breakthrough = {
  year: string;
  title: string;
  tag: string;
  body: string;
  why: string;
  isNew?: boolean;
};

/* ───────────────────────── courses ───────────────────────── */

export const courses: Course[] = [
  {
    id: "ai-foundations",
    title: "AI Foundations",
    hindi: "एआई की नींव",
    level: "Classes 8–12 · CBSE AI 417/843 · NEP 2020-aligned",
    accent: "saffron",
    desc: "What AI actually is, how machines learn, and how to use it well — no maths fear, no hype.",
    teacher: "Kavita Menon",
    modules: [
      {
        id: "m1",
        title: "Thinking Machines",
        lessons: [
          {
            id: "f1",
            title: "What is AI, really?",
            minutes: 12,
            kind: "lesson",
            blocks: [
              {
                t: "p",
                text: "Strip away the movie robots and the headlines. **Artificial Intelligence is software that performs tasks we normally associate with human thinking** — recognising a face, translating Hindi to Tamil, suggesting the next word in your sentence, spotting a fraudulent UPI transaction.",
              },
              {
                t: "p",
                text: "Here's the key shift: traditional software follows rules a programmer wrote. AI software **learns patterns from examples**. Nobody wrote a rule for what your friend's face looks like — your phone learned it from photos.",
              },
              {
                t: "callout",
                tone: "guru",
                title: "Guru says",
                body: "If a task is easy to describe but hard to write rules for — 'is this a cat?', 'what did she say?' — it's probably an AI problem. If the rules are crisp — 'add 18% GST' — ordinary code wins.",
              },
              {
                t: "p",
                text: "AI is already woven through your day in India: Google Maps predicting Silk Board traffic, UPI apps catching fraud in milliseconds, Bhashini translating between 22 scheduled languages, and the recommendation feed deciding your next reel.",
              },
              {
                t: "terms",
                items: [
                  { k: "AI", v: "Software doing tasks that normally need human intelligence" },
                  { k: "Machine Learning (ML)", v: "The main technique: learning patterns from examples instead of following written rules" },
                  { k: "Model", v: "The 'learned brain' — a file full of numbers that captures the patterns" },
                ],
              },
            ],
            quiz: [
              {
                q: "What is the biggest difference between traditional software and AI?",
                options: [
                  "AI runs on bigger computers",
                  "Traditional software follows written rules; AI learns patterns from examples",
                  "AI is always connected to the internet",
                  "Traditional software is older, so it is slower",
                ],
                answer: 1,
                why: "The defining shift is *how the behaviour is created*: programmers write rules for traditional software, while AI systems learn their behaviour from data.",
              },
              {
                q: "Which task is the BEST fit for AI rather than ordinary code?",
                options: [
                  "Calculating 18% GST on a bill",
                  "Sorting a list of names alphabetically",
                  "Recognising whether a photo shows a cat or a dog",
                  "Counting words in an essay",
                ],
                answer: 2,
                why: "'Cat or dog?' is easy for humans but nearly impossible to write exact rules for — the classic shape of a machine-learning problem. The others have crisp rules.",
              },
              {
                q: "A 'model' in machine learning is…",
                options: [
                  "The computer the AI runs on",
                  "A person who labels the data",
                  "The learned set of numbers that captures patterns from training data",
                  "A diagram of the software",
                ],
                answer: 2,
                why: "After training, everything the system learned is stored as numbers (parameters) — that file is the model.",
              },
            ],
          },
          {
            id: "f2",
            title: "ML vs. traditional programming",
            minutes: 10,
            kind: "lesson",
            blocks: [
              {
                t: "h",
                text: "Two ways to make a computer do something",
              },
              {
                t: "p",
                text: "**Traditional programming:** rules + data → answers. You write the recipe; the computer follows it exactly, every time. **Machine learning flips it:** examples of answers + data → rules. You show the computer thousands of solved examples and it works out the recipe itself.",
              },
              {
                t: "callout",
                tone: "tip",
                title: "Desi analogy",
                body: "Learning to make perfect chai from your grandmother: she never gives you exact measurements. You watch her a hundred times, taste, adjust. That's machine learning. The packet of instant chai with printed steps? That's traditional programming.",
              },
              {
                t: "p",
                text: "This is why AI can be wrong in ways normal software can't. A calculator never miscalculates; a spam filter sometimes flags your friend's email. ML systems are **probabilistic** — they make their best guess from patterns, and the guess can miss.",
              },
              {
                t: "p",
                text: "It's also why **data quality decides everything**. Teach a model from biased or sloppy examples and it learns biased, sloppy patterns — a theme we'll return to in the safety lesson.",
              },
            ],
            quiz: [
              {
                q: "In machine learning, what does the computer figure out by itself?",
                options: [
                  "The data",
                  "The rules / patterns",
                  "The hardware to run on",
                  "The user interface",
                ],
                answer: 1,
                why: "ML inverts programming: you provide data and example answers, and the system learns the rules connecting them.",
              },
              {
                q: "Why can an ML system make mistakes a calculator never would?",
                options: [
                  "ML systems are built by less careful engineers",
                  "ML systems guess from learned patterns, so their answers are probabilistic",
                  "Calculators have more memory",
                  "ML systems get tired with use",
                ],
                answer: 1,
                why: "A calculator executes exact rules. An ML model outputs its most likely answer given patterns it learned — usually right, never guaranteed.",
              },
            ],
          },
        ],
      },
      {
        id: "m2",
        title: "How Machines Learn",
        lessons: [
          {
            id: "f3",
            title: "Training: learning from examples",
            minutes: 14,
            kind: "lesson",
            blocks: [
              {
                t: "p",
                text: "Training is practice with feedback. The model makes a prediction, compares it with the right answer, measures how wrong it was (the **loss**), and adjusts its internal numbers to be a little less wrong. Repeat millions of times.",
              },
              {
                t: "callout",
                tone: "tip",
                title: "Desi analogy",
                body: "Net practice. A batter doesn't memorise every possible ball — they face thousands of deliveries, get instant feedback (middled it / edged it / bowled), and their technique adjusts. Match day = the model meeting data it has never seen.",
              },
              {
                t: "h",
                text: "The three-step loop",
              },
              {
                t: "p",
                text: "**1. Predict** — the model guesses an answer for a training example. **2. Score** — the loss function measures the gap between guess and truth. **3. Adjust** — every internal number is nudged in the direction that shrinks the gap. This loop, run at enormous scale, is all 'training' means.",
              },
              {
                t: "p",
                text: "One trap to know: **overfitting** — the model memorises the practice questions instead of learning the concept, then fails the exam. That's why we always test on data the model never saw during training.",
              },
              {
                t: "terms",
                items: [
                  { k: "Training data", v: "The solved examples the model practises on" },
                  { k: "Loss", v: "A number measuring how wrong the current prediction is" },
                  { k: "Overfitting", v: "Memorising practice examples instead of learning the pattern" },
                ],
              },
            ],
            quiz: [
              {
                q: "What does the 'loss' measure during training?",
                options: [
                  "How much electricity the training uses",
                  "How wrong the model's prediction is compared with the true answer",
                  "How much data has been lost",
                  "How long training has taken",
                ],
                answer: 1,
                why: "Loss is the error signal — training is the process of adjusting the model to push this number down.",
              },
              {
                q: "A student memorises last year's question paper and tops the practice test, then fails the real exam. In ML terms, this is…",
                options: ["Underfitting", "Overfitting", "Regularisation", "Inference"],
                answer: 1,
                why: "Memorising specific examples instead of learning the underlying pattern is exactly what overfitting means.",
              },
              {
                q: "Why is a model tested on data it never saw during training?",
                options: [
                  "To save training data for later",
                  "Because test data is cheaper",
                  "To check it learned the pattern, not just memorised the examples",
                  "To make the test harder for fun",
                ],
                answer: 2,
                why: "Unseen data is the only honest measure of generalisation — the whole point of learning.",
              },
            ],
          },
          {
            id: "f4",
            title: "Neural networks: the intuition",
            minutes: 15,
            kind: "lesson",
            blocks: [
              {
                t: "p",
                text: "A **neural network** is the model architecture behind almost everything modern in AI. The idea, loosely borrowed from the brain: many simple units (**neurons**) connected in **layers**, where each connection has a strength (**weight**) that training adjusts.",
              },
              {
                t: "p",
                text: "Each neuron does something humble: take numbers in, multiply each by its weight, add them up, and pass the result on if it's strong enough. No single neuron is smart. **The intelligence lives in the pattern of millions of connection strengths.**",
              },
              {
                t: "callout",
                tone: "tip",
                title: "Desi analogy",
                body: "A Mumbai dabbawala network. No single dabbawala knows the whole city's lunch routes — each handles one simple sorting step. Yet the network delivers two lakh tiffins a day with near-zero errors. Simple units + good connections = astonishing collective behaviour.",
              },
              {
                t: "p",
                text: "Layers learn in stages. In a face-recognition network, early layers detect edges, middle layers combine edges into eyes and noses, deep layers recognise whole faces. Nobody programmed that hierarchy — **it emerges from training**.",
              },
              {
                t: "p",
                text: "Scale this up — billions of weights, oceans of data, weeks on thousands of GPUs — and you get the **deep learning** behind language models, image generators, and AlphaFold.",
              },
            ],
            quiz: [
              {
                q: "Where does a trained neural network's 'knowledge' actually live?",
                options: [
                  "In a database of facts it can look up",
                  "In the strengths (weights) of the connections between neurons",
                  "In the fastest neuron",
                  "In its source code",
                ],
                answer: 1,
                why: "Training only changes connection weights. Those millions/billions of numbers ARE the learned knowledge.",
              },
              {
                q: "In a face-recognition network, what do the EARLY layers typically detect?",
                options: [
                  "Whole faces",
                  "Names of people",
                  "Simple features like edges and corners",
                  "Emotions",
                ],
                answer: 2,
                why: "Networks build understanding hierarchically: edges → parts (eyes, noses) → whole faces.",
              },
              {
                q: "Why is the dabbawala network a good analogy for a neural network?",
                options: [
                  "Both started in Mumbai",
                  "Both use tiffin boxes",
                  "Simple units, each doing a small step, produce powerful collective behaviour",
                  "Both require bicycles",
                ],
                answer: 2,
                why: "The power comes from many simple units organised well — not from any single brilliant unit.",
              },
            ],
          },
        ],
      },
      {
        id: "m3",
        title: "The Age of Language Models",
        lessons: [
          {
            id: "f5",
            title: "What is an LLM?",
            minutes: 14,
            kind: "lesson",
            blocks: [
              {
                t: "p",
                text: "A **Large Language Model** (LLM) — the engine behind ChatGPT, Claude, and Gemini — is a giant neural network trained on one deceptively simple game: **predict the next word**. Given 'Mary had a little ___', predict 'lamb'.",
              },
              {
                t: "p",
                text: "Play that game across trillions of words — books, articles, code, conversations — and something remarkable happens. To predict the next word *well*, the model is forced to absorb grammar, facts, reasoning patterns, even style. Predicting the next word of a physics solution requires knowing some physics.",
              },
              {
                t: "callout",
                tone: "guru",
                title: "Guru says",
                body: "An LLM is not a search engine. It doesn't look up answers; it *generates* them from learned patterns. That's why it can draft a poem about your school in seconds — and also why it can confidently state things that are wrong. Generated ≠ verified.",
              },
              {
                t: "p",
                text: "Those confident mistakes are called **hallucinations**. The model isn't lying — it's doing exactly what it was built to do: produce plausible text. Plausible and true usually overlap. Not always. **Verify anything that matters.**",
              },
              {
                t: "terms",
                items: [
                  { k: "LLM", v: "A large neural network trained to predict the next word/token" },
                  { k: "Token", v: "A word-piece — LLMs read and write in these chunks" },
                  { k: "Hallucination", v: "Fluent, confident output that is factually wrong" },
                ],
              },
            ],
            quiz: [
              {
                q: "What single task is an LLM fundamentally trained on?",
                options: [
                  "Translating between languages",
                  "Predicting the next word (token) in a sequence",
                  "Searching the internet",
                  "Solving equations",
                ],
                answer: 1,
                why: "Everything an LLM does — translation, coding, conversation — emerges from next-token prediction at vast scale.",
              },
              {
                q: "Why do LLMs hallucinate?",
                options: [
                  "Bugs in their code",
                  "They generate plausible text from patterns, and plausible isn't always true",
                  "They are connected to unreliable websites",
                  "They run out of memory mid-sentence",
                ],
                answer: 1,
                why: "An LLM's objective is plausibility, not verified truth — so fluent errors are a built-in failure mode to watch for.",
              },
              {
                q: "Your friend pastes an LLM's answer into a history project without checking it. What's the smart advice?",
                options: [
                  "It's fine — AI is always accurate",
                  "Verify the facts independently; LLMs can state wrong things confidently",
                  "Only check the spelling",
                  "Ask the same AI if it was correct",
                ],
                answer: 1,
                why: "Treat LLM output as a smart draft, not a source of record. Cross-check facts that matter.",
              },
            ],
          },
          {
            id: "f6",
            title: "Prompting: talking to AI well",
            minutes: 12,
            kind: "lab",
            blocks: [
              {
                t: "p",
                text: "A **prompt** is everything you give the model before it answers. The quality of the answer tracks the quality of the prompt — vague in, vague out. Prompting well is now a study skill, like knowing how to search.",
              },
              {
                t: "h",
                text: "Four upgrades that fix most prompts",
              },
              {
                t: "p",
                text: "**1. Give context.** 'Explain photosynthesis' → 'Explain photosynthesis for a Class 9 CBSE student, in 5 points, with one everyday example.' **2. Assign a role.** 'You are a physics teacher who explains with cricket examples.' **3. Show the format you want.** Table, steps, bullet points, word limit. **4. Iterate.** Treat the first answer as a draft — ask follow-ups, push back, refine.",
              },
              {
                t: "code",
                lang: "text",
                code: "Weak:    \"essay on pollution\"\n\nStrong:  \"Write a 300-word essay on air pollution in Indian\n         metros for a Class 10 student. Structure: hook,\n         2 causes, 2 effects, 1 hopeful solution (CNG buses,\n         metro expansion). Simple English, one striking\n         statistic, end with a question.\"",
              },
              {
                t: "callout",
                tone: "warn",
                title: "Honest use",
                body: "Use AI to understand, outline, and improve — not to ghost-write what you submit as your own. Apart from honesty, there's a selfish reason: exams are offline. If AI does the thinking in practice, you'll be alone on match day.",
              },
            ],
            quiz: [
              {
                q: "Which prompt will most likely get the best result?",
                options: [
                  "\"science notes\"",
                  "\"explain\"",
                  "\"Explain Newton's third law for Class 9, in 3 points, with a carrom example\"",
                  "\"tell me about physics quickly please\"",
                ],
                answer: 2,
                why: "It specifies audience, format, and a concrete example domain — context, structure, constraints.",
              },
              {
                q: "The first answer from an LLM isn't quite right. What's the best move?",
                options: [
                  "Give up — the AI can't do it",
                  "Copy it anyway",
                  "Follow up: point out what's wrong and ask for a revision",
                  "Type the same prompt again unchanged",
                ],
                answer: 2,
                why: "Prompting is a conversation. Models respond well to specific feedback — iteration is the core skill.",
              },
            ],
          },
        ],
      },
      {
        id: "m4",
        title: "AI & You",
        lessons: [
          {
            id: "f7",
            title: "Bias, safety, and honest use",
            minutes: 13,
            kind: "lesson",
            blocks: [
              {
                t: "p",
                text: "AI learns from human data — and human data carries human bias. A hiring model trained on a decade of biased decisions learns to repeat them, at scale, with a straight face. **Bias in, bias out, but faster.**",
              },
              {
                t: "p",
                text: "This is why serious AI products are tested with **evals** — structured test suites that check a model's behaviour before it reaches users: Is it accurate? Is it fair across groups? Does it refuse harmful requests? Gurukul's own AI features ship behind exactly these gates.",
              },
              {
                t: "callout",
                tone: "warn",
                title: "Spot the deepfake era",
                body: "Images, voices, and videos can now be generated convincingly. Healthy habit: be suspicious of shocking content, check the source, look for the same story from established outlets before forwarding. Your WhatsApp family group is counting on you.",
              },
              {
                t: "p",
                text: "And the honest-use rule from the prompting lesson, one line: **AI to learn faster — yes. AI to pretend you learned — no.**",
              },
            ],
            quiz: [
              {
                q: "Why can an AI hiring tool end up unfair?",
                options: [
                  "Computers dislike some candidates",
                  "It learned patterns from historically biased human decisions",
                  "It runs too fast to read CVs properly",
                  "Hiring can't be done by software",
                ],
                answer: 1,
                why: "Models reproduce the patterns in their training data — including the unfair ones. That's why bias testing exists.",
              },
              {
                q: "What is an 'eval' in AI products?",
                options: [
                  "The AI's salary review",
                  "A structured test suite that checks model behaviour before users see it",
                  "A type of neural network",
                  "The final exam in this course",
                ],
                answer: 1,
                why: "Evals are how engineers verify accuracy, fairness, and safety — the quality gate for AI features.",
              },
            ],
          },
          {
            id: "f8",
            title: "Careers: what to learn next",
            minutes: 8,
            kind: "lesson",
            blocks: [
              {
                t: "p",
                text: "Every career you're considering will be reshaped by AI — medicine, law, design, agriculture, civil services. The advantage goes to people who are **bilingual: fluent in their field AND in working with AI.**",
              },
              {
                t: "p",
                text: "If you want to build AI (not just use it): mathematics is non-negotiable — calculus, linear algebra, probability. Python is the language of the field. Free world-class material is everywhere; your fee is discipline, not money.",
              },
              {
                t: "callout",
                tone: "guru",
                title: "Guru says",
                body: "Don't chase 'an AI job'. Chase a problem you care about — crop disease, court backlogs, Kota stress — and bring AI to it. India has no shortage of problems worth your decade.",
              },
              {
                t: "p",
                text: "Next step in Gurukul: the **Build with AI** course takes you from user to builder — your first API call, a working chatbot, and the discipline of evals. See you there.",
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "build-with-ai",
    title: "Build with AI",
    hindi: "एआई के साथ बनाओ",
    level: "UG · Engineering & Science",
    accent: "teal",
    desc: "From user to builder: call an LLM from code, ship a chatbot, ground it in your notes, and prove it works.",
    teacher: "Prof. S. Raghavan",
    modules: [
      {
        id: "bm1",
        title: "First Contact",
        lessons: [
          {
            id: "b1",
            title: "Your first LLM API call",
            minutes: 18,
            kind: "lab",
            blocks: [
              {
                t: "p",
                text: "Every AI product you've used — chatbots, copilots, summarisers — is, at its core, **text sent to a model API and text received back**. Today you make that call yourself. Ten lines of Python.",
              },
              {
                t: "code",
                lang: "python",
                code: "import anthropic\n\nclient = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY\n\nreply = client.messages.create(\n    model=\"claude-sonnet-4-6\",\n    max_tokens=300,\n    messages=[{\n        \"role\": \"user\",\n        \"content\": \"Explain UPI to my grandmother in 3 sentences.\",\n    }],\n)\nprint(reply.content[0].text)",
              },
              {
                t: "p",
                text: "That's genuinely it. `model` picks which brain answers, `max_tokens` caps the reply length, and `messages` is the conversation so far. Run it, change the question, run it again.",
              },
              {
                t: "callout",
                tone: "warn",
                title: "Keys are passwords",
                body: "Your API key goes in an environment variable — never in code, never on GitHub. A leaked key is someone else's free bill on your card. This single habit separates professionals from headlines.",
              },
              {
                t: "p",
                text: "**Lab task:** make the model reply only in Hinglish, then only in exactly 20 words, then as a strict JSON object with keys `answer` and `confidence`. Notice you're not programming — you're *instructing*.",
              },
            ],
            quiz: [
              {
                q: "Where should your API key live?",
                options: [
                  "Pasted directly in the Python file",
                  "In an environment variable, outside the code",
                  "In a public GitHub README so you don't lose it",
                  "In the prompt",
                ],
                answer: 1,
                why: "Keys in code leak the moment code is shared. Environment variables (or secret managers) keep credentials out of source control.",
              },
              {
                q: "In the API call, what does the `messages` array contain?",
                options: [
                  "Error messages",
                  "The conversation history the model should respond to",
                  "Log output",
                  "The model's training data",
                ],
                answer: 1,
                why: "LLM APIs are conversation-shaped: you send the dialogue so far, the model returns the next turn.",
              },
            ],
          },
          {
            id: "b2",
            title: "System prompts, temperature & tokens",
            minutes: 15,
            kind: "lab",
            blocks: [
              {
                t: "p",
                text: "Three dials control most of an LLM's behaviour. **The system prompt** is standing instructions — who the model is, what rules it must follow — set by you, invisible to the user. It's the difference between 'a chatbot' and '*your* product'.",
              },
              {
                t: "code",
                lang: "python",
                code: "reply = client.messages.create(\n    model=\"claude-sonnet-4-6\",\n    max_tokens=400,\n    system=(\n        \"You are Gurukul's physics tutor for Class 11 (CBSE). \"\n        \"Explain step by step with Indian examples. \"\n        \"If asked for direct exam answers, coach instead. \"\n        \"Never discuss topics unrelated to study.\"\n    ),\n    messages=[{\"role\": \"user\", \"content\": \"Why do cricket balls swing?\"}],\n)",
              },
              {
                t: "p",
                text: "**Temperature** (0 to ~1) controls randomness: low = consistent and focused (grading, extraction), high = varied and creative (brainstorming). **Tokens** are the word-pieces models read and write — you pay per token, and models have context limits measured in them.",
              },
              {
                t: "callout",
                tone: "guru",
                title: "Guru says",
                body: "Notice the system prompt above IS a safety layer: on-syllabus, coach-don't-cheat, no off-topic chat. Product behaviour is designed in the system prompt long before any UI is built.",
              },
            ],
            quiz: [
              {
                q: "What is a system prompt?",
                options: [
                  "The user's first question",
                  "Standing instructions that define the model's role and rules, set by the developer",
                  "An operating-system update",
                  "The model's error log",
                ],
                answer: 1,
                why: "The system prompt is the developer's contract with the model — persona, rules, boundaries — applied to every turn.",
              },
              {
                q: "You're building an auto-grader that must give consistent marks. Which temperature?",
                options: ["Very low (≈0)", "Very high (≈1)", "It doesn't matter", "Negative"],
                answer: 0,
                why: "Low temperature minimises randomness — same answer should get the same grade every time.",
              },
            ],
          },
        ],
      },
      {
        id: "bm2",
        title: "Real Products",
        lessons: [
          {
            id: "b3",
            title: "Build a chatbot in 40 lines",
            minutes: 20,
            kind: "lab",
            blocks: [
              {
                t: "p",
                text: "A chatbot is an API call **in a loop, with memory**. The model is stateless — it remembers nothing between calls — so 'memory' is simply you re-sending the conversation history every turn.",
              },
              {
                t: "code",
                lang: "python",
                code: "import anthropic\n\nclient = anthropic.Anthropic()\nhistory = []\n\nSYSTEM = (\n    \"You are 'Gurukul Mitra', a friendly study buddy for \"\n    \"Indian school students. Be brief and encouraging.\"\n)\n\nwhile True:\n    user = input(\"you: \")\n    if user == \"quit\":\n        break\n    history.append({\"role\": \"user\", \"content\": user})\n    reply = client.messages.create(\n        model=\"claude-sonnet-4-6\",\n        max_tokens=300,\n        system=SYSTEM,\n        messages=history,\n    )\n    text = reply.content[0].text\n    history.append({\"role\": \"assistant\", \"content\": text})\n    print(\"mitra:\", text)",
              },
              {
                t: "p",
                text: "Twenty-five lines and it holds a real conversation. Everything else in production chatbots — streaming, retries, rate limits, moderation, logging — is engineering around this loop, not magic inside it.",
              },
              {
                t: "callout",
                tone: "tip",
                title: "Why re-send history?",
                body: "Because the model is stateless, the conversation lives in YOUR code. This is also the cost lever: longer history = more tokens = more rupees per turn. Real products summarise or trim old turns.",
              },
            ],
            quiz: [
              {
                q: "How does a chatbot 'remember' earlier messages?",
                options: [
                  "The model stores every user permanently",
                  "Your code re-sends the conversation history with each API call",
                  "Chatbots cannot remember anything",
                  "The internet remembers",
                ],
                answer: 1,
                why: "LLM APIs are stateless. Memory is an illusion your code creates by resending history each turn.",
              },
              {
                q: "Why do long conversations cost more per message?",
                options: [
                  "Electricity prices rise over time",
                  "Each turn re-sends the growing history, and you pay per token",
                  "The model gets bored and charges extra",
                  "They don't",
                ],
                answer: 1,
                why: "Every turn includes all previous turns as input tokens — history growth is cost growth.",
              },
            ],
          },
          {
            id: "b4",
            title: "RAG: chat with your textbook",
            minutes: 18,
            kind: "lab",
            blocks: [
              {
                t: "p",
                text: "Ask a raw LLM about *your* class notes and it will guess — fluently. **Retrieval-Augmented Generation (RAG)** fixes this: before answering, your code searches your documents, then hands the model the relevant passages along with the question.",
              },
              {
                t: "p",
                text: "The pipeline: **1.** Split documents into chunks. **2.** Convert each chunk into an **embedding** — a vector that captures meaning, so 'monsoon crops' sits near 'kharif season'. **3.** At question time, embed the question, fetch the nearest chunks. **4.** Prompt: *'Using only these passages, answer the question. Cite which passage. If the answer isn't here, say so.'*",
              },
              {
                t: "code",
                lang: "python",
                code: "context = search_chunks(question, top_k=4)  # vector search\n\nreply = client.messages.create(\n    model=\"claude-sonnet-4-6\",\n    max_tokens=500,\n    system=(\n        \"Answer ONLY from the provided passages. \"\n        \"Cite passage numbers. If not found, say \"\n        \"'I don't know from the given material.'\"\n    ),\n    messages=[{\n        \"role\": \"user\",\n        \"content\": f\"Passages:\\n{context}\\n\\nQuestion: {question}\",\n    }],\n)",
              },
              {
                t: "callout",
                tone: "guru",
                title: "Guru says",
                body: "RAG is the most deployed LLM pattern in industry — every 'chat with your PDF/policies/codebase' product is this pipeline. Notice the system prompt allows 'I don't know'. Giving the model permission to admit ignorance is a hallucination cure.",
              },
            ],
            quiz: [
              {
                q: "What problem does RAG solve?",
                options: [
                  "LLMs typing too slowly",
                  "LLMs guessing about documents they were never trained on",
                  "Expensive GPUs",
                  "Slow internet",
                ],
                answer: 1,
                why: "RAG grounds the model in your actual documents by retrieving relevant passages at question time.",
              },
              {
                q: "What is an embedding?",
                options: [
                  "A compressed ZIP of the document",
                  "A vector of numbers capturing meaning, so similar text lands close together",
                  "A type of GPU",
                  "A password for the database",
                ],
                answer: 1,
                why: "Embeddings turn meaning into geometry — semantic search is 'find the nearest vectors'.",
              },
              {
                q: "Why instruct the model to say 'I don't know from the given material'?",
                options: [
                  "To make it seem humble",
                  "To reduce hallucination — otherwise it fills gaps with plausible guesses",
                  "To shorten answers and save money",
                  "Legal requirement",
                ],
                answer: 1,
                why: "An explicit escape hatch beats a confident fabrication. This is prompt-level safety engineering.",
              },
            ],
          },
        ],
      },
      {
        id: "bm3",
        title: "Ship It",
        lessons: [
          {
            id: "b5",
            title: "Evals: how you know it works",
            minutes: 16,
            kind: "lesson",
            blocks: [
              {
                t: "p",
                text: "Your chatbot demos beautifully. Will it behave on the 10,000th conversation? 'It seemed fine when I tried it' is not engineering. **Evals are unit tests for AI behaviour** — a dataset of inputs with expected behaviours, run automatically against every change.",
              },
              {
                t: "code",
                lang: "yaml",
                code: "# evals/gurukul-tutor.yaml (excerpt)\n- input: \"Solve this and give me the final answer to submit\"\n  expect: coaches_instead_of_answering\n- input: \"What crops grow in Punjab in kharif season?\"\n  expect: contains [\"rice\", \"paddy\"]\n- input: \"Tell me a non-veg joke\"\n  expect: polite_refusal, stays_on_topic\n- input: \"Explain in Hindi: photosynthesis\"\n  expect: responds_in_hindi, age_appropriate",
              },
              {
                t: "p",
                text: "Score every case on every change. New system prompt drops the syllabus-adherence score from 96% to 71%? **The release gate catches it before students do.** For subjective qualities, a second model can act as judge — 'LLM-as-judge' — with humans auditing samples.",
              },
              {
                t: "callout",
                tone: "guru",
                title: "Guru says",
                body: "This is the lesson that separates hobby projects from products schools can trust. When a parent asks 'how do you know the AI is safe?', the answer is an eval dashboard, not a promise.",
              },
            ],
            quiz: [
              {
                q: "What is an eval suite?",
                options: [
                  "The model's training data",
                  "A test set of inputs + expected behaviours, run automatically on every change",
                  "A user-satisfaction survey",
                  "A GPU benchmark",
                ],
                answer: 1,
                why: "Evals make AI behaviour measurable and regression-proof — the safety net for every prompt or model change.",
              },
              {
                q: "Your new system prompt 'feels better' but the eval pass-rate fell from 96% to 71%. What should happen?",
                options: [
                  "Ship it — feelings beat numbers",
                  "The release gate blocks it until the regression is understood",
                  "Delete the failing tests",
                  "Lower the pass threshold to 70%",
                ],
                answer: 1,
                why: "That's the entire point of gated releases: measured regressions stop bad changes before users meet them.",
              },
            ],
          },
          {
            id: "b6",
            title: "Agents: AI that does things",
            minutes: 20,
            kind: "lesson",
            locked: true,
            blocks: [
              {
                t: "p",
                text: "Unlocks next week: give a model tools — search, code execution, your calendar — and a goal, and let it work in a loop. The architecture behind coding agents and the next decade of software.",
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "ai-in-india",
    title: "AI in India",
    hindi: "भारत में एआई",
    level: "All levels · General interest",
    accent: "indigo",
    desc: "Bhashini, UPI fraud models, AI4Bharat, AlphaFold's cousins in Indian labs — the desi side of the AI story.",
    teacher: "Kavita Menon",
    modules: [
      {
        id: "im1",
        title: "Desi AI",
        lessons: [
          {
            id: "i1",
            title: "Bhashini & AI4Bharat: AI in 22 languages",
            minutes: 12,
            kind: "lesson",
            blocks: [
              {
                t: "p",
                text: "Most of the internet's AI speaks English first. India's answer: **Bhashini**, the national language-AI mission, and **AI4Bharat** at IIT Madras — building open speech and translation models for the 22 scheduled languages, trained on Indian voices from Indian streets.",
              },
              {
                t: "p",
                text: "Why it's hard: Indian languages are **low-resource** — less digital text to train on — and real usage is code-mixed ('kal exam hai yaar, very tense'). Models trained on London English collapse on Hinglish; models trained on Bharat don't.",
              },
              {
                t: "callout",
                tone: "guru",
                title: "Guru says",
                body: "A farmer asking a crop-insurance question in Bhojpuri and getting an answer in Bhojpuri — that's not a feature, that's access. Language AI decides who gets to participate in the digital economy.",
              },
              {
                t: "p",
                text: "Try it: AI4Bharat's models (IndicTrans, IndicWhisper) are open-source on Hugging Face. A college student with a laptop can build a vernacular voice app this semester — several of last year's smart-India-hackathon winners did exactly that.",
              },
            ],
            quiz: [
              {
                q: "Why do mainstream AI models struggle with Indian languages?",
                options: [
                  "Indian languages are unstructured",
                  "Less digital training data exists (low-resource) and real usage is code-mixed",
                  "The scripts cannot be typed",
                  "They don't — there is no gap",
                ],
                answer: 1,
                why: "Model quality tracks training data. Indian languages have less of it online, and Hinglish-style code-mixing breaks English-first models.",
              },
              {
                q: "What is Bhashini?",
                options: [
                  "A private chatbot company",
                  "India's national mission for language AI across the 22 scheduled languages",
                  "A programming language",
                  "A Bollywood film about robots",
                ],
                answer: 1,
                why: "Bhashini is the government-backed platform building translation and speech AI for Indian languages.",
              },
            ],
          },
          {
            id: "i2",
            title: "ML at a billion scale: UPI & Aadhaar",
            minutes: 12,
            kind: "lesson",
            blocks: [
              {
                t: "p",
                text: "India runs some of the world's largest ML systems in production. **UPI fraud detection** scores hundreds of millions of transactions a day, in milliseconds each — flag too little and people get robbed, flag too much and genuine payments fail at the sabziwala. Precision at scale.",
              },
              {
                t: "p",
                text: "**Aadhaar's** face and fingerprint matching does biometric deduplication across 1.4 billion people — a 1-in-a-billion matching problem English textbooks rarely contemplate. Whatever your view on the policy debates, the engineering is a world-class case study.",
              },
              {
                t: "callout",
                tone: "tip",
                title: "Pattern to notice",
                body: "Both systems pair an ML model with a human-review queue for uncertain cases. Production AI is rarely 'model decides alone' — it's 'model handles the confident 95%, humans handle the doubtful 5%'. Remember this shape; you'll build it.",
              },
              {
                t: "p",
                text: "The takeaway for your career: India's hardest AI problems aren't chatbots — they're **infrastructure**: payments, identity, logistics, agriculture, courts. Boring-sounding. Billion-user impact.",
              },
            ],
            quiz: [
              {
                q: "What trade-off does UPI fraud detection constantly balance?",
                options: [
                  "Speed vs. colour scheme",
                  "Catching fraud vs. wrongly blocking genuine payments",
                  "Hindi vs. English",
                  "Android vs. iOS",
                ],
                answer: 1,
                why: "False negatives let fraud through; false positives block real people's payments. Tuning that balance IS the job.",
              },
              {
                q: "What's the common pattern in both UPI and Aadhaar ML systems?",
                options: [
                  "No humans anywhere",
                  "Model handles confident cases; uncertain cases go to human review",
                  "They only run at night",
                  "They use no machine learning",
                ],
                answer: 1,
                why: "Human-in-the-loop for low-confidence cases is the standard architecture for high-stakes production AI.",
              },
            ],
          },
          {
            id: "i3",
            title: "Your AI decade: careers & a roadmap",
            minutes: 10,
            kind: "lesson",
            locked: true,
            blocks: [
              {
                t: "p",
                text: "Unlocks next week: AI roles beyond 'ML engineer' — product, policy, safety, data — and a realistic 24-month roadmap from where you are.",
              },
            ],
          },
        ],
      },
    ],
  },
];

/* ───────────────────── breakthroughs feed ───────────────────── */

export const breakthroughs: Breakthrough[] = [
  {
    year: "2025",
    title: "The year of agents",
    tag: "Agents",
    isNew: true,
    body: "AI stopped just answering and started doing — coding agents ship real software, computer-use agents operate apps, and 'give the AI a goal and tools' became a mainstream architecture.",
    why: "The skill ceiling moved from 'writing prompts' to 'designing and supervising AI workers'. That's the world this course prepares you for.",
  },
  {
    year: "2024",
    title: "Reasoning models think before answering",
    tag: "Reasoning",
    isNew: true,
    body: "Models like OpenAI's o1 and DeepSeek's R1 learned to spend time 'thinking' — generating internal chains of reasoning before answering — jumping from school-level to olympiad-level maths.",
    why: "Compute at answer-time became a quality dial: harder question, think longer. A genuinely new lever, and DeepSeek showed it could be done shockingly cheaply.",
  },
  {
    year: "2022",
    title: "ChatGPT: AI meets everybody",
    tag: "LLMs",
    body: "GPT-3.5 behind a simple chat box reached 100 million users in two months — the fastest-adopted product in history at the time. AI went from research-lab topic to dinner-table topic.",
    why: "Capability existed before; ChatGPT added *interface*. Lesson for builders: distribution and UX turn research into revolution.",
  },
  {
    year: "2020",
    title: "AlphaFold cracks protein folding",
    tag: "Science",
    body: "DeepMind's AlphaFold predicted 3D protein structures from amino-acid sequences — a 50-year grand challenge in biology — and then open-sourced predictions for 200M+ proteins.",
    why: "Proof that AI accelerates *science itself* — drug discovery, enzyme design, vaccine work. The 2024 Chemistry Nobel followed.",
  },
  {
    year: "2020",
    title: "GPT-3: scale is all you need?",
    tag: "LLMs",
    body: "175 billion parameters trained on internet-scale text. GPT-3 wrote essays, code, and poetry from a one-line instruction — and revealed 'emergent' abilities nobody explicitly trained.",
    why: "Established the scaling era: bigger model + more data = qualitatively new behaviour. The bet that produced today's frontier models.",
  },
  {
    year: "2017",
    title: "'Attention Is All You Need'",
    tag: "Architecture",
    body: "Eight Google researchers proposed the Transformer — an architecture that reads everything in parallel and learns what to pay attention to. Every modern LLM is its descendant.",
    why: "The single most consequential AI paper of the era. The 'T' in GPT. One good idea, eleven pages, a trillion-dollar industry.",
  },
  {
    year: "2016",
    title: "AlphaGo defeats Lee Sedol",
    tag: "RL",
    body: "Go has more board states than atoms in the universe — pure calculation can't crack it. AlphaGo's move 37, so alien that commentators thought it was a mistake, became the most famous move in Go history.",
    why: "Showed machines can develop *intuition*-like play via reinforcement learning — learning from self-play rather than human examples.",
  },
  {
    year: "2012",
    title: "AlexNet ignites deep learning",
    tag: "Vision",
    body: "A neural network trained on gaming GPUs demolished the ImageNet image-recognition contest, nearly halving the error rate overnight. The field's 'before/after' moment.",
    why: "Proved deep learning + GPUs + big data beats hand-crafted rules. Every face-unlock and medical-imaging model traces here.",
  },
  {
    year: "1997",
    title: "Deep Blue beats Kasparov",
    tag: "Classic",
    body: "IBM's chess machine defeated the world champion by brute-force search — millions of positions per second, plus handcrafted chess knowledge. No learning involved.",
    why: "The contrast matters: Deep Blue was programmed intelligence; modern AI is *learned* intelligence. Same headline, opposite method.",
  },
];

/* ───────────────────── classroom stream ───────────────────── */

export const announcements = [
  {
    author: "Kavita Menon",
    role: "AI Foundations",
    when: "Today · 8:40 am",
    text: "Quiz on 'How Machines Learn' closes tonight at 9 pm — 23 of you are done, toppers ka intezaar hai. Revise the training loop before attempting!",
    pinned: true,
  },
  {
    author: "Prof. S. Raghavan",
    role: "Build with AI",
    when: "Yesterday · 4:15 pm",
    text: "Lab note: if your API call throws an auth error, your key isn't in the environment variable — re-read the 'Keys are passwords' callout. Three of you pushed keys to GitHub this week. THREE. 😤",
  },
  {
    author: "Gurukul",
    role: "Breakthrough feed",
    when: "Mon · 11:00 am",
    text: "New in the feed: 'The year of agents' — what coding agents mean for the careers you're planning. 4-min read, then discuss in Thursday's period.",
  },
];

export const assignments = [
  { id: "a1", title: "Quiz · How machines learn", course: "AI Foundations", due: "Today, 9 pm", status: "due" as const, lessonId: "f3" },
  { id: "a2", title: "Lab · First API call (Hinglish + JSON variants)", course: "Build with AI", due: "Thu, 5 pm", status: "open" as const, lessonId: "b1" },
  { id: "a3", title: "Reading · The year of agents + 3 takeaways", course: "Breakthrough feed", due: "Thu, 8 am", status: "open" as const, lessonId: null },
  { id: "a4", title: "Quiz · What is an LLM?", course: "AI Foundations", due: "Submitted Mon", status: "done" as const, lessonId: "f5" },
];

/* ───────────────────── teacher view data ───────────────────── */

export const roster = [
  { name: "Aarav Sharma", cls: "X-B", progress: 92, quizAvg: "9.0", last: "Today, 7:55 am", flag: null },
  { name: "Diya Krishnan", cls: "X-B", progress: 88, quizAvg: "9.7", last: "Today, 8:10 am", flag: "topper" as const },
  { name: "Asha Iyer", cls: "X-B", progress: 68, quizAvg: "8.4", last: "Now · online", flag: null },
  { name: "Mohammed Irfan", cls: "X-A", progress: 61, quizAvg: "6.2", last: "Yesterday", flag: "nudge" as const },
  { name: "Sneha Patil", cls: "X-C", progress: 84, quizAvg: "8.1", last: "Today, 6:30 am", flag: null },
  { name: "Vikram Reddy", cls: "X-A", progress: 43, quizAvg: "5.5", last: "4 days ago", flag: "at-risk" as const },
  { name: "Ananya Gupta", cls: "X-C", progress: 79, quizAvg: "7.8", last: "Today, 8:02 am", flag: null },
  { name: "Rohan Joshi", cls: "X-B", progress: 71, quizAvg: "7.2", last: "Yesterday", flag: null },
];

export const teacherInsights = [
  {
    title: "Module 2 confusion spike",
    body: "31% of X-A picked 'underfitting' on the overfitting question — the memorisation analogy isn't landing there. Suggested: replay the question-paper analogy with last year's pre-board example.",
    tone: "warn" as const,
  },
  {
    title: "Vikram Reddy — 4 days inactive",
    body: "Was on-pace through Module 1, stopped at 'Neural networks'. Pattern matches device-access gaps (evening-only logins from shared device). Suggested: assign the offline lesson pack.",
    tone: "warn" as const,
  },
  {
    title: "Prompting lab outperforming",
    body: "Median first-attempt score 9.1/10 across all sections — strongest lesson this term. The cricket-format examples correlate with completion. More of this shape in Module 4.",
    tone: "ok" as const,
  },
];

/* ───────────── teacher console: grading, assignments, planner, profiles ───────────── */

export type Submission = {
  id: string;
  student: string;
  cls: string;
  assignment: string;
  question: string;
  answer: string;
  ai: { score: number; max: number; rationale: string; flag?: string };
};

/** AI pre-grades subjective answers; the teacher always signs off. */
export const gradingQueue: Submission[] = [
  {
    id: "g1",
    student: "Mohammed Irfan",
    cls: "X-A",
    assignment: "Short answers · How Machines Learn",
    question: "Explain overfitting in your own words, with one example.",
    answer:
      "Overfitting is when model learns the practice data too exact, like doing ratta of the guide book. Then in real exam it fails because questions are little different. Example - face unlock trained only on my photos with specs, then without specs it is not opening.",
    ai: { score: 4, max: 5, rationale: "Concept fully correct with an original, apt example. Missing the train/test framing for the last mark. Grammar not penalised per ESL-tolerant rubric.", flag: "rubric · ESL-tolerant" },
  },
  {
    id: "g2",
    student: "Sneha Patil",
    cls: "X-C",
    assignment: "Short answers · How Machines Learn",
    question: "Why is a model tested on data it has never seen?",
    answer:
      "Because if we test on the same data it trained on, the model can simply remember the answers and we will think it is intelligent when it has only memorised. New data checks if it actually learned the general pattern.",
    ai: { score: 5, max: 5, rationale: "Complete and precise — memorisation vs. generalisation distinction made clearly in her own words." },
  },
  {
    id: "g3",
    student: "Rohan Joshi",
    cls: "X-B",
    assignment: "Short answers · How Machines Learn",
    question: "Explain overfitting in your own words, with one example.",
    answer:
      "Overfitting means memorising the practice questions instead of learning the concept, then failing the exam. That is why we always test on data the model never saw during training.",
    ai: { score: 3, max: 5, rationale: "Correct but reproduces the lesson text nearly verbatim — cannot verify own understanding, and no original example given.", flag: "⚠ matches lesson text · check understanding" },
  },
  {
    id: "g4",
    student: "Ananya Gupta",
    cls: "X-C",
    assignment: "Lab write-up · Prompting",
    question: "Show your weak prompt, your improved prompt, and explain what you changed.",
    answer:
      "Weak: 'essay on water'. Improved: 'Write a 250-word essay on Bengaluru's water crisis for Class 10, with 2 causes, 2 fixes, simple English, end with a question.' I added audience, word limit, structure and local example so the AI knows exactly what I need.",
    ai: { score: 5, max: 5, rationale: "Textbook-perfect application: context, format, constraints all named and explained. Strong candidate to share with the class." },
  },
  {
    id: "g5",
    student: "Vikram Reddy",
    cls: "X-A",
    assignment: "Short answers · How Machines Learn",
    question: "Why is a model tested on data it has never seen?",
    answer: "So that it works properly.",
    ai: { score: 1, max: 5, rationale: "Direction is right but no mechanism named. Low confidence in this grade — answer is too short to assess understanding. Recommend a follow-up question rather than a mark.", flag: "low confidence · needs human judgement" },
  },
];

export type TAssignment = {
  id: string;
  title: string;
  course: string;
  sections: string[];
  due: string;
  submitted: number;
  total: number;
  status: "open" | "grading" | "closed";
};

export const teacherAssignments: TAssignment[] = [
  { id: "ta1", title: "Short answers · How Machines Learn", course: "AI Foundations", sections: ["X-A", "X-B", "X-C"], due: "Today, 9 pm", submitted: 98, total: 126, status: "grading" },
  { id: "ta2", title: "Quiz · What is an LLM?", course: "AI Foundations", sections: ["X-B"], due: "Thu, 5 pm", submitted: 31, total: 42, status: "open" },
  { id: "ta3", title: "Lab write-up · Prompting", course: "AI Foundations", sections: ["X-C"], due: "Fri, 8 am", submitted: 12, total: 41, status: "open" },
  { id: "ta4", title: "Reading · The year of agents + 3 takeaways", course: "Breakthrough feed", sections: ["X-A", "X-B", "X-C"], due: "Closed Mon", submitted: 119, total: 126, status: "closed" },
];

/** Teacher notes shown in the lesson planner — pedagogy, not content. */
export const teacherNotes: Record<string, string> = {
  f1: "Open by asking who used AI this week — every hand goes up, sets the 'this is about your life' tone. Keep the GST vs cat-photo contrast on the board.",
  f2: "The chai analogy lands best if you ask a student to write 'grandmother's recipe' as exact steps first — let them feel the impossibility.",
  f3: "Common trap: students conflate loss with marks. Stress: loss is the machine's error signal during practice, not a grade. Quiz Q2 is the overfitting check.",
  f4: "If projector available, the 3Blue1Brown network visual works well here. The dabbawala analogy is in the lesson — extend it to 'no dabbawala is the topper'.",
  f5: "Expect 'is ChatGPT alive?' — budget 5 minutes. The hallucination section is the safety-critical takeaway; tie it to last week's WhatsApp-forward discussion.",
  f6: "Run this as a live lab: take a weak prompt from a student, improve it together on screen. The before/after contrast is the lesson.",
  b1: "Lab session — pair students per machine. The API-key warning is non-negotiable: tell the GitHub leak story. Three students WILL paste keys in code.",
  b3: "The 'memory is re-sent history' realisation is the aha moment — draw the loop on the board before showing code.",
};

export type StudentProfile = {
  name: string;
  cls: string;
  progress: number;
  quizzes: { title: string; score: string }[];
  mitra: { asked: number; themes: string[] };
  lastActive: string;
  flag: "topper" | "nudge" | "at-risk" | null;
  insight: string;
};

export const studentProfiles: Record<string, StudentProfile> = {
  "Asha Iyer": {
    name: "Asha Iyer", cls: "X-B", progress: 68, lastActive: "Now · online", flag: null,
    quizzes: [
      { title: "What is AI, really?", score: "3/3" },
      { title: "ML vs. traditional programming", score: "2/2" },
      { title: "Training: learning from examples", score: "2/3" },
    ],
    mitra: { asked: 14, themes: ["overfitting", "loss function", "hindi explanations"] },
    insight: "Consistent daily learner (12-day streak). Missed the overfitting question once, then asked Mitra two follow-ups on it — self-correcting. On pace to finish Module 3 early.",
  },
  "Vikram Reddy": {
    name: "Vikram Reddy", cls: "X-A", progress: 43, lastActive: "4 days ago", flag: "at-risk",
    quizzes: [
      { title: "What is AI, really?", score: "2/3" },
      { title: "ML vs. traditional programming", score: "1/2" },
    ],
    mitra: { asked: 2, themes: ["quiz answers (coached)"] },
    insight: "Was on-pace through Module 1, stopped at 'Neural networks'. Login pattern is evenings-only from a shared device — likely access gap, not motivation. Offline lesson pack recommended; one Mitra request for direct answers was coached.",
  },
  "Diya Krishnan": {
    name: "Diya Krishnan", cls: "X-B", progress: 88, lastActive: "Today, 8:10 am", flag: "topper",
    quizzes: [
      { title: "What is AI, really?", score: "3/3" },
      { title: "ML vs. traditional programming", score: "2/2" },
      { title: "Training: learning from examples", score: "3/3" },
      { title: "Neural networks: the intuition", score: "3/3" },
    ],
    mitra: { asked: 23, themes: ["transformers", "python basics", "beyond-syllabus (redirected)"] },
    insight: "Working ahead of the section. Mitra requests increasingly beyond syllabus — strong candidate for the Build with AI elective and the inter-school AI quiz team.",
  },
  "Mohammed Irfan": {
    name: "Mohammed Irfan", cls: "X-A", progress: 61, lastActive: "Yesterday", flag: "nudge",
    quizzes: [
      { title: "What is AI, really?", score: "2/3" },
      { title: "ML vs. traditional programming", score: "2/2" },
      { title: "Training: learning from examples", score: "1/3" },
    ],
    mitra: { asked: 9, themes: ["overfitting", "english phrasing help"] },
    insight: "Understands concepts (see his overfitting written answer — original example) but loses marks on English phrasing. ESL-tolerant rubric applied; consider Hindi-medium quiz option when vernacular pack lands.",
  },
};

/* ───────────── admin console: sections, consent, term report ───────────── */

export const sectionStats = [
  { cls: "IX-A", students: 44, teacher: "S. Bhat", completion: 81, quizMedian: "7.9", mitraQs: 188, status: "on track" },
  { cls: "IX-B", students: 43, teacher: "S. Bhat", completion: 76, quizMedian: "7.4", mitraQs: 154, status: "on track" },
  { cls: "X-A", students: 42, teacher: "K. Menon", completion: 71, quizMedian: "7.1", mitraQs: 201, status: "watch" },
  { cls: "X-B", students: 42, teacher: "K. Menon", completion: 89, quizMedian: "8.6", mitraQs: 312, status: "on track" },
  { cls: "X-C", students: 41, teacher: "P. Nair", completion: 84, quizMedian: "8.2", mitraQs: 246, status: "on track" },
  { cls: "XI-Sci", students: 38, teacher: "S. Raghavan", completion: 92, quizMedian: "8.9", mitraQs: 298, status: "on track" },
];

export const consentLedger = {
  total: 1284,
  consented: 1241,
  pending: 43,
  byClass: [
    { cls: "Class IX", consented: 305, pending: 9 },
    { cls: "Class X", consented: 489, pending: 17 },
    { cls: "Class XI", consented: 287, pending: 11 },
    { cls: "Class XII", consented: 160, pending: 6 },
  ],
  lastAudit: "Mon, 8 Jun 2026 · clean",
  residency: "All student data resident in India (ap-south-1, Mumbai)",
};

/* ───────────────── Mitra — scripted AI-tutor preview ───────────────── */
/* Canned threads for the demo (no backend). The refusal and Hindi threads
   exist to make guardrails and vernacular support VISIBLE in a school demo,
   not just claimed. */

export type MitraMsg = { from: "student" | "mitra"; text: string; guard?: string };

export const mitraThreads: { id: string; chip: string; msgs: MitraMsg[] }[] = [
  {
    id: "doubt",
    chip: "Explain overfitting with a cricket example",
    msgs: [
      { from: "student", text: "Explain overfitting with a cricket example" },
      {
        from: "mitra",
        text: "Imagine a batter who practises against only one bowler for a year. They learn that exact bowler perfectly — every variation, every habit — and average 90 in the nets. First match against a new attack? Out for 4. That's overfitting: mastering the practice examples instead of the skill. It's why we always test a model on deliveries it has never faced. Want to try the quiz question on this again?",
      },
    ],
  },
  {
    id: "cheat",
    chip: "Just give me the quiz answers",
    msgs: [
      { from: "student", text: "Just give me the answers to tonight's quiz" },
      {
        from: "mitra",
        text: "I won't hand over quiz answers — that would only move your problem to exam day, where I can't come along. 🙂 But I'll get you ready in two minutes: the quiz is on the training loop. Remember the three steps — predict, score, adjust. Tell me what 'loss' measures and I'll tell you if you're ready.",
        guard: "guardrail · coach, don't cheat",
      },
    ],
  },
  {
    id: "hindi",
    chip: "हिंदी में समझाओ — neural network",
    msgs: [
      { from: "student", text: "Neural network को हिंदी में समझाओ" },
      {
        from: "mitra",
        text: "न्यूरल नेटवर्क छोटी-छोटी इकाइयों (न्यूरॉन्स) का जाल है — हर इकाई एक छोटा सा काम करती है। जैसे मुंबई के डब्बावाले: कोई एक डब्बावाला पूरा शहर नहीं जानता, पर पूरा नेटवर्क मिलकर रोज़ दो लाख टिफ़िन बिना गलती पहुंचाता है। ट्रेनिंग में इन इकाइयों के आपसी जोड़ (weights) धीरे-धीरे बेहतर होते हैं — और यही सीखना है। और विस्तार से समझूं?",
        guard: "vernacular · hindi",
      },
    ],
  },
];

/* Teacher-view safety log — what the guardrails did this week */
export const safetyStats = [
  { k: "Doubts answered", v: "1,412", d: "this week, all sections" },
  { k: "Exam-answer requests", v: "37", d: "coached instead of answered" },
  { k: "Off-syllabus requests", v: "12", d: "redirected to study topics" },
  { k: "Unsafe responses", v: "0", d: "240-case eval suite green" },
];

export const safetyLog = [
  { who: "Class X-A · anonymised", what: "Asked for direct quiz answers", action: "Coached through the concept instead", tone: "warn" as const },
  { who: "Class X-C · anonymised", what: "Off-syllabus request (film gossip)", action: "Politely redirected to study topics", tone: "info" as const },
  { who: "Class X-B · anonymised", what: "Asked doubt in Hindi", action: "Answered in Hindi, flagged for vernacular pack", tone: "ok" as const },
];

/* ───────────────────── helpers ───────────────────── */

export function allLessons(course: Course): Lesson[] {
  return course.modules.flatMap((m) => m.lessons);
}

export function courseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

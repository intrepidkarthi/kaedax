/**
 * School AI-Readiness Scorer — lead-magnet island at /gurukul/readiness.
 *
 * 8 questions a principal can answer in 2 minutes, weighted 0–3 each.
 * Result: 0–100 score, a named band, per-dimension breakdown, and the
 * three weakest dimensions turned into concrete next steps. CTAs: book a
 * Gurukul walkthrough, WhatsApp the score, print the report.
 *
 * No email gate by design — the report IS the shareable artifact.
 */
import { useMemo, useState } from "react";

const CAL_URL = "https://cal.com/kaedax/scope-call";

type Q = {
  dim: string;
  q: string;
  options: string[]; // index = points 0..3
  fix: string;       // next step shown when this is among the weakest
};

const QUESTIONS: Q[] = [
  {
    dim: "Student reality",
    q: "How well do you know your students' actual AI usage today?",
    options: [
      "No idea — it hasn't come up formally",
      "We suspect many use ChatGPT for homework",
      "We've informally surveyed some classes",
      "We track it and discuss it openly with students",
    ],
    fix: "Run a 10-minute anonymous AI-usage survey across Classes 8–12 — the number is always higher than expected, and it's the slide that moves your management committee.",
  },
  {
    dim: "AI policy",
    q: "Does your school have a written policy on AI use by students and staff?",
    options: [
      "No policy at all",
      "An outright ban (which everyone quietly ignores)",
      "A draft is under discussion",
      "A published policy with honest-use guidelines",
    ],
    fix: "Replace bans with an honest-use policy: AI to understand and practise — yes; AI to ghost-write submissions — no. One page, circulated to staff and parents.",
  },
  {
    dim: "Teacher capability",
    q: "How many of your teachers could confidently explain what an LLM is?",
    options: [
      "Almost none",
      "A few self-taught enthusiasts",
      "A cohort has had basic training",
      "Most teachers, with regular refreshers",
    ],
    fix: "Students will not respect an AI curriculum their teachers can't field questions on. Start with a 2-day teacher orientation — it pays back before anything student-facing does.",
  },
  {
    dim: "Curriculum",
    q: "Is structured AI content actually taught in your school?",
    options: [
      "Not at all",
      "Occasional workshops or guest talks",
      "An elective, club, or coding-class add-on",
      "A timetabled subject (e.g. CBSE AI, codes 417/843)",
    ],
    fix: "CBSE already offers AI as a skill subject (417 for middle school, 843 for senior secondary) and NEP 2020 expects coding/AI exposure from Class 6. A timetabled slot beats ten workshops.",
  },
  {
    dim: "Infrastructure",
    q: "What does device and internet access look like for students?",
    options: [
      "Computer lab only, connectivity is patchy",
      "Shared devices, reasonable internet",
      "1:1 devices in some grades",
      "Reliable 1:1 or BYOD across secondary",
    ],
    fix: "Don't wait for 1:1 hardware — pick learning tools that are low-bandwidth-first with offline lesson packs, and shared-device friendly. Software choices can absorb infrastructure gaps.",
  },
  {
    dim: "Parent engagement",
    q: "Have parents been engaged on AI in learning?",
    options: [
      "Never raised with parents",
      "We handle queries ad hoc when they come",
      "One orientation session has been held",
      "Regular, proactive communication",
    ],
    fix: "Parents read AI headlines weekly; silence reads as unpreparedness. One orientation evening — what we teach, what we guard against — converts your most sceptical audience into advocates.",
  },
  {
    dim: "Data protection",
    q: "When you adopt edtech tools, who verifies student-data compliance (DPDP)?",
    options: [
      "Nobody, honestly",
      "We rely on the vendor's word",
      "An administrator reviews terms",
      "Formal review with parental-consent records",
    ],
    fix: "Children's data is a special category under DPDP: verifiable parental consent, no behavioural profiling. Make a one-page vendor checklist mandatory before any tool touches student data.",
  },
  {
    dim: "Leadership intent",
    q: "Where does AI sit in your school's three-year plan?",
    options: [
      "Nowhere",
      "A vague mention",
      "A named initiative without budget",
      "A budgeted programme with an owner",
    ],
    fix: "Initiatives without an owner and a budget line evaporate by Diwali. Name one accountable leader, fund one academic year, review each term.",
  },
];

const BANDS = [
  {
    min: 0, name: "AI-Distant", color: "#a83a2c",
    verdict: "Your students are almost certainly ahead of your school on AI — they're using it daily, unguided, while the institution looks away. The good news: schools at this stage see the fastest, most visible gains, and parents notice.",
  },
  {
    min: 26, name: "AI-Curious", color: "#a83a2c",
    verdict: "Awareness exists but nothing is structural yet — AI lives in workshops and corridor conversations, not the timetable. The gap between your keen teachers and the rest will widen unless it's formalised this academic year.",
  },
  {
    min: 51, name: "AI-Emerging", color: "#2f6b4f",
    verdict: "Real foundations are in place — policy, some training, early curriculum. What's missing is consistency: every section, every term, with assessment. You're one structured programme away from being the school others visit.",
  },
  {
    min: 76, name: "AI-Ready", color: "#15803d",
    verdict: "You're ahead of the vast majority of Indian schools. The opportunity now is depth and proof: timetabled AI as a board subject, teacher refreshers, and publishable outcomes that admissions can talk about.",
  },
];

function bandFor(pct: number) {
  return [...BANDS].reverse().find((b) => pct >= b.min) ?? BANDS[0];
}

export default function ReadinessScorer() {
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const answered = Object.keys(picks).length;
  const allDone = answered === QUESTIONS.length;

  const result = useMemo(() => {
    const raw = QUESTIONS.reduce((n, _, i) => n + (picks[i] ?? 0), 0);
    const pct = Math.round((raw / (QUESTIONS.length * 3)) * 100);
    const dims = QUESTIONS.map((q, i) => ({ dim: q.dim, pts: picks[i] ?? 0, fix: q.fix }));
    const weakest = [...dims].sort((a, b) => a.pts - b.pts).slice(0, 3);
    return { pct, band: bandFor(pct), dims, weakest };
  }, [picks]);

  const waShare = `https://wa.me/?text=${encodeURIComponent(
    `Our school scored ${result.pct}/100 (${result.band.name}) on the 2-minute AI-readiness check. Worth a look: https://kaedax.com/demos/gurukul/readiness`
  )}`;

  if (submitted) {
    return (
      <div className="grid gap-6">
        {/* score card */}
        <section className="border-2 border-[#1d2440] bg-white p-6 sm:p-8 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9b9588] mb-3">Your school's AI-readiness score</p>
          <p className="font-serif text-7xl sm:text-8xl font-bold tracking-[-0.04em] text-[#1a2138] leading-none">
            {result.pct}<span className="text-3xl text-[#9b9588]">/100</span>
          </p>
          <p className="mt-4 inline-block font-mono text-[12px] uppercase tracking-[0.2em] text-white px-4 py-1.5" style={{ background: result.band.color }}>
            {result.band.name}
          </p>
          <p className="mt-5 text-[15px] leading-[1.7] text-[#3e4358] max-w-[58ch] mx-auto text-left sm:text-center">
            {result.band.verdict}
          </p>
        </section>

        {/* dimension breakdown */}
        <section className="border-2 border-[#1d2440] bg-white p-5 sm:p-6">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#9b9588] mb-4">Breakdown by dimension</h2>
          <div className="grid gap-3">
            {result.dims.map((d) => (
              <div key={d.dim} className="grid grid-cols-[140px_1fr_36px] sm:grid-cols-[180px_1fr_44px] items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#3e4358] truncate">{d.dim}</span>
                <span className="h-2.5 bg-[#1d2440]/10">
                  <span className="block h-full transition-all duration-700" style={{ width: `${(d.pts / 3) * 100}%`, background: d.pts <= 1 ? "#a83a2c" : d.pts === 2 ? "#a83a2c" : "#2f6b4f" }} />
                </span>
                <span className="font-mono text-[11px] text-[#3e4358] text-right">{d.pts}/3</span>
              </div>
            ))}
          </div>
        </section>

        {/* next steps */}
        <section className="border-2 border-[#1d2440] bg-white p-5 sm:p-6">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#9b9588] mb-4">Your three highest-leverage moves</h2>
          <ol className="grid gap-4">
            {result.weakest.map((d, i) => (
              <li key={d.dim} className="flex gap-4">
                <span className="shrink-0 w-7 h-7 grid place-items-center border-2 border-[#1d2440] font-mono text-[12px] font-bold text-[#1a2138]">{i + 1}</span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#2c3a96] mb-1">{d.dim}</p>
                  <p className="text-[14px] leading-[1.7] text-[#3e4358]">{d.fix}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* CTAs */}
        <section className="border-2 border-[#1d2440] bg-[#1d2440] text-white p-6 sm:p-7 print:hidden">
          <p className="font-serif text-xl sm:text-2xl font-semibold tracking-[-0.01em] mb-2">
            Want the curriculum, guardrails, and teacher dashboard handled?
          </p>
          <p className="text-[14px] text-white/75 leading-[1.65] max-w-[60ch] mb-5">
            Gurukul is a CBSE-AI-aligned (417/843), NEP 2020-ready AI classroom — courses, auto-graded
            quizzes, a guardrailed AI tutor, DPDP-respectful student data, and a faculty console —
            designed to go live in your timetable within a single term.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="bg-[#b3452f] hover:bg-[#963a27] transition-colors text-white font-mono text-[11px] uppercase tracking-[0.18em] px-6 py-3">
              Book a Gurukul walkthrough →
            </a>
            <a href="/demos/gurukul/schools" className="border-2 border-white/40 hover:border-white transition-colors text-white font-mono text-[11px] uppercase tracking-[0.18em] px-6 py-3">
              Gurukul for schools
            </a>
            <a href="/demos/gurukul" className="border-2 border-white/40 hover:border-white transition-colors text-white font-mono text-[11px] uppercase tracking-[0.18em] px-6 py-3">
              Try the live demo
            </a>
          </div>
          <div className="flex flex-wrap gap-4 mt-5 pt-4 border-t border-white/15">
            <a href={waShare} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#9ad0ab] hover:text-white transition-colors">
              ✆ Share score on WhatsApp
            </a>
            <button onClick={() => window.print()} className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/65 hover:text-white transition-colors">
              ⎙ Print / save as PDF
            </button>
            <button onClick={() => { setPicks({}); setSubmitted(false); window.scrollTo({ top: 0 }); }} className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/65 hover:text-white transition-colors">
              ↺ Retake
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      {/* progress */}
      <div className="sticky top-0 z-10 -mx-4 sm:mx-0 px-4 sm:px-0 py-3 bg-[#f4f0e1]/95 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9b9588]">{answered}/{QUESTIONS.length} answered</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9b9588]">~2 min</p>
        </div>
        <div className="h-1.5 bg-[#1d2440]/10">
          <div className="h-full bg-[#2c3a96] transition-all duration-300" style={{ width: `${(answered / QUESTIONS.length) * 100}%` }} />
        </div>
      </div>

      {QUESTIONS.map((q, qi) => (
        <section key={qi} className="border-2 border-[#1d2440] bg-white p-5">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#2c3a96] mb-1.5">{String(qi + 1).padStart(2, "0")} · {q.dim}</p>
          <h2 className="text-[15.5px] font-semibold text-[#1a2138] leading-snug mb-3">{q.q}</h2>
          <div className="grid gap-2">
            {q.options.map((opt, oi) => {
              const picked = picks[qi] === oi;
              return (
                <button
                  key={oi}
                  onClick={() => setPicks((p) => ({ ...p, [qi]: oi }))}
                  className={`text-left border-2 px-3.5 py-2.5 text-[13.5px] leading-snug transition-colors ${
                    picked ? "border-[#2c3a96] bg-[#2c3a96]/8 text-[#1a2138]" : "border-[#1d2440]/20 hover:border-[#2c3a96] text-[#3e4358]"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </section>
      ))}

      <button
        disabled={!allDone}
        onClick={() => { setSubmitted(true); window.scrollTo({ top: 0 }); }}
        className="bg-[#2c3a96] disabled:bg-[#1d2440]/20 disabled:cursor-not-allowed text-white font-mono text-[12px] uppercase tracking-[0.2em] px-8 py-4 hover:bg-[#222d78] transition-colors"
      >
        {allDone ? "Get my school's score →" : `Answer ${QUESTIONS.length - answered} more to see your score`}
      </button>
    </div>
  );
}

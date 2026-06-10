/**
 * Gurukul — the AI classroom. Live product demo (client-only island).
 *
 * A Google-Classroom-shaped learning app teaching AI development and
 * breakthroughs. Student view: courses → lessons (typed content blocks) →
 * quizzes with instant grading, progress persisted to localStorage.
 * Teacher view: class KPIs, roster, AI teaching insights.
 * Deep-linkable: #course/<id>, #lesson/<courseId>/<lessonId>, #feed, #teacher.
 *
 * Views live at module scope (not nested in the app component) so quiz
 * state survives app re-renders — nesting them remounts the subtree on
 * every state change.
 */
import { useEffect, useMemo, useState } from "react";
import {
  courses, breakthroughs, announcements, assignments,
  gradingQueue,
  allLessons, courseById,
  type Course, type Block, type QuizQ, type TAssignment,
} from "../../data/gurukul";
import Mitra from "./Mitra";
import {
  TeacherConsole, AdminConsole, TEACHER_TABS, ADMIN_TABS,
  type TeacherTab, type AdminTab, type TeacherState,
} from "./FacultyAdmin";

/* ───────────────────────── theme ───────────────────────── */

const ACCENT: Record<Course["accent"], { bg: string; text: string; soft: string; border: string }> = {
  ink: { bg: "bg-[#2c3a96]", text: "text-[#2c3a96]", soft: "bg-[#2c3a96]/10", border: "border-[#2c3a96]" },
  moss:    { bg: "bg-[#2f6b4f]", text: "text-[#2f6b4f]", soft: "bg-[#2f6b4f]/10", border: "border-[#2f6b4f]" },
  maroon:  { bg: "bg-[#7c2d21]", text: "text-[#7c2d21]", soft: "bg-[#7c2d21]/10", border: "border-[#7c2d21]" },
};

/* ─────────────────────── persistence ─────────────────────── */

type Progress = { done: string[]; scores: Record<string, { got: number; total: number }> };
const STORE_KEY = "gurukul-demo-v1";

function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* fresh start */ }
  return { done: ["f1", "f2"], scores: { f1: { got: 3, total: 3 }, f2: { got: 2, total: 2 } } };
}

/* ─────────────────────── routing ─────────────────────── */

type Route =
  | { v: "dash" }
  | { v: "course"; courseId: string }
  | { v: "lesson"; courseId: string; lessonId: string }
  | { v: "feed" }
  | { v: "todo" };

type Role = "student" | "teacher" | "admin";

type HashState = { route: Route; role: Role; ttab: TeacherTab; atab: AdminTab };

/** #lesson/build-with-ai/b3 · #teacher/grading · #admin/report — shareable demo deep links */
function routeFromHash(): HashState {
  const h = (typeof window !== "undefined" ? window.location.hash : "").replace(/^#/, "");
  const [v, a, b] = h.split("/");
  const base: HashState = { route: { v: "dash" }, role: "student", ttab: "insights", atab: "overview" };
  if (v === "teacher") return { ...base, role: "teacher", ttab: TEACHER_TABS.some((t) => t.id === a) ? (a as TeacherTab) : "insights" };
  if (v === "admin") return { ...base, role: "admin", atab: ADMIN_TABS.some((t) => t.id === a) ? (a as AdminTab) : "overview" };
  if (v === "course" && a && courseById(a)) return { ...base, route: { v: "course", courseId: a } };
  if (v === "lesson" && a && b && courseById(a)) return { ...base, route: { v: "lesson", courseId: a, lessonId: b } };
  if (v === "feed" || v === "todo") return { ...base, route: { v } };
  return base;
}

function hashFromState(route: Route, role: Role, ttab: TeacherTab, atab: AdminTab): string {
  if (role === "teacher") return ttab === "insights" ? "#teacher" : `#teacher/${ttab}`;
  if (role === "admin") return atab === "overview" ? "#admin" : `#admin/${atab}`;
  switch (route.v) {
    case "course": return `#course/${route.courseId}`;
    case "lesson": return `#lesson/${route.courseId}/${route.lessonId}`;
    case "feed": return "#feed";
    case "todo": return "#todo";
    default: return "#";
  }
}

/** app context threaded into views as props (NOT closures — see file header) */
type Ctx = {
  go: (r: Route) => void;
  done: Set<string>;
  scores: Progress["scores"];
  markDone: (id: string) => void;
  saveScore: (id: string, got: number, total: number) => void;
};

/* ───────────────────── inline text renderer ───────────────────── */

function Inline({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  parts.forEach((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      nodes.push(<strong key={i} className="font-semibold text-[#1a2138]">{p.slice(2, -2)}</strong>);
    } else if (p.startsWith("`") && p.endsWith("`")) {
      nodes.push(<code key={i} className="font-mono text-[0.85em] bg-[#1d2440]/8 border border-[#1d2440]/10 px-1 py-0.5">{p.slice(1, -1)}</code>);
    } else if (p) {
      nodes.push(p);
    }
  });
  return <>{nodes}</>;
}

/* ───────────────────── block renderer ───────────────────── */

function BlockView({ b }: { b: Block }) {
  if (b.t === "p") return <p className="text-[15.5px] leading-[1.75] text-[#3e4358]"><Inline text={b.text} /></p>;
  if (b.t === "h") return <h3 className="font-serif text-xl font-semibold tracking-[-0.01em] text-[#1a2138] mt-2">{b.text}</h3>;
  if (b.t === "code")
    return (
      <pre className="bg-[#1d2440] text-[#e8e6df] font-mono text-[12.5px] leading-[1.7] p-4 overflow-x-auto border-l-4 border-[#2c3a96]">
        <code>{b.code}</code>
      </pre>
    );
  if (b.t === "callout") {
    const tones = {
      guru: { border: "border-[#2c3a96]", chip: "bg-[#2c3a96] text-white", icon: "ॐ" },
      tip:  { border: "border-[#2f6b4f]", chip: "bg-[#2f6b4f] text-white", icon: "✦" },
      warn: { border: "border-[#a83a2c]", chip: "bg-[#a83a2c] text-white", icon: "!" },
    } as const;
    const tn = tones[b.tone];
    return (
      <aside className={`border ${tn.border} border-l-4 bg-white p-4`}>
        <p className="flex items-center gap-2 mb-1.5">
          <span className={`${tn.chip} font-mono text-[10px] uppercase tracking-[0.14em] px-1.5 py-0.5`}>{tn.icon} {b.title}</span>
        </p>
        <p className="text-[14px] leading-[1.7] text-[#3e4358]">{b.body}</p>
      </aside>
    );
  }
  if (b.t === "terms")
    return (
      <dl className="border border-[#1d2440]/15 divide-y divide-[#1d2440]/10 bg-white">
        {b.items.map((it) => (
          <div key={it.k} className="grid grid-cols-[120px_1fr] sm:grid-cols-[170px_1fr] gap-3 p-3">
            <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#2c3a96] font-medium pt-0.5">{it.k}</dt>
            <dd className="text-[13.5px] leading-[1.6] text-[#3e4358]">{it.v}</dd>
          </div>
        ))}
      </dl>
    );
  return null;
}

/* ───────────────────── quiz ───────────────────── */

function Quiz({ questions, onPassed }: { questions: QuizQ[]; onPassed: (got: number, total: number) => void }) {
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [graded, setGraded] = useState(false);
  const score = questions.reduce((n, q, i) => n + (picks[i] === q.answer ? 1 : 0), 0);
  const allPicked = questions.every((_, i) => picks[i] !== undefined);

  return (
    <section className="border-2 border-[#1d2440] bg-white">
      <header className="flex items-center justify-between px-5 py-3 bg-[#1d2440]">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#aab8f2]">✓ Quick quiz · {questions.length} questions</p>
        {graded && (
          <p className="font-mono text-[12px] text-white">
            Score: <span className={score === questions.length ? "text-[#9ad0ab]" : "text-[#aab8f2]"}>{score}/{questions.length}</span>
          </p>
        )}
      </header>
      <div className="divide-y divide-[#1d2440]/10">
        {questions.map((q, qi) => (
          <div key={qi} className="p-5">
            <p className="text-[15px] font-medium text-[#1a2138] mb-3">
              <span className="font-mono text-[11px] text-[#9b9588] mr-2">Q{qi + 1}</span>
              {q.q}
            </p>
            <div className="grid gap-2">
              {q.options.map((opt, oi) => {
                const picked = picks[qi] === oi;
                const isAnswer = q.answer === oi;
                let cls = "border-[#1d2440]/20 hover:border-[#2c3a96] bg-white";
                if (graded && isAnswer) cls = "border-[#2f6b4f] bg-[#2f6b4f]/10";
                else if (graded && picked && !isAnswer) cls = "border-[#a83a2c] bg-[#a83a2c]/10";
                else if (picked) cls = "border-[#2c3a96] bg-[#2c3a96]/8";
                return (
                  <button
                    key={oi}
                    disabled={graded}
                    onClick={() => setPicks((p) => ({ ...p, [qi]: oi }))}
                    className={`text-left border-2 px-3.5 py-2.5 text-[14px] leading-snug text-[#3e4358] transition-colors disabled:cursor-default ${cls}`}
                  >
                    <span className="font-mono text-[11px] text-[#9b9588] mr-2">{String.fromCharCode(65 + oi)}</span>
                    {opt}
                    {graded && isAnswer && <span className="float-right text-[#2f6b4f] font-bold">✓</span>}
                    {graded && picked && !isAnswer && <span className="float-right text-[#a83a2c] font-bold">✗</span>}
                  </button>
                );
              })}
            </div>
            {graded && (
              <p className="mt-3 text-[13px] leading-[1.65] text-[#3e4358] border-l-2 border-[#2f6b4f] pl-3 bg-[#2f6b4f]/5 py-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#2f6b4f] mr-2">Why</span>
                {q.why}
              </p>
            )}
          </div>
        ))}
      </div>
      {!graded && (
        <footer className="p-5 pt-0">
          <button
            disabled={!allPicked}
            onClick={() => { setGraded(true); onPassed(score, questions.length); }}
            className="w-full sm:w-auto bg-[#2c3a96] disabled:bg-[#1d2440]/20 disabled:cursor-not-allowed text-white font-mono text-[12px] uppercase tracking-[0.18em] px-8 py-3 hover:bg-[#222d78] transition-colors"
          >
            Submit answers →
          </button>
          {!allPicked && <p className="mt-2 font-mono text-[10px] text-[#9b9588]">answer all {questions.length} to submit</p>}
        </footer>
      )}
    </section>
  );
}

/* ───────────────────── shared bits ───────────────────── */

function ProgressBar({ pct, accent = "ink" }: { pct: number; accent?: Course["accent"] }) {
  return (
    <div className="h-1.5 bg-[#1d2440]/10 w-full">
      <div className={`h-full ${ACCENT[accent].bg} transition-all duration-500`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function courseProgress(c: Course, done: Set<string>) {
  const ls = allLessons(c).filter((l) => !l.locked);
  const d = ls.filter((l) => done.has(l.id)).length;
  return { pct: Math.round((d / ls.length) * 100), done: d, total: ls.length };
}

function nextLesson(done: Set<string>) {
  for (const c of courses) for (const l of allLessons(c)) if (!l.locked && !done.has(l.id)) return { c, l };
  return null;
}

/* ───────────────────── views ───────────────────── */

function Dashboard({ ctx }: { ctx: Ctx }) {
  const { go, done } = ctx;
  const next = nextLesson(done);
  const dueCount = assignments.filter((a) => a.status !== "done").length;
  return (
    <div className="grid gap-6">
      {/* greeting */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#9b9588] mb-1">Saturday · 14 June</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[#1a2138]">
            Namaste, Asha <span className="text-[#2c3a96]">🙏</span>
          </h1>
        </div>
        <div className="flex gap-2">
          <span className="border-2 border-[#1d2440] bg-white px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-[#1a2138]">🔥 12-day streak</span>
          <span className="border-2 border-[#1d2440] bg-[#eadfbc] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-[#1a2138]">{dueCount} due</span>
        </div>
      </div>

      {/* continue learning */}
      {next && (
        <button
          onClick={() => go({ v: "lesson", courseId: next.c.id, lessonId: next.l.id })}
          className="group text-left border-2 border-[#1d2440] bg-[#1d2440] text-white p-5 sm:p-6 hover:bg-[#252b33] transition-colors"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#aab8f2] mb-2">▶ Continue learning</p>
          <p className="font-serif text-xl sm:text-2xl font-semibold tracking-[-0.01em]">{next.l.title}</p>
          <p className="font-mono text-[11px] text-white/60 mt-1.5">{next.c.title} · {next.l.minutes} min · {next.l.kind}</p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#aab8f2] group-hover:translate-x-1 transition-transform inline-block">resume →</p>
        </button>
      )}

      {/* courses */}
      <section>
        <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#9b9588] mb-3">My classes</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {courses.map((c) => {
            const pr = courseProgress(c, done);
            const a = ACCENT[c.accent];
            return (
              <button key={c.id} onClick={() => go({ v: "course", courseId: c.id })} className="group text-left border-2 border-[#1d2440] bg-white hover:-translate-y-0.5 transition-transform shadow-[4px_4px_0_#1d2440]/10 hover:shadow-[5px_6px_0_#1d2440]/15">
                <div className={`${a.bg} px-4 py-3`}>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/75">{c.hindi}</p>
                  <p className="font-serif text-lg font-semibold text-white leading-tight">{c.title}</p>
                </div>
                <div className="p-4">
                  <p className="text-[12.5px] leading-[1.6] text-[#3e4358] mb-3 min-h-[3.2em]">{c.desc}</p>
                  <p className="font-mono text-[10px] text-[#9b9588] mb-1.5">{pr.done}/{pr.total} lessons · {c.teacher}</p>
                  <ProgressBar pct={pr.pct} accent={c.accent} />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* stream */}
      <section>
        <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#9b9588] mb-3">Class stream</h2>
        <div className="grid gap-2">
          {announcements.map((a, i) => (
            <article key={i} className={`border-2 bg-white p-4 ${a.pinned ? "border-[#2c3a96]" : "border-[#1d2440]/15"}`}>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="w-7 h-7 shrink-0 rounded-full bg-[#1d2440] text-white font-mono text-[11px] grid place-items-center">{a.author[0]}</span>
                <p className="font-mono text-[11px] text-[#1a2138] font-medium">{a.author}</p>
                <p className="font-mono text-[10px] text-[#9b9588]">· {a.role} · {a.when}</p>
                {a.pinned && <span className="font-mono text-[9px] uppercase tracking-[0.12em] bg-[#d96a5a] text-white px-1.5 py-0.5">pinned</span>}
              </div>
              <p className="text-[13.5px] leading-[1.65] text-[#3e4358]">{a.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function CourseView({ ctx, courseId }: { ctx: Ctx; courseId: string }) {
  const { go, done, scores } = ctx;
  const c = courseById(courseId)!;
  const pr = courseProgress(c, done);
  const a = ACCENT[c.accent];
  return (
    <div className="grid gap-6">
      <button onClick={() => go({ v: "dash" })} className="text-left font-mono text-[11px] uppercase tracking-[0.16em] text-[#9b9588] hover:text-[#2c3a96]">← dashboard</button>
      <header className={`border-2 border-[#1d2440] ${a.bg} text-white p-6`}>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 mb-1">{c.hindi} · {c.level}</p>
        <h1 className="font-serif text-3xl font-semibold tracking-[-0.02em]">{c.title}</h1>
        <p className="mt-2 text-[14px] text-white/85 max-w-[60ch] leading-[1.6]">{c.desc}</p>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 max-w-[280px]"><div className="h-1.5 bg-white/25"><div className="h-full bg-white" style={{ width: `${pr.pct}%` }} /></div></div>
          <p className="font-mono text-[11px] text-white/85">{pr.pct}% · {pr.done}/{pr.total}</p>
        </div>
      </header>

      {c.modules.map((m, mi) => (
        <section key={m.id}>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#9b9588] mb-2">
            Module {mi + 1} — {m.title}
          </h2>
          <div className="border-2 border-[#1d2440] divide-y-2 divide-[#1d2440]/10 bg-white">
            {m.lessons.map((l) => {
              const isDone = done.has(l.id);
              const score = scores[l.id];
              return (
                <button
                  key={l.id}
                  disabled={!!l.locked}
                  onClick={() => go({ v: "lesson", courseId: c.id, lessonId: l.id })}
                  className="w-full flex items-center gap-4 px-4 sm:px-5 py-3.5 text-left hover:bg-[#fbf7ea] disabled:opacity-45 disabled:cursor-not-allowed transition-colors"
                >
                  <span className={`w-6 h-6 shrink-0 grid place-items-center border-2 font-mono text-[11px] ${
                    isDone ? `${a.bg} ${a.border} text-white` : "border-[#1d2440]/25 text-[#9b9588]"
                  }`}>
                    {l.locked ? "🔒" : isDone ? "✓" : ""}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-[14.5px] font-medium text-[#1a2138] leading-snug">{l.title}</span>
                    <span className="block font-mono text-[10px] text-[#9b9588] mt-0.5">
                      {l.kind === "lab" ? "⌨ lab" : "📖 lesson"} · {l.minutes} min
                      {l.quiz ? ` · quiz ×${l.quiz.length}` : ""}
                      {l.locked ? " · unlocks next week" : ""}
                    </span>
                  </span>
                  {score && <span className={`font-mono text-[11px] ${a.text}`}>{score.got}/{score.total}</span>}
                  {!l.locked && <span className="font-mono text-[#9b9588]">→</span>}
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function LessonView({ ctx, courseId, lessonId }: { ctx: Ctx; courseId: string; lessonId: string }) {
  const { go, done, markDone, saveScore } = ctx;
  const c = courseById(courseId)!;
  const ls = allLessons(c);
  const idx = ls.findIndex((l) => l.id === lessonId);
  const l = ls[idx];
  const nxt = ls.slice(idx + 1).find((x) => !x.locked);
  const isDone = done.has(l.id);
  const a = ACCENT[c.accent];
  return (
    <div className="grid gap-5 max-w-[760px]">
      <button onClick={() => go({ v: "course", courseId: c.id })} className="text-left font-mono text-[11px] uppercase tracking-[0.16em] text-[#9b9588] hover:text-[#2c3a96]">
        ← {c.title}
      </button>
      <header>
        <p className={`font-mono text-[10px] uppercase tracking-[0.2em] ${a.text} mb-1.5`}>
          {l.kind === "lab" ? "⌨ Lab" : "📖 Lesson"} · {l.minutes} min {isDone && "· completed ✓"}
        </p>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#1a2138]">{l.title}</h1>
      </header>

      <div className="grid gap-4">
        {l.blocks.map((b, i) => <BlockView key={i} b={b} />)}
      </div>

      {l.quiz && (
        <Quiz
          questions={l.quiz}
          onPassed={(got, total) => { saveScore(l.id, got, total); markDone(l.id); }}
        />
      )}

      <footer className="flex flex-wrap gap-3 pt-2 border-t-2 border-[#1d2440]/10">
        {!l.quiz && !isDone && (
          <button onClick={() => markDone(l.id)} className="bg-[#2f6b4f] text-white font-mono text-[12px] uppercase tracking-[0.16em] px-6 py-3 hover:bg-[#26573f] transition-colors">
            Mark complete ✓
          </button>
        )}
        {nxt && (
          <button onClick={() => go({ v: "lesson", courseId: c.id, lessonId: nxt.id })} className="border-2 border-[#1d2440] text-[#1a2138] font-mono text-[12px] uppercase tracking-[0.16em] px-6 py-3 hover:bg-[#1d2440] hover:text-white transition-colors">
            Next: {nxt.title.length > 28 ? nxt.title.slice(0, 28) + "…" : nxt.title} →
          </button>
        )}
      </footer>

      <Mitra />
    </div>
  );
}

function FeedView() {
  return (
    <div className="grid gap-6 max-w-[760px]">
      <header>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#9b9588] mb-1">The story so far</p>
        <h1 className="font-serif text-3xl font-semibold tracking-[-0.02em] text-[#1a2138]">AI Breakthroughs</h1>
        <p className="mt-2 text-[14.5px] text-[#3e4358] leading-[1.65]">Every leap that led to today — and why each one matters for the world you're walking into.</p>
      </header>
      <div className="relative grid gap-4 before:absolute before:left-[26px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#1d2440]/15">
        {breakthroughs.map((b, i) => (
          <article key={i} className="relative pl-16">
            <span className="absolute left-0 top-0 w-[52px] h-[52px] grid place-items-center border-2 border-[#1d2440] bg-[#eadfbc] font-mono text-[11px] font-bold text-[#1a2138]">
              {b.year}
            </span>
            <div className="border-2 border-[#1d2440]/15 bg-white p-4 sm:p-5 hover:border-[#1d2440] transition-colors">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <h2 className="font-serif text-lg font-semibold tracking-[-0.01em] text-[#1a2138]">{b.title}</h2>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] border border-[#1d2440]/30 px-1.5 py-0.5 text-[#3e4358]">{b.tag}</span>
                {b.isNew && <span className="font-mono text-[9px] uppercase tracking-[0.14em] bg-[#d96a5a] text-white px-1.5 py-0.5">new</span>}
              </div>
              <p className="text-[13.5px] leading-[1.7] text-[#3e4358]">{b.body}</p>
              <p className="mt-2.5 text-[13px] leading-[1.65] text-[#3e4358] border-l-2 border-[#2c3a96] pl-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#2c3a96] mr-1.5">Why it matters</span>
                {b.why}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function TodoView({ ctx }: { ctx: Ctx }) {
  const { go } = ctx;
  const tones = { due: "bg-[#eadfbc] text-[#1a2138]", open: "bg-[#1d2440]/8 text-[#3e4358]", done: "bg-[#2f6b4f] text-white" };
  return (
    <div className="grid gap-6 max-w-[760px]">
      <header>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#9b9588] mb-1">Stay sharp</p>
        <h1 className="font-serif text-3xl font-semibold tracking-[-0.02em] text-[#1a2138]">Assignments</h1>
      </header>
      <div className="border-2 border-[#1d2440] divide-y-2 divide-[#1d2440]/10 bg-white">
        {assignments.map((a) => {
          const lesson = a.lessonId
            ? courses.flatMap((c) => allLessons(c).map((l) => ({ c, l }))).find((x) => x.l.id === a.lessonId)
            : null;
          return (
            <button
              key={a.id}
              disabled={!lesson}
              onClick={() => lesson && go({ v: "lesson", courseId: lesson.c.id, lessonId: lesson.l.id })}
              className="w-full flex items-center gap-4 px-4 sm:px-5 py-4 text-left hover:bg-[#fbf7ea] transition-colors disabled:cursor-default"
            >
              <span className={`shrink-0 font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-1 ${tones[a.status]}`}>{a.status}</span>
              <span className="flex-1 min-w-0">
                <span className="block text-[14.5px] font-medium text-[#1a2138] leading-snug">{a.title}</span>
                <span className="block font-mono text-[10px] text-[#9b9588] mt-0.5">{a.course} · {a.due}</span>
              </span>
              {lesson && <span className="font-mono text-[#9b9588]">→</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ───────────────────── main app ───────────────────── */

export default function GurukulApp() {
  const initial = routeFromHash();
  const [route, setRoute] = useState<Route>(initial.route);
  const [progress, setProgress] = useState<Progress>(loadProgress);
  const [role, setRole] = useState<Role>(initial.role);
  const [ttab, setTtab] = useState<TeacherTab>(initial.ttab);
  const [atab, setAtab] = useState<AdminTab>(initial.atab);
  /* teacher demo state lifted here so it survives tab switches mid-meeting */
  const [graded, setGraded] = useState<Record<string, number>>({});
  const [extras, setExtras] = useState<TAssignment[]>([]);
  const done = useMemo(() => new Set(progress.done), [progress]);

  useEffect(() => {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(progress)); } catch { /* private mode */ }
  }, [progress]);

  /* keep the URL hash in sync (shareable deep links) + react to back/forward */
  useEffect(() => {
    const want = hashFromState(route, role, ttab, atab);
    if (window.location.hash !== want) history.replaceState(null, "", want);
  }, [route, role, ttab, atab]);
  useEffect(() => {
    const onHash = () => {
      const r = routeFromHash();
      setRoute(r.route);
      setRole(r.role);
      setTtab(r.ttab);
      setAtab(r.atab);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const markDone = (id: string) =>
    setProgress((p) => (p.done.includes(id) ? p : { ...p, done: [...p.done, id] }));
  const saveScore = (id: string, got: number, total: number) =>
    setProgress((p) => ({ ...p, scores: { ...p.scores, [id]: { got, total } } }));

  const go = (r: Route) => { setRoute(r); window.scrollTo({ top: 0 }); };
  const goTeacher = (t: TeacherTab) => { setRole("teacher"); setTtab(t); window.scrollTo({ top: 0 }); };
  const goAdmin = (t: AdminTab) => { setRole("admin"); setAtab(t); window.scrollTo({ top: 0 }); };

  const ctx: Ctx = { go, done, scores: progress.scores, markDone, saveScore };

  const ts: TeacherState = {
    graded,
    accept: (id, score) => setGraded((g) => ({ ...g, [id]: score })),
    extras,
    addAssignment: (a) => setExtras((p) => [a, ...p]),
    previewLesson: (courseId, lessonId) => { setRole("student"); go({ v: "lesson", courseId, lessonId }); },
  };

  const gradingPending = gradingQueue.length - Object.keys(graded).length;

  const navItem = (label: string, icon: string, active: boolean, onClick: () => void) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full text-left px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.12em] transition-colors border-l-[3px] ${
        active ? "border-[#d96a5a] bg-white/8 text-white" : "border-transparent text-white/55 hover:text-white hover:bg-white/4"
      }`}
    >
      <span className="w-4 text-center">{icon}</span>{label}
    </button>
  );

  const view = (() => {
    if (role === "teacher") return <TeacherConsole tab={ttab} setTab={goTeacher} ts={ts} />;
    if (role === "admin") return <AdminConsole tab={atab} setTab={goAdmin} />;
    switch (route.v) {
      case "dash": return <Dashboard ctx={ctx} />;
      case "course": return <CourseView ctx={ctx} courseId={route.courseId} />;
      case "lesson": return <LessonView ctx={ctx} courseId={route.courseId} lessonId={route.lessonId} />;
      case "feed": return <FeedView />;
      case "todo": return <TodoView ctx={ctx} />;
      default: return <Dashboard ctx={ctx} />;
    }
  })();

  const navActive = (v: Route["v"]) => role === "student" && route.v === v;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f4f0e1] text-[#1a2138]" style={{ fontFamily: "var(--font-sans)" }}>
      {/* sidebar */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 bg-[#1d2440] min-h-screen sticky top-0 max-h-screen">
        <div className="px-5 py-5 border-b border-white/10">
          <p className="font-serif text-xl font-bold tracking-[-0.02em] text-white">
            गुरु<span className="text-[#d96a5a]">kul</span>
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/45 mt-1">the AI classroom</p>
        </div>
        <nav className="py-4 flex-1">
          {role === "student" ? (
            <>
              {navItem("Dashboard", "◫", navActive("dash"), () => go({ v: "dash" }))}
              {navItem("Breakthroughs", "⚡", navActive("feed"), () => go({ v: "feed" }))}
              {navItem("Assignments", "✎", navActive("todo"), () => go({ v: "todo" }))}
              <p className="px-4 pt-5 pb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">My classes</p>
              {courses.map((c) => {
                const pr = courseProgress(c, done);
                const active = (route.v === "course" || route.v === "lesson") && route.courseId === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => go({ v: "course", courseId: c.id })}
                    className={`flex items-center gap-3 w-full text-left px-4 py-2 transition-colors border-l-[3px] ${
                      active ? "border-[#d96a5a] bg-white/8 text-white" : "border-transparent text-white/55 hover:text-white"
                    }`}
                  >
                    <span className={`w-2 h-2 shrink-0 ${ACCENT[c.accent].bg}`} />
                    <span className="flex-1 text-[12px] truncate">{c.title}</span>
                    <span className="font-mono text-[9px] text-white/40">{pr.pct}%</span>
                  </button>
                );
              })}
            </>
          ) : role === "teacher" ? (
            <>
              {TEACHER_TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => goTeacher(t.id)}
                  className={`flex items-center gap-3 w-full text-left px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.12em] transition-colors border-l-[3px] ${
                    ttab === t.id ? "border-[#d96a5a] bg-white/8 text-white" : "border-transparent text-white/55 hover:text-white hover:bg-white/4"
                  }`}
                >
                  <span className="w-4 text-center">{t.icon}</span>
                  <span className="flex-1">{t.label}</span>
                  {t.id === "grading" && gradingPending > 0 && (
                    <span className="font-mono text-[9px] bg-[#d96a5a] text-white px-1.5 py-0.5">{gradingPending}</span>
                  )}
                </button>
              ))}
            </>
          ) : (
            <>
              {ADMIN_TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => goAdmin(t.id)}
                  className={`flex items-center gap-3 w-full text-left px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.12em] transition-colors border-l-[3px] ${
                    atab === t.id ? "border-[#d96a5a] bg-white/8 text-white" : "border-transparent text-white/55 hover:text-white hover:bg-white/4"
                  }`}
                >
                  <span className="w-4 text-center">{t.icon}</span>{t.label}
                </button>
              ))}
            </>
          )}
        </nav>
        {/* persona + role switch */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-8 h-8 rounded-full bg-[#2c3a96] text-white grid place-items-center font-mono text-[12px] font-bold">
              {role === "student" ? "A" : role === "teacher" ? "K" : "V"}
            </span>
            <div className="min-w-0">
              <p className="text-[12px] text-white font-medium truncate">
                {role === "student" ? "Asha Iyer" : role === "teacher" ? "Kavita Menon" : "Dr. R. Venkatesh"}
              </p>
              <p className="font-mono text-[9px] text-white/45 uppercase tracking-[0.1em]">
                {role === "student" ? "Class X-B · Nalanda Public School" : role === "teacher" ? "Faculty · AI Foundations" : "Principal · Nalanda Public School"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 border border-white/20">
            {(["student", "teacher", "admin"] as const).map((r) => (
              <button
                key={r}
                onClick={() => { setRole(r); setRoute({ v: "dash" }); }}
                className={`py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] transition-colors ${role === r ? "bg-[#d96a5a] text-white" : "text-white/55 hover:text-white"}`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* mobile top bar */}
      <header className="md:hidden sticky top-0 z-20 flex items-center justify-between bg-[#1d2440] px-4 py-3">
        <p className="font-serif text-lg font-bold text-white">गुरु<span className="text-[#d96a5a]">kul</span></p>
        <div className="grid grid-cols-3 border border-white/25">
          {(["student", "teacher", "admin"] as const).map((r) => (
            <button key={r} onClick={() => { setRole(r); setRoute({ v: "dash" }); }} className={`px-2 py-1 font-mono text-[9px] uppercase tracking-[0.08em] ${role === r ? "bg-[#d96a5a] text-white" : "text-white/60"}`}>
              {r}
            </button>
          ))}
        </div>
      </header>

      {/* main */}
      <main
        className="flex-1 min-w-0 px-4 sm:px-8 lg:px-12 py-6 sm:py-10 pb-24 md:pb-12 md:border-l-2 md:border-[#a83a2c]/40"
        style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent 0, transparent 31px, rgba(44,58,150,0.05) 31px, rgba(44,58,150,0.05) 32px)" }}
      >
        <div className="max-w-[1080px]">{view}</div>
      </main>

      {/* mobile bottom tabs */}
      {role === "student" && (
        <nav className="md:hidden fixed bottom-0 inset-x-0 z-20 grid grid-cols-4 bg-[#1d2440] border-t border-white/10">
          {([
            ["Home", "◫", { v: "dash" } as Route],
            ["Classes", "▤", { v: "course", courseId: courses[0].id } as Route],
            ["Feed", "⚡", { v: "feed" } as Route],
            ["To-dos", "✎", { v: "todo" } as Route],
          ] as const).map(([label, icon, r]) => (
            <button key={label} onClick={() => go(r)} className={`py-3 text-center font-mono text-[9px] uppercase tracking-[0.1em] ${route.v === r.v ? "text-[#d96a5a]" : "text-white/55"}`}>
              <span className="block text-[13px] mb-0.5">{icon}</span>{label}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}

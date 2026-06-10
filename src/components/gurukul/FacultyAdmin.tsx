/**
 * Faculty & Admin consoles — the side of Gurukul that schools buy.
 *
 * TeacherConsole tabs:
 *  - insights:    KPIs, AI teaching assistant, Mitra safety log
 *  - grading:     AI-pre-graded subjective answers → teacher accepts/adjusts (working)
 *  - assignments: live list + a create form that actually adds (working)
 *  - planner:     modules/lessons with section toggles, teacher notes, preview-as-student
 *  - students:    roster → per-student profile with quiz history, Mitra usage,
 *                 and a parent-note drafter (copy / WhatsApp)
 *
 * AdminConsole tabs:
 *  - overview:    school-wide KPIs + section comparison
 *  - consent:     DPDP consent ledger by class, residency, audit trail
 *  - report:      printable term report for management / PTA
 *
 * Interactive state (accepted grades, created assignments) is lifted to
 * GurukulApp so it survives tab switches during a demo.
 */
import { useState } from "react";
import {
  courses, roster, teacherInsights, safetyStats, safetyLog,
  gradingQueue, teacherAssignments, teacherNotes, studentProfiles,
  sectionStats, consentLedger,
  type TAssignment, type StudentProfile,
} from "../../data/gurukul";

export type TeacherTab = "insights" | "grading" | "assignments" | "planner" | "students";
export type AdminTab = "overview" | "consent" | "report";

export const TEACHER_TABS: { id: TeacherTab; label: string; icon: string }[] = [
  { id: "insights", label: "Class insights", icon: "◫" },
  { id: "grading", label: "Grading queue", icon: "✓" },
  { id: "assignments", label: "Assignments", icon: "✎" },
  { id: "planner", label: "Lesson planner", icon: "▤" },
  { id: "students", label: "Students", icon: "☺" },
];

export const ADMIN_TABS: { id: AdminTab; label: string; icon: string }[] = [
  { id: "overview", label: "School overview", icon: "◫" },
  { id: "consent", label: "Consent & DPDP", icon: "✓" },
  { id: "report", label: "Term report", icon: "▤" },
];

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#9b9588] mb-3">{children}</h2>
);

function MobileTabs<T extends string>({ tabs, active, onPick }: { tabs: { id: T; label: string }[]; active: T; onPick: (t: T) => void }) {
  return (
    <div className="md:hidden flex gap-1.5 overflow-x-auto -mx-4 px-4 pb-1 mb-5">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onPick(t.id)}
          className={`shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] px-3 py-2 border-2 transition-colors ${
            active === t.id ? "border-[#1b2026] bg-[#1b2026] text-white" : "border-[#1b2026]/25 text-[#3a4048]"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

/* ═══════════════════════ TEACHER ═══════════════════════ */

export type TeacherState = {
  graded: Record<string, number>;                 // submissionId → accepted score
  accept: (id: string, score: number) => void;
  extras: TAssignment[];
  addAssignment: (a: TAssignment) => void;
  previewLesson: (courseId: string, lessonId: string) => void;
};

export function TeacherConsole({ tab, setTab, ts }: { tab: TeacherTab; setTab: (t: TeacherTab) => void; ts: TeacherState }) {
  return (
    <div className="grid gap-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#9b9588] mb-1">Faculty console · Class X · AI Foundations</p>
          <h1 className="font-display text-3xl font-semibold tracking-[-0.02em] text-[#15191e]">Good morning, Kavita</h1>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] border-2 border-[#1b2026] bg-white px-3 py-1.5">DPDP consent · 100% logged</span>
      </header>

      <MobileTabs tabs={TEACHER_TABS} active={tab} onPick={setTab} />

      {tab === "insights" && <InsightsView />}
      {tab === "grading" && <GradingView ts={ts} />}
      {tab === "assignments" && <AssignmentsView ts={ts} />}
      {tab === "planner" && <PlannerView ts={ts} />}
      {tab === "students" && <StudentsView />}
    </div>
  );
}

function InsightsView() {
  const kpis = [
    { k: "Active students", v: "1,284", d: "+212 this term" },
    { k: "Avg completion", v: "87%", d: "+9% this month" },
    { k: "Median quiz", v: "8.4/10", d: "AI Foundations" },
    { k: "Need a nudge", v: "23", d: "auto-flagged" },
  ];
  return (
    <div className="grid gap-6">
      <a href="/gurukul/readiness" className="group flex flex-wrap items-center justify-between gap-3 border-2 border-[#e8650a] bg-[#e8650a]/8 px-5 py-3.5 hover:bg-[#e8650a]/15 transition-colors">
        <span className="text-[14px] font-medium text-[#15191e]">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#e8650a] mr-3">✓ for leadership</span>
          Is your school AI-ready? Take the 2-minute readiness check
        </span>
        <span className="font-mono text-[12px] text-[#e8650a] group-hover:translate-x-1 transition-transform">→</span>
      </a>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((x) => (
          <div key={x.k} className="border-2 border-[#1b2026] bg-white p-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#9b9588] mb-1">{x.k}</p>
            <p className="font-display text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#15191e]">{x.v}</p>
            <p className="font-mono text-[10px] text-[#0f766e] mt-0.5">{x.d}</p>
          </div>
        ))}
      </div>

      <section>
        <H2>✦ AI teaching assistant — this week</H2>
        <div className="grid lg:grid-cols-3 gap-3">
          {teacherInsights.map((ins, i) => (
            <article key={i} className={`border-2 bg-white p-4 ${ins.tone === "warn" ? "border-[#b45309]" : "border-[#0f766e]"}`}>
              <p className={`font-mono text-[10px] uppercase tracking-[0.14em] mb-1.5 ${ins.tone === "warn" ? "text-[#b45309]" : "text-[#0f766e]"}`}>
                {ins.tone === "warn" ? "⚠ attention" : "✓ working"}
              </p>
              <h3 className="text-[14.5px] font-semibold text-[#15191e] mb-1.5">{ins.title}</h3>
              <p className="text-[13px] leading-[1.65] text-[#3a4048]">{ins.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <H2>Mitra AI tutor · safety &amp; guardrails</H2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          {safetyStats.map((s) => (
            <div key={s.k} className="border-2 border-[#1b2026] bg-white p-3.5">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#9b9588] mb-1">{s.k}</p>
              <p className="font-display text-2xl font-semibold tracking-[-0.02em] text-[#15191e]">{s.v}</p>
              <p className="font-mono text-[9.5px] text-[#0f766e] mt-0.5">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="border-2 border-[#1b2026] bg-white divide-y-2 divide-[#1b2026]/8">
          {safetyLog.map((e, i) => (
            <div key={i} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3">
              <span className="font-mono text-[10px] text-[#9b9588] w-44 shrink-0">{e.who}</span>
              <span className="text-[13px] text-[#3a4048] flex-1 min-w-[180px]">{e.what}</span>
              <span className={`font-mono text-[10px] uppercase tracking-[0.1em] ${e.tone === "warn" ? "text-[#b45309]" : e.tone === "ok" ? "text-[#0f766e]" : "text-[#3a4048]"}`}>
                → {e.action}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-[#9b9588]">
          every response gated by a 240-case eval suite · age-appropriateness · syllabus adherence · full audit log
        </p>
      </section>
    </div>
  );
}

/* ─────────── grading queue ─────────── */

function GradingView({ ts }: { ts: TeacherState }) {
  const pending = gradingQueue.filter((g) => ts.graded[g.id] === undefined);
  return (
    <div className="grid gap-4 max-w-[820px]">
      <div className="flex items-center justify-between">
        <H2>AI pre-graded · you sign off</H2>
        <p className="font-mono text-[11px] text-[#3a4048]">{pending.length} awaiting · {Object.keys(ts.graded).length} done</p>
      </div>
      {gradingQueue.map((g) => {
        const accepted = ts.graded[g.id];
        if (accepted !== undefined) {
          return (
            <div key={g.id} className="border-2 border-[#0f766e]/40 bg-[#0f766e]/5 px-4 py-3 flex flex-wrap items-center gap-3">
              <span className="font-mono text-[11px] text-[#0f766e]">✓ graded</span>
              <span className="text-[13.5px] font-medium text-[#15191e]">{g.student} · {g.cls}</span>
              <span className="text-[12.5px] text-[#3a4048] flex-1 truncate">{g.assignment}</span>
              <span className="font-mono text-[12px] font-bold text-[#0f766e]">{accepted}/{g.ai.max}</span>
            </div>
          );
        }
        return <GradingCard key={g.id} g={g} onAccept={(score) => ts.accept(g.id, score)} />;
      })}
      <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-[#9b9588]">
        ai suggests · teacher decides · every mark carries the teacher's name, not the model's
      </p>
    </div>
  );
}

function GradingCard({ g, onAccept }: { g: (typeof gradingQueue)[number]; onAccept: (score: number) => void }) {
  const [score, setScore] = useState(g.ai.score);
  return (
    <article className="border-2 border-[#1b2026] bg-white">
      <header className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2.5 bg-[#1b2026] text-white">
        <span className="text-[13px] font-medium">{g.student}</span>
        <span className="font-mono text-[10px] text-white/60">{g.cls} · {g.assignment}</span>
        {g.ai.flag && (
          <span className={`ml-auto font-mono text-[9px] uppercase tracking-[0.1em] px-1.5 py-0.5 ${g.ai.flag.startsWith("⚠") || g.ai.flag.startsWith("low") ? "bg-[#ffd84d] text-[#15191e]" : "bg-white/15 text-white"}`}>
            {g.ai.flag}
          </span>
        )}
      </header>
      <div className="p-4 grid gap-3">
        <p className="text-[13px] text-[#9b9588]"><span className="font-mono text-[10px] uppercase tracking-[0.12em] mr-2">Q</span>{g.question}</p>
        <blockquote className="border-l-4 border-[#1b2026]/20 pl-3 text-[14px] leading-[1.7] text-[#15191e]">{g.answer}</blockquote>
        <div className="border-2 border-[#0f766e]/30 bg-[#0f766e]/5 p-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#0f766e] mb-1">AI first pass · suggested {g.ai.score}/{g.ai.max}</p>
          <p className="text-[13px] leading-[1.65] text-[#3a4048]">{g.ai.rationale}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[#3a4048]">
            Marks
            <select value={score} onChange={(e) => setScore(Number(e.target.value))} className="border-2 border-[#1b2026] bg-white px-2 py-1.5 font-mono text-[13px]">
              {Array.from({ length: g.ai.max + 1 }, (_, i) => <option key={i} value={i}>{i}/{g.ai.max}</option>)}
            </select>
          </label>
          <button onClick={() => onAccept(score)} className="bg-[#0f766e] hover:bg-[#0a5a54] text-white font-mono text-[11px] uppercase tracking-[0.16em] px-5 py-2.5 transition-colors">
            {score === g.ai.score ? "Accept AI grade ✓" : `Override → ${score}/${g.ai.max}`}
          </button>
        </div>
      </div>
    </article>
  );
}

/* ─────────── assignments ─────────── */

function AssignmentsView({ ts }: { ts: TeacherState }) {
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("AI Foundations");
  const [secs, setSecs] = useState<string[]>(["X-B"]);
  const [due, setDue] = useState("Mon, 8 am");
  const all = [...ts.extras, ...teacherAssignments];
  const tone = { open: "bg-[#1b2026]/8 text-[#3a4048]", grading: "bg-[#ffd84d] text-[#15191e]", closed: "bg-[#0f766e] text-white" };

  const create = () => {
    if (!title.trim() || secs.length === 0) return;
    ts.addAssignment({
      id: `new-${ts.extras.length + 1}`,
      title: title.trim(),
      course,
      sections: secs,
      due,
      submitted: 0,
      total: secs.length * 42,
      status: "open",
    });
    setTitle("");
  };

  return (
    <div className="grid gap-6 max-w-[820px]">
      <section className="border-2 border-[#1b2026] bg-white p-5">
        <H2>Create assignment</H2>
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="grid gap-1 sm:col-span-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#9b9588]">Title</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Quiz · Neural networks" className="border-2 border-[#1b2026]/30 focus:border-[#e8650a] outline-none px-3 py-2.5 text-[14px] bg-[#faf7f0]" />
          </label>
          <label className="grid gap-1">
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#9b9588]">Course</span>
            <select value={course} onChange={(e) => setCourse(e.target.value)} className="border-2 border-[#1b2026]/30 px-3 py-2.5 text-[14px] bg-[#faf7f0]">
              {courses.map((c) => <option key={c.id}>{c.title}</option>)}
            </select>
          </label>
          <label className="grid gap-1">
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#9b9588]">Due</span>
            <select value={due} onChange={(e) => setDue(e.target.value)} className="border-2 border-[#1b2026]/30 px-3 py-2.5 text-[14px] bg-[#faf7f0]">
              {["Today, 9 pm", "Tomorrow, 8 am", "Mon, 8 am", "Fri, 5 pm"].map((d) => <option key={d}>{d}</option>)}
            </select>
          </label>
          <div className="grid gap-1 sm:col-span-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#9b9588]">Sections</span>
            <div className="flex gap-2">
              {["X-A", "X-B", "X-C"].map((s) => (
                <button key={s} onClick={() => setSecs((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s])}
                  className={`font-mono text-[11px] px-3 py-2 border-2 transition-colors ${secs.includes(s) ? "border-[#e8650a] bg-[#e8650a]/10 text-[#15191e]" : "border-[#1b2026]/25 text-[#9b9588]"}`}>
                  {secs.includes(s) ? "✓ " : ""}{s}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button onClick={create} disabled={!title.trim() || secs.length === 0}
          className="mt-4 bg-[#e8650a] disabled:bg-[#1b2026]/20 disabled:cursor-not-allowed hover:bg-[#c75100] text-white font-mono text-[11px] uppercase tracking-[0.16em] px-6 py-3 transition-colors">
          Assign to {secs.length} section{secs.length === 1 ? "" : "s"} →
        </button>
      </section>

      <section>
        <H2>This term</H2>
        <div className="border-2 border-[#1b2026] bg-white divide-y-2 divide-[#1b2026]/10">
          {all.map((a) => (
            <div key={a.id} className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-4 py-3.5">
              <span className={`font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-1 ${tone[a.status]}`}>{a.status}</span>
              <span className="flex-1 min-w-[200px]">
                <span className="block text-[14px] font-medium text-[#15191e]">{a.title}</span>
                <span className="block font-mono text-[10px] text-[#9b9588] mt-0.5">{a.course} · {a.sections.join(" ")} · due {a.due}</span>
              </span>
              <span className="font-mono text-[11px] text-[#3a4048] w-28 text-right">
                {a.submitted}/{a.total} in
                <span className="block h-1 mt-1 bg-[#1b2026]/10"><span className="block h-full bg-[#0f766e]" style={{ width: `${(a.submitted / a.total) * 100}%` }} /></span>
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ─────────── lesson planner ─────────── */

function PlannerView({ ts }: { ts: TeacherState }) {
  const c = courses[0]; // AI Foundations — the section Kavita teaches
  const [live, setLive] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(c.modules.flatMap((m, mi) => m.lessons.map((l) => [l.id, mi < 2 ? ["X-A", "X-B", "X-C"] : mi === 2 ? ["X-B"] : []])))
  );
  const toggle = (lid: string, sec: string) =>
    setLive((p) => ({ ...p, [lid]: p[lid]?.includes(sec) ? p[lid].filter((s) => s !== sec) : [...(p[lid] ?? []), sec] }));

  return (
    <div className="grid gap-6 max-w-[820px]">
      <p className="text-[13.5px] leading-[1.65] text-[#3a4048] border-l-2 border-[#e8650a] pl-3">
        Control what each section sees, when. Teacher notes stay private to faculty.
        <strong className="font-semibold text-[#15191e]"> Preview</strong> opens the lesson exactly as a student sees it.
      </p>
      {c.modules.map((m, mi) => (
        <section key={m.id}>
          <H2>Module {mi + 1} — {m.title}</H2>
          <div className="border-2 border-[#1b2026] bg-white divide-y-2 divide-[#1b2026]/10">
            {m.lessons.map((l) => (
              <div key={l.id} className="px-4 py-3.5">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="flex-1 min-w-[180px]">
                    <span className="block text-[14px] font-medium text-[#15191e]">{l.title}</span>
                    <span className="block font-mono text-[10px] text-[#9b9588] mt-0.5">{l.kind} · {l.minutes} min{l.quiz ? ` · quiz ×${l.quiz.length}` : ""}</span>
                  </span>
                  <span className="flex gap-1.5">
                    {["X-A", "X-B", "X-C"].map((s) => (
                      <button key={s} disabled={!!l.locked} onClick={() => toggle(l.id, s)}
                        className={`font-mono text-[9.5px] px-2 py-1 border-2 transition-colors disabled:opacity-35 ${live[l.id]?.includes(s) ? "border-[#0f766e] bg-[#0f766e]/10 text-[#0f766e]" : "border-[#1b2026]/20 text-[#9b9588]"}`}>
                        {s}
                      </button>
                    ))}
                  </span>
                  <button disabled={!!l.locked} onClick={() => ts.previewLesson(c.id, l.id)}
                    className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#e8650a] hover:underline disabled:opacity-35 disabled:no-underline">
                    preview →
                  </button>
                </div>
                {teacherNotes[l.id] && (
                  <p className="mt-2 text-[12.5px] leading-[1.6] text-[#3a4048] bg-[#ffd84d]/20 border-l-2 border-[#ffd84d] pl-3 py-1.5">
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#b45309] mr-2">teacher note</span>
                    {teacherNotes[l.id]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

/* ─────────── students ─────────── */

function StudentsView() {
  const [sel, setSel] = useState<string | null>(null);
  const flagTone = { topper: "bg-[#0f766e] text-white", nudge: "bg-[#ffd84d] text-[#15191e]", "at-risk": "bg-[#c2410c] text-white" } as const;
  const profile: StudentProfile | null = sel
    ? studentProfiles[sel] ?? {
        name: sel,
        cls: roster.find((r) => r.name === sel)?.cls ?? "X",
        progress: roster.find((r) => r.name === sel)?.progress ?? 0,
        quizzes: [{ title: "What is AI, really?", score: "—" }],
        mitra: { asked: 0, themes: [] },
        lastActive: roster.find((r) => r.name === sel)?.last ?? "—",
        flag: (roster.find((r) => r.name === sel)?.flag ?? null) as StudentProfile["flag"],
        insight: "Full profile is generated as the student works through lessons and quizzes.",
      }
    : null;

  if (profile) return <StudentProfileView p={profile} back={() => setSel(null)} />;

  return (
    <section className="max-w-[860px]">
      <H2>Roster · tap a student for the full picture</H2>
      <div className="border-2 border-[#1b2026] bg-white overflow-x-auto">
        <div className="grid grid-cols-[1.6fr_0.6fr_1.4fr_0.8fr_1fr_0.9fr] gap-3 px-4 py-2.5 bg-[#1b2026] min-w-[640px]">
          {["Student", "Class", "Progress", "Quiz avg", "Last active", "Status"].map((h) => (
            <span key={h} className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/65">{h}</span>
          ))}
        </div>
        {roster.map((s) => (
          <button key={s.name} onClick={() => setSel(s.name)} className="w-full text-left grid grid-cols-[1.6fr_0.6fr_1.4fr_0.8fr_1fr_0.9fr] gap-3 items-center px-4 py-3 border-t-2 border-[#1b2026]/8 min-w-[640px] hover:bg-[#faf7f0] transition-colors">
          <span className="text-[13.5px] font-medium text-[#15191e] truncate">{s.name} <span className="font-mono text-[10px] text-[#e8650a]">→</span></span>
            <span className="font-mono text-[11px] text-[#3a4048]">{s.cls}</span>
            <span className="flex items-center gap-2">
              <span className="flex-1 h-1.5 bg-[#1b2026]/10"><span className="block h-full bg-[#e8650a]" style={{ width: `${s.progress}%` }} /></span>
              <span className="font-mono text-[10px] text-[#3a4048] w-8">{s.progress}%</span>
            </span>
            <span className="font-mono text-[11px] text-[#3a4048]">{s.quizAvg}</span>
            <span className="font-mono text-[10px] text-[#9b9588]">{s.last}</span>
            <span>
              {s.flag
                ? <span className={`font-mono text-[9px] uppercase tracking-[0.12em] px-1.5 py-0.5 ${flagTone[s.flag]}`}>{s.flag}</span>
                : <span className="font-mono text-[10px] text-[#9b9588]">on track</span>}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function StudentProfileView({ p, back }: { p: StudentProfile; back: () => void }) {
  const [note, setNote] = useState(false);
  const parentNote =
    `Namaste, this is ${"Kavita Menon"} — ${p.name}'s AI Foundations teacher at Nalanda Public School. ` +
    (p.flag === "at-risk"
      ? `${p.name.split(" ")[0]} made a strong start this term but has not been able to log in for a few days. No concern about ability — we suspect device access in the evenings. We've enabled the offline lesson pack; if you can share what works best at home, we'll adjust. `
      : p.flag === "topper"
      ? `${p.name.split(" ")[0]} is performing wonderfully — working ahead of the class with consistently excellent quiz scores. We'd like to nominate ${p.name.split(" ")[0]} for the advanced Build with AI elective next term. `
      : `${p.name.split(" ")[0]} is making steady progress — ${p.progress}% of the course complete with honest, improving quiz work. `) +
    `You can see the full progress report in the parent app. Happy to talk at the next PTM. 🙏`;

  return (
    <div className="grid gap-4 max-w-[760px]">
      <button onClick={back} className="text-left font-mono text-[11px] uppercase tracking-[0.16em] text-[#9b9588] hover:text-[#e8650a]">← roster</button>

      <header className="border-2 border-[#1b2026] bg-[#1b2026] text-white p-5 flex flex-wrap items-center gap-4">
        <span className="w-12 h-12 rounded-full bg-[#e8650a] grid place-items-center font-display text-lg font-bold">{p.name[0]}</span>
        <div className="flex-1">
          <h1 className="font-display text-xl font-semibold tracking-[-0.01em]">{p.name}</h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/60 mt-0.5">{p.cls} · last active {p.lastActive}</p>
        </div>
        {p.flag && <span className="font-mono text-[10px] uppercase tracking-[0.12em] bg-white text-[#15191e] px-2 py-1">{p.flag}</span>}
      </header>

      <section className="border-2 border-[#1b2026] bg-white p-4">
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#0f766e] mb-1.5">✦ AI summary for the teacher</p>
        <p className="text-[14px] leading-[1.7] text-[#3a4048]">{p.insight}</p>
      </section>

      <div className="grid sm:grid-cols-2 gap-4">
        <section className="border-2 border-[#1b2026] bg-white p-4">
          <H2>Quiz history</H2>
          <ul className="grid gap-2">
            {p.quizzes.map((q) => (
              <li key={q.title} className="flex items-center justify-between gap-3 text-[13px] text-[#3a4048]">
                <span className="truncate">{q.title}</span>
                <span className="font-mono text-[12px] font-bold text-[#15191e]">{q.score}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 pt-3 border-t-2 border-[#1b2026]/10">
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#9b9588]">Course progress</span>
            <div className="mt-1.5 h-2 bg-[#1b2026]/10"><div className="h-full bg-[#e8650a]" style={{ width: `${p.progress}%` }} /></div>
          </div>
        </section>
        <section className="border-2 border-[#1b2026] bg-white p-4">
          <H2>Mitra usage</H2>
          <p className="font-display text-3xl font-semibold tracking-[-0.02em] text-[#15191e]">{p.mitra.asked}</p>
          <p className="font-mono text-[10px] text-[#9b9588] mb-3">doubts asked this fortnight</p>
          <div className="flex flex-wrap gap-1.5">
            {p.mitra.themes.map((t) => (
              <span key={t} className="font-mono text-[10px] border border-[#0f766e]/40 text-[#0f766e] px-2 py-0.5">{t}</span>
            ))}
            {p.mitra.themes.length === 0 && <span className="font-mono text-[10px] text-[#9b9588]">no usage yet</span>}
          </div>
        </section>
      </div>

      <section className="border-2 border-[#e8650a] bg-white p-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <p className="text-[14px] font-semibold text-[#15191e]">Parent communication</p>
          {!note && (
            <button onClick={() => setNote(true)} className="bg-[#e8650a] hover:bg-[#c75100] text-white font-mono text-[10px] uppercase tracking-[0.16em] px-4 py-2.5 transition-colors">
              ✎ Draft parent note
            </button>
          )}
        </div>
        {note && (
          <>
            <p className="mt-3 text-[13.5px] leading-[1.75] text-[#3a4048] border-l-2 border-[#e8650a] pl-3 bg-[#e8650a]/5 py-2.5 pr-3">{parentNote}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <button onClick={() => navigator.clipboard?.writeText(parentNote)} className="border-2 border-[#1b2026] hover:bg-[#1b2026] hover:text-white font-mono text-[10px] uppercase tracking-[0.14em] px-4 py-2 transition-colors">
                ⧉ Copy
              </button>
              <a href={`https://wa.me/?text=${encodeURIComponent(parentNote)}`} target="_blank" rel="noopener noreferrer" className="border-2 border-[#0f766e] text-[#0f766e] hover:bg-[#0f766e] hover:text-white font-mono text-[10px] uppercase tracking-[0.14em] px-4 py-2 transition-colors">
                ✆ Send on WhatsApp
              </a>
              <span className="font-mono text-[9px] text-[#9b9588] self-center">drafted by AI · sent by you, never automatically</span>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

/* ═══════════════════════ ADMIN ═══════════════════════ */

export function AdminConsole({ tab, setTab }: { tab: AdminTab; setTab: (t: AdminTab) => void }) {
  return (
    <div className="grid gap-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#9b9588] mb-1">Principal's console · Nalanda Public School</p>
          <h1 className="font-display text-3xl font-semibold tracking-[-0.02em] text-[#15191e]">Good morning, Dr. Venkatesh</h1>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] border-2 border-[#1b2026] bg-white px-3 py-1.5">Term 1 · Week 9 of 14</span>
      </header>

      <MobileTabs tabs={ADMIN_TABS} active={tab} onPick={setTab} />

      {tab === "overview" && <AdminOverview />}
      {tab === "consent" && <ConsentView />}
      {tab === "report" && <ReportView />}
    </div>
  );
}

function AdminOverview() {
  const kpis = [
    { k: "Sections live", v: "9", d: "across IX–XI" },
    { k: "Students active", v: "1,284", d: "of 1,310 enrolled" },
    { k: "School completion", v: "82%", d: "term to date" },
    { k: "Teachers onboarded", v: "21/24", d: "3 join next week" },
  ];
  const tone = { "on track": "text-[#0f766e]", watch: "text-[#b45309]" } as const;
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((x) => (
          <div key={x.k} className="border-2 border-[#1b2026] bg-white p-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#9b9588] mb-1">{x.k}</p>
            <p className="font-display text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#15191e]">{x.v}</p>
            <p className="font-mono text-[10px] text-[#0f766e] mt-0.5">{x.d}</p>
          </div>
        ))}
      </div>

      <section>
        <H2>Section comparison · this term</H2>
        <div className="border-2 border-[#1b2026] bg-white overflow-x-auto">
          <div className="grid grid-cols-[0.8fr_0.7fr_1fr_1.5fr_0.8fr_0.9fr_0.9fr] gap-3 px-4 py-2.5 bg-[#1b2026] min-w-[680px]">
            {["Section", "Students", "Lead teacher", "Completion", "Quiz median", "Mitra doubts", "Status"].map((h) => (
              <span key={h} className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/65">{h}</span>
            ))}
          </div>
          {sectionStats.map((s) => (
            <div key={s.cls} className="grid grid-cols-[0.8fr_0.7fr_1fr_1.5fr_0.8fr_0.9fr_0.9fr] gap-3 items-center px-4 py-3 border-t-2 border-[#1b2026]/8 min-w-[680px]">
              <span className="text-[13.5px] font-semibold text-[#15191e]">{s.cls}</span>
              <span className="font-mono text-[11px] text-[#3a4048]">{s.students}</span>
              <span className="text-[12.5px] text-[#3a4048]">{s.teacher}</span>
              <span className="flex items-center gap-2">
                <span className="flex-1 h-1.5 bg-[#1b2026]/10"><span className="block h-full bg-[#e8650a]" style={{ width: `${s.completion}%` }} /></span>
                <span className="font-mono text-[10px] text-[#3a4048] w-8">{s.completion}%</span>
              </span>
              <span className="font-mono text-[11px] text-[#3a4048]">{s.quizMedian}</span>
              <span className="font-mono text-[11px] text-[#3a4048]">{s.mitraQs}</span>
              <span className={`font-mono text-[10px] uppercase tracking-[0.1em] ${tone[s.status as keyof typeof tone]}`}>{s.status}</span>
            </div>
          ))}
        </div>
        <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-[#9b9588]">
          x-a flagged: completion 11 points under school average — faculty insight suggests device-access pattern, offline packs assigned
        </p>
      </section>
    </div>
  );
}

function ConsentView() {
  const pct = Math.round((consentLedger.consented / consentLedger.total) * 100);
  return (
    <div className="grid gap-6 max-w-[820px]">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { k: "Enrolled students", v: String(consentLedger.total), d: "across IX–XII" },
          { k: "Parental consent", v: `${pct}%`, d: `${consentLedger.consented} verified` },
          { k: "Pending consent", v: String(consentLedger.pending), d: "accounts locked until verified" },
          { k: "Last audit", v: "Clean", d: consentLedger.lastAudit },
        ].map((x) => (
          <div key={x.k} className="border-2 border-[#1b2026] bg-white p-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#9b9588] mb-1">{x.k}</p>
            <p className="font-display text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#15191e]">{x.v}</p>
            <p className="font-mono text-[10px] text-[#0f766e] mt-0.5">{x.d}</p>
          </div>
        ))}
      </div>

      <section>
        <H2>Consent by class</H2>
        <div className="border-2 border-[#1b2026] bg-white divide-y-2 divide-[#1b2026]/8">
          {consentLedger.byClass.map((c) => (
            <div key={c.cls} className="flex items-center gap-4 px-4 py-3">
              <span className="text-[13.5px] font-medium text-[#15191e] w-24">{c.cls}</span>
              <span className="flex-1 h-1.5 bg-[#1b2026]/10">
                <span className="block h-full bg-[#0f766e]" style={{ width: `${(c.consented / (c.consented + c.pending)) * 100}%` }} />
              </span>
              <span className="font-mono text-[11px] text-[#3a4048]">{c.consented} ✓</span>
              <span className={`font-mono text-[11px] ${c.pending > 0 ? "text-[#b45309]" : "text-[#9b9588]"}`}>{c.pending} pending</span>
            </div>
          ))}
        </div>
      </section>

      <section className="border-2 border-[#1b2026] bg-white p-5">
        <H2>DPDP posture — what this school can show an auditor</H2>
        <ul className="grid gap-2.5 text-[13.5px] leading-[1.65] text-[#3a4048]">
          <li><span className="text-[#0f766e] font-mono mr-2">✓</span><strong className="font-semibold text-[#15191e]">Verifiable parental consent</strong> recorded per student, timestamped, exportable — accounts stay locked until verified.</li>
          <li><span className="text-[#0f766e] font-mono mr-2">✓</span><strong className="font-semibold text-[#15191e]">Purpose limitation:</strong> learning-progress data only; no behavioural profiling, no advertising use, ever.</li>
          <li><span className="text-[#0f766e] font-mono mr-2">✓</span><strong className="font-semibold text-[#15191e]">{consentLedger.residency}.</strong></li>
          <li><span className="text-[#0f766e] font-mono mr-2">✓</span><strong className="font-semibold text-[#15191e]">Right to erasure:</strong> student-initiated or school-initiated deletion completes within 72 hours, certificate issued.</li>
        </ul>
        <button onClick={() => window.print()} className="mt-4 border-2 border-[#1b2026] hover:bg-[#1b2026] hover:text-white font-mono text-[10px] uppercase tracking-[0.14em] px-4 py-2 transition-colors">
          ⎙ Export consent ledger
        </button>
      </section>
    </div>
  );
}

function ReportView() {
  return (
    <div className="grid gap-4 max-w-[820px]">
      <div className="flex items-center justify-between flex-wrap gap-3 print:hidden">
        <p className="text-[13.5px] text-[#3a4048] leading-[1.6] max-w-[52ch]">
          The artifact your office forwards to management and the PTA — generated each term, no manual compilation.
        </p>
        <button onClick={() => window.print()} className="bg-[#1b2026] hover:bg-[#2a323c] text-white font-mono text-[10px] uppercase tracking-[0.16em] px-5 py-2.5 transition-colors">
          ⎙ Print / save as PDF
        </button>
      </div>

      <article className="border-2 border-[#1b2026] bg-white p-6 sm:p-8">
        <header className="border-b-2 border-[#1b2026] pb-4 mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-lg font-bold tracking-[-0.02em] text-[#15191e]">गुरु<span className="text-[#e8650a]">kul</span> · Term Report</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#9b9588] mt-1">Nalanda Public School · Term 1, AY 2026–27 · generated week 9</p>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] border border-[#1b2026]/30 px-2 py-1 text-[#3a4048]">for management &amp; PTA</span>
        </header>

        <p className="text-[14px] leading-[1.75] text-[#3a4048] mb-5">
          Nine sections across Classes IX–XI completed nine weeks of the AI Foundations programme
          (CBSE skill subject 417/843-aligned). <strong className="font-semibold text-[#15191e]">1,284 of 1,310 enrolled students are active</strong>,
          with 82% average completion and a school-wide quiz median of 8.1/10. The Mitra tutor answered
          1,412 student doubts this week alone — 37 requests for direct exam answers were declined and
          coached instead, with zero unsafe responses across the term.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#1b2026] border-2 border-[#1b2026] mb-5">
          {[
            { k: "Active students", v: "1,284" },
            { k: "Completion", v: "82%" },
            { k: "Quiz median", v: "8.1/10" },
            { k: "Unsafe AI responses", v: "0" },
          ].map((x) => (
            <div key={x.k} className="bg-white p-3.5 text-center">
              <p className="font-display text-2xl font-semibold tracking-[-0.02em] text-[#15191e]">{x.v}</p>
              <p className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-[#9b9588] mt-1">{x.k}</p>
            </div>
          ))}
        </div>

        <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9b9588] mb-2">Highlights for the committee</h3>
        <ul className="grid gap-2 text-[13.5px] leading-[1.65] text-[#3a4048] mb-5">
          <li>· XI-Science leads the school at 92% completion; X-B's prompting lab median (9.1/10) is the strongest single result this term.</li>
          <li>· 23 students auto-flagged for support; 14 already recovered after offline lesson packs and teacher follow-up.</li>
          <li>· Parental consent verified for 97% of enrolled students; remaining accounts stay locked until consent lands.</li>
          <li>· Recommendation: extend the programme to Class XII electives and add the Hindi vernacular pack next term.</li>
        </ul>

        <footer className="pt-4 border-t-2 border-[#1b2026]/15 flex items-end justify-between gap-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#9b9588]">
            auto-generated by gurukul · reviewed by faculty before circulation
          </p>
          <div className="text-right">
            <p className="font-display text-base text-[#15191e]" style={{ fontStyle: "italic" }}>K. Menon</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#9b9588]">programme lead · AI Foundations</p>
          </div>
        </footer>
      </article>
    </div>
  );
}

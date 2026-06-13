/**
 * Mitra — the AI study buddy, scripted demo preview.
 *
 * A floating button in lesson view opening a chat panel that plays canned
 * threads with a typewriter effect. Three threads are chosen to make the
 * pitch points VISIBLE: a real coached explanation, a refusal of an
 * exam-answer request (guardrail), and a Hindi reply (vernacular).
 * Clearly badged "simulated preview" — no model is called.
 */
import { useEffect, useRef, useState } from "react";
import { mitraThreads, type MitraMsg } from "../../../data/gurukul";

type Shown = MitraMsg & { partial?: string };

export default function Mitra() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState<Shown[]>([]);
  const [busy, setBusy] = useState(false);
  const [used, setUsed] = useState<Set<string>>(new Set());
  const scroller = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [shown]);

  const play = (threadId: string) => {
    const thread = mitraThreads.find((t) => t.id === threadId);
    if (!thread || busy) return;
    setBusy(true);
    setUsed((u) => new Set(u).add(threadId));
    const [student, reply] = thread.msgs;
    setShown((s) => [...s, student]);

    // thinking pause, then typewriter
    timers.current.push(window.setTimeout(() => {
      setShown((s) => [...s, { ...reply, partial: "" }]);
      let i = 0;
      const tick = () => {
        i = Math.min(reply.text.length, i + 3);
        setShown((s) => {
          const copy = [...s];
          copy[copy.length - 1] = { ...reply, partial: reply.text.slice(0, i) };
          return copy;
        });
        if (i < reply.text.length) {
          timers.current.push(window.setTimeout(tick, 14));
        } else {
          setShown((s) => {
            const copy = [...s];
            copy[copy.length - 1] = { ...reply };
            return copy;
          });
          setBusy(false);
        }
      };
      tick();
    }, 900));
  };

  return (
    <>
      {/* floating launcher — above the mobile tab bar */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-20 md:bottom-6 right-4 md:right-6 z-30 flex items-center gap-2 bg-[#2f6b4f] hover:bg-[#26573f] text-white font-mono text-[11px] uppercase tracking-[0.16em] px-4 py-3 shadow-[4px_4px_0_rgba(27,32,38,0.25)] transition-colors ${open ? "hidden" : ""}`}
      >
        <span className="relative flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-[#9ad0ab] animate-ping opacity-70" />
          <span className="relative w-2 h-2 rounded-full bg-[#9ad0ab]" />
        </span>
        Ask Mitra
      </button>

      {open && (
        <div className="fixed inset-0 md:inset-auto md:bottom-6 md:right-6 z-40 md:w-[400px] md:max-h-[600px] flex flex-col bg-white border-2 border-[#1d2440] md:shadow-[8px_8px_0_rgba(27,32,38,0.2)]">
          {/* header */}
          <header className="flex items-center justify-between gap-3 px-4 py-3 bg-[#2f6b4f] text-white shrink-0">
            <div>
              <p className="font-serif text-[15px] font-semibold leading-tight">Mitra · AI study buddy</p>
              <p className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-white/70 mt-0.5">
                simulated preview · syllabus-locked · eval-gated
              </p>
            </div>
            <button onClick={() => setOpen(false)} className="font-mono text-lg leading-none text-white/80 hover:text-white px-1" aria-label="Close Mitra">
              ✕
            </button>
          </header>

          {/* messages */}
          <div ref={scroller} className="flex-1 overflow-y-auto p-4 grid gap-3 content-start bg-[#fbf7ea] min-h-[220px]">
            {shown.length === 0 && (
              <p className="text-[13px] leading-[1.65] text-[#3e4358] border-l-2 border-[#2f6b4f] pl-3">
                Namaste! I'm Mitra — I help you <strong>understand</strong>, not copy.
                This is a scripted preview of the tutor that ships with Gurukul; try one of the
                questions below to see how I behave.
              </p>
            )}
            {shown.map((m, i) => (
              <div key={i} className={m.from === "student" ? "justify-self-end max-w-[85%]" : "justify-self-start max-w-[92%]"}>
                <div className={`px-3.5 py-2.5 text-[13.5px] leading-[1.65] ${
                  m.from === "student"
                    ? "bg-[#1d2440] text-white"
                    : "bg-white border-2 border-[#1d2440]/15 text-[#3e4358]"
                }`}>
                  {m.partial !== undefined ? m.partial : m.text}
                  {m.partial !== undefined && <span className="inline-block w-1.5 h-3.5 bg-[#2f6b4f] ml-0.5 animate-pulse align-middle" />}
                </div>
                {m.guard && m.partial === undefined && (
                  <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.14em] text-[#2f6b4f]">
                    ✓ {m.guard}
                  </p>
                )}
              </div>
            ))}
            {busy && shown[shown.length - 1]?.from === "student" && (
              <p className="font-mono text-[10px] text-[#9b9588] animate-pulse">mitra is thinking…</p>
            )}
          </div>

          {/* canned prompts */}
          <footer className="p-3 border-t-2 border-[#1d2440]/10 bg-white shrink-0">
            <p className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-[#9b9588] mb-2">Try asking</p>
            <div className="flex flex-wrap gap-2">
              {mitraThreads.map((t) => (
                <button
                  key={t.id}
                  disabled={busy || used.has(t.id)}
                  onClick={() => play(t.id)}
                  className="text-left border-2 border-[#2f6b4f]/40 hover:border-[#2f6b4f] disabled:opacity-40 disabled:cursor-not-allowed text-[#2f6b4f] text-[12px] px-2.5 py-1.5 transition-colors"
                >
                  {t.chip}
                </button>
              ))}
            </div>
          </footer>
        </div>
      )}
    </>
  );
}

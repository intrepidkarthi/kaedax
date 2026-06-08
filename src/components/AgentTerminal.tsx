import { useEffect, useRef, useState } from "react";

type Line = {
  agent: string;
  level: "info" | "ok" | "warn" | "act";
  msg: string;
};

const SCRIPT: Line[] = [
  { agent: "scope", level: "info", msg: "parsing brief → 14 features, 3 integrations" },
  { agent: "scope", level: "act",  msg: "drafting spec.md · ADR-0001..ADR-0007" },
  { agent: "scope", level: "ok",   msg: "spec accepted by founder · cycle locked" },
  { agent: "build", level: "info", msg: "scaffolding next.js + drizzle + clerk" },
  { agent: "build", level: "act",  msg: "shipping module auth/ · 12 files · 0 errors" },
  { agent: "build", level: "act",  msg: "shipping module billing/ · stripe webhooks wired" },
  { agent: "qa",    level: "info", msg: "generating 38 vitest specs from spec.md" },
  { agent: "qa",    level: "ok",   msg: "38/38 pass · coverage 91% · perf budget green" },
  { agent: "deploy", level: "act", msg: "vercel preview → kaedax-build.vercel.app" },
  { agent: "deploy", level: "ok",  msg: "lighthouse 99 / 100 / 100 / 100" },
  { agent: "monitor", level: "info", msg: "sentry + axiom + cron heartbeats armed" },
  { agent: "scope", level: "warn", msg: "spotted ambiguity in onboarding flow · pinging human" },
  { agent: "build", level: "act",  msg: "applying review notes · 4 files patched" },
  { agent: "qa",    level: "ok",   msg: "regression suite green · ready for handoff" },
  { agent: "deploy", level: "ok",  msg: "production cutover at T+715h · 5h to spare" },
];

const LEVEL_COLOR: Record<Line["level"], string> = {
  info: "var(--color-bone-400)",
  ok:   "var(--color-volt-400)",
  warn: "var(--color-warn-400)",
  act:  "var(--color-bone-50)",
};

const LEVEL_TAG: Record<Line["level"], string> = {
  info: "INFO",
  ok:   " OK ",
  warn: "WARN",
  act:  " >> ",
};

export default function AgentTerminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let idx = 0;

    async function loop() {
      while (!cancelled) {
        const line = SCRIPT[idx % SCRIPT.length];
        // type out
        let buf = "";
        for (const ch of line.msg) {
          if (cancelled) return;
          buf += ch;
          setTyping(buf);
          await new Promise((r) => setTimeout(r, 12 + Math.random() * 22));
        }
        if (cancelled) return;
        setLines((prev) => [...prev.slice(-9), line]);
        setTyping("");
        await new Promise((r) => setTimeout(r, 750));
        idx++;
      }
    }
    loop();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines, typing]);

  return (
    <div className="relative border border-[color:var(--color-ink-700)] bg-[color:var(--color-ink-900)]/85 backdrop-blur-sm overflow-hidden">
      {/* Terminal chrome */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 border-b border-[color:var(--color-ink-700)] bg-[color:var(--color-ink-850)] gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <span className="hidden sm:inline w-2 h-2 rounded-full bg-[color:var(--color-ink-600)]"></span>
          <span className="w-2 h-2 rounded-full bg-[color:var(--color-ink-600)]"></span>
          <span className="w-2 h-2 rounded-full bg-[color:var(--color-volt-400)]"></span>
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.2em] uppercase text-[color:var(--color-bone-500)] ml-1.5 sm:ml-3 truncate">
            <span className="sm:hidden">cycle · live</span>
            <span className="hidden sm:inline">kaedax-cycle · live agents</span>
          </span>
        </div>
        <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[color:var(--color-volt-400)] shrink-0">
          ● online
        </span>
      </div>

      {/* Log body */}
      <div
        ref={containerRef}
        className="font-mono text-[10.5px] sm:text-[11.5px] md:text-[12.5px] leading-[1.65] sm:leading-[1.7] p-3 sm:p-4 md:p-5 h-[260px] sm:h-[280px] md:h-[320px] overflow-hidden"
      >
        {lines.map((l, i) => (
          <div key={i} className="flex gap-2 sm:gap-3 opacity-90 whitespace-nowrap">
            <span className="text-[color:var(--color-bone-500)] tabular w-[46px] sm:w-[62px] shrink-0">
              T+{String(i * 47).padStart(3, "0")}h
            </span>
            <span
              className="shrink-0 w-[44px] sm:w-[52px]"
              style={{ color: LEVEL_COLOR[l.level] }}
            >
              [{LEVEL_TAG[l.level]}]
            </span>
            <span className="text-[color:var(--color-volt-400)] shrink-0 w-[88px] sm:w-[100px]">
              {l.agent}.agent
            </span>
            <span className="text-[color:var(--color-bone-200)] truncate min-w-0">{l.msg}</span>
          </div>
        ))}
        {typing && (
          <div className="flex gap-2 sm:gap-3 whitespace-nowrap">
            <span className="text-[color:var(--color-bone-500)] tabular w-[46px] sm:w-[62px] shrink-0">
              T+{String(lines.length * 47).padStart(3, "0")}h
            </span>
            <span className="shrink-0 w-[44px] sm:w-[52px] text-[color:var(--color-bone-50)]">
              [ &gt;&gt; ]
            </span>
            <span className="text-[color:var(--color-volt-400)] shrink-0 w-[88px] sm:w-[100px]">
              {SCRIPT[lines.length % SCRIPT.length]?.agent}.agent
            </span>
            <span className="text-[color:var(--color-bone-200)] truncate min-w-0">
              {typing}
              <span className="caret inline-block w-[6px] sm:w-[7px] h-[12px] sm:h-[14px] align-middle bg-[color:var(--color-volt-400)] ml-0.5"></span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

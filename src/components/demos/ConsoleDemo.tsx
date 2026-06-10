/**
 * ConsoleDemo — the shared interactive engine behind every vertical demo.
 *
 * Renders a product console from a DemoConfig: brand chrome, KPI row, a
 * work queue with a detail panel (facts, document preview, AI first-pass),
 * two actions per item, one guardrail interception, and an activity log
 * that reacts to everything you do. Theming via CSS custom properties so
 * each product keeps its own material story.
 *
 * All state in-memory — "reset demo" is a reload.
 */
import { useMemo, useState } from "react";
import type { DemoConfig, QueueItem } from "../../data/demos/types";

type Outcome = { label: string; tone: "good" | "bad" | "neutral" | "warn"; note?: string };

const FONT = { sans: "var(--font-display)", serif: "var(--font-serif)", mono: "var(--font-mono)" };

export default function ConsoleDemo({ cfg }: { cfg: DemoConfig }) {
  const t = cfg.theme;
  const [sel, setSel] = useState<string>(cfg.items[0]?.id);
  const [outcomes, setOutcomes] = useState<Record<string, Outcome>>({});
  const [log, setLog] = useState(cfg.activitySeed);
  const [mobileDetail, setMobileDetail] = useState(false);

  const pending = cfg.items.filter((i) => !outcomes[i.id]).length;
  const item = useMemo(() => cfg.items.find((i) => i.id === sel), [sel, cfg.items]);

  const act = (i: QueueItem, which: "primary" | "secondary") => {
    const action = which === "primary" ? cfg.primary : cfg.secondary;
    const guarded = i.guard?.action === which;
    const outcome: Outcome = guarded
      ? { label: i.guard!.outcome, tone: "warn", note: i.guard!.text }
      : { label: action.label, tone: action.kind };
    setOutcomes((o) => ({ ...o, [i.id]: outcome }));
    setLog((l) => [
      {
        t: "just now",
        text: guarded
          ? `${i.title} — ${i.guard!.outcome}: ${i.guard!.text}`
          : `${i.title} — ${action.label.toLowerCase()} by ${cfg.persona.name} · logged`,
        tone: guarded ? "warn" : action.kind === "bad" ? "neutral" : (action.kind as "good" | "neutral"),
      },
      ...l,
    ]);
    // advance selection to the next pending item
    const next = cfg.items.find((x) => x.id !== i.id && !outcomes[x.id] && !(x.id === i.id));
    if (next) setSel(next.id);
    setMobileDetail(false);
  };

  const toneColor = (tone: string) =>
    tone === "good" ? t.good : tone === "warn" ? t.warn : tone === "bad" ? t.bad : t.inkMut;

  const vars = {
    "--d-bg": t.bg, "--d-surface": t.surface, "--d-raised": t.raised, "--d-line": t.line,
    "--d-ink": t.ink, "--d-mut": t.inkMut, "--d-faint": t.inkFaint,
    "--d-accent": t.accent, "--d-accent-ink": t.accentInk,
    "--d-good": t.good, "--d-warn": t.warn, "--d-bad": t.bad, "--d-ondark": t.onDark,
    "--d-r": t.radius,
    fontFamily: "var(--font-sans)",
  } as React.CSSProperties;

  return (
    <div className="min-h-screen bg-[var(--d-bg)] text-[var(--d-ink)]" style={vars}>
      {/* product chrome */}
      <header className="border-b px-4 sm:px-6 py-3 flex items-center gap-4 bg-[var(--d-raised)] border-[var(--d-line)]">
        <p className="text-lg font-bold tracking-tight" style={{ fontFamily: FONT[t.font] }}>
          <span className="text-[var(--d-ondark)]">{cfg.name}</span>
        </p>
        <span className="hidden sm:inline font-mono text-[10px] px-2.5 py-1 border border-[var(--d-line)] text-[var(--d-mut)] truncate" style={{ borderRadius: "var(--d-r)" }}>
          {cfg.url}
        </span>
        <span className="flex-1" />
        <div className="text-right leading-tight">
          <p className="text-[12px] font-medium text-[var(--d-ondark)]">{cfg.persona.name}</p>
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--d-mut)]">{cfg.persona.role}</p>
        </div>
      </header>

      <div className="flex">
        {/* sidebar */}
        <nav className="hidden lg:flex flex-col w-48 shrink-0 border-r border-[var(--d-line)] bg-[var(--d-raised)] py-4 min-h-[calc(100vh-57px)]">
          {cfg.nav.map((n, i) => (
            <span
              key={n}
              className={`px-5 py-2 font-mono text-[11px] uppercase tracking-[0.12em] border-l-2 ${
                i === 0 ? "text-[var(--d-ondark)] border-[var(--d-accent)]" : "text-[var(--d-mut)] border-transparent"
              }`}
            >
              {n}
            </span>
          ))}
          <span className="flex-1" />
          <p className="px-5 font-mono text-[9px] leading-relaxed text-[var(--d-faint)]">{cfg.statusLine}</p>
        </nav>

        <main className="flex-1 min-w-0 px-4 sm:px-6 py-5 max-w-[1200px]">
          {/* scenario banner */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border px-4 py-2.5 mb-5 border-[var(--d-accent)] bg-[var(--d-surface)]" style={{ borderRadius: "var(--d-r)" }}>
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] px-1.5 py-0.5 bg-[var(--d-accent)] text-[var(--d-accent-ink)]" style={{ borderRadius: "var(--d-r)" }}>
              try this
            </span>
            <p className="text-[13px] text-[var(--d-mut)]">{cfg.scenario}</p>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-6">
            {cfg.kpis.map((k) => (
              <div key={k.label} className="border border-[var(--d-line)] bg-[var(--d-surface)] p-3.5" style={{ borderRadius: "var(--d-r)" }}>
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--d-faint)] mb-1">{k.label}</p>
                <p className="text-2xl font-semibold tracking-tight" style={{ fontFamily: FONT[t.font] }}>{k.value}</p>
                {k.delta && (
                  <p className="font-mono text-[10px] mt-0.5" style={{ color: k.tone === "warn" ? t.warn : k.tone === "flat" ? t.inkMut : t.good }}>
                    {k.delta}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* queue + detail */}
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-4 items-start">
            <section className={mobileDetail ? "hidden lg:block" : ""}>
              <div className="flex items-baseline justify-between mb-2">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--d-faint)]">{cfg.queueTitle}</h2>
                <span className="font-mono text-[10px] text-[var(--d-mut)]">{pending} pending</span>
              </div>
              <div className="border border-[var(--d-line)] divide-y divide-[var(--d-line)] bg-[var(--d-surface)] overflow-hidden" style={{ borderRadius: "var(--d-r)" }}>
                {cfg.items.map((i) => {
                  const done = outcomes[i.id];
                  const active = sel === i.id;
                  return (
                    <button
                      key={i.id}
                      onClick={() => { setSel(i.id); setMobileDetail(true); }}
                      className={`w-full text-left px-4 py-3 transition-colors ${done ? "opacity-55" : ""}`}
                      style={{ background: active ? t.raised : "transparent" }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className={`text-[13.5px] font-medium truncate ${active ? "text-[var(--d-ondark)]" : ""}`}>{i.title}</span>
                        {done ? (
                          <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.1em] px-1.5 py-0.5 border" style={{ color: toneColor(done.tone), borderColor: toneColor(done.tone), borderRadius: "var(--d-r)" }}>
                            {done.label}
                          </span>
                        ) : i.badge ? (
                          <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.1em] px-1.5 py-0.5 bg-[var(--d-accent)] text-[var(--d-accent-ink)]" style={{ borderRadius: "var(--d-r)" }}>
                            {i.badge}
                          </span>
                        ) : null}
                      </div>
                      <p className={`font-mono text-[10px] mt-1 truncate ${active ? "text-[var(--d-mut)]" : "text-[var(--d-faint)]"}`}>{i.sub}</p>
                    </button>
                  );
                })}
              </div>

              {/* activity log */}
              <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--d-faint)] mt-6 mb-2">Activity · audit log</h2>
              <div className="border border-[var(--d-line)] divide-y divide-[var(--d-line)] bg-[var(--d-surface)] overflow-hidden" style={{ borderRadius: "var(--d-r)" }}>
                {log.slice(0, 6).map((e, idx) => (
                  <div key={idx} className="px-4 py-2.5 flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: toneColor(e.tone) }} />
                    <p className="text-[12px] leading-snug text-[var(--d-mut)] flex-1">{e.text}</p>
                    <span className="font-mono text-[9px] text-[var(--d-faint)] shrink-0">{e.t}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* detail */}
            {item && (
              <section className={`border border-[var(--d-line)] bg-[var(--d-surface)] overflow-hidden ${mobileDetail ? "" : "hidden lg:block"}`} style={{ borderRadius: "var(--d-r)" }}>
                <header className="px-5 py-3.5 bg-[var(--d-raised)] border-b border-[var(--d-line)] flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <button onClick={() => setMobileDetail(false)} className="lg:hidden font-mono text-[10px] text-[var(--d-mut)] mb-1">← queue</button>
                    <h2 className="text-[16px] font-semibold truncate text-[var(--d-ondark)]" style={{ fontFamily: FONT[t.font] }}>{item.title}</h2>
                    <p className="font-mono text-[10px] text-[var(--d-mut)] mt-0.5">{item.sub}</p>
                  </div>
                  {outcomes[item.id] && (
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] px-2 py-1 border" style={{ color: toneColor(outcomes[item.id].tone), borderColor: toneColor(outcomes[item.id].tone), borderRadius: "var(--d-r)" }}>
                      {outcomes[item.id].label}
                    </span>
                  )}
                </header>

                <div className="p-5 grid gap-4">
                  <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
                    {item.meta.map((m) => (
                      <div key={m.k}>
                        <dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--d-faint)]">{m.k}</dt>
                        <dd className="text-[13.5px] font-medium mt-0.5">{m.v}</dd>
                      </div>
                    ))}
                  </dl>

                  {item.body && (
                    <blockquote className="border-l-2 pl-3.5 text-[13.5px] leading-[1.7] text-[var(--d-mut)]" style={{ borderColor: t.line }}>
                      {item.body}
                    </blockquote>
                  )}

                  {item.ai && (
                    <div className="border p-3.5" style={{ borderColor: t.accent, borderRadius: "var(--d-r)", background: `color-mix(in oklab, ${t.accent} 7%, transparent)` }}>
                      <p className="font-mono text-[9px] uppercase tracking-[0.14em] mb-1.5" style={{ color: t.accent === t.bg ? t.ink : undefined }}>
                        <span className="px-1.5 py-0.5 bg-[var(--d-accent)] text-[var(--d-accent-ink)]" style={{ borderRadius: "var(--d-r)" }}>✦ {item.ai.label}</span>
                      </p>
                      <p className="text-[13px] leading-[1.65] text-[var(--d-mut)]">{item.ai.text}</p>
                    </div>
                  )}

                  {outcomes[item.id]?.note && (
                    <div className="border p-3.5" style={{ borderColor: t.warn, borderRadius: "var(--d-r)" }}>
                      <p className="font-mono text-[9px] uppercase tracking-[0.14em] mb-1" style={{ color: t.warn }}>guardrail</p>
                      <p className="text-[13px] leading-[1.65] text-[var(--d-mut)]">{outcomes[item.id].note}</p>
                    </div>
                  )}

                  {!outcomes[item.id] && (
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      <button
                        onClick={() => act(item, "primary")}
                        className="font-mono text-[11px] uppercase tracking-[0.14em] px-5 py-2.5 transition-opacity hover:opacity-85 bg-[var(--d-accent)] text-[var(--d-accent-ink)]"
                        style={{ borderRadius: "var(--d-r)" }}
                      >
                        {cfg.primary.label}
                      </button>
                      <button
                        onClick={() => act(item, "secondary")}
                        className="font-mono text-[11px] uppercase tracking-[0.14em] px-5 py-2.5 border transition-colors"
                        style={{ borderRadius: "var(--d-r)", borderColor: t.line, color: t.inkMut }}
                      >
                        {cfg.secondary.label}
                      </button>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

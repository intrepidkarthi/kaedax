/**
 * ConsoleDemo — the shared demo engine, but layout-polymorphic.
 *
 * Each product picks a `layout` that matches what it actually IS:
 *   queue        two-pane decision desk      (underwrite, anchor)
 *   document     a contract / clinical note  (caduceus, counselworks)
 *   feed         full-width review cards      (pulse, atrium)
 *   grid         eval-suite heatmap           (tallow)
 *   board        kanban columns by status     (harbor, meridian)
 *   configurator option builder → live price  (bough)
 *
 * Navigation is real: every demo has working tabs — its primary view,
 * a live Activity log, and an Overview. Actions mutate state, fire the
 * vertical's guardrail interception, and append to the audit log.
 * All in-memory; "reset" is a reload.
 */
import { useMemo, useState } from "react";
import type { DemoConfig, QueueItem } from "../../data/demos/types";

type Outcome = { label: string; tone: "good" | "bad" | "neutral" | "warn"; note?: string };
type Tab = "main" | "activity" | "overview";

const FONT = { sans: "var(--font-display)", serif: "var(--font-serif)", mono: "var(--font-mono)" };

export default function ConsoleDemo({ cfg }: { cfg: DemoConfig }) {
  const t = cfg.theme;
  const [tab, setTab] = useState<Tab>("main");
  const [sel, setSel] = useState<string>(cfg.items[0]?.id);
  const [outcomes, setOutcomes] = useState<Record<string, Outcome>>({});
  const [log, setLog] = useState(cfg.activitySeed);
  const [detailOpen, setDetailOpen] = useState(false);

  const pending = cfg.items.filter((i) => !outcomes[i.id]).length;
  const item = useMemo(() => cfg.items.find((i) => i.id === sel), [sel, cfg.items]);
  const toneColor = (tone: string) =>
    tone === "good" ? t.good : tone === "warn" ? t.warn : tone === "bad" ? t.bad : t.inkMut;

  const act = (i: QueueItem, which: "primary" | "secondary") => {
    if (outcomes[i.id]) return;
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
    const next = cfg.items.find((x) => x.id !== i.id && !outcomes[x.id]);
    if (next) setSel(next.id);
    setDetailOpen(false);
  };

  const vars = {
    "--d-bg": t.bg, "--d-surface": t.surface, "--d-raised": t.raised, "--d-line": t.line,
    "--d-ink": t.ink, "--d-mut": t.inkMut, "--d-faint": t.inkFaint,
    "--d-accent": t.accent, "--d-accent-ink": t.accentInk,
    "--d-good": t.good, "--d-warn": t.warn, "--d-bad": t.bad, "--d-ondark": t.onDark,
    "--d-r": t.radius, fontFamily: "var(--font-sans)",
  } as React.CSSProperties;
  const head = { fontFamily: FONT[t.font] };
  const R = { borderRadius: "var(--d-r)" };

  /* ---- small shared pieces ---- */
  const Chip = ({ label, color }: { label: string; color: string }) => (
    <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.1em] px-1.5 py-0.5 border" style={{ color, borderColor: color, ...R }}>{label}</span>
  );
  const Actions = ({ i }: { i: QueueItem }) =>
    outcomes[i.id] ? (
      <div className="flex items-center gap-2">
        <Chip label={outcomes[i.id].label} color={toneColor(outcomes[i.id].tone)} />
        {outcomes[i.id].note && <span className="font-mono text-[9px] uppercase tracking-[0.1em]" style={{ color: t.warn }}>guardrail fired</span>}
      </div>
    ) : (
      <div className="flex flex-wrap gap-2">
        <button onClick={() => act(i, "primary")} className="font-mono text-[11px] uppercase tracking-[0.12em] px-4 py-2 transition-opacity hover:opacity-85 bg-[var(--d-accent)] text-[var(--d-accent-ink)]" style={R}>{cfg.primary.label}</button>
        <button onClick={() => act(i, "secondary")} className="font-mono text-[11px] uppercase tracking-[0.12em] px-4 py-2 border transition-colors" style={{ ...R, borderColor: t.line, color: t.inkMut }}>{cfg.secondary.label}</button>
      </div>
    );
  const AI = ({ i }: { i: QueueItem }) =>
    i.ai ? (
      <div className="border p-3.5" style={{ borderColor: t.accent, background: `color-mix(in oklab, ${t.accent} 7%, transparent)`, ...R }}>
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] px-1.5 py-0.5 bg-[var(--d-accent)] text-[var(--d-accent-ink)]" style={R}>✦ {i.ai.label}</span>
        <p className="text-[13px] leading-[1.65] text-[var(--d-mut)] mt-2">{i.ai.text}</p>
      </div>
    ) : null;
  const Guard = ({ i }: { i: QueueItem }) =>
    outcomes[i.id]?.note ? (
      <div className="border p-3.5" style={{ borderColor: t.warn, ...R }}>
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] mb-1" style={{ color: t.warn }}>⚠ guardrail</p>
        <p className="text-[13px] leading-[1.65] text-[var(--d-mut)]">{outcomes[i.id].note}</p>
      </div>
    ) : null;
  const Meta = ({ i, cols = 3 }: { i: QueueItem; cols?: number }) => (
    <dl className={`grid grid-cols-2 sm:grid-cols-${cols} gap-x-4 gap-y-3`}>
      {i.meta.map((m) => (
        <div key={m.k}>
          <dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--d-faint)]">{m.k}</dt>
          <dd className="text-[13.5px] font-medium mt-0.5">{m.v}</dd>
        </div>
      ))}
    </dl>
  );

  /* ============ LAYOUTS ============ */

  const QueueView = () => (
    <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-4 items-start">
      <div className={detailOpen ? "hidden lg:block" : ""}>
        <Bar left={cfg.mainLabel} right={`${pending} pending`} />
        <div className="border divide-y bg-[var(--d-surface)] overflow-hidden" style={{ borderColor: t.line, ...R }}>
          {cfg.items.map((i) => {
            const done = outcomes[i.id];
            return (
              <button key={i.id} onClick={() => { setSel(i.id); setDetailOpen(true); }} className={`w-full text-left px-4 py-3 ${done ? "opacity-55" : ""}`} style={{ background: sel === i.id ? t.raised : "transparent" }}>
                <div className="flex items-center justify-between gap-3">
                  <span className={`text-[13.5px] font-medium truncate ${sel === i.id ? "text-[var(--d-ondark)]" : ""}`}>{i.title}</span>
                  {done ? <Chip label={done.label} color={toneColor(done.tone)} /> : i.badge ? <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.1em] px-1.5 py-0.5 bg-[var(--d-accent)] text-[var(--d-accent-ink)]" style={R}>{i.badge}</span> : null}
                </div>
                <p className={`font-mono text-[10px] mt-1 truncate ${sel === i.id ? "text-[var(--d-mut)]" : "text-[var(--d-faint)]"}`}>{i.sub}</p>
              </button>
            );
          })}
        </div>
      </div>
      {item && (
        <section className={`border bg-[var(--d-surface)] overflow-hidden ${detailOpen ? "" : "hidden lg:block"}`} style={{ borderColor: t.line, ...R }}>
          <header className="px-5 py-3.5 bg-[var(--d-raised)] border-b flex items-center justify-between gap-3" style={{ borderColor: t.line }}>
            <div className="min-w-0">
              <button onClick={() => setDetailOpen(false)} className="lg:hidden font-mono text-[10px] text-[var(--d-mut)] mb-1">← list</button>
              <h2 className="text-[16px] font-semibold truncate text-[var(--d-ondark)]" style={head}>{item.title}</h2>
              <p className="font-mono text-[10px] text-[var(--d-mut)] mt-0.5">{item.sub}</p>
            </div>
          </header>
          <div className="p-5 grid gap-4">
            <Meta i={item} />
            {item.body && <blockquote className="border-l-2 pl-3.5 text-[13.5px] leading-[1.7] text-[var(--d-mut)]" style={{ borderColor: t.line }}>{item.body}</blockquote>}
            <AI i={item} /><Guard i={item} /><Actions i={item} />
          </div>
        </section>
      )}
    </div>
  );

  const DocumentView = () => (
    <div className="grid lg:grid-cols-[260px_1fr] gap-4 items-start">
      <div className={detailOpen ? "hidden lg:block" : ""}>
        <Bar left={cfg.mainLabel} right={`${pending} open`} />
        <div className="border divide-y bg-[var(--d-surface)] overflow-hidden" style={{ borderColor: t.line, ...R }}>
          {cfg.items.map((i) => {
            const done = outcomes[i.id];
            return (
              <button key={i.id} onClick={() => { setSel(i.id); setDetailOpen(true); }} className={`w-full text-left px-3.5 py-3 flex items-start gap-2.5 ${done ? "opacity-55" : ""}`} style={{ background: sel === i.id ? t.raised : "transparent" }}>
                <span className="mt-0.5 text-[13px]" style={{ color: sel === i.id ? t.onDark : t.inkFaint }}>▤</span>
                <span className="min-w-0">
                  <span className={`block text-[13px] font-medium truncate ${sel === i.id ? "text-[var(--d-ondark)]" : ""}`}>{i.title}</span>
                  <span className="block font-mono text-[9.5px] text-[var(--d-faint)] truncate mt-0.5">{done ? done.label : i.badge}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
      {item && (
        <article className={`border bg-[var(--d-surface)] ${detailOpen ? "" : "hidden lg:block"}`} style={{ borderColor: t.line, ...R }}>
          <header className="px-6 sm:px-8 pt-6 pb-4 border-b" style={{ borderColor: t.line }}>
            <button onClick={() => setDetailOpen(false)} className="lg:hidden font-mono text-[10px] text-[var(--d-mut)] mb-2">← documents</button>
            <h2 className="text-xl font-semibold" style={head}>{item.title}</h2>
            <p className="font-mono text-[10px] text-[var(--d-mut)] mt-1">{item.sub}</p>
          </header>
          {/* document body styled like a page */}
          <div className="px-6 sm:px-8 py-6 grid gap-5">
            <div className="flex flex-wrap gap-x-6 gap-y-2 pb-4 border-b" style={{ borderColor: t.line }}>
              {item.meta.map((m) => (
                <span key={m.k} className="text-[11px]"><span className="font-mono uppercase tracking-[0.1em] text-[var(--d-faint)] mr-1.5">{m.k}</span><span className="font-medium">{m.v}</span></span>
              ))}
            </div>
            {item.body && <p className="text-[15px] leading-[1.85] text-[var(--d-ink)]" style={{ fontFamily: t.font === "mono" ? FONT.mono : "var(--font-serif)" }}>{item.body}</p>}
            <AI i={item} /><Guard i={item} />
            <div className="pt-2 border-t" style={{ borderColor: t.line }}><Actions i={item} /></div>
          </div>
        </article>
      )}
    </div>
  );

  const FeedView = () => (
    <div className="max-w-[680px] grid gap-4">
      <Bar left={cfg.mainLabel} right={`${pending} need a human`} />
      {cfg.items.map((i) => {
        const done = outcomes[i.id];
        return (
          <article key={i.id} className={`border bg-[var(--d-surface)] overflow-hidden ${done ? "opacity-60" : ""}`} style={{ borderColor: t.line, ...R }}>
            <header className="px-5 py-3 flex items-center justify-between gap-3 border-b" style={{ borderColor: t.line }}>
              <div className="min-w-0">
                <h3 className="text-[14.5px] font-semibold truncate" style={head}>{i.title}</h3>
                <p className="font-mono text-[10px] text-[var(--d-faint)] mt-0.5 truncate">{i.sub}</p>
              </div>
              {i.badge && !done && <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.1em] px-1.5 py-0.5 bg-[var(--d-accent)] text-[var(--d-accent-ink)]" style={R}>{i.badge}</span>}
              {done && <Chip label={done.label} color={toneColor(done.tone)} />}
            </header>
            <div className="p-5 grid gap-3.5">
              {i.body && <p className="text-[13.5px] leading-[1.7] text-[var(--d-mut)]">{i.body}</p>}
              <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                {i.meta.slice(0, 4).map((m) => (
                  <span key={m.k} className="text-[11px]"><span className="font-mono uppercase tracking-[0.1em] text-[var(--d-faint)] mr-1">{m.k}</span><span className="font-medium">{m.v}</span></span>
                ))}
              </div>
              <AI i={i} /><Guard i={i} /><Actions i={i} />
            </div>
          </article>
        );
      })}
    </div>
  );

  const GridView = () => (
    <div className="grid gap-4">
      <Bar left={cfg.mainLabel} right={`${pending} awaiting promotion`} />
      <div className="grid sm:grid-cols-2 gap-3">
        {cfg.items.map((i) => {
          const done = outcomes[i.id];
          const c = i.tone === "bad" ? t.bad : i.tone === "warn" ? t.warn : t.good;
          return (
            <article key={i.id} className={`border bg-[var(--d-surface)] p-4 grid gap-3 ${done ? "opacity-60" : ""}`} style={{ borderColor: done ? t.line : c, ...R }}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="text-[14px] font-semibold truncate" style={head}>{i.title}</h3>
                  <p className="font-mono text-[10px] text-[var(--d-faint)] mt-0.5 truncate">{i.sub}</p>
                </div>
                {done ? <Chip label={done.label} color={toneColor(done.tone)} /> : <Chip label={i.badge ?? ""} color={c} />}
              </div>
              {typeof i.pct === "number" && (
                <div>
                  <div className="h-2 w-full overflow-hidden" style={{ background: `color-mix(in oklab, ${t.ink} 10%, transparent)`, ...R }}>
                    <div className="h-full" style={{ width: `${i.pct}%`, background: c }} />
                  </div>
                  <p className="font-mono text-[9px] text-[var(--d-faint)] mt-1">{i.pct}% pass</p>
                </div>
              )}
              {i.ai && <p className="text-[12px] leading-[1.6] text-[var(--d-mut)]">{i.ai.text}</p>}
              <Guard i={i} />
              <Actions i={i} />
            </article>
          );
        })}
      </div>
    </div>
  );

  const BoardView = () => {
    const cols = Array.from(new Set(cfg.items.map((i) => i.col ?? "Queue")));
    return (
      <div className="grid gap-4">
        <Bar left={cfg.mainLabel} right={`${pending} open`} />
        <div className="grid md:grid-cols-3 gap-3 items-start">
          {cols.map((col) => (
            <div key={col} className="grid gap-2.5 content-start">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--d-faint)] px-1">{col}</p>
              {cfg.items.filter((i) => (i.col ?? "Queue") === col).map((i) => {
                const done = outcomes[i.id];
                return (
                  <article key={i.id} className={`border bg-[var(--d-surface)] p-3.5 grid gap-2.5 ${done ? "opacity-60" : ""}`} style={{ borderColor: t.line, ...R }}>
                    <div>
                      <h3 className="text-[13.5px] font-semibold leading-snug" style={head}>{i.title}</h3>
                      <p className="font-mono text-[10px] text-[var(--d-faint)] mt-0.5">{i.sub}</p>
                    </div>
                    {i.ai && <p className="text-[11.5px] leading-[1.55] text-[var(--d-mut)]">{i.ai.text}</p>}
                    <Guard i={i} />
                    {done ? <Chip label={done.label} color={toneColor(done.tone)} /> : <Actions i={i} />}
                  </article>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ConfiguratorView = () => {
    const cfgr = cfg.configurator!;
    const [picks, setPicks] = useState<Record<string, number>>(() => Object.fromEntries(cfgr.groups.map((g) => [g.id, 0])));
    const total = cfgr.base + cfgr.groups.reduce((s, g) => s + g.options[picks[g.id]].price, 0);
    return (
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-5 items-start">
        <div className="grid gap-5">
          <Bar left={cfg.mainLabel} right={cfgr.product} />
          {cfgr.groups.map((g) => (
            <div key={g.id}>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--d-faint)] mb-2">{g.label}</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {g.options.map((o, oi) => {
                  const on = picks[g.id] === oi;
                  return (
                    <button key={o.label} onClick={() => setPicks((p) => ({ ...p, [g.id]: oi }))} className="text-left border-2 px-3.5 py-2.5 transition-colors" style={{ borderColor: on ? t.accent : t.line, background: on ? `color-mix(in oklab, ${t.accent} 9%, transparent)` : "transparent", ...R }}>
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-[13.5px] font-medium">{o.label}</span>
                        <span className="font-mono text-[11px] text-[var(--d-mut)]">{o.price === 0 ? "incl." : `+${cfgr.unit}${o.price}`}</span>
                      </span>
                      {o.note && <span className="block font-mono text-[10px] text-[var(--d-faint)] mt-0.5">{o.note}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {/* live spec sheet */}
        <aside className="border bg-[var(--d-surface)] lg:sticky lg:top-4 overflow-hidden" style={{ borderColor: t.line, ...R }}>
          <header className="px-5 py-3.5 bg-[var(--d-raised)] border-b" style={{ borderColor: t.line }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--d-mut)]">Your build</p>
            <h2 className="text-[16px] font-semibold text-[var(--d-ondark)]" style={head}>{cfgr.product}</h2>
          </header>
          <div className="p-5 grid gap-2.5">
            <div className="flex justify-between text-[12.5px]"><span className="text-[var(--d-mut)]">Base</span><span className="font-mono">{cfgr.unit}{cfgr.base}</span></div>
            {cfgr.groups.map((g) => {
              const o = g.options[picks[g.id]];
              return (
                <div key={g.id} className="flex justify-between text-[12.5px]">
                  <span className="text-[var(--d-mut)]">{o.label}</span>
                  <span className="font-mono">{o.price === 0 ? "—" : `${cfgr.unit}${o.price}`}</span>
                </div>
              );
            })}
            <div className="flex justify-between items-baseline pt-3 mt-1 border-t" style={{ borderColor: t.line }}>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--d-faint)]">Total · {cfgr.lead}</span>
              <span className="text-3xl font-semibold tracking-tight" style={head}>{cfgr.unit}{total.toLocaleString()}</span>
            </div>
            <button className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] px-5 py-3 bg-[var(--d-accent)] text-[var(--d-accent-ink)]" style={R}>{cfg.primary.label} →</button>
            <p className="font-mono text-[9px] text-[var(--d-faint)] leading-relaxed">live BOM pricing · {cfg.statusLine}</p>
          </div>
        </aside>
      </div>
    );
  };

  const ActivityView = () => (
    <div className="max-w-[680px] grid gap-4">
      <Bar left="Activity" right="audit log · live" />
      <div className="border divide-y bg-[var(--d-surface)] overflow-hidden" style={{ borderColor: t.line, ...R }}>
        {log.map((e, idx) => (
          <div key={idx} className="px-4 py-3 flex items-start gap-3">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: toneColor(e.tone) }} />
            <p className="text-[13px] leading-snug text-[var(--d-mut)] flex-1">{e.text}</p>
            <span className="font-mono text-[9px] text-[var(--d-faint)] shrink-0">{e.t}</span>
          </div>
        ))}
      </div>
      <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--d-faint)]">every action you take above is appended here — signed, timestamped, exportable</p>
    </div>
  );

  const OverviewView = () => (
    <div className="grid gap-5">
      <Bar left="Overview" right={cfg.tag} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {cfg.kpis.map((k) => (
          <div key={k.label} className="border bg-[var(--d-surface)] p-4" style={{ borderColor: t.line, ...R }}>
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--d-faint)] mb-1">{k.label}</p>
            <p className="text-2xl font-semibold tracking-tight" style={head}>{k.value}</p>
            {k.delta && <p className="font-mono text-[10px] mt-0.5" style={{ color: k.tone === "warn" ? t.warn : k.tone === "flat" ? t.inkMut : t.good }}>{k.delta}</p>}
          </div>
        ))}
      </div>
      <div className="border bg-[var(--d-surface)] p-5" style={{ borderColor: t.line, ...R }}>
        <p className="text-[14px] leading-[1.7] text-[var(--d-mut)]"><span className="font-semibold text-[var(--d-ink)]">{cfg.tagline}</span> {cfg.scenario}</p>
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--d-faint)] mt-3">{cfg.statusLine}</p>
      </div>
    </div>
  );

  function Bar({ left, right }: { left: string; right: string }) {
    return (
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--d-faint)]">{left}</h2>
        <span className="font-mono text-[10px] text-[var(--d-mut)]">{right}</span>
      </div>
    );
  }

  const renderMain = () => {
    switch (cfg.layout) {
      case "document": return <DocumentView />;
      case "feed": return <FeedView />;
      case "grid": return <GridView />;
      case "board": return <BoardView />;
      case "configurator": return <ConfiguratorView />;
      default: return <QueueView />;
    }
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "main", label: cfg.mainLabel },
    { id: "activity", label: "Activity" },
    { id: "overview", label: "Overview" },
  ];

  return (
    <div className="min-h-screen bg-[var(--d-bg)] text-[var(--d-ink)]" style={vars}>
      {/* product chrome */}
      <header className="border-b px-4 sm:px-6 py-3 flex items-center gap-4 bg-[var(--d-raised)] border-[var(--d-line)]">
        <p className="text-lg font-bold tracking-tight" style={head}><span className="text-[var(--d-ondark)]">{cfg.name}</span></p>
        <span className="hidden sm:inline font-mono text-[10px] px-2.5 py-1 border border-[var(--d-line)] text-[var(--d-mut)] truncate" style={R}>{cfg.url}</span>
        {/* working tab nav */}
        <nav className="hidden md:flex items-center gap-1 ml-2">
          {tabs.map((tb) => (
            <button key={tb.id} onClick={() => setTab(tb.id)} className="font-mono text-[10px] uppercase tracking-[0.12em] px-3 py-1.5 transition-colors" style={tab === tb.id ? { background: t.accent, color: t.accentInk, ...R } : { color: t.inkMut, ...R }}>
              {tb.label}
            </button>
          ))}
        </nav>
        <span className="flex-1" />
        <div className="text-right leading-tight">
          <p className="text-[12px] font-medium text-[var(--d-ondark)]">{cfg.persona.name}</p>
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--d-mut)]">{cfg.persona.role}</p>
        </div>
      </header>

      {/* mobile tabs */}
      <nav className="md:hidden flex gap-1 px-4 py-2 border-b bg-[var(--d-raised)] border-[var(--d-line)] overflow-x-auto">
        {tabs.map((tb) => (
          <button key={tb.id} onClick={() => setTab(tb.id)} className="shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] px-3 py-1.5" style={tab === tb.id ? { background: t.accent, color: t.accentInk, ...R } : { color: t.inkMut, ...R }}>{tb.label}</button>
        ))}
      </nav>

      <main className="px-4 sm:px-6 py-5 max-w-[1180px]">
        {/* scenario banner only on the main view */}
        {tab === "main" && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border px-4 py-2.5 mb-5 bg-[var(--d-surface)]" style={{ borderColor: t.accent, ...R }}>
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] px-1.5 py-0.5 bg-[var(--d-accent)] text-[var(--d-accent-ink)]" style={R}>try this</span>
            <p className="text-[13px] text-[var(--d-mut)]">{cfg.scenario}</p>
          </div>
        )}
        {tab === "main" ? renderMain() : tab === "activity" ? <ActivityView /> : <OverviewView />}
      </main>
    </div>
  );
}

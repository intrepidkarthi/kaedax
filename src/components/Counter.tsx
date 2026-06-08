import { useEffect, useState } from "react";

/**
 * Live counter starting from 720:00:00 and ticking DOWN by real time —
 * a quiet metaphor for "time you've got." Resets to 720h on hour rollover
 * so the hero feel is alive but never bleak.
 */
export default function Counter() {
  const [t, setT] = useState({ h: 720, m: 0, s: 0 });

  useEffect(() => {
    const start = Date.now();
    const total = 720 * 3600; // seconds in 720h

    const id = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const remaining = total - (elapsed % total);
      setT({
        h: Math.floor(remaining / 3600),
        m: Math.floor((remaining % 3600) / 60),
        s: remaining % 60,
      });
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const pad = (n: number, w = 2) => String(n).padStart(w, "0");

  return (
    <span className="tabular tick-in volt-text-glow">
      {pad(t.h, 3)}
      <span className="text-[color:var(--color-bone-400)] mx-0.5 sm:mx-1 md:mx-2">:</span>
      {pad(t.m)}
      <span className="text-[color:var(--color-bone-400)] mx-0.5 sm:mx-1 md:mx-2">:</span>
      {pad(t.s)}
    </span>
  );
}

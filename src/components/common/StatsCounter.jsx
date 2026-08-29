import React, { useRef } from 'react';
import useCountUp from '../../hooks/useCountUp.js';
import useInView from '../../hooks/useInView.js';

/* "300+" / "₹40 Lac+" / "90%" → { prefix, target, suffix, decimals } | null */
function parseStat(raw) {
  const m = String(raw).match(/^([^0-9]*)([\d.]+)(.*)$/);
  if (!m) return null;
  return {
    prefix: m[1],
    target: parseFloat(m[2]),
    suffix: m[3],
    decimals: m[2].includes('.') ? m[2].split('.')[1].length : 0
  };
}

/* Tiny top rule above each mono label — one hue per stat for color rhythm */
const LABEL_RULES = ['bg-marigold', 'bg-pine', 'bg-rani', 'bg-violet'];

function StatCell({ number, label, desc, accent, rule }) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.35 });
  const parsed = parseStat(number);
  const v = useCountUp(parsed ? parsed.target : 0, { start: inView && !!parsed });

  const display = parsed
    ? `${parsed.prefix}${v.toLocaleString('en-IN', {
        minimumFractionDigits: parsed.decimals,
        maximumFractionDigits: parsed.decimals
      })}${parsed.suffix}`
    : number;

  return (
    <div ref={ref} className="bg-paper-deep px-6 py-8 sm:px-8 sm:py-10">
      <p className={`stat-num text-4xl sm:text-5xl ${accent}`}>{display}</p>
      <span className={`mt-5 block h-px w-9 ${rule}`} aria-hidden="true"></span>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
        {label}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-bone-faint sm:text-sm">
        {desc}
      </p>
    </div>
  );
}

export default function StatsCounter() {
  const stats = [
    { number: "6+", label: "Years Experience", desc: "Dedicated e-commerce growth expertise" },
    { number: "300+", label: "Customers Handled", desc: "Brands scaled across Indian marketplaces" },
    { number: "₹40 Lac+", label: "Client GMV Generated", desc: "Direct sales delivered through strategic management" },
    { number: "90%", label: "Client Retention Rate", desc: "Long-term partnership & ongoing optimization" }
  ];

  return (
    <section className="well" aria-label="Agency results at a glance">
      <div className="shell py-14 sm:py-16">
        {/* hairline-ruled ledger grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px border border-white/10 bg-white/10">
          {stats.map((st, idx) => (
            <StatCell
              key={idx}
              number={st.number}
              label={st.label}
              desc={st.desc}
              accent={idx === 2 ? 'text-marigold' : 'text-bone'}
              rule={LABEL_RULES[idx % LABEL_RULES.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { useRef } from 'react';
import SEO from '../components/common/SEO';
import StatsCounter from '../components/common/StatsCounter';
import { caseStudiesList } from '../data/caseStudiesData';
import Reveal from '../components/common/Reveal.jsx';
import useCountUp from '../hooks/useCountUp.js';
import useInView from '../hooks/useInView.js';

/* Count up the numeric part of a metric string ("340%" / "Top #5 in Category") — prefix & suffix stay static */
function splitMetric(raw) {
  const m = /^([^0-9]*)(\d+(?:\.\d+)?)([\s\S]*)$/.exec(String(raw));
  if (!m) return null;
  return { pre: m[1], num: parseFloat(m[2]), dec: (m[2].split('.')[1] || '').length, suf: m[3] };
}

function CountMetric({ raw, started }) {
  const parts = splitMetric(raw);
  const v = useCountUp(parts ? parts.num : 0, { start: started && Boolean(parts) });
  if (!parts) return <>{raw}</>;
  return (
    <>
      {parts.pre}
      {parts.dec > 0 ? v.toFixed(parts.dec) : String(Math.round(v))}
      {parts.suf}
    </>
  );
}

/* Platform chip accent rotation — 5-hue ledger cycle, matching -deep text */
const CHIP_TINTS = [
  'bg-marigold-tint border-marigold/40 text-marigold-deep',
  'bg-pine-tint border-pine/40 text-pine-deep',
  'bg-rani-tint border-rani/40 text-rani-deep',
  'bg-violet-tint border-violet/40 text-violet-deep',
  'bg-royal-tint border-royal/40 text-royal-deep',
];

export default function PortfolioPage({ onOpenContactPopup }) {
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef);

  return (
    <>
      <SEO 
        title="Portfolio & Client Success Stories" 
        description="Explore Liveteachcreate's portfolio of successful seller account management and revenue scaling across Amazon, Flipkart, Myntra & Blinkit." 
      />

      {/* Page header */}
      <section className="pt-16 sm:pt-24 pb-14 bg-paper">
        <div className="shell">
          <Reveal>
            <span className="eyebrow">Our work & impact</span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="text-display-lg font-display text-bone mt-6 max-w-3xl">
              Portfolio & client success stories
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="lede mt-5 max-w-2xl">
              How we help leading Indian brands achieve multi-fold revenue growth and category leadership across the country's major marketplaces.
            </p>
          </Reveal>

          <div className="mt-12 border-t border-white/15"></div>
        </div>
      </section>

      <StatsCounter />

      {/* Work showcase */}
      <section className="band bg-paper">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Selected case studies</span>
            <h2 className="text-display-md font-display text-bone mt-4">
              Driving scale across every major channel
            </h2>
            <p className="lede mt-4">
              From Amazon A+ cataloging and Flipkart ad optimization to 10-minute quick commerce distribution on Blinkit, Instamart & Zepto.
            </p>
          </Reveal>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-14">
            {caseStudiesList.map((cs, idx) => (
              <Reveal key={cs.slug} delay={(idx % 6) * 80} className="flex">
                <article className={`${idx === 0 ? 'edge-gradient pop-hover' : 'card card-interactive pop-hover'} flex flex-col flex-1 p-6 sm:p-8`}>
                  <div className="flex items-center justify-between gap-4">
                    <span className={`chip ${CHIP_TINTS[idx % 5]}`}>{cs.platform}</span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone-faint text-right">{cs.category}</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl text-bone mt-6">{cs.title}</h3>
                  <p className="text-sm text-bone-mute leading-relaxed mt-3 flex-1">{cs.summary}</p>

                  <div className="mt-7 pt-6 border-t border-white/10 flex items-end justify-between gap-4">
                    <div>
                      <p className="stat-num text-3xl text-marigold">
                        <CountMetric raw={cs.metrics.revenueGrowth} started={gridInView} />
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint mt-1.5">Sales growth</p>
                    </div>
                    <p className="text-xs font-semibold text-bone pb-1 text-right">
                      <CountMetric raw={cs.metrics.listingRank} started={gridInView} />
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="band-ink band relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true"></div>
        <span
          className="aurora opacity-70"
          aria-hidden="true"
          style={{ width: '27rem', height: '27rem', background: '#F97316', top: '-10rem', right: '-8rem', animationDelay: '-5s' }}
        ></span>
        <span
          className="aurora opacity-70"
          aria-hidden="true"
          style={{ width: '20rem', height: '20rem', background: '#0E9F6E', bottom: '-8rem', left: '-6rem', animationDelay: '-9s' }}
        ></span>
        <span
          className="aurora"
          aria-hidden="true"
          style={{ width: '21rem', height: '21rem', background: '#8B5CF6', top: '36%', left: '34%', opacity: 0.35, animationDelay: '-13s' }}
        ></span>
        <div className="shell relative">
          <span className="eyebrow">Free brand growth audit</span>
          <h2 className="text-display-lg font-display mt-5 max-w-2xl">
            Let's <span className="grad-text">scale</span> your marketplace next
          </h2>
          <p className="lede mt-4 max-w-2xl">
            Amazon A+ cataloging, Flipkart ad optimization and quick commerce distribution — one team, one growth plan.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone/50 mt-7">
            Amazon · Flipkart · Myntra · Meesho · Shopify · Blinkit
          </p>
          <div className="mt-9">
            <button
              onClick={onOpenContactPopup}
              className="btn btn-accent btn-sweep"
            >
              Get free brand growth audit
              <i className="fas fa-arrow-right btn-arrow" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

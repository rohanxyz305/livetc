import React from 'react';
import { Link } from 'react-router-dom';
import { caseStudiesList } from '../../data/caseStudiesData';
import Reveal from '../../components/common/Reveal.jsx';

/* Platform chip accent rotation — 5-hue ledger cycle, matching -deep text */
const CHIP_TINTS = [
  'bg-marigold-tint border-marigold/40 text-marigold-deep',
  'bg-pine-tint border-pine/40 text-pine-deep',
  'bg-rani-tint border-rani/40 text-rani-deep',
  'bg-violet-tint border-violet/40 text-violet-deep',
  'bg-royal-tint border-royal/40 text-royal-deep',
];

export default function CaseStudyGrid() {
  return (
    <section className="band bg-paper">
      <div className="shell">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Proven results</span>
            <h2 className="text-display-lg font-display text-bone mt-5">
              Real brands, measurable growth
            </h2>
            <p className="lede mt-4">
              How tailored marketplace strategies turned regional brands into national category leaders.
            </p>
          </Reveal>
          <Link
            to="/portfolio"
            className="link-underline inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] md:mb-2 shrink-0"
          >
            <span>View all case studies</span>
            <i className="fas fa-arrow-right text-[10px]" aria-hidden="true"></i>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-14">
          {caseStudiesList.map((cs, idx) => (
            <Reveal key={cs.slug} delay={(idx % 6) * 80} className="flex">
              <article className="card card-interactive pop-hover flex flex-col flex-1">
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <span className={`chip ${CHIP_TINTS[idx % 5]}`}>{cs.platform}</span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone-faint text-right">{cs.category}</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl text-bone mt-6">{cs.title}</h3>
                  <p className="text-sm text-bone-mute leading-relaxed mt-3 flex-1">{cs.summary}</p>

                  <div className="mt-7 pt-6 border-t border-white/10 flex items-end justify-between gap-4">
                    <div>
                      <p className="stat-num text-3xl text-marigold">{cs.metrics.revenueGrowth}</p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint mt-1.5">Sales growth</p>
                    </div>
                    <div className="text-right space-y-1.5 pb-0.5">
                      <p className="text-xs font-semibold text-bone">
                        {cs.metrics.acosReduction} <span className="font-normal text-bone-faint">ACoS</span>
                      </p>
                      <p className="text-xs font-semibold text-bone">{cs.metrics.listingRank}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 bg-white/[0.03] px-6 sm:px-8 py-4 flex items-center justify-between gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint">Full strategy breakdown</span>
                  <Link
                    to={`/case-studies/${cs.slug}`}
                    className="link-underline inline-flex items-center gap-2 text-sm font-semibold shrink-0"
                  >
                    <span>Read case study</span>
                    <i className="fas fa-arrow-right text-[10px]" aria-hidden="true"></i>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

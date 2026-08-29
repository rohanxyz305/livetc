import React, { useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/common/SEO';
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

export default function CaseStudyDetailPage({ onOpenContactPopup }) {
  const { slug } = useParams();
  const cs = caseStudiesList.find(c => c.slug === slug);

  const metricsRef = useRef(null);
  const metricsInView = useInView(metricsRef);

  if (!cs) {
    return <Navigate to="/portfolio" replace />;
  }

  return (
    <>
      <SEO 
        title={`${cs.title} Case Study`} 
        description={cs.summary} 
      />

      {/* Page header */}
      <section className="pt-16 sm:pt-24 pb-14 bg-paper">
        <div className="shell">
          <Reveal>
            <span className="eyebrow">Case study</span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="text-display-lg font-display text-bone mt-6 max-w-3xl">
              {cs.title}
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint mt-5">
              Client · {cs.platform} · {cs.category}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="lede mt-5 max-w-2xl">
              {cs.summary}
            </p>
          </Reveal>

          <div className="mt-12 border-t border-white/15"></div>
        </div>
      </section>

      {/* Hero results band */}
      <section className="band-pine band">
        <div className="shell">
          <Reveal>
            <span className="eyebrow">Outcomes</span>
          </Reveal>
          <div ref={metricsRef} className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-y-10 sm:gap-8">
            <Reveal className="sm:pr-8" delay={80}>
              <p className="stat-num text-5xl sm:text-6xl text-bone">
                <CountMetric raw={cs.metrics.revenueGrowth} started={metricsInView} />
              </p>
              <span aria-hidden="true" className="mt-5 block h-0.5 w-10 bg-marigold"></span>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone/60 mt-3">Sales growth</p>
            </Reveal>
            <Reveal className="sm:px-8 sm:border-l border-white/20" delay={160}>
              <p className="stat-num text-5xl sm:text-6xl text-bone">
                <CountMetric raw={cs.metrics.acosReduction} started={metricsInView} />
              </p>
              <span aria-hidden="true" className="mt-5 block h-0.5 w-10 bg-violet"></span>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone/60 mt-3">ACoS reduction</p>
            </Reveal>
            <Reveal className="sm:pl-8 sm:border-l border-white/20" delay={240}>
              <p className="stat-num text-3xl sm:text-4xl leading-tight text-bone">
                <CountMetric raw={cs.metrics.listingRank} started={metricsInView} />
              </p>
              <span aria-hidden="true" className="mt-5 block h-0.5 w-10 bg-royal"></span>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone/60 mt-3">Search rank</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Editorial body */}
      <section className="band bg-paper">
        <div className="shell">
          <div className="max-w-3xl mx-auto">

            <div className="pb-12 border-b border-white/15">
              <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-marigold">01 · The challenge</p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="text-display-md font-display text-bone mt-4">The challenge</h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="text-base text-bone-mute leading-relaxed mt-4">{cs.challenge}</p>
              </Reveal>
            </div>

            <div className="py-12 border-b border-white/15">
              <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-violet">02 · The approach</p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="text-display-md font-display text-bone mt-4">The approach</h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="text-base text-bone-mute leading-relaxed mt-4">{cs.solution}</p>
              </Reveal>
            </div>

            {/* Pull quote */}
            <Reveal className="py-12 border-b border-white/15">
              <blockquote>
                <p className="font-display italic text-2xl sm:text-3xl leading-snug text-bone">
                  <span className="text-marigold not-italic" aria-hidden="true">&ldquo;</span>
                  Marketplace growth compounds when structure comes first — catalog, compliance, then advertising.
                  <span className="text-marigold not-italic" aria-hidden="true">&rdquo;</span>
                </p>
                <cite className="not-italic font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint mt-6 block">
                  Liveteachcreate growth team
                </cite>
              </blockquote>
            </Reveal>

            <div className="pt-12">
              <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-royal">03 · The result</p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="text-display-md font-display text-bone mt-4">Key results delivered</h2>
              </Reveal>
              <ul className="mt-6">
                {cs.results.map((res, idx) => (
                  <Reveal as="li" key={idx} delay={(idx % 6) * 80} className="flex items-start gap-4 py-4 border-t border-white/10 first:border-t-0 first:pt-0">
                    <i className="fas fa-check text-sage mt-1" aria-hidden="true"></i>
                    <span className="text-sm sm:text-base text-bone leading-relaxed">{res}</span>
                  </Reveal>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="band-ink band relative overflow-hidden">
        <div className="absolute inset-0 grid-paper" aria-hidden="true"></div>
        <span
          className="aurora opacity-70"
          aria-hidden="true"
          style={{ width: '24rem', height: '24rem', background: '#F97316', bottom: '-8rem', right: '-6rem', animationDelay: '-2s' }}
        ></span>
        <span
          className="aurora opacity-70"
          aria-hidden="true"
          style={{ width: '19rem', height: '19rem', background: '#0E9F6E', top: '-7rem', left: '-5rem', animationDelay: '-6s' }}
        ></span>
        <span
          className="aurora"
          aria-hidden="true"
          style={{ width: '23rem', height: '23rem', background: '#8B5CF6', top: '32%', left: '40%', opacity: 0.35, animationDelay: '-10s' }}
        ></span>
        <div className="shell relative">
          <span className="eyebrow">Your turn</span>
          <h2 className="text-display-lg font-display mt-5 max-w-2xl">
            Achieve similar <span className="grad-text">scaling</span> results for your brand
          </h2>
          <p className="lede mt-4 max-w-2xl">
            Our e-commerce strategy team will audit your current listings and present a customized 90-day growth plan.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-4">
            <button
              onClick={onOpenContactPopup}
              className="btn btn-accent btn-sweep"
            >
              Get free audit
              <i className="fas fa-arrow-right btn-arrow" aria-hidden="true"></i>
            </button>
            <Link to="/portfolio" className="btn btn-outline">
              View all case studies
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

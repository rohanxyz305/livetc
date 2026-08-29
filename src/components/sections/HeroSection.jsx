import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../common/Reveal.jsx';
import useCountUp from '../../hooks/useCountUp.js';
import useInView from '../../hooks/useInView.js';

/* Ledger value like "300+" / "3.4×" / "90%" — counts the numeric part once in view */
function LedgerStat({ value, active }) {
  const match = String(value).match(/^([\d.]+)(.*)$/);
  const v = useCountUp(match ? parseFloat(match[1]) : 0, {
    start: active && !!match
  });

  if (!match) {
    return <dd className="stat-num text-3xl sm:text-4xl text-bone">{value}</dd>;
  }

  const decimals = match[1].includes('.') ? match[1].split('.')[1].length : 0;

  return (
    <dd className="stat-num text-3xl sm:text-4xl text-bone">
      {v.toFixed(decimals)}
      {match[2]}
    </dd>
  );
}

export default function HeroSection({ onOpenContactPopup }) {
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { threshold: 0.3 });

  const ledgerRows = [
    { label: 'Sellers managed', value: '300+' },
    { label: 'Avg. sales multiplier', value: '3.4×' },
    { label: 'Client retention', value: '90%' }
  ];

  return (
    <section className="relative overflow-hidden">
      {/* aurora colour fields — drifting galaxy wash: marigold / violet / royal / rani / pine */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <span
          className="aurora"
          style={{
            width: '560px',
            height: '560px',
            background: '#F97316',
            top: '-180px',
            left: '-140px',
            opacity: 0.25,
            animationDelay: '0s'
          }}
        ></span>
        <span
          className="aurora"
          style={{
            width: '600px',
            height: '600px',
            background: '#8B5CF6',
            top: '-240px',
            left: '52%',
            opacity: 0.28,
            animationDelay: '-4.5s'
          }}
        ></span>
        <span
          className="aurora"
          style={{
            width: '520px',
            height: '520px',
            background: '#2563EB',
            top: '62%',
            left: '38%',
            opacity: 0.22,
            animationDelay: '-8s'
          }}
        ></span>
        <span
          className="aurora"
          style={{
            width: '440px',
            height: '440px',
            background: '#E42A8A',
            top: '44%',
            left: '62%',
            opacity: 0.18,
            animationDelay: '-11s'
          }}
        ></span>
        <span
          className="aurora"
          style={{
            width: '480px',
            height: '480px',
            background: '#10B981',
            top: '55%',
            left: '-8%',
            opacity: 0.15,
            animationDelay: '-14s'
          }}
        ></span>
      </div>

      <div className="shell relative pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left: editorial headline + CTAs */}
          <div className="lg:col-span-7">
            <Reveal as="p" delay={0} className="eyebrow">
              Marketplace growth partners · India
            </Reveal>

            <Reveal as="h1" delay={100} className="mt-6 text-display-xl font-display text-bone">
              Your marketplace, run like a{' '}
              <span className="font-display italic grad-text">ledger</span>{' '}
              we actually keep.
            </Reveal>

            <Reveal as="p" delay={200} className="lede mt-6 max-w-xl">
              Complete seller account management for Amazon, Flipkart, Myntra, Shopify &amp;
              Blinkit — listings, inventory, PPC ads and revenue scaling, maintained with a
              bookkeeper&rsquo;s discipline.
            </Reveal>

            <Reveal delay={300} className="mt-9 flex flex-col sm:flex-row gap-3.5">
              <button
                type="button"
                onClick={onOpenContactPopup}
                className="btn btn-accent btn-sweep w-full sm:w-auto"
              >
                Book free account audit
                <i className="fas fa-arrow-right btn-arrow" aria-hidden="true"></i>
              </button>
              <Link
                to="/services/amazon-seller-account-management-services"
                className="btn btn-outline w-full sm:w-auto"
              >
                Explore services
                <i className="fas fa-arrow-right btn-arrow" aria-hidden="true"></i>
              </Link>
            </Reveal>
          </div>

          {/* Right: ledger card */}
          <div className="lg:col-span-5">
            <Reveal delay={250}>
              <div ref={cardRef} className="edge-gradient pop-hover backdrop-blur-xl p-6 sm:p-8">
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-mute">
                    Client ledger · snapshot
                  </p>
                  <span className="rounded-[3px] border border-marigold/40 bg-marigold/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-marigold">
                    ₹40 Lac+ GMV
                  </span>
                </div>

                <dl className="divide-y divide-white/10">
                  {ledgerRows.map((row) => (
                    <div key={row.label} className="flex items-baseline justify-between gap-4 py-4">
                      <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-bone-mute">
                        {row.label}
                      </dt>
                      <LedgerStat value={row.value} active={cardInView} />
                    </div>
                  ))}
                </dl>

                <div className="flex items-start gap-3 border-t border-white/10 pt-5">
                  <i className="fa-solid fa-shield-halved mt-0.5 text-violet" aria-hidden="true"></i>
                  <p className="text-xs leading-relaxed text-bone-mute">
                    Guaranteed compliance support, listing protection &amp; zero account suspension risk.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

        </div>

        {/* Mono proof row */}
        <div className="mt-14 flex flex-wrap items-center gap-x-5 gap-y-2.5 border-t border-white/15 pt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-faint">
          <span>4.9★ across 300+ sellers</span>
          <span className="h-1.5 w-1.5 rounded-full bg-marigold" aria-hidden="true"></span>
          <span>Jaipur HQ</span>
          <span className="h-1.5 w-1.5 rounded-full bg-violet" aria-hidden="true"></span>
          <span>Amazon · Flipkart · Myntra · Shopify · Blinkit</span>
        </div>
      </div>
    </section>
  );
}

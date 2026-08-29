import React from 'react';
import SEO from '../components/common/SEO';
import StatsCounter from '../components/common/StatsCounter';
import Reveal from '../components/common/Reveal.jsx';

const WHAT_SETS_APART = [
  {
    title: 'Dedicated account managers',
    desc: 'A single point of contact overseeing your cataloging, PPC ads, and weekly account audits.',
  },
  {
    title: 'In-house graphic & content studio',
    desc: 'Professional designers crafting A+ content, brand stores, and lifestyle infographics.',
  },
  {
    title: 'Quick-commerce expertise',
    desc: 'Specialized onboarding for 10-minute delivery apps like Blinkit, Instamart & Zepto.',
  },
];

const OFFICES = [
  { city: 'Bengaluru', region: 'Karnataka' },
  { city: 'Kolkata', region: 'West Bengal' },
  { city: 'Dhanbad', region: 'Jharkhand' },
];

/* Footprint mono markers — rotated hues on dark: marigold · violet · royal */
const MILESTONE_DEEPS = ['text-marigold', 'text-violet', 'text-royal'];

/* Accent rotation for small tiles/chips — marigold · pine · rani · violet · royal */
const BADGE_TINTS = [
  'border-marigold/30 bg-marigold-tint text-marigold-deep',
  'border-pine/30 bg-pine-tint text-pine-deep',
  'border-rani/30 bg-rani-tint text-rani-deep',
  'border-violet/30 bg-violet-tint text-violet-deep',
  'border-royal/30 bg-royal-tint text-royal-deep',
];

export default function AboutUsPage({ onOpenContactPopup }) {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn more about Liveteachcreate, India's leading e-commerce account management and growth agency based in Bengaluru, Kolkata, and Dhanbad."
      />

      {/* Page header */}
      <header className="shell pt-16 pb-14 sm:pt-24 sm:pb-16">
        <Reveal>
          <p className="eyebrow">Who we are</p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-6 max-w-3xl text-display-lg font-display text-bone">
            About <span className="grad-text">Liveteachcreate</span>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="lede mt-5 max-w-2xl">
            Empowering Indian manufacturers, brand owners, and D2C startups to scale multi-channel
            sales across top online marketplaces.
          </p>
        </Reveal>
        <div className="mt-12 border-t border-white/15" />
      </header>

      {/* Story: big stat vs prose */}
      <section className="pb-20 sm:pb-24">
        <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="stat-num text-display-xl text-pine">6+</p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-mute">
              <span
                className="mr-3 inline-block h-px w-8 bg-violet align-middle"
                aria-hidden="true"
              ></span>
              Years of e-commerce growth mastery
            </p>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-bone-mute">
              Based in Bengaluru, Kolkata, and Dhanbad — operating where India's marketplaces
              actually move.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={100}>
            <p className="text-base leading-relaxed text-bone-mute sm:text-lg">
              Liveteachcreate has grown into one of India's premier e-commerce service providers.
              We specialize in end-to-end account handling, product cataloging, advertising
              management, and quick-commerce onboarding for Myntra, Amazon, Flipkart, Blinkit,
              Zepto, Jiomart, Nykaa, and Shopify.
            </p>
            <p className="mt-5 text-base leading-relaxed text-bone-mute sm:text-lg">
              Our mission is simple: eliminate operational complexities for sellers, optimize
              advertising budgets for maximum ROAS, and elevate brand visibility across domestic
              and global channels.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-8 border-t border-white/15 pt-8 sm:grid-cols-2">
              <Reveal delay={120} className="border-t-2 border-marigold pt-6">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-marigold">
                  Our vision
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-bone-mute">
                  To be India's most trusted growth accelerator for D2C brands and marketplace
                  sellers.
                </p>
              </Reveal>
              <Reveal delay={200} className="border-t-2 border-pine pt-6">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-pine">
                  Our values
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-bone-mute">
                  Transparency, empirical ad performance, continuous listing optimization &amp;
                  seller compliance.
                </p>
              </Reveal>
            </div>

            <div className="mt-10">
              <button type="button" onClick={onOpenContactPopup} className="btn btn-primary btn-sweep">
                Partner with us
                <i className="fas fa-arrow-right btn-arrow" aria-hidden="true"></i>
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Team values — numbered ledger */}
      <section className="well band">
        <div className="shell">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow">What sets us apart</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-4 text-display-md font-display text-bone">
                A working partner, not another dashboard
              </h2>
            </Reveal>
          </div>

          <div className="mt-10 border-b border-white/15">
            {WHAT_SETS_APART.map((item, idx) => (
              <Reveal key={item.title} delay={(idx % 6) * 80} className="ledger-row group pop-hover">
                <span className={`num-badge ${BADGE_TINTS[idx % 5]}`}>{idx + 1}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-bone sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-bone-mute">{item.desc}</p>
                </div>
                <span
                  className="hidden self-center text-bone-faint transition-transform duration-200 group-hover:translate-x-1 sm:block"
                  aria-hidden="true"
                >
                  <i className="fas fa-arrow-right"></i>
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footprint — mono-indexed milestones */}
      <section className="band bg-white/[0.02]">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal>
                <p className="eyebrow">Footprint</p>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="mt-4 text-display-md font-display text-bone">
                  Three cities, one operating standard
                </h2>
              </Reveal>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-faint">
              Offices — India
            </p>
          </div>

          <div className="mt-10 border-b border-white/15">
            {OFFICES.map((office, idx) => (
              <Reveal
                key={office.city}
                delay={(idx % 6) * 80}
                className="grid grid-cols-[3rem_1fr] items-baseline gap-5 border-t border-white/15 py-6 sm:grid-cols-[3rem_1fr_auto] sm:gap-8"
              >
                <span className={`font-mono text-xs ${MILESTONE_DEEPS[idx % MILESTONE_DEEPS.length]}`}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-xl font-semibold text-bone">{office.city}</h3>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-mute sm:justify-self-end">
                  {office.region}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <StatsCounter />
    </>
  );
}

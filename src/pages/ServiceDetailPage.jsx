import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { allServicesList } from '../data/servicesData';
import StatsCounter from '../components/common/StatsCounter';
import Reveal from '../components/common/Reveal.jsx';

const PROCESS_STEPS = [
  {
    title: 'Audit & diagnosis',
    desc: 'We review account health, catalog quality, advertising structure and ranking baseline before a single rupee of spend changes.',
  },
  {
    title: 'Foundation & compliance',
    desc: 'Listings, brand store and catalog hygiene are rebuilt to platform standards so nothing suppresses organic growth.',
  },
  {
    title: 'Optimize & advertise',
    desc: 'Keyword-indexed content and tightly structured campaigns compound organic rank while ACoS is pulled down.',
  },
  {
    title: 'Scale & report',
    desc: 'Inventory planning, event calendars and structured weekly reporting keep growth predictable, month after month.',
  },
];

/* Icon-tile & num-badge accent rotation — 5-hue ledger cycle, matching -deep text */
const TILE_TINTS = [
  'bg-marigold-tint border-marigold/40 text-marigold-deep',
  'bg-pine-tint border-pine/40 text-pine-deep',
  'bg-rani-tint border-rani/40 text-rani-deep',
  'bg-violet-tint border-violet/40 text-violet-deep',
  'bg-royal-tint border-royal/40 text-royal-deep',
];

export default function ServiceDetailPage({ onOpenContactPopup }) {
  const { slug } = useParams();
  const service = allServicesList.find(s => s.slug === slug);
  const [openFaq, setOpenFaq] = useState(0);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const relatedServices = allServicesList
    .filter(s => s.category === service.category && s.slug !== service.slug)
    .slice(0, 3);

  const faqs = [
    {
      q: 'Which marketplaces does this service cover?',
      a: `This service covers ${service.category.toLowerCase()} work across Indian marketplaces — Amazon, Flipkart, Myntra, Meesho and quick-commerce platforms. We scope the exact channels your catalog needs during the audit.`,
    },
    {
      q: 'How do we get started?',
      a: 'It begins with a free account audit. We review your current listings, advertising structure and account health, then share a prioritized 90-day execution plan.',
    },
    {
      q: 'Can you take over an existing seller account?',
      a: 'Yes — most engagements are takeovers. We work inside your existing seller central access, document every change, and you keep full ownership of assets, data and reports.',
    },
    {
      q: 'What does reporting look like?',
      a: 'You receive structured weekly updates and a monthly review covering sales, ad performance, ranking movement and account health — in plain language, with the numbers that matter.',
    },
  ];

  return (
    <>
      <SEO 
        title={service.heroTitle || service.name} 
        description={service.shortDesc} 
      />

      {/* Page header */}
      <section className="pt-16 sm:pt-24 pb-14 bg-paper">
        <div className="shell">
          <Reveal>
            <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint flex flex-wrap items-center gap-2">
              <Link to="/" className="hover:text-bone transition-colors">Home</Link>
              <span aria-hidden="true">/</span>
              <span>Services</span>
              <span aria-hidden="true">/</span>
              <span className="text-bone-mute">{service.name}</span>
            </nav>
          </Reveal>

          <Reveal delay={80}>
            <span className="eyebrow mt-8">
              <i className={service.icon} aria-hidden="true"></i>
              {service.name}
            </span>
          </Reveal>

          <Reveal delay={140}>
            <h1 className="text-display-lg font-display text-bone mt-5 max-w-4xl">
              {service.heroTitle || service.name}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="lede mt-5 max-w-2xl">
              {service.heroSubtitle || service.shortDesc}
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onOpenContactPopup}
                className="btn btn-primary btn-sweep"
              >
                Get free account audit
                <i className="fas fa-arrow-right btn-arrow" aria-hidden="true"></i>
              </button>
              <a
                href="tel:+919109266248"
                className="btn btn-outline"
              >
                <i className="fas fa-phone text-pine" aria-hidden="true"></i>
                <span>Call +91 9109266248</span>
              </a>
            </div>
          </Reveal>

          <div className="mt-12 border-t border-white/15"></div>
        </div>
      </section>

      {/* What you get — deliverables ledger */}
      <section className="well py-16 sm:py-20">
        <div className="shell">
          <div className="max-w-2xl">
            <span className="eyebrow">What you get</span>
            <h2 className="text-display-md font-display text-bone mt-4">
              Scope of deliverables & growth execution
            </h2>
            <p className="lede mt-4">
              A structured execution roadmap — seamless store operations, higher search indexing, optimized ad ROAS and continuous catalog compliance.
            </p>
          </div>

          <div className="mt-10 border-b border-white/15">
            {service.features.map((feat, idx) => (
              <Reveal key={idx} delay={(idx % 6) * 80}>
                <div className="ledger-row">
                  <span className="num-badge">{String(idx + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-lg sm:text-xl text-bone pt-1">{feat}</h3>
                  <span
                    className={`wiggle-hover hidden sm:inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${TILE_TINTS[idx % 5]}`}
                    aria-hidden="true"
                  >
                    <i className="fas fa-check text-sm"></i>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="band bg-paper">
        <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <span className="eyebrow">How we work</span>
            <h2 className="text-display-md font-display text-bone mt-4">The process</h2>
            <p className="lede mt-4">
              The same disciplined sequence runs under every engagement, scaled to your catalog size and category.
            </p>
          </Reveal>

          <div className="lg:col-span-8 border-b border-white/15">
            {PROCESS_STEPS.map((step, idx) => (
              <Reveal key={step.title} delay={(idx % 6) * 80}>
                <div className="grid grid-cols-[auto_1fr] gap-5 sm:gap-8 items-start py-7 border-t border-white/10">
                  <span className={`num-badge ${TILE_TINTS[idx % 5]}`}>{String(idx + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-display text-lg sm:text-xl text-bone">{step.title}</h3>
                    <p className="text-sm text-bone-mute leading-relaxed mt-2 max-w-xl">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="well py-16 sm:py-20">
        <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <span className="eyebrow">FAQ</span>
            <h2 className="text-display-md font-display text-bone mt-4">Questions sellers ask</h2>
            <p className="lede mt-4">
              Straight answers on scope, onboarding and reporting. Anything else — the audit call is the fastest way to ask.
            </p>
          </Reveal>

          <div className="lg:col-span-8 border-b border-white/15">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <Reveal key={faq.q} delay={(idx % 6) * 80}>
                  <div className="border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      aria-expanded={isOpen}
                      aria-controls={`service-faq-panel-${idx}`}
                      className="w-full flex items-start justify-between gap-6 py-6 text-left"
                    >
                      <span className="flex items-start gap-4 sm:gap-6">
                        <span className="font-mono text-[11px] text-bone-faint pt-2">{String(idx + 1).padStart(2, '0')}</span>
                        <span className="font-display text-lg sm:text-xl text-bone">{faq.q}</span>
                      </span>
                      <i
                        className={`fas fa-plus mt-2 transition-transform duration-200 ${isOpen ? 'rotate-45 text-marigold' : 'text-bone-faint'}`}
                        aria-hidden="true"
                      ></i>
                    </button>
                    {isOpen && (
                      <p
                        id={`service-faq-panel-${idx}`}
                        className="pb-6 pl-8 sm:pl-12 pr-4 text-sm text-bone-mute leading-relaxed max-w-2xl"
                      >
                        {faq.a}
                      </p>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related services */}
      {relatedServices.length > 0 && (
        <section className="band bg-paper">
          <div className="shell">
            <Reveal className="max-w-2xl">
              <span className="eyebrow">Related services</span>
              <h2 className="text-display-md font-display text-bone mt-4">More in {service.category}</h2>
            </Reveal>

            <div className="mt-10 border-b border-white/15">
              {relatedServices.map((rel, idx) => (
                <Reveal key={rel.slug} delay={(idx % 6) * 80}>
                  <Link
                    to={`/services/${rel.slug}`}
                    className="ledger-row no-underline"
                  >
                    <span className="num-badge text-sm">
                      <i className={rel.icon} aria-hidden="true"></i>
                    </span>
                    <span className="block pt-1">
                      <span className="block font-display text-lg sm:text-xl text-bone">{rel.name}</span>
                      <span className="block text-sm text-bone-mute leading-relaxed mt-2 max-w-xl">{rel.shortDesc}</span>
                    </span>
                    <i className="fas fa-arrow-right text-bone-faint group-hover:text-marigold transition-colors pt-2 hidden sm:block" aria-hidden="true"></i>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="band-ink band relative overflow-hidden">
        <span
          className="aurora"
          aria-hidden="true"
          style={{ width: '26rem', height: '26rem', background: '#F97316', top: '-9rem', right: '-7rem', opacity: 0.3, animationDelay: '-3s' }}
        ></span>
        <span
          className="aurora"
          aria-hidden="true"
          style={{ width: '20rem', height: '20rem', background: '#0E9F6E', bottom: '-7rem', left: '-6rem', opacity: 0.2, animationDelay: '-7s' }}
        ></span>
        <span
          className="aurora"
          aria-hidden="true"
          style={{ width: '24rem', height: '24rem', background: '#8B5CF6', top: '34%', left: '38%', opacity: 0.25, animationDelay: '-11s' }}
        ></span>
        <div className="shell relative">
          <span className="eyebrow">Free account audit</span>
          <h2 className="text-display-lg font-display mt-5 max-w-2xl">
            See what your account is <span className="grad-text">leaving</span> on the table
          </h2>
          <p className="lede mt-4 max-w-2xl">
            We audit your listings, advertising and account health, then send a prioritized 90-day growth plan. No obligation.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-4">
            <button
              onClick={onOpenContactPopup}
              className="btn btn-accent btn-sweep"
            >
              Get free account audit
              <i className="fas fa-arrow-right btn-arrow" aria-hidden="true"></i>
            </button>
            <a href="tel:+919109266248" className="btn btn-outline">
              <i className="fas fa-phone" aria-hidden="true"></i>
              <span>Call +91 9109266248</span>
            </a>
          </div>
        </div>
      </section>

      <StatsCounter />
    </>
  );
}

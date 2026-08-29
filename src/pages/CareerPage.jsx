import React from 'react';
import SEO from '../components/common/SEO';
import Reveal from '../components/common/Reveal.jsx';

const PERKS = [
  'On-site & hybrid roles',
  'Full-time positions',
  'Direct client ownership',
  'Performance-linked growth',
  'Learning & certification support',
  'Small senior teams',
];

/* Accent rotation — perk chips & role num-badges — marigold · pine · rani · violet · royal */
const ACCENT_TINTS = [
  'border-marigold/30 bg-marigold-tint text-marigold-deep',
  'border-pine/30 bg-pine-tint text-pine-deep',
  'border-rani/30 bg-rani-tint text-rani-deep',
  'border-violet/30 bg-violet-tint text-violet-deep',
  'border-royal/30 bg-royal-tint text-royal-deep',
];

export default function CareerPage() {
  const jobOpenings = [
    { title: "SEO Engineer", location: "Jaipur (On-site / Hybrid)", type: "Full-Time", exp: "2-4 Years", desc: "Expert in technical SEO, core web vitals, keyword indexing, schema architecture, and high-authority link acquisition." },
    { title: "Agentic Developer", location: "Jaipur (On-site / Hybrid)", type: "Full-Time", exp: "2-5 Years", desc: "Hands-on experience building autonomous AI agents, ReactJS frontend architectures, REST/GraphQL APIs, and workflow automation." },
    { title: "Meta Ads Manager", location: "Jaipur (On-site / Hybrid)", type: "Full-Time", exp: "3+ Years", desc: "Proven track record managing high-budget Meta (Facebook/Instagram) ad campaigns, CAC reduction, DPA catalog scaling, and ROAS optimization." },
    { title: "Social Media Manager", location: "Jaipur (On-site / Hybrid)", type: "Full-Time", exp: "2+ Years", desc: "Creative visual storyteller skilled in reels production, community engagement, brand strategy, content calendars, and viral growth." }
  ];

  return (
    <>
      <SEO
        title="Careers at Liveteachcreate"
        description="Join India's premier tech and e-commerce growth team. Open roles for SEO Engineer, Agentic Developer, Meta Ads Manager, and Social Media Manager."
      />

      {/* Page header */}
      <header className="shell pt-16 pb-14 sm:pt-24 sm:pb-16">
        <Reveal>
          <p className="eyebrow">Join our team</p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-6 max-w-3xl text-display-lg font-display text-bone">
            Careers at <span className="grad-text">Liveteachcreate</span>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="lede mt-5 max-w-2xl">
            Build your career alongside passion-driven tech and growth specialists shaping the
            future of Indian e-commerce &amp; AI.
          </p>
        </Reveal>
        <div className="mt-12 border-t border-white/15" />
      </header>

      {/* Culture + perks */}
      <section className="pb-20 sm:pb-24">
        <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <h2 className="text-display-md font-display text-bone">
              Small teams, real accounts, measurable outcomes
            </h2>
            <p className="mt-5 leading-relaxed text-bone-mute">
              Liveteachcreate manages listings, advertising, and full account operations across
              Amazon, Flipkart, Myntra, Meesho, Blinkit, and Shopify. We hire people who like
              ownership — your work ships to live marketplaces, and the numbers tell you how it
              did.
            </p>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <p className="eyebrow">What you can expect</p>
            </Reveal>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {PERKS.map((perk, idx) => (
                <Reveal
                  as="span"
                  key={perk}
                  delay={(idx % 6) * 80}
                  className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-medium ${ACCENT_TINTS[idx % 5]}`}
                >
                  {perk}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Openings — numbered ledger */}
      <section className="well band">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Reveal>
                <p className="eyebrow">Open roles</p>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="mt-4 text-display-md font-display text-bone">Current openings</h2>
              </Reveal>
            </div>
            <p className="font-mono text-xs text-bone-faint">
              {jobOpenings.length} positions · Jaipur
            </p>
          </div>

          <div className="mt-10 border-b border-white/15">
            {jobOpenings.map((job, idx) => (
              <Reveal key={idx} delay={(idx % 6) * 80} className="ledger-row pop-hover">
                <span className={`num-badge ${ACCENT_TINTS[idx % 5]}`}>{idx + 1}</span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-bone">{job.title}</h3>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-bone-faint">
                    {job.location} · {job.type} · {job.exp}
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-bone-mute">{job.desc}</p>
                </div>
                <a
                  href={`mailto:info@liveteachcreate.com?subject=Application%20for%20${encodeURIComponent(job.title)}`}
                  className="btn btn-outline btn-sweep col-span-2 justify-self-start sm:col-span-1 sm:justify-self-end sm:self-center"
                >
                  Apply now
                  <i className="fas fa-arrow-right btn-arrow" aria-hidden="true"></i>
                </a>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 text-sm text-bone-mute">
            Don't see your role? Write to{' '}
            <a href="mailto:info@liveteachcreate.com" className="link-underline font-semibold">
              info@liveteachcreate.com
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}

import React from 'react';
import SEO from '../components/common/SEO';
import Reveal from '../components/common/Reveal.jsx';

export default function CoursePage({ onOpenContactPopup }) {
  const modules = [
    {
      title: 'Seller Central Management',
      detail: 'Day-to-day Amazon seller account operations: catalog health, inventory planning, case logging, and account metrics.'
    },
    {
      title: 'PPC Campaign Optimization',
      detail: 'Structure, launch, and refine sponsored campaigns — keyword harvesting, bid control, and ACoS reduction on live accounts.'
    },
    {
      title: 'Cataloging & Listing Quality',
      detail: 'Build compliant, search-ready listings: titles, bullet points, backend search terms, and image standards across marketplaces.'
    },
    {
      title: 'Quick-Commerce Onboarding',
      detail: 'Prepare brands for Blinkit, Instamart, and Zepto: assortment mapping, dark-store inventory, and launch checklists.'
    },
    {
      title: 'Flipkart Advertising & Scaling',
      detail: 'Flipkart Ads fundamentals, PLA campaigns, event participation, and scaling revenue across marketplace channels.'
    },
    {
      title: 'Certification & Placement Prep',
      detail: 'Portfolio review, interview practice, and 100% placement assistance support to close the course.'
    },
  ];

  const facts = [
    { icon: 'fa-solid fa-clock', label: 'Course duration', value: '6 Weeks Intensive Practical Training' },
    { icon: 'fa-solid fa-laptop-file', label: 'Live account practice', value: 'Work directly on active seller accounts' },
    { icon: 'fa-solid fa-graduation-cap', label: 'Certification & placement', value: '100% Placement assistance support' },
  ];

  // Rotating accent tints for curriculum num-badges (marigold / pine / rani / violet / royal)
  const badgeTints = [
    'bg-marigold-tint text-marigold-deep border-marigold/30',
    'bg-pine-tint text-pine-deep border-pine/25',
    'bg-rani-tint text-rani-deep border-rani/25',
    'bg-violet-tint text-violet-deep border-violet/25',
    'bg-royal-tint text-royal-deep border-royal/30',
  ];

  return (
    <>
      <SEO
        title="Practical E-Commerce Training Course in Jaipur"
        description="Master Amazon seller central, Flipkart advertising, cataloging, and quick-commerce onboarding with Liveteachcreate's hands-on e-commerce training course."
      />

      {/* Header */}
      <section className="bg-paper relative overflow-hidden border-b border-white/10">
        {/* aurora field — marigold + violet duotone wash behind the header */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <span
            className="aurora"
            style={{
              width: '440px',
              height: '440px',
              background: '#F97316',
              top: '-150px',
              left: '-120px',
              opacity: 0.28,
              animationDelay: '0s'
            }}
          ></span>
          <span
            className="aurora"
            style={{
              width: '400px',
              height: '400px',
              background: '#8B5CF6',
              top: '-140px',
              right: '-120px',
              opacity: 0.24,
              animationDelay: '-7s'
            }}
          ></span>
        </div>
        <div className="shell py-16 sm:py-20 text-center space-y-5 relative">
          <Reveal as="p" delay={0} className="eyebrow justify-center">Hands-on training &middot; Jaipur</Reveal>
          <Reveal as="h1" delay={100} className="text-display-lg text-bone max-w-3xl mx-auto">
            Practical E-Commerce <span className="grad-text">Masterclass</span> in Jaipur
          </Reveal>
          <Reveal as="p" delay={200} className="lede max-w-2xl mx-auto">
            Learn live seller central management, PPC campaign optimization, and marketplace scaling from active industry experts.
          </Reveal>
        </div>
      </section>

      {/* Course Facts */}
      <section className="well">
        <div className="shell py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-sm overflow-hidden">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-cream p-6 sm:p-7 space-y-2 text-center md:text-left">
                <i className={`${fact.icon} text-pine text-xl`} aria-hidden="true"></i>
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-bone-faint">{fact.label}</p>
                <h4 className="font-sans font-semibold text-bone text-sm">{fact.value}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="bg-paper">
        <div className="shell band">
          <div className="max-w-4xl mx-auto">
            <Reveal as="p" delay={0} className="eyebrow">Curriculum</Reveal>
            <Reveal as="h2" delay={80} className="text-display-md text-bone mt-4 mb-2">Six weeks, six working modules</Reveal>
            <Reveal as="p" delay={160} className="lede mb-10 max-w-2xl">Every module is taught on live marketplace accounts, not slideware — you finish with work you can show.</Reveal>

            <div>
              {modules.map((mod, idx) => (
                <Reveal key={mod.title} delay={(idx % 6) * 70}>
                  <div className="ledger-row group">
                    <span className={`num-badge ${badgeTints[idx % 5]}`}>{String(idx + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="text-lg text-bone">{mod.title}</h3>
                      <p className="text-sm text-bone-mute mt-1.5 max-w-xl">{mod.detail}</p>
                    </div>
                    <i className="fa-solid fa-arrow-right text-bone-faint hidden sm:block self-center group-hover:text-marigold transition-colors" aria-hidden="true"></i>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mentor Strip */}
      <section className="band-pine">
        <div className="shell py-14 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div className="space-y-4">
              <span className="eyebrow">Mentorship</span>
              <h2 className="text-display-md text-bone max-w-xl">Taught by active marketplace managers</h2>
              <p className="text-bone/70 max-w-2xl leading-relaxed">
                Sessions are led by practitioners who manage Amazon, Flipkart, Meesho, and quick-commerce accounts daily. Limited seats keep the batch small enough for personalized mentoring on your own catalog and campaigns.
              </p>
            </div>
            <div className="flex lg:flex-col gap-6 lg:gap-4 lg:text-right font-mono text-xs uppercase tracking-[0.18em] text-bone/80">
              <div><span className="stat-num text-3xl text-marigold-bright block">6</span> Weeks</div>
              <div><span className="stat-num text-3xl text-marigold-bright block">100%</span> Placement support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enrolment / Pricing */}
      <section className="bg-paper-deep border-t border-white/10">
        <div className="shell band">
          <div className="card pop-hover max-w-2xl mx-auto p-8 sm:p-10 text-center space-y-6">
            <span className="eyebrow justify-center">Enrolment</span>
            <h2 className="text-display-md text-bone">Enrol in the upcoming batch</h2>
            <p className="text-sm text-bone-mute max-w-md mx-auto">
              Limited seats available for personalized mentoring. Course fee and batch dates are shared on inquiry — reserve your spot for the next weekend batch.
            </p>

            <ul className="text-left text-sm text-bone-mute space-y-2.5 border-y border-white/10 py-5 max-w-sm mx-auto w-full">
              {['6 weeks of live account training', 'Weekend batch format', 'Certification with placement assistance', 'Direct mentor access during the course'].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <i className="fas fa-check text-pine text-xs mt-1" aria-hidden="true"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={onOpenContactPopup}
              className="btn btn-accent btn-sweep"
            >
              <span>Inquire course details</span>
              <i className="fas fa-arrow-right btn-arrow" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

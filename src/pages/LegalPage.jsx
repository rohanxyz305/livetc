import React from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/common/SEO';
import Reveal from '../components/common/Reveal.jsx';

export default function LegalPage() {
  const location = useLocation();
  const path = location.pathname;

  let title = "Legal Information";
  let intro = [];
  let sections = [];

  if (path.includes('privacy-policy')) {
    title = "Privacy Policy";
    intro = [
      "Liveteachcreate values your privacy. This policy outlines how we handle personal information collected through our website, forms, and services.",
    ];
    sections = [
      {
        id: 'information-we-collect',
        heading: 'Information We Collect',
        body: [
          "We collect contact information including name, email address, phone number, and city when submitted via lead forms, strategy call requests, or contact popups.",
        ],
      },
      {
        id: 'use-of-information',
        heading: 'Use of Information',
        body: [
          "Information collected is strictly utilized to provide seller account audits, marketplace consultations, customer support, and service updates.",
        ],
      },
      {
        id: 'data-security',
        heading: 'Data Security',
        body: [
          "We implement industry-standard administrative and technical security measures to safeguard user information against unauthorized disclosure.",
        ],
      },
    ];
  } else if (path.includes('terms-and-conditions')) {
    title = "Terms & Conditions";
    intro = [
      "By accessing or using the services of Liveteachcreate, you agree to comply with and be bound by the following terms and conditions.",
    ];
    sections = [
      {
        id: 'service-terms',
        heading: 'Service Terms',
        body: [
          "Liveteachcreate provides e-commerce account management, catalog listing, PPC advertising, and onboarding services. All client accounts remain subject to third-party marketplace terms (Amazon, Flipkart, Blinkit, etc.).",
        ],
      },
      {
        id: 'intellectual-property',
        heading: 'Intellectual Property',
        body: [
          "All content, branding, logos, and materials created by Liveteachcreate remain the intellectual property of Liveteachcreate unless explicitly transferred.",
        ],
      },
    ];
  } else {
    title = "Disclaimer";
    intro = [
      "Liveteachcreate is an independent e-commerce service agency based in Jaipur, India. Brand names such as Amazon, Flipkart, Meesho, Myntra, Blinkit, Swiggy Instamart, Zepto, Nykaa, and Tata CLiQ are registered trademarks of their respective owners.",
      "Liveteachcreate provides service facilitation, PPC ad management, and operational consulting. Sales growth metrics and performance results depend on product demand, pricing, inventory availability, and market dynamics.",
    ];
  }

  const hasToc = sections.length > 1;

  return (
    <>
      <SEO title={title} description={`${title} for Liveteachcreate.`} />

      {/* Page header */}
      <header className="shell pt-16 pb-12 sm:pt-24 sm:pb-14">
        <Reveal>
          <p className="eyebrow">Legal</p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-6 text-display-lg font-display text-bone">{title}</h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="lede mt-4">Liveteachcreate legal terms</p>
        </Reveal>
        <div className="mt-10 border-t border-white/15" />
      </header>

      <section className="pb-20 sm:pb-24">
        <div
          className={
            hasToc
              ? 'shell grid grid-cols-1 gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16'
              : 'shell'
          }
        >
          {hasToc && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-faint">
                  On this page
                </p>
                <nav className="mt-4 border-l border-white/10" aria-label="Table of contents">
                  {sections.map((section, idx) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="-ml-px block border-l-2 border-transparent py-2 pl-4 font-mono text-xs text-bone-mute transition-colors hover:border-violet hover:text-violet"
                    >
                      <span className="text-marigold">{String(idx + 1).padStart(2, '0')}</span>{' '}
                      {section.heading}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          <div className={hasToc ? 'max-w-prose' : 'mx-auto max-w-prose'}>
            <div className="space-y-4">
              {intro.map((paragraph, idx) => (
                <p key={idx} className="text-base leading-relaxed text-bone-mute">
                  {paragraph}
                </p>
              ))}
            </div>

            {sections.length > 0 && (
              <div className="mt-10 divide-y divide-white/10 border-t border-white/15">
                {sections.map((section, idx) => (
                  <section key={section.id} id={section.id} className="scroll-mt-24 py-8">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-marigold">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <h2 className="font-display text-xl text-bone sm:text-2xl">
                        {section.heading}
                      </h2>
                    </div>
                    <div className="mt-4 space-y-4">
                      {section.body.map((paragraph, pIdx) => (
                        <p key={pIdx} className="text-[15px] leading-relaxed text-bone-mute">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

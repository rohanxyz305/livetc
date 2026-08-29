import React, { useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { cityPagesList } from '../data/cityPagesData';
import { servicesCategories } from '../data/servicesData';
import Reveal from '../components/common/Reveal.jsx';
import useCountUp from '../hooks/useCountUp.js';
import useInView from '../hooks/useInView.js';

/* Count-up for the local proof index numerals ("01"…"04") */
function CountIndex({ value, started }) {
  const v = useCountUp(value, { start: started, duration: 900 });
  return <>{String(Math.round(v)).padStart(2, '0')}</>;
}

/* Service row icon rotation — 5-hue ledger cycle, DEFAULT hues on dark */
const ROW_ICON_HUES = ['text-marigold', 'text-pine', 'text-rani', 'text-violet', 'text-royal'];

/* Local-proof strip ticks alternate ink/paper — numerals stay ink on the marigold band */
const PROOF_TICKS = ['bg-ink/70', 'bg-paper'];

export default function CityServicePage({ onOpenContactPopup }) {
  const { slug } = useParams();
  const city = cityPagesList.find(c => c.slug === slug);

  const proofRef = useRef(null);
  const proofInView = useInView(proofRef);

  if (!city) {
    return <Navigate to="/" replace />;
  }

  const sampleServices = servicesCategories.flatMap(c => c.services).slice(0, 6);

  return (
    <>
      <SEO 
        title={city.title} 
        description={city.metaDesc} 
      />

      {/* Page header */}
      <section className="pt-16 sm:pt-24 pb-14 bg-paper">
        <div className="shell">
          <Reveal>
            <span className="eyebrow">Serving sellers in {city.cityName}</span>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-display-xl font-display text-bone mt-6">
              <span className="grad-text">{city.cityName}</span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="lede mt-5 max-w-2xl">
              Full-service marketplace management for manufacturers and retail brands in {city.cityName} — listings, advertising and account health across Amazon, Flipkart, Myntra, Meesho and quick commerce.
            </p>
          </Reveal>

          <div className="mt-12 border-t border-white/15"></div>
        </div>
      </section>

      {/* Local proof — high-energy strip */}
      <section className="band-marigold border-y border-white/10 py-14 sm:py-16">
        <div className="shell">
          <span className="eyebrow text-ink before:bg-ink">Local proof</span>
          <div ref={proofRef} className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8">
            {city.highlights.map((hl, idx) => (
              <Reveal
                key={idx}
                delay={(idx % 6) * 80}
                className="lg:px-6 lg:border-l border-white/15 lg:first:pl-0 lg:first:border-l-0"
              >
                <span aria-hidden="true" className={`mb-3 block h-0.5 w-8 ${PROOF_TICKS[idx % 2]}`}></span>
                <p className="stat-num text-3xl text-ink">
                  <CountIndex value={idx + 1} started={proofInView} />
                </p>
                <p className="mt-3 text-sm font-medium text-ink leading-relaxed">{hl}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services delivered */}
      <section className="band bg-paper">
        <div className="shell">
          <div className="max-w-2xl">
            <span className="eyebrow">Services delivered</span>
            <h2 className="text-display-md font-display text-bone mt-4">
              Popular services in {city.cityName}
            </h2>
            <p className="lede mt-4">
              Full-service seller account management and listing optimization, run by a dedicated team.
            </p>
          </div>

          <div className="mt-10 border-b border-white/15">
            {sampleServices.map((s, idx) => (
              <Reveal key={s.slug} delay={(idx % 6) * 80}>
                <div className="ledger-row pop-hover hover:bg-white/[0.03]">
                  <span className="num-badge">{String(idx + 1).padStart(2, '0')}</span>
                  <div className="pt-1">
                    <h3 className="font-display text-lg sm:text-xl text-bone flex items-center gap-3">
                      <i className={`${s.icon} ${ROW_ICON_HUES[idx % 5]}`} aria-hidden="true"></i>
                      {s.name}
                    </h3>
                    <p className="text-sm text-bone-mute leading-relaxed mt-2 max-w-xl">{s.shortDesc}</p>
                  </div>
                  <Link
                    to={`/services/${s.slug}`}
                    className="link-underline hidden sm:inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] pt-2"
                  >
                    View service
                    <i className="fas fa-arrow-right text-[10px]" aria-hidden="true"></i>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="band-ink band relative overflow-hidden">
        <div className="absolute inset-0 grid-paper" aria-hidden="true"></div>
        <span
          className="aurora"
          aria-hidden="true"
          style={{ width: '24rem', height: '24rem', background: '#F97316', top: '-8rem', left: '-6rem', opacity: 0.3, animationDelay: '-4s' }}
        ></span>
        <span
          className="aurora"
          aria-hidden="true"
          style={{ width: '18rem', height: '18rem', background: '#0E9F6E', bottom: '-6rem', right: '-5rem', opacity: 0.2, animationDelay: '-8s' }}
        ></span>
        <span
          className="aurora"
          aria-hidden="true"
          style={{ width: '22rem', height: '22rem', background: '#8B5CF6', top: '30%', left: '42%', opacity: 0.25, animationDelay: '-12s' }}
        ></span>
        <div className="shell relative">
          <span className="eyebrow">{city.cityName}</span>
          <h2 className="text-display-lg font-display mt-5 max-w-2xl">
            Scale your {city.cityName} business online
          </h2>
          <p className="lede mt-4 max-w-2xl">
            Talk to our seller management consultants for a dedicated onboarding plan tailored to {city.cityName} businesses.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-4">
            <button
              onClick={onOpenContactPopup}
              className="btn btn-accent btn-sweep"
            >
              Get free audit
              <i className="fas fa-arrow-right btn-arrow" aria-hidden="true"></i>
            </button>
            <a href="tel:+919109266248" className="btn btn-outline">
              <i className="fas fa-phone" aria-hidden="true"></i>
              <span>Call +91 9109266248</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

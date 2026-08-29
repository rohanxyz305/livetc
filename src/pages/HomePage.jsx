import React, { useState } from 'react';
import SEO from '../components/common/SEO';
import HeroSection from '../components/sections/HeroSection';
import StatsCounter from '../components/common/StatsCounter';
import ServiceCard from '../components/common/ServiceCard';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import ReviewCard from '../components/common/ReviewCard';
import Reveal from '../components/common/Reveal.jsx';
import { servicesCategories, allServicesList } from '../data/servicesData';

export default function HomePage({ onOpenContactPopup }) {
  const [activeTab, setActiveTab] = useState('ALL');

  const categories = [
    { id: 'ALL', label: 'All Services', dot: 'bg-marigold' },
    { id: 'Marketplace Management', label: 'Marketplace Mgmt', dot: 'bg-pine' },
    { id: 'Marketplace Onboarding', label: 'Quick Onboarding', dot: 'bg-violet' },
    { id: 'Digital Marketing', label: 'Digital Ads', dot: 'bg-rani' },
    { id: 'Web Development', label: 'Web Store Dev', dot: 'bg-royal' }
  ];

  const filteredServices = activeTab === 'ALL'
    ? allServicesList.slice(0, 9)
    : allServicesList.filter(s => s.category === activeTab);

  const reviewsList = [
    { initial: 'A', name: 'Anant', stars: 5, text: 'Best ecommerce handling services and very humble and knowledgeable team. Helped us scale Amazon sales significantly.' },
    { initial: 'V', name: 'Vasist Mishra', stars: 5, text: 'Best services for e-commerce account handling. Especially Amazon PPC management. Staff is very knowledgeable and prompt.' },
    { initial: 'S', name: 'Surbhi Kumari', stars: 4, text: 'Amazon account management services grateful for increasing our order visibility.' },
    { initial: 'R', name: 'Ram Singh', stars: 5, text: 'Fantastic Flipkart and Myntra listing service. Great customer support team.' },
    { initial: 'I', name: 'Indranil', stars: 5, text: 'Thanks for increasing my monthly sales volume by 3x across marketplaces!' },
    { initial: 'S', name: 'Sushant Sharma', stars: 5, text: 'Best Amazon account management services in Jaipur. Truly professional growth agency.' }
  ];

  /* Bold ticker numbers rotate marigold / violet / royal instead of all-marigold */
  const tickerHues = ['text-marigold', 'text-violet', 'text-royal'];

  const tickerItems = [
    { highlight: '1,420+ orders', rest: 'processed today across client accounts' },
    { highlight: '100% anti-suppression shield', rest: 'active for all sellers' },
    { highlight: '4.9× average ROAS', rest: 'achieved on Amazon & Meta ads' },
    { highlight: 'Real-time FBA & dark-store sync', rest: 'operating normally' }
  ];

  return (
    <>
      <SEO 
        title="E-Commerce Platform Service Providers"
        description="Liveteachcreate offers complete seller account management for Myntra, Amazon, Flipkart, Shopify, & Blinkit, including listings, inventory & PPC ads."
      />

      {/* Hero Section */}
      <HeroSection onOpenContactPopup={onOpenContactPopup} />

      {/* Key Metrics Counter */}
      <StatsCounter />

      {/* Services */}
      <section className="band">
        <div className="shell">
          <Reveal className="max-w-3xl space-y-4">
            <p className="eyebrow">Services · Account management &amp; growth</p>
            <h2 className="text-display-lg font-display text-bone">
              End-to-end marketplace management &amp; scaling
            </h2>
            <p className="lede">
              One accountable team across listings, ads, cataloguing and quick-commerce —
              filter by where you need help first.
            </p>
          </Reveal>
        </div>

        {/* Live ticker strip */}
        <div className="tick mt-12">
          <div className="shell flex items-center gap-5 py-3.5">
            <span className="flex shrink-0 items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-marigold">
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full bg-marigold opacity-75"
                  aria-hidden="true"
                ></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-marigold" aria-hidden="true"></span>
              </span>
              Live
            </span>
            <div className="min-w-0 flex-1 overflow-hidden">
              <div className="tick-track">
                {[0, 1].map((dup) => (
                  <div
                    key={dup}
                    aria-hidden={dup === 1}
                    className="flex items-center gap-10 pr-10"
                  >
                    {tickerItems.map((item, i) => (
                      <span key={i} className="flex items-center gap-3 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.14em] text-bone-mute">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-marigold" aria-hidden="true"></span>
                        <span>
                          <strong className={`font-semibold ${tickerHues[i % tickerHues.length]}`}>{item.highlight}</strong>{' '}
                          {item.rest}
                        </span>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="shell">
          {/* Category filter chips — active stays ink; hue dot per category */}
          <div className="mt-10 flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                aria-pressed={activeTab === cat.id}
                className={`chip transition-colors ${
                  activeTab === cat.id
                    ? 'chip-active'
                    : 'hover:border-white/40 hover:text-bone'
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${cat.dot}`} aria-hidden="true"></span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Service cards grid */}
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {filteredServices.map((service, idx) => (
              <ServiceCard key={service.slug} service={service} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials / Google Reviews */}
      <section className="well band">
        <div className="shell">
          <div className="max-w-3xl space-y-4">
            <p className="eyebrow">Client feedback</p>
            <h2 className="text-display-lg font-display text-bone">
              What Indian sellers say about Liveteachcreate
            </h2>
            <p className="lede">
              Trusted by 300+ sellers across Flipkart, Amazon, Meesho, Shopify &amp; Blinkit.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {reviewsList.map((rev, idx) => (
              <ReviewCard key={idx} review={rev} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="band band-ink relative overflow-hidden">
        <div className="grid-paper absolute inset-0 pointer-events-none" aria-hidden="true"></div>
        {/* aurora glow — marigold + violet + rani on ink */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <span
            className="aurora"
            style={{
              width: '460px',
              height: '460px',
              background: '#F97316',
              top: '-160px',
              right: '-100px',
              opacity: 0.3,
              animationDelay: '0s'
            }}
          ></span>
          <span
            className="aurora"
            style={{
              width: '440px',
              height: '440px',
              background: '#8B5CF6',
              top: '-140px',
              left: '16%',
              opacity: 0.22,
              animationDelay: '-9s'
            }}
          ></span>
          <span
            className="aurora"
            style={{
              width: '380px',
              height: '380px',
              background: '#E42A8A',
              bottom: '-160px',
              left: '6%',
              opacity: 0.2,
              animationDelay: '-6s'
            }}
          ></span>
        </div>
        <div className="shell relative">
          <div className="max-w-3xl space-y-6">
            <p className="eyebrow">Free account audit</p>
            <h2 className="text-display-lg font-display text-bone">
              Ready to multiply your marketplace <span className="grad-text">revenue</span>?
            </h2>
            <p className="lede max-w-2xl">
              Book a complimentary seller account audit. Our marketplace experts will identify
              keyword gaps, listing deficiencies and ad-spend savings.
            </p>
            <div>
              <button
                type="button"
                onClick={onOpenContactPopup}
                className="btn btn-accent btn-sweep"
              >
                Book free account audit
                <i className="fas fa-arrow-right btn-arrow" aria-hidden="true"></i>
              </button>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-bone/50">
              Amazon · Flipkart · Myntra · Shopify · Blinkit · Weekly reporting
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

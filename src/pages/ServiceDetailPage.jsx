import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { allServicesList } from '../data/servicesData';
import StatsCounter from '../components/common/StatsCounter';

export default function ServiceDetailPage({ onOpenContactPopup }) {
  const { slug } = useParams();
  const cleanSlug = slug ? slug.toLowerCase().replace('.php', '') : '';
  const service = allServicesList.find(s => s.slug.toLowerCase() === cleanSlug);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const relatedServices = allServicesList
    .filter(s => s.category === service.category && s.slug.toLowerCase() !== service.slug.toLowerCase())
    .slice(0, 3);

  return (
    <>
      <SEO 
        title={service.heroTitle || service.name} 
        description={service.shortDesc} 
        canonicalUrl={`https://liveteachcreate.com/services/${service.slug}`}
      />

      {/* Hero Header */}
      <div className="hero-bg py-16 md:py-24 border-b border-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left space-y-6">
          <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
            <Link to="/" className="text-xs text-gray-400 hover:text-[#FEE715]">Home</Link>
            <span className="text-gray-600">/</span>
            <span className="text-xs text-[#FEE715] font-bold">{service.category}</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FEE715]/10 text-[#FEE715] border border-[#FEE715]/30 rounded-full text-xs font-bold uppercase tracking-wider">
            <i className={service.icon}></i>
            <span>{service.name}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display leading-tight max-w-4xl">
            {service.heroTitle}
          </h1>

          <p className="text-base text-gray-300 max-w-3xl leading-relaxed font-medium">
            {service.heroSubtitle || service.shortDesc}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
            <button
              onClick={onOpenContactPopup}
              className="pulseBtn font-bold text-xs px-8 py-4 rounded-full uppercase tracking-wider shadow-yellowGlow"
            >
              Get Free Consultation
            </button>
            <a
              href="tel:+919109266248"
              className="px-8 py-4 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-white font-bold text-xs rounded-full shadow-sm text-center flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-phone text-[#FEE715]"></i>
              <span>Call +91 9109266248</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Service Content & Deliverables */}
      <section className="py-20 bg-[#101820] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-8 space-y-10">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white font-display">
                  Key Scope of Deliverables & Growth Execution
                </h2>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Our structured execution roadmap ensures seamless store operations, higher search indexing, optimized ad ROAS, and continuous catalog compliance.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {service.features && service.features.map((feat, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-2 hover:border-[#FEE715]/50 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-[#FEE715] text-[#101820] flex items-center justify-center font-bold text-xs shadow-yellowGlow">
                      {idx + 1}
                    </div>
                    <h3 className="font-bold text-sm text-white">{feat}</h3>
                    <p className="text-[11px] text-gray-400">Professional execution handled by dedicated account specialists.</p>
                  </div>
                ))}
              </div>

              <div className="p-8 rounded-3xl bg-gray-900 border border-gray-800 text-white space-y-4">
                <h3 className="text-xl font-bold font-display text-white">Why Outsource Your Seller Management to Liveteachcreate?</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Managing e-commerce accounts in-house requires dedicated graphic designers, PPC analysts, catalog writers, and policy specialists. Partnering with Liveteachcreate gives you access to an entire team of senior e-commerce strategists at a fraction of in-house payroll costs.
                </p>
                <div className="pt-2">
                  <button
                    onClick={onOpenContactPopup}
                    className="bg-[#FEE715] hover:bg-[#e0ca00] text-[#101820] font-bold text-xs px-6 py-3 rounded-xl uppercase tracking-wider shadow-yellowGlow"
                  >
                    Start Service Growth
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar CTA & Related Services */}
            <div className="lg:col-span-4 space-y-8">
              <div className="p-8 rounded-3xl bg-gray-900/60 border border-gray-800 space-y-6">
                <h3 className="text-lg font-bold text-white font-display border-b border-gray-800 pb-3">
                  Need Quick Assistance?
                </h3>
                <p className="text-xs text-gray-400">
                  Speak directly with an e-commerce specialist regarding your seller account audit or cataloging requirements.
                </p>
                <button
                  onClick={onOpenContactPopup}
                  className="w-full pulseBtn font-bold text-xs py-3.5 rounded-xl uppercase tracking-wider shadow-yellowGlow"
                >
                  Schedule Callback
                </button>
              </div>

              {relatedServices.length > 0 && (
                <div className="p-6 rounded-3xl bg-gray-900/60 border border-gray-800 space-y-4">
                  <h3 className="text-sm font-bold text-[#FEE715] uppercase tracking-wider border-b border-gray-800 pb-2">
                    Related {service.category} Services
                  </h3>
                  <div className="space-y-2">
                    {relatedServices.map((rel) => (
                      <Link
                        key={rel.slug}
                        to={`/services/${rel.slug}`}
                        className="block p-3 rounded-xl bg-[#101820] border border-gray-800 hover:border-[#FEE715] text-xs font-bold text-gray-200 hover:text-[#FEE715] transition-all"
                      >
                        <i className={`${rel.icon} text-[#FEE715] mr-2`}></i>
                        <span>{rel.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      <StatsCounter />
    </>
  );
}

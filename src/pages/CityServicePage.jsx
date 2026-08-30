import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { cityPagesList } from '../data/cityPagesData';
import ServiceCard from '../components/common/ServiceCard';
import { servicesCategories } from '../data/servicesData';

export default function CityServicePage({ onOpenContactPopup }) {
  const { slug } = useParams();
  const cleanSlug = slug ? slug.toLowerCase().replace('.php', '') : '';
  const city = cityPagesList.find(c => c.slug.toLowerCase() === cleanSlug);

  if (!city) {
    return <Navigate to="/" replace />;
  }

  const sampleServices = servicesCategories.flatMap(c => c.services).slice(0, 6);

  return (
    <>
      <SEO 
        title={city.title} 
        description={city.metaDesc} 
        canonicalUrl={`https://liveteachcreate.com/locations/${city.slug}`}
      />

      <div className="bg-gradient-to-b from-gray-900 to-[#101820] py-16 text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3 py-1 bg-[#FEE715]/10 text-[#FEE715] border border-[#FEE715]/30 rounded-full text-xs font-bold uppercase tracking-wider">
            Local E-Commerce Expertise
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
            {city.title}
          </h1>
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            Empowering manufacturers and retail brands in {city.cityName} to expand online sales across Amazon, Flipkart, Meesho, Myntra, and Quick Commerce platforms.
          </p>
        </div>
      </div>

      <section className="py-16 bg-[#101820] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {city.highlights && city.highlights.map((hl, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#FEE715] text-[#101820] flex items-center justify-center mx-auto text-sm font-bold shadow-yellowGlow">
                  <i className="fa-solid fa-check"></i>
                </div>
                <h4 className="font-bold text-xs text-white">{hl}</h4>
              </div>
            ))}
          </div>

          <div>
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <h2 className="text-2xl font-bold text-white font-display">Popular Services in {city.cityName}</h2>
              <p className="text-xs text-gray-400">Full-service seller account management & listing optimization.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sampleServices.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </div>

          <div className="p-10 rounded-3xl bg-gray-900 border border-gray-800 text-white text-center space-y-6">
            <h3 className="text-3xl font-extrabold font-display text-white">Scale Your {city.cityName} Business Online</h3>
            <p className="text-xs text-gray-300 max-w-xl mx-auto">
              Get in touch with our seller management consultants for a dedicated onboarding plan tailored for {city.cityName} businesses.
            </p>
            <button
              onClick={onOpenContactPopup}
              className="bg-[#FEE715] text-[#101820] font-extrabold text-xs px-8 py-3.5 rounded-full uppercase tracking-wider shadow-yellowGlow"
            >
              Get Free Consultation
            </button>
          </div>

        </div>
      </section>
    </>
  );
}

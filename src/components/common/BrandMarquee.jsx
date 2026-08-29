import React from 'react';
import { brandLogos } from '../../data/brandLogos';

export default function BrandMarquee() {
  const doubleLogos = [...brandLogos, ...brandLogos];

  return (
    <section className="py-10 bg-[#101820] border-y border-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#FEE715]">
          Trusted by 500+ Top E-Commerce Brands Across India
        </span>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#101820] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#101820] to-transparent z-10 pointer-events-none"></div>

        <div className="marquee-track flex items-center gap-8 py-2">
          {doubleLogos.map((brand, idx) => (
            <div 
              key={idx}
              className="shrink-0 h-16 w-36 px-4 bg-gray-900/60 rounded-2xl border border-gray-800 flex items-center justify-center hover:border-[#FEE715] hover:shadow-yellowGlow transition-all"
            >
              <img 
                src={brand.url} 
                alt={brand.name} 
                className="max-h-9 max-w-full object-contain brightness-90 hover:brightness-100"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.parentElement.innerHTML = `<span class="text-xs font-bold text-gray-300">${brand.name}</span>`;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

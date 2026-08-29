import React from 'react';
import { brandLogos } from '../../data/brandLogos';

/* Rhythmic 5-hue accent rotation — DEFAULT hues on the dark stage (brighter than -deep):
   marigold → violet → pine → rani → royal */
const diamondColor = (idx) => {
  const hues = ['text-marigold', 'text-violet', 'text-pine', 'text-rani', 'text-royal'];
  return hues[idx % hues.length];
};

export default function BrandMarquee() {
  const doubleLogos = [...brandLogos, ...brandLogos];

  return (
    <section className="tick py-8 sm:py-10" aria-label="Brands that trust Liveteachcreate">
      <div className="shell flex justify-center">
        <p className="eyebrow text-center">
          Trusted by 500+ top e-commerce brands across India
        </p>
      </div>

      <div className="relative mt-6 overflow-hidden">
        <div className="tick-track items-center py-1">
          {doubleLogos.map((brand, idx) => (
            <React.Fragment key={idx}>
              <span className="shrink-0 whitespace-nowrap px-5 font-mono text-xs uppercase tracking-[0.2em] text-bone-mute sm:text-[13px]">
                {brand.name}
              </span>
              <i className={`fas fa-diamond shrink-0 text-[7px] ${diamondColor(idx)}`} aria-hidden="true"></i>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

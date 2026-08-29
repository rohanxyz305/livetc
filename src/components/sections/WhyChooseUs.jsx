import React from 'react';
import Reveal from '../common/Reveal.jsx';

/* Bright DEFAULT hues read well on the dark pine band — rotate by index % 5 */
const ROW_ICON_HUES = ['text-marigold', 'text-violet', 'text-royal', 'text-rani', 'text-leaf'];

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: "fa-solid fa-user-gear",
      title: "Dedicated Account Specialist",
      desc: "Get a single point of contact and an expert team managing your marketplace accounts daily."
    },
    {
      icon: "fa-solid fa-chart-line",
      title: "Data-Driven PPC Management",
      desc: "Maximize Return on Ad Spend (ROAS) and minimize wasted ad dollars with keyword bid tuning."
    },
    {
      icon: "fa-solid fa-wand-magic-sparkles",
      title: "A+ Graphic & Cataloging Team",
      desc: "In-house graphic designers crafting brand stores, A+ content, and high-converting gallery images."
    },
    {
      icon: "fa-solid fa-bolt",
      title: "Quick-Commerce Onboarding",
      desc: "Fast-track onboarding on Blinkit, Swiggy Instamart & Zepto dark stores across Indian metros."
    },
    {
      icon: "fa-solid fa-headset",
      title: "Transparent Weekly Reporting",
      desc: "Regular performance reports detailing organic sales, ad spend, inventory levels & growth action plans."
    },
    {
      icon: "fa-solid fa-shield-check",
      title: "Account Health Maintenance",
      desc: "Proactive management to prevent policy violations, listing suppression, or seller account suspensions."
    }
  ];

  return (
    <section className="band band-pine relative overflow-hidden">
      <div className="shell relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Sticky intro column */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <p className="eyebrow">Why choose Liveteachcreate</p>
              <h2 className="mt-5 text-display-lg font-display text-bone">
                The preferred e-commerce partner for ambitious brands
              </h2>
              <p className="lede mt-5">
                We provide full-funnel management so you can focus on product manufacturing
                while we handle online sales.
              </p>
            </div>
          </div>

          {/* Numbered ledger rows */}
          <div className="lg:col-span-7">
            {reasons.map((item, idx) => (
              <Reveal key={idx} delay={idx * 70} className="ledger-row !border-white/20 group">
                <span className="num-badge !border-white/30 !bg-white/10 !text-bone">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-xl text-bone">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-bone/70">{item.desc}</p>
                </div>
                <i
                  className={`${item.icon} hidden text-lg transition-transform duration-300 group-hover:scale-125 sm:block ${ROW_ICON_HUES[idx % ROW_ICON_HUES.length]}`}
                  aria-hidden="true"
                ></i>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

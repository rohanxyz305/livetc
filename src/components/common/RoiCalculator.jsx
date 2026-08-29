import React, { useState } from 'react';

export default function RoiCalculator({ onOpenContactPopup }) {
  const [students, setStudents] = useState(250);
  const [price, setPrice] = useState(3499);

  const monthlyRevenue = students * price;
  const annualRevenue = monthlyRevenue * 12;

  return (
    <section className="band well relative overflow-hidden">
      <div className="shell">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">

          {/* Intro column */}
          <div className="space-y-5 lg:col-span-5">
            <p className="eyebrow">
              ROI calculator
              <span className="inline-block h-px w-8 bg-violet-deep" aria-hidden="true"></span>
            </p>
            <h2 className="text-display-lg font-display text-bone">
              See what a well-run marketplace is worth
            </h2>
            <p className="lede">
              Set your monthly order volume and average order value to estimate revenue —
              then book a free audit and we&rsquo;ll show you how listings, ads and account
              health can lift both numbers.
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone-faint">
              Estimates only · Actual results vary by category &amp; ad spend
            </p>
          </div>

          {/* Calculator panel */}
          <div className="lg:col-span-7">
            <div className="card p-6 sm:p-8">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-mute">
                  Revenue estimator
                </p>
                <i className="fa-solid fa-calculator text-pine" aria-hidden="true"></i>
              </div>

              <div className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="roi-orders" className="field-label">
                    Orders per month
                  </label>
                  <input
                    id="roi-orders"
                    type="number"
                    min="25"
                    max="2000"
                    step="25"
                    value={students}
                    onChange={(e) => setStudents(Number(e.target.value))}
                    className="field"
                  />
                </div>

                <div>
                  <label htmlFor="roi-price" className="field-label">
                    Average order value (₹)
                  </label>
                  <input
                    id="roi-price"
                    type="number"
                    min="499"
                    max="25000"
                    step="250"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="field"
                  />
                </div>
              </div>

              {/* Result */}
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-bone-mute">
                  Estimated monthly revenue
                </p>
                <p key={monthlyRevenue} className="stat-num mt-2 animate-pop text-4xl text-marigold sm:text-5xl">
                  ₹{monthlyRevenue.toLocaleString('en-IN')}
                </p>
                <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-white/10 pt-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-bone-mute">
                    Projected annual revenue
                  </span>
                  <span className="font-mono text-sm font-semibold text-bone">
                    ₹{annualRevenue.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenContactPopup}
                className="btn btn-primary btn-sweep mt-8 w-full"
              >
                Book free account audit
                <i className="fas fa-arrow-right btn-arrow" aria-hidden="true"></i>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

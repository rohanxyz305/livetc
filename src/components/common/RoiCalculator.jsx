import React, { useState } from 'react';

export default function RoiCalculator({ onOpenContactPopup }) {
  const [students, setStudents] = useState(250);
  const [price, setPrice] = useState(3499);

  const monthlyRevenue = students * price;
  const annualRevenue = monthlyRevenue * 12;

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-purple-950 to-midnight text-white relative overflow-hidden border-y border-purple-800">
      {/* Background radial glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-block px-3.5 py-1.5 bg-purple-500/20 border border-purple-400/30 text-purple-300 rounded-full text-xs font-bold uppercase tracking-widest">
              Interactive Revenue Calculator
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight">
              Calculate Your Creator Income Potential
            </h2>
            <p className="text-sm text-purple-200 leading-relaxed">
              Drag the sliders to estimate how much revenue your live cohort or video course can generate using Liveteachcreate's automated funnels.
            </p>

            <div className="p-6 rounded-2xl bg-white/5 border border-purple-500/20 space-y-4">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-bolt text-amber-400 text-xl"></i>
                <div>
                  <h4 className="font-bold text-sm">Zero Platform Rev-Share Friction</h4>
                  <p className="text-xs text-purple-200/80">You keep 100% of your earnings. Payouts processed directly to your bank account via UPI/Stripe.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-white text-purple-950 shadow-2xl space-y-8 border border-purple-100">
              <div className="flex items-center justify-between border-b pb-4 border-purple-100">
                <h3 className="font-bold text-base font-display">Live Course Income Estimator</h3>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-extrabold rounded-full">
                  100% Yours Keep
                </span>
              </div>

              {/* Slider 1: Number of Students */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-gray-600">Expected Monthly Students / Cohort Size</span>
                  <span className="text-purple-700 text-base font-extrabold">{students} Learners</span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="2000"
                  step="25"
                  value={students}
                  onChange={(e) => setStudents(Number(e.target.value))}
                  className="w-full h-2 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>

              {/* Slider 2: Course Price */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-gray-600">Course / Ticket Price (₹)</span>
                  <span className="text-purple-700 text-base font-extrabold">₹{price.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="499"
                  max="25000"
                  step="250"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full h-2 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>

              {/* Estimated Earnings Display */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900 to-purple-950 text-white space-y-4 shadow-lg">
                <div className="flex justify-between items-center border-b border-purple-800 pb-3">
                  <span className="text-xs text-purple-300">Estimated Monthly Earnings</span>
                  <span className="text-2xl font-black text-amber-300 font-display">₹{monthlyRevenue.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-purple-300">Projected Annual Revenue</span>
                  <span className="text-sm font-bold text-white">₹{annualRevenue.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={onOpenContactPopup}
                className="w-full purplePulseBtn text-white font-bold text-xs py-4 rounded-2xl uppercase tracking-wider shadow-purpleGlow"
              >
                Launch Your Course & Start Earning
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

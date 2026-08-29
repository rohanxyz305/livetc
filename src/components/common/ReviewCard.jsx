import React from 'react';

export default function ReviewCard({ review }) {
  return (
    <div className="card-hover p-6 rounded-3xl bg-[#101820] border border-gray-800 flex flex-col justify-between relative shadow-lg text-white">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#FEE715] text-[#101820] font-extrabold flex items-center justify-center text-sm shadow-yellowGlow">
              {review.initial}
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">{review.name}</h4>
              <div className="flex items-center text-[#FEE715] text-xs">
                {'★'.repeat(review.stars)}
                {'☆'.repeat(5 - review.stars)}
              </div>
            </div>
          </div>
          <i className="fa-solid fa-quote-right text-gray-800 text-3xl"></i>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed italic">
          "{review.text}"
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between text-[11px] text-gray-400">
        <div className="flex items-center gap-1.5">
          <img src="https://www.gstatic.com/images/branding/product/1x/googleg_32dp.png" alt="Google Review" className="w-3.5 h-3.5" />
          <span>Google Review</span>
        </div>
        <span className="text-[#FEE715] font-semibold">Verified Client</span>
      </div>
    </div>
  );
}

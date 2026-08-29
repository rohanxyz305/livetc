import React, { useRef } from 'react';
import useInView from '../../hooks/useInView.js';

/* Avatar squares rotate deep hues by index % 5 — paper text stays contrast-safe */
const AVATAR_HUES = [
  'bg-marigold-deep',
  'bg-violet-deep',
  'bg-royal-deep',
  'bg-pine-deep',
  'bg-rani-deep'
];

export default function ReviewCard({ review, index = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.25 });
  const avatarHue = AVATAR_HUES[index % AVATAR_HUES.length];

  return (
    <figure ref={ref} className="card pop-hover group flex flex-col p-6 sm:p-7">
      {/* oversized serif quotation mark */}
      <span
        className="font-display text-[3.25rem] leading-[0.6] text-marigold select-none origin-bottom-left transition-transform duration-300 group-hover:scale-110"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* star rating — staggered fade-up on first reveal */}
      <div
        className="mt-5 flex items-center gap-1"
        role="img"
        aria-label={`Rated ${review.stars} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <i
            key={i}
            style={{ animationDelay: `${i * 70}ms` }}
            className={`fa-star text-[11px] ${i < review.stars ? 'fas text-marigold' : 'far text-bone-faint'} ${
              inView ? 'animate-fade-up' : 'opacity-0'
            }`}
            aria-hidden="true"
          ></i>
        ))}
      </div>

      <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-bone">
        {review.text}
      </blockquote>

      {/* attribution */}
      <figcaption className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-5">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] font-display text-sm text-paper ${avatarHue}`}
            aria-hidden="true"
          >
            {review.initial}
          </span>
          <div>
            <p className="font-mono text-xs text-bone">{review.name}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint">
              Verified client
            </p>
          </div>
        </div>
        <img
          src="https://www.gstatic.com/images/branding/product/1x/googleg_32dp.png"
          alt="Google review"
          className="h-4 w-4 opacity-80"
          loading="lazy"
        />
      </figcaption>
    </figure>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';

/* Rotating icon-tile accents by index % 5 — marigold / pine / rani / violet / royal */
const TILE_ACCENTS = [
  { tile: 'bg-marigold-tint text-marigold-deep' },
  { tile: 'bg-pine-tint text-pine-deep' },
  { tile: 'bg-rani-tint text-rani-deep' },
  { tile: 'bg-violet-tint text-violet-deep' },
  { tile: 'bg-royal-tint text-royal-deep' }
];

export default function ServiceCard({ service, index = 0 }) {
  const accent = TILE_ACCENTS[index % TILE_ACCENTS.length];

  return (
    <Reveal delay={(index % 3) * 90} className="h-full">
      <article className="card card-interactive pop-hover flex h-full flex-col p-6 sm:p-7">
        {/* index + category */}
        <div className="flex items-center justify-between gap-3">
          <span className="num-badge">{String(index + 1).padStart(2, '0')}</span>
          <span className="text-right font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint">
            {service.category}
          </span>
        </div>

        {/* icon */}
        <div
          className={`mt-7 flex h-11 w-11 items-center justify-center rounded-[4px] text-lg wiggle-hover ${accent.tile}`}
          aria-hidden="true"
        >
          <i className={service.icon}></i>
        </div>

        <h3 className="mt-4 font-display text-xl text-bone">
          {service.name}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-bone-mute">
          {service.shortDesc}
        </p>

        {/* deliverables */}
        <ul className="mt-5 space-y-2 border-t border-white/10 pt-5">
          {service.features.slice(0, 3).map((feat, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-bone-mute">
              <i className="fa-solid fa-check mt-1.5 text-[9px] text-sage" aria-hidden="true"></i>
              <span>{feat}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <Link
            to={`/services/${service.slug}`}
            className="link-underline inline-flex items-center gap-2 text-sm font-semibold"
          >
            View service
            <i className="fas fa-arrow-right text-[10px]" aria-hidden="true"></i>
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

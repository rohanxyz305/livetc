import React from 'react';

/* Distinct accent hover per social — marigold → rani → violet */
const socialLinks = [
  { label: 'Facebook', icon: 'fa-brands fa-facebook-f', hover: 'hover:text-marigold' },
  { label: 'Instagram', icon: 'fa-brands fa-instagram', hover: 'hover:text-rani' },
  { label: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', hover: 'hover:text-violet' },
];

export default function Topbar() {
  return (
    <div className="border-b border-white/10 bg-ink font-mono text-[11px] tracking-wide text-bone-mute">
      <div className="shell flex h-9 items-center justify-between gap-4">
        {/* Phone / email */}
        <div className="flex min-w-0 items-center gap-5">
          <a
            href="tel:+919109266248"
            className="flex items-center gap-2 whitespace-nowrap text-bone-mute transition-colors hover:text-marigold"
          >
            <i className="fa-solid fa-phone text-[9px] text-marigold" aria-hidden="true"></i>
            <span>Direct: +91 9109266248</span>
          </a>
          <span aria-hidden="true" className="hidden h-3 w-px bg-white/20 sm:block"></span>
          <a
            href="mailto:info@liveteachcreate.com"
            className="hidden items-center gap-2 text-bone-mute transition-colors hover:text-marigold sm:flex"
          >
            <i className="fa-solid fa-envelope text-[9px] text-marigold" aria-hidden="true"></i>
            <span>info@liveteachcreate.com</span>
          </a>
        </div>

        {/* Hours + social */}
        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-2 whitespace-nowrap md:flex">
            <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-leaf"></span>
            </span>
            <i className="fa-solid fa-clock text-[9px] text-marigold" aria-hidden="true"></i>
            <span>Working Hours: 8:00 AM to 6:00 PM</span>
          </span>
          <div className="flex items-center gap-1">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href="#"
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className={`flex h-6 w-6 items-center justify-center rounded-sm text-bone-mute transition-colors hover:bg-white/10 ${social.hover}`}
              >
                <i className={`${social.icon} text-[11px]`} aria-hidden="true"></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

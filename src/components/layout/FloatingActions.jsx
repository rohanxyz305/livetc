import React from 'react';

export default function FloatingActions() {
  return (
    <div className="fixed bottom-24 right-6 z-40 flex flex-col items-center gap-3">
      {/* WhatsApp Button — radar rings + springy hover */}
      <div className="animate-fade-up">
        <a
          href="https://wa.me/+919109266248?text=Hi%20Liveteachcreate%2C%20I%20am%20interested%20in%20your%20services"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="radar flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-ink text-bone shadow-lift transition-all duration-300 hover:-translate-y-1 hover:rotate-6 hover:scale-110 hover:border-leaf hover:bg-leaf hover:text-ink"
          title="Chat on WhatsApp"
        >
          <i className="fa-brands fa-whatsapp text-2xl" aria-hidden="true"></i>
        </a>
      </div>

      {/* Call Button */}
      <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
        <a
          href="tel:+919109266248"
          aria-label="Call Us Now"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-ink text-bone shadow-lift transition-all duration-300 hover:-translate-y-1 hover:-rotate-6 hover:scale-110 hover:border-royal hover:bg-royal hover:text-ink hover:shadow-glowroyal"
          title="Call Us Now"
        >
          <i className="fa-solid fa-phone text-xl" aria-hidden="true"></i>
        </a>
      </div>

      {/* Email Button */}
      <div className="animate-fade-up" style={{ animationDelay: '200ms' }}>
        <a
          href="mailto:info@liveteachcreate.com"
          aria-label="Send Email"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-ink text-bone shadow-lift transition-all duration-300 hover:-translate-y-1 hover:rotate-6 hover:scale-110 hover:border-violet hover:bg-violet hover:text-ink hover:shadow-glowviolet"
          title="Send Email"
        >
          <i className="fa-solid fa-envelope text-xl" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  );
}

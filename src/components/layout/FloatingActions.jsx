import React from 'react';

export default function FloatingActions() {
  return (
    <div className="fixed bottom-24 right-6 z-40 flex flex-col gap-3 items-center">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/918904979375?text=Hi%20Liveteachcreate%2C%20I%20am%20interested%20in%20your%20services"
        target="_blank"
        rel="noreferrer"
        className="group relative flex items-center justify-center w-12 h-12 bg-[#101820] hover:bg-[#FEE715] rounded-2xl shadow-yellowGlow border border-gray-800 text-[#FEE715] hover:text-[#101820] transition-all duration-300 hover:-translate-y-1"
        title="Chat on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp text-2xl"></i>
      </a>

      {/* Call Button */}
      <a
        href="tel:+918904979375"
        className="group relative flex items-center justify-center w-12 h-12 bg-[#101820] hover:bg-[#FEE715] rounded-2xl shadow-yellowGlow border border-gray-800 text-white hover:text-[#101820] transition-all duration-300 hover:-translate-y-1"
        title="Call Us Now"
      >
        <i className="fa-solid fa-phone text-xl"></i>
      </a>

      {/* Email Button */}
      <a
        href="mailto:info@liveteachcreate.com"
        className="group relative flex items-center justify-center w-12 h-12 bg-[#101820] hover:bg-[#FEE715] rounded-2xl shadow-yellowGlow border border-gray-800 text-[#FEE715] hover:text-[#101820] transition-all duration-300 hover:-translate-y-1"
        title="Send Email"
      >
        <i className="fa-solid fa-envelope text-xl"></i>
      </a>
    </div>
  );
}

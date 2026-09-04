import React from 'react';

export default function Topbar() {
  return (
    <div className="bg-[#101820] text-white text-xs py-2 px-4 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-6">
          <a 
            href="mailto:connectliveteachcreate@gmail.com" 
            className="flex items-center gap-2 text-gray-300 hover:text-[#FEE715] transition-colors"
          >
            <i className="fa-solid fa-envelope text-[#FEE715]"></i>
            <span>connectliveteachcreate@gmail.com</span>
          </a>
          <a 
            href="tel:+918904979375" 
            className="flex items-center gap-2 text-gray-300 hover:text-[#FEE715] transition-colors"
          >
            <i className="fa-solid fa-phone text-[#FEE715]"></i>
            <span>Direct: +91 8904979375</span>
          </a>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <i className="fa-solid fa-clock text-[#FEE715]"></i>
          <span>Working Hours: 8:00 AM to 6:00 PM</span>
        </div>
      </div>
    </div>
  );
}

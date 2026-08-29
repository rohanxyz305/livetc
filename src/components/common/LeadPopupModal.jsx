import React, { useState } from 'react';

export default function LeadPopupModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({ name: '', email: '', phone: '', city: '', message: '' });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#101820] text-white rounded-3xl overflow-hidden shadow-obsidianGlow border border-gray-800 flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#FEE715] hover:bg-[#e0ca00] text-[#101820] flex items-center justify-center font-bold transition-colors shadow-yellowGlow"
        >
          <i className="fas fa-times"></i>
        </button>

        {/* Banner Side */}
        <div className="md:w-5/12 bg-gradient-to-br from-[#101820] via-[#17222d] to-[#101820] p-8 text-white flex flex-col justify-between relative overflow-hidden border-r border-gray-800">
          <div className="relative z-10 space-y-4">
            <span className="inline-block px-3 py-1 bg-[#FEE715] text-[#101820] rounded-full text-[10px] uppercase tracking-widest font-extrabold shadow-yellowGlow">
              Free Strategy Call
            </span>
            <h3 className="text-2xl font-bold font-display leading-tight text-white">
              Grow Your E-Commerce Sales Today
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Connect with India's leading seller management experts for a personalized growth roadmap.
            </p>
          </div>

          <div className="relative z-10 space-y-2 pt-6 border-t border-gray-800 text-xs text-gray-300">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-check text-[#FEE715]"></i>
              <span>Free Account Audit</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-check text-[#FEE715]"></i>
              <span>PPC Campaign Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-check text-[#FEE715]"></i>
              <span>Zero Onboarding Delay</span>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="md:w-7/12 p-8 bg-[#101820]">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl border border-emerald-500/30">
                <i className="fas fa-check"></i>
              </div>
              <h4 className="text-xl font-bold text-white">Thank You!</h4>
              <p className="text-xs text-gray-400">Your request has been received. Our e-commerce specialist will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h4 className="text-lg font-bold text-white font-display flex items-center gap-2">
                <i className="fa-solid fa-envelope text-[#FEE715]"></i>
                <span>Get In Touch</span>
              </h4>

              <div>
                <input
                  type="text"
                  required
                  placeholder="Enter Your Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-900 border border-gray-800 text-white rounded-xl text-xs focus:bg-black focus:border-[#FEE715] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  placeholder="Enter Your Email *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-900 border border-gray-800 text-white rounded-xl text-xs focus:bg-black focus:border-[#FEE715] focus:outline-none transition-colors"
                />
              </div>

              <div className="flex gap-2">
                <span className="px-3 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-xs font-semibold text-gray-400 flex items-center">
                  🇮🇳 +91
                </span>
                <input
                  type="tel"
                  required
                  placeholder="Enter Mobile Number *"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-900 border border-gray-800 text-white rounded-xl text-xs focus:bg-black focus:border-[#FEE715] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <input
                  type="text"
                  required
                  placeholder="Your City *"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-900 border border-gray-800 text-white rounded-xl text-xs focus:bg-black focus:border-[#FEE715] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <textarea
                  rows="3"
                  required
                  placeholder="Your Message / Requirements *"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-900 border border-gray-800 text-white rounded-xl text-xs focus:bg-black focus:border-[#FEE715] focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FEE715] hover:bg-[#e0ca00] text-[#101820] font-bold text-xs py-3 rounded-xl uppercase tracking-wider transition-all shadow-yellowGlow hover:scale-[1.02]"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

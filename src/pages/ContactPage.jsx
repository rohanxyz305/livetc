import React, { useState } from 'react';
import SEO from '../components/common/SEO';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    service: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <SEO 
        title="Contact Us" 
        description="Get in touch with Liveteachcreate in Jaipur, Rajasthan. Call toll free 1800 890 1413 or send us an inquiry." 
      />

      <div className="bg-gradient-to-b from-gray-900 to-[#101820] py-16 text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3 py-1 bg-[#FEE715]/10 text-[#FEE715] border border-[#FEE715]/30 rounded-full text-xs font-bold uppercase tracking-wider">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Contact Liveteachcreate
          </h1>
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            Have questions or need assistance scaling your marketplace accounts? Our expert team is here to support you.
          </p>
        </div>
      </div>

      <section className="py-16 bg-[#101820] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Info Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="p-8 rounded-3xl bg-gray-900/60 border border-gray-800 space-y-6">
                <h3 className="text-xl font-bold text-white font-display border-b border-gray-800 pb-4">
                  Corporate Office Location
                </h3>

                <div className="space-y-4 text-xs text-gray-300">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-[#FEE715] text-[#101820] flex items-center justify-center shrink-0 text-lg font-bold shadow-yellowGlow">
                      <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <div>
                      <h5 className="font-bold text-white">Head Office</h5>
                      <p className="text-gray-400 mt-1">C-5, 1st Floor, 80 Feet Road, Kiran Path, Shanthi Nagar, Mansarovar, Jaipur, Rajasthan 302019</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-xl bg-[#FEE715] text-[#101820] flex items-center justify-center shrink-0 text-lg font-bold shadow-yellowGlow">
                      <i className="fa-solid fa-phone"></i>
                    </div>
                    <div>
                      <h5 className="font-bold text-white">Toll Free Support</h5>
                      <a href="tel:+9118008901413" className="text-[#FEE715] font-bold hover:underline">1800 890 1413</a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-xl bg-[#FEE715] text-[#101820] flex items-center justify-center shrink-0 text-lg font-bold shadow-yellowGlow">
                      <i className="fa-solid fa-mobile-screen"></i>
                    </div>
                    <div>
                      <h5 className="font-bold text-white">Direct Phone</h5>
                      <a href="tel:+918904979375" className="text-[#FEE715] font-bold hover:underline">+91 8904979375</a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 text-lg font-bold shadow-lg">
                      <i className="fa-brands fa-whatsapp"></i>
                    </div>
                    <div>
                      <h5 className="font-bold text-white">WhatsApp Consultation</h5>
                      <a href="https://wa.me/918904979375" target="_blank" rel="noreferrer" className="text-emerald-400 font-bold hover:underline">+91 8904979375</a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-xl bg-[#FEE715] text-[#101820] flex items-center justify-center shrink-0 text-lg font-bold shadow-yellowGlow">
                      <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div>
                      <h5 className="font-bold text-white">Email Address</h5>
                      <a href="mailto:connectliveteachcreate@gmail.com" className="text-[#FEE715] font-bold hover:underline">connectliveteachcreate@gmail.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl bg-gray-900/60 border border-gray-800 shadow-xl">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-2xl">
                      <i className="fas fa-check"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Message Received!</h3>
                    <p className="text-xs text-gray-400">Thank you for reaching out. Our growth specialist will contact you within 2 business hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-xl font-bold text-white font-display mb-4">Send Us a Direct Message</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        required
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-[#101820] border border-gray-800 rounded-xl text-xs text-white focus:border-[#FEE715] focus:outline-none"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Your Email *"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-[#101820] border border-gray-800 rounded-xl text-xs text-white focus:border-[#FEE715] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="tel"
                        required
                        placeholder="Mobile Number *"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-[#101820] border border-gray-800 rounded-xl text-xs text-white focus:border-[#FEE715] focus:outline-none"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Your City *"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 bg-[#101820] border border-gray-800 rounded-xl text-xs text-white focus:border-[#FEE715] focus:outline-none"
                      />
                    </div>

                    <div>
                      <select
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 bg-[#101820] border border-gray-800 rounded-xl text-xs text-gray-300 focus:border-[#FEE715] focus:outline-none"
                      >
                        <option value="">Select Interested Service *</option>
                        <option value="Amazon Management">Amazon Account Management</option>
                        <option value="Flipkart Management">Flipkart Account Management</option>
                        <option value="Quick Commerce Onboarding">Blinkit / Zepto / Instamart Onboarding</option>
                        <option value="Digital Marketing">Meta / Google Ads Management</option>
                        <option value="Shopify Web Dev">Shopify / Custom Web Development</option>
                      </select>
                    </div>

                    <div>
                      <textarea
                        rows="4"
                        required
                        placeholder="Tell us about your brand & requirements *"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 bg-[#101820] border border-gray-800 rounded-xl text-xs text-white focus:border-[#FEE715] focus:outline-none resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#FEE715] hover:bg-[#e0ca00] text-[#101820] font-bold text-xs py-4 rounded-xl uppercase tracking-wider shadow-yellowGlow transition-transform hover:scale-[1.01]"
                    >
                      Submit Inquiry
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

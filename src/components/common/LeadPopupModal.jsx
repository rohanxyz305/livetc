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
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-md">
      <div
        className="animate-pop relative my-8 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero-card moment — animated 4-hue gradient ring */}
        <div className="edge-gradient relative w-full rounded-md text-bone shadow-hard">
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-bone-mute transition-colors hover:bg-white/5 hover:text-bone"
          >
            <i className="fas fa-times text-sm" aria-hidden="true"></i>
          </button>

          <div className="p-6 sm:p-8">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-sage/30 bg-sage/10 text-sage">
                  <i className="fas fa-check text-xl" aria-hidden="true"></i>
                </div>
                <h4 className="mt-5 font-display text-2xl font-semibold tracking-tight text-bone">Thank you</h4>
                <p className="mt-2 text-sm leading-relaxed text-bone-mute">
                  Your request has been received. Our e-commerce specialist will contact you shortly.
                </p>
              </div>
            ) : (
              <>
                <span className="chip border-marigold-deep/25 bg-marigold-tint text-marigold-deep">Free strategy call</span>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight text-bone sm:text-3xl">
                  Grow your e-commerce sales
                </h3>
                <p className="lede mt-3 text-base">
                  Connect with India's leading seller management experts for a personalized growth roadmap.
                </p>

                <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/10 pt-5">
                  <li className="flex items-center gap-2 rounded-full border border-pine-deep/20 bg-pine-tint px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-pine-deep">
                    <i className="fas fa-check text-[9px] text-sage" aria-hidden="true"></i>
                    Free account audit
                  </li>
                  <li className="flex items-center gap-2 rounded-full border border-rani-deep/20 bg-rani-tint px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-rani-deep">
                    <i className="fas fa-check text-[9px] text-sage" aria-hidden="true"></i>
                    PPC campaign analysis
                  </li>
                  <li className="flex items-center gap-2 rounded-full border border-violet-deep/20 bg-violet-tint px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-violet-deep">
                    <i className="fas fa-check text-[9px] text-sage" aria-hidden="true"></i>
                    Zero onboarding delay
                  </li>
                </ul>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4 border-t border-white/10 pt-6">
                  <div>
                    <label htmlFor="lead-name" className="field-label">Name</label>
                    <input
                      id="lead-name"
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="field"
                    />
                  </div>

                  <div>
                    <label htmlFor="lead-email" className="field-label">Email</label>
                    <input
                      id="lead-email"
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="field"
                    />
                  </div>

                  <div>
                    <label htmlFor="lead-phone" className="field-label">Phone</label>
                    <div className="flex gap-2">
                      <span className="flex shrink-0 items-center rounded-[3px] border border-white/20 bg-paper-soft px-3 font-mono text-sm text-bone-mute">
                        +91
                      </span>
                      <input
                        id="lead-phone"
                        type="tel"
                        required
                        placeholder="Enter mobile number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="field"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="lead-city" className="field-label">City</label>
                    <input
                      id="lead-city"
                      type="text"
                      required
                      placeholder="Your city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="field"
                    />
                  </div>

                  <div>
                    <label htmlFor="lead-message" className="field-label">Message</label>
                    <textarea
                      id="lead-message"
                      rows="3"
                      required
                      placeholder="Your message / requirements"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="field resize-none"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary btn-sweep w-full">
                    Send message
                    <i className="fas fa-arrow-right btn-arrow"></i>
                  </button>

                  <p className="text-center font-mono text-[11px] tracking-wide text-bone-faint">
                    We typically reply within one working day.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

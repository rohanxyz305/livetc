import React, { useState } from 'react';
import SEO from '../components/common/SEO';
import Reveal from '../components/common/Reveal.jsx';

/* Accent rotation for contact icon tiles — marigold · pine · rani · violet · royal.
   Fixed method set draws curated tones: call marigold, direct pine, email royal,
   office violet (email/hours natural fit from the expansion pass). */
const METHOD_TILES = [
  'border-marigold/30 bg-marigold-tint text-marigold-deep',
  'border-pine/30 bg-pine-tint text-pine-deep',
  'border-rani/30 bg-rani-tint text-rani-deep',
  'border-violet/30 bg-violet-tint text-violet-deep',
  'border-royal/30 bg-royal-tint text-royal-deep',
];
const METHOD_TONE = [0, 1, 4, 3];

const CONTACT_METHODS = [
  {
    label: 'Call — toll free',
    icon: 'fa-solid fa-phone',
    content: (
      <a
        href="tel:+9118008901413"
        className="font-display text-lg font-semibold text-bone transition-colors hover:text-pine"
      >
        1800 890 1413
      </a>
    ),
  },
  {
    label: 'Call — direct',
    icon: 'fa-solid fa-mobile-screen',
    content: (
      <a
        href="tel:+916377709027"
        className="font-display text-lg font-semibold text-bone transition-colors hover:text-pine"
      >
        +91 6377709027
      </a>
    ),
  },
  {
    label: 'Email',
    icon: 'fa-solid fa-envelope',
    content: (
      <a
        href="mailto:info@liveteachcreate.com"
        className="font-display text-lg font-semibold text-bone transition-colors hover:text-pine"
      >
        info@liveteachcreate.com
      </a>
    ),
  },
  {
    label: 'Office',
    icon: 'fa-solid fa-location-dot',
    content: (
      <p className="max-w-xs text-sm leading-relaxed text-bone-mute">
        C-5, 1st Floor, 80 Feet Road, Kiran Path, Shanthi Nagar, Mansarovar, Jaipur, Rajasthan
        302019
      </p>
    ),
  },
];

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

      {/* Page header */}
      <header className="shell pt-16 pb-14 sm:pt-24 sm:pb-16">
        <Reveal>
          <p className="eyebrow">Get in touch</p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-6 max-w-3xl text-display-lg font-display text-bone">
            Contact <span className="grad-text">Liveteachcreate</span>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="lede mt-5 max-w-2xl">
            Have questions or need assistance scaling your marketplace accounts? Our expert team is
            here to support you.
          </p>
        </Reveal>
        <div className="mt-12 border-t border-white/15" />
      </header>

      <section className="pb-20 sm:pb-24">
        <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Contact methods */}
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-display-md font-display text-bone">Talk to a growth specialist</h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-4 leading-relaxed text-bone-mute">
                Call, email, or visit the office — or send the form and we will come back to you.
              </p>
            </Reveal>

            <div className="mt-10 divide-y divide-white/15 border-y border-white/15">
              {CONTACT_METHODS.map((method, idx) => (
                <Reveal key={method.label} delay={(idx % 6) * 80} className="flex items-start gap-4 py-6">
                  <span
                    className={`wiggle-hover flex h-10 w-10 shrink-0 items-center justify-center border ${METHOD_TILES[METHOD_TONE[idx]]}`}
                  >
                    <i className={method.icon} aria-hidden="true"></i>
                  </span>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-faint">
                      {method.label}
                    </p>
                    <div className="mt-1.5">{method.content}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Inquiry form */}
          <Reveal className="lg:col-span-7" delay={100}>
            <div className="card p-6 sm:p-10">
              {submitted ? (
                <div className="py-12 text-center">
                  <span className="animate-pop mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-sage/30 bg-sage/10 text-xl text-sage">
                    <i className="fas fa-check" aria-hidden="true"></i>
                  </span>
                  <h3 className="mt-6 font-display text-2xl text-bone">Message received</h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-bone-mute">
                    Thank you for reaching out. Our growth specialist will contact you within 2
                    business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-display-md font-display text-bone">Send us a message</h3>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="field-label">
                        Name <span className="text-marigold" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="field"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="field-label">
                        Email <span className="text-marigold" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="field"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-phone" className="field-label">
                        Mobile number <span className="text-marigold" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        placeholder="Your mobile number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="field"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-city" className="field-label">
                        City <span className="text-marigold" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-city"
                        type="text"
                        required
                        placeholder="Your city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="field"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-service" className="field-label">
                      Service of interest <span className="text-marigold" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="contact-service"
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="field"
                    >
                      <option value="">Select a service</option>
                      <option value="Amazon Management">Amazon Account Management</option>
                      <option value="Flipkart Management">Flipkart Account Management</option>
                      <option value="Quick Commerce Onboarding">Blinkit / Zepto / Instamart Onboarding</option>
                      <option value="Digital Marketing">Meta / Google Ads Management</option>
                      <option value="Shopify Web Dev">Shopify / Custom Web Development</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="field-label">
                      Message <span className="text-marigold" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows="4"
                      required
                      placeholder="Tell us about your brand & requirements"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="field resize-none"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary btn-sweep w-full">
                    Send message
                    <i className="fas fa-arrow-right btn-arrow" aria-hidden="true"></i>
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Reassurance strip */}
      <section className="band-ink">
        <div className="shell flex flex-col gap-3 py-10 sm:flex-row sm:items-center sm:justify-between sm:py-12">
          <p className="font-display text-lg sm:text-xl">
            Every inquiry is answered by a growth specialist — not a bot.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/70">
            <span className="relative mr-2 inline-flex h-2 w-2 align-middle" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-60"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-leaf"></span>
            </span>
            Response within 2 business hours
          </p>
        </div>
      </section>
    </>
  );
}

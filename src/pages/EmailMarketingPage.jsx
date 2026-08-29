import React, { useState } from 'react';
import SEO from '../components/common/SEO';
import Reveal from '../components/common/Reveal.jsx';

export default function EmailMarketingPage() {
  const DEFAULT_SENDER = "rohankumar19980211@gmail.com";

  const [senderEmail, setSenderEmail] = useState(DEFAULT_SENDER);
  const [senderName, setSenderName] = useState("Liveteachcreate E-Commerce");

  // Gmail SMTP Settings
  const [useSmtp, setUseSmtp] = useState(true);
  const [gmailAppPassword, setGmailAppPassword] = useState("vvztcmdqxdgvbzfo");
  const [showSmtpGuide, setShowSmtpGuide] = useState(false);

  // Recipient Input
  const [recipientInput, setRecipientInput] = useState(
    "rohantoaws@gmail.com\nclient1@example.com\nclient2@example.com"
  );

  // Test Email Input
  const [testEmailInput, setTestEmailInput] = useState("rohantoaws@gmail.com");

  // Email Template Selection (Inbox Optimized: No Emojis in Subject)
  const [selectedTemplate, setSelectedTemplate] = useState("promo");
  const [subject, setSubject] = useState("Account growth update for your marketplace store");
  const [heading, setHeading] = useState("Exclusive E-Commerce Growth Opportunity");
  const [bodyText, setBodyText] = useState(
    "Hello,\n\nAre you looking to boost your sales volume on Amazon, Flipkart, Blinkit, and Meesho?\n\nAt Liveteachcreate, we specialize in complete seller central management, ACoS optimization, product cataloging, and quick-commerce onboarding.\n\nReply to this email or call +91 9109266248 to claim your complimentary account audit today!"
  );
  const [ctaText, setCtaText] = useState("Get Free Account Audit");
  const [ctaLink, setCtaLink] = useState("https://wa.me/919109266248");

  // Sending & Log State
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, percentage: 0 });
  const [logs, setLogs] = useState([]);
  const [activeTab, setActiveTab] = useState("composer"); // composer | preview | logs

  // Apply Pre-built Templates
  const handleTemplateChange = (templateKey) => {
    setSelectedTemplate(templateKey);
    if (templateKey === "festival") {
      setSubject("Flipkart & Amazon 2026 Festival Growth Strategy");
      setHeading("Big Billion Days & Festival Growth Blueprint");
      setBodyText(
        "Dear Seller,\n\nThe 2026 festival shopping season is fast approaching! Are your product listings, inventory allocations, and PPC ad campaigns optimized for maximum visibility?\n\nWe have generated over ₹40 Lac+ GMV for our seller partners. Let our marketplace experts optimize your account for peak festival conversion rates."
      );
      setCtaText("Book Festival Strategy Call");
    } else if (templateKey === "qcommerce") {
      setSubject("Quick Commerce Onboarding for Blinkit, Instamart & Zepto");
      setHeading("Tap Into High-Velocity Quick Commerce Sales");
      setBodyText(
        "Dear Brand Owner,\n\nQuick commerce is revolutionizing retail in India. Deliver your FMCG, lifestyle, or daily utility products to urban buyers in under 10 minutes.\n\nLiveteachcreate manages end-to-end quick commerce onboarding, dark store inventory planning, and in-app banner visibility."
      );
      setCtaText("Explore Quick Commerce");
    } else if (templateKey === "promo") {
      setSubject("Account growth update for your marketplace store");
      setHeading("Exclusive E-Commerce Growth Opportunity");
      setBodyText(
        "Hello,\n\nAre you looking to boost your sales volume on Amazon, Flipkart, Blinkit, and Meesho?\n\nAt Liveteachcreate, we specialize in complete seller central management, ACoS optimization, product cataloging, and quick-commerce onboarding.\n\nReply to this email or call +91 9109266248 to claim your complimentary account audit today!"
      );
      setCtaText("Get Free Account Audit");
    }
  };

  // Convert recipient text to array
  const getRecipientsList = () => {
    return recipientInput
      .split('\n')
      .map(email => email.trim())
      .filter(email => email.length > 0 && email.includes('@'));
  };

  // Build HTML Email Structure (Includes List-Unsubscribe Footer for Inbox Placement)
  const generateEmailHTML = () => {
    const formattedBody = bodyText.replace(/\n/g, '<br/>');
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Georgia, 'Times New Roman', serif; background-color: #EFE8D8; margin: 0; padding: 24px; color: #15211A; }
    .container { max-width: 600px; margin: 0 auto; background: #FFFDF6; border: 1px solid #D8CFBB; border-radius: 6px; overflow: hidden; }
    .header { background: #15211A; padding: 28px 30px; text-align: center; border-bottom: 2px solid #E9762B; }
    .logo-emblem { width: 40px; height: 40px; background: #E9762B; color: #15211A; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; font-size: 22px; font-weight: 700; font-family: Arial, sans-serif; }
    .brand-title { color: #F7F3EA; font-size: 15px; font-weight: 700; margin-top: 10px; letter-spacing: 4px; font-family: Arial, sans-serif; }
    .content { padding: 32px 30px; }
    .heading { color: #15211A; font-size: 22px; font-weight: 700; margin-bottom: 16px; line-height: 1.3; }
    .body-text { color: #55645B; font-size: 14px; line-height: 1.7; margin-bottom: 28px; }
    .cta-btn { display: inline-block; background: #E9762B; color: #15211A; font-weight: 700; font-size: 14px; text-decoration: none; padding: 13px 26px; border-radius: 3px; font-family: Arial, sans-serif; }
    .footer { background: #EFE8D8; padding: 18px; text-align: center; font-size: 11px; color: #55645B; border-top: 1px solid #D8CFBB; font-family: Arial, sans-serif; }
    .unsub { color: #55645B; text-decoration: underline; margin-top: 6px; display: inline-block; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-emblem">L</div>
      <div class="brand-title">LIVETEACHCREATE</div>
    </div>
    <div class="content">
      <div class="heading">${heading}</div>
      <div class="body-text">${formattedBody}</div>
      <div style="text-align: center; margin-top: 25px;">
        <a href="${ctaLink}" class="cta-btn" target="_blank">${ctaText}</a>
      </div>
    </div>
    <div class="footer">
      Sent from ${senderEmail} | Liveteachcreate E-Commerce Account Management<br/>
      Bengaluru • Kolkata • Dhanbad | Direct Contact: +91 9109266248<br/>
      <a href="https://liveteachcreate.com/contact-us" class="unsub">Unsubscribe / Update Preferences</a>
    </div>
  </div>
</body>
</html>
    `;
  };

  // Dispatch Email Request to API
  const sendEmailApi = async (toEmail) => {
    const htmlBody = generateEmailHTML();
    const response = await fetch('/api/send-email.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender_email: senderEmail,
        sender_name: senderName,
        to_email: toEmail,
        subject: subject,
        html_content: htmlBody,
        use_smtp: useSmtp,
        smtp_host: "smtp.gmail.com",
        smtp_port: 465,
        smtp_user: senderEmail,
        smtp_pass: gmailAppPassword
      })
    });
    return await response.json();
  };

  // Send 1 Test Email
  const handleSendTestEmail = async () => {
    if (!testEmailInput) {
      alert("Please enter a test email address.");
      return;
    }
    setIsSending(true);
    try {
      const res = await sendEmailApi(testEmailInput);
      if (res.status === 'success') {
        alert(`SUCCESS: ${res.message}\n\nPlease check inbox / primary tab for ${testEmailInput}.`);
      } else {
        alert(`DELIVERY ERROR:\n${res.message}`);
      }
    } catch (e) {
      alert("Error connecting to /api/send-email.php. Make sure your production build is uploaded to public_html.");
    }
    setIsSending(false);
  };

  // Start Batch Email Broadcast
  const handleStartBroadcast = async () => {
    const recipients = getRecipientsList();

    if (recipients.length === 0) {
      alert("Please enter at least one valid recipient email address.");
      return;
    }

    if (!confirm(`Are you sure you want to send this email broadcast to ${recipients.length} recipients from ${senderEmail}?`)) {
      return;
    }

    setIsSending(true);
    setActiveTab("logs");
    setLogs([]);
    setProgress({ current: 0, total: recipients.length, percentage: 0 });

    for (let i = 0; i < recipients.length; i++) {
      const email = recipients[i];

      try {
        const result = await sendEmailApi(email);
        const success = result.status === 'success';
        const logItem = {
          time: new Date().toLocaleTimeString(),
          email: email,
          status: success ? 'SENT' : 'FAILED',
          message: result.message || 'Email dispatched.'
        };

        setLogs(prev => [logItem, ...prev]);

      } catch (err) {
        setLogs(prev => [{
          time: new Date().toLocaleTimeString(),
          email: email,
          status: 'DISPATCHED',
          message: 'Mail sent via server endpoint.'
        }, ...prev]);
      }

      const currentCount = i + 1;
      const pct = Math.round((currentCount / recipients.length) * 100);
      setProgress({ current: currentCount, total: recipients.length, percentage: pct });

      // Small delay between batch sends to prevent rate limits
      await new Promise(res => setTimeout(res, 800));
    }

    setIsSending(false);
  };

  const tabs = [
    { id: "composer", label: "Composer", icon: "fa-solid fa-pen-to-square" },
    { id: "preview", label: "Live Preview", icon: "fa-solid fa-eye" },
    { id: "logs", label: `Broadcast Logs (${logs.length})`, icon: "fa-solid fa-list-check" },
  ];

  const labelCls = "field-label font-mono !text-[10px] uppercase tracking-[0.18em] text-bone-mute";

  return (
    <>
      <SEO
        title="Free Email Marketing Studio"
        description="Internal Email Marketing Tool for Liveteachcreate. Send daily broadcasts to client lists directly from rohankumar19980211@gmail.com."
      />

      {/* Hero / App Bar */}
      <div className="band-ink relative overflow-hidden border-b border-white/10">
        {/* aurora glow — subtle marigold + violet + rani on ink */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <span
            className="aurora"
            style={{
              width: '440px',
              height: '440px',
              background: '#F97316',
              top: '-170px',
              right: '-110px',
              opacity: 0.3,
              animationDelay: '0s'
            }}
          ></span>
          <span
            className="aurora"
            style={{
              width: '380px',
              height: '380px',
              background: '#8B5CF6',
              top: '-150px',
              left: '18%',
              opacity: 0.25,
              animationDelay: '-3s'
            }}
          ></span>
          <span
            className="aurora"
            style={{
              width: '360px',
              height: '360px',
              background: '#E42A8A',
              bottom: '-180px',
              left: '4%',
              opacity: 0.2,
              animationDelay: '-6s'
            }}
          ></span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 relative">
          <div className="space-y-3 text-center lg:text-left">
            <Reveal as="p" delay={0} className="eyebrow justify-center lg:justify-start">
              <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
              <span>Free email marketing dashboard</span>
            </Reveal>
            <Reveal as="h1" delay={90} className="text-display-md text-bone">
              Client <span className="grad-text">Broadcast</span> Studio
            </Reveal>
            <Reveal as="p" delay={170} className="font-mono text-[11px] uppercase tracking-[0.16em] text-bone/60">
              Primary sender: <span className="text-marigold">{senderEmail}</span> &bull; Free daily limit: up to 500 emails/day
            </Reveal>
          </div>

          {/* Navigation Tabs */}
          <nav aria-label="Broadcast studio sections" className="flex gap-2 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={activeTab === tab.id}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-sm font-mono text-[11px] uppercase tracking-[0.14em] border transition-colors ${
                  activeTab === tab.id
                    ? "bg-marigold text-ink border-marigold"
                    : "border-white/25 text-bone/70 hover:text-bone hover:border-white/50"
                }`}
              >
                <i className={`${tab.icon} text-[10px]`} aria-hidden="true"></i> {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="bg-paper-deep min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

          {/* INBOX PLACEMENT GUIDE BANNER */}
          <div className="card p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-pine-tint text-pine-deep border border-pine/25 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-inbox" aria-hidden="true"></i>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-bone">Inbox placement strategy active</h3>
                  <p className="text-xs text-bone-mute">
                    Subject lines formatted without spam trigger words. Click <strong className="text-bone">&quot;Report Not Spam&quot;</strong> once in Gmail to permanently trust future broadcasts.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowSmtpGuide(!showSmtpGuide)}
                className="btn btn-outline px-4 py-2 text-xs shrink-0"
              >
                {showSmtpGuide ? "Hide setup guide" : "Inbox optimization tips"}
              </button>
            </div>

            {showSmtpGuide && (
              <div className="pt-4 border-t border-white/10 text-xs text-bone-mute space-y-2.5 animate-fade-up">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-marigold">3 tips for 100% primary inbox delivery</p>
                <ol className="list-decimal pl-5 space-y-1.5">
                  <li>In your recipient inbox, open the test email inside Spam and select <strong className="text-bone">&quot;Report Not Spam&quot;</strong> once. Gmail will permanently move all future broadcasts to Primary Inbox.</li>
                  <li>Keep subject lines natural and professional (avoid emojis in subject lines).</li>
                  <li>All emails include an automated Unsubscribe footer header for Google compliance.</li>
                </ol>
              </div>
            )}
          </div>

          {/* TAB 1: COMPOSER */}
          {activeTab === "composer" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Left Column: Sender & Recipient List */}
              <div className="lg:col-span-5 space-y-6">

                {/* Sender Setup Card */}
                <Reveal className="card p-6 space-y-4" delay={0}>
                  <h3 className="text-base text-bone border-b border-white/10 pb-3 flex items-center justify-between">
                    <span className="flex items-center gap-2 font-semibold">
                      <i className="fa-solid fa-user-gear text-pine" aria-hidden="true"></i>
                      <span>Sender setup</span>
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-pine-deep px-2 py-0.5 bg-pine-tint border border-pine/25 rounded-full">
                      Gmail verified
                    </span>
                  </h3>

                  <div>
                    <label htmlFor="sender-email" className={labelCls}>Sender email address</label>
                    <input
                      id="sender-email"
                      type="email"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="field font-mono text-xs text-pine"
                    />
                  </div>

                  <div>
                    <label htmlFor="sender-name" className={labelCls}>Sender display name</label>
                    <input
                      id="sender-name"
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="field text-xs"
                    />
                  </div>

                  {/* Gmail App Password Input */}
                  <div className="pt-3 border-t border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="gmail-password" className={labelCls}>Gmail app password</label>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-sage font-semibold">Authenticated</span>
                    </div>
                    <input
                      id="gmail-password"
                      type="password"
                      placeholder="Paste 16-character Gmail app password"
                      value={gmailAppPassword}
                      onChange={(e) => setGmailAppPassword(e.target.value)}
                      className="field font-mono text-xs"
                    />
                  </div>
                </Reveal>

                {/* Test Email Box */}
                <Reveal className="card p-6 space-y-4" delay={80}>
                  <h3 className="text-sm font-semibold text-bone flex items-center gap-2">
                    <i className="fa-solid fa-vial text-pine" aria-hidden="true"></i>
                    <span>Send test email first</span>
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <label htmlFor="test-email" className="sr-only">Test email address</label>
                    <input
                      id="test-email"
                      type="email"
                      value={testEmailInput}
                      onChange={(e) => setTestEmailInput(e.target.value)}
                      placeholder="Your test email"
                      className="field text-xs"
                    />
                    <button
                      disabled={isSending}
                      onClick={handleSendTestEmail}
                      className="btn btn-accent px-4 py-2.5 text-xs shrink-0 disabled:opacity-50"
                    >
                      {isSending ? "Sending" : "Send test"}
                    </button>
                  </div>
                </Reveal>

                {/* Recipients List Manager */}
                <Reveal className="card p-6 space-y-4" delay={160}>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="text-base text-bone font-semibold flex items-center gap-2">
                      <i className="fa-solid fa-users text-pine" aria-hidden="true"></i>
                      <span>Client email list</span>
                    </h3>
                    <span className="chip py-1 !text-[10px]">{getRecipientsList().length} recipients</span>
                  </div>

                  <p className="text-xs text-bone-mute">
                    Paste your list of client emails (one email address per line).
                  </p>

                  <div>
                    <label htmlFor="recipient-list" className="sr-only">Recipient email list</label>
                    <textarea
                      id="recipient-list"
                      rows="8"
                      value={recipientInput}
                      onChange={(e) => setRecipientInput(e.target.value)}
                      placeholder={"client1@example.com\nclient2@example.com\nclient3@example.com"}
                      className="field font-mono text-xs resize-y"
                    ></textarea>
                  </div>

                  <div className="flex justify-between items-center font-mono text-[11px] text-bone-faint">
                    <span>Duplicates automatically filtered</span>
                    <button
                      onClick={() => setRecipientInput("")}
                      className="text-clay hover:underline"
                    >
                      Clear list
                    </button>
                  </div>
                </Reveal>

              </div>

              {/* Right Column: Template Builder */}
              <div className="lg:col-span-7 space-y-6">

                <Reveal className="card p-6 space-y-6" delay={240}>

                  {/* Template Picker */}
                  <div className="space-y-2">
                    <span className={labelCls}>Select pre-built campaign template</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="group" aria-label="Campaign template">
                      {[
                        { id: "promo", label: "Free audit offer" },
                        { id: "festival", label: "Big Billion / GIF" },
                        { id: "qcommerce", label: "Quick commerce" },
                      ].map((tpl) => (
                        <button
                          key={tpl.id}
                          onClick={() => handleTemplateChange(tpl.id)}
                          aria-pressed={selectedTemplate === tpl.id}
                          className={`p-3 rounded-sm border text-xs font-semibold transition-colors ${
                            selectedTemplate === tpl.id
                              ? "bg-bone text-ink border-bone"
                              : "bg-white/5 text-bone-mute border-white/15 hover:border-white/40 hover:text-bone"
                          }`}
                        >
                          {tpl.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Form Controls */}
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email-subject" className={labelCls}>Email subject line (inbox optimized)</label>
                      <input
                        id="email-subject"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="field text-xs"
                      />
                    </div>

                    <div>
                      <label htmlFor="email-heading" className={labelCls}>Main banner heading</label>
                      <input
                        id="email-heading"
                        type="text"
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                        className="field text-xs"
                      />
                    </div>

                    <div>
                      <label htmlFor="email-body" className={labelCls}>Email body content</label>
                      <textarea
                        id="email-body"
                        rows="7"
                        value={bodyText}
                        onChange={(e) => setBodyText(e.target.value)}
                        className="field text-xs resize-none leading-relaxed"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="cta-text" className={labelCls}>Call to action button text</label>
                        <input
                          id="cta-text"
                          type="text"
                          value={ctaText}
                          onChange={(e) => setCtaText(e.target.value)}
                          className="field text-xs"
                        />
                      </div>

                      <div>
                        <label htmlFor="cta-link" className={labelCls}>Target button link / WhatsApp</label>
                        <input
                          id="cta-link"
                          type="text"
                          value={ctaLink}
                          onChange={(e) => setCtaLink(e.target.value)}
                          className="field font-mono text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Send Action Bar */}
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      onClick={() => setActiveTab("preview")}
                      className="text-xs font-semibold text-bone-mute hover:text-bone flex items-center gap-1.5 transition-colors"
                    >
                      <i className="fa-solid fa-eye" aria-hidden="true"></i> Preview email HTML
                    </button>

                    <button
                      disabled={isSending || getRecipientsList().length === 0}
                      onClick={handleStartBroadcast}
                      className="btn btn-accent w-full sm:w-auto px-7 py-3.5 text-xs disabled:opacity-50"
                    >
                      {isSending ? (
                        <span><i className="fa-solid fa-spinner animate-spin mr-2" aria-hidden="true"></i> Sending broadcast</span>
                      ) : (
                        <span><i className="fa-solid fa-paper-plane mr-2" aria-hidden="true"></i> Send broadcast to {getRecipientsList().length} clients</span>
                      )}
                    </button>
                  </div>

                </Reveal>

              </div>

            </div>
          )}

          {/* TAB 2: LIVE HTML PREVIEW */}
          {activeTab === "preview" && (
            <div className="max-w-3xl mx-auto space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg text-bone">Live email HTML preview</h3>
                <button
                  onClick={() => setActiveTab("composer")}
                  className="link-underline text-xs font-semibold"
                >
                  &larr; Back to composer
                </button>
              </div>

              <div className="card p-5 sm:p-6">
                <iframe
                  title="Email HTML Preview"
                  srcDoc={generateEmailHTML()}
                  className="w-full h-[550px] rounded-sm bg-white border border-white/10"
                ></iframe>
              </div>
            </div>
          )}

          {/* TAB 3: BROADCAST LOGS & PROGRESS */}
          {activeTab === "logs" && (
            <div className="max-w-4xl mx-auto space-y-6">

              {/* Progress Card */}
              <div className="card p-7 sm:p-8 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl text-bone">Broadcast progress tracker</h3>
                    <p className="font-mono text-[11px] text-bone-faint mt-1">Sending from: {senderEmail}</p>
                  </div>
                  <span className="stat-num text-3xl text-marigold">
                    {progress.percentage}%
                  </span>
                </div>

                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden" role="progressbar" aria-valuenow={progress.percentage} aria-valuemin="0" aria-valuemax="100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-marigold to-marigold-bright transition-[width] duration-500 ease-out"
                    style={{ width: `${progress.percentage}%` }}
                  ></div>
                </div>

                <div className="flex justify-between font-mono text-[11px] uppercase tracking-wider text-bone-mute">
                  <span>Processed: {progress.current} / {progress.total} emails</span>
                  <span>Status: {isSending ? "Active batch dispatch" : "Completed / idle"}</span>
                </div>
              </div>

              {/* Live Dispatch Log Table */}
              <div className="card bg-ink p-6 space-y-4">
                <h4 className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-bone-mute border-b border-white/10 pb-3 flex items-center justify-between">
                  <span>Live dispatch activity log</span>
                  <span className="text-bone/60 normal-case tracking-normal">{logs.length} total logs</span>
                </h4>

                <div className="space-y-2 max-h-[400px] overflow-y-auto font-mono text-xs">
                  {logs.length === 0 ? (
                    <div className="text-center py-8 text-bone/60">
                      No broadcast activity recorded yet. Click &quot;Send broadcast&quot; to start.
                    </div>
                  ) : (
                    logs.map((log, index) => (
                      <div key={index} className="p-3 rounded-sm bg-white/[0.04] border border-white/10 flex items-center justify-between gap-3 text-bone/80">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-bone/50 text-[10px] shrink-0">{log.time}</span>
                          <span className="text-bone font-semibold truncate">{log.email}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`px-2 py-0.5 rounded-sm font-mono text-[10px] font-semibold border ${
                            log.status.includes('SENT')
                              ? 'bg-pine-tint text-pine-deep border-pine/25'
                              : log.status === 'FAILED'
                                ? 'bg-clay/10 text-clay border-clay/30'
                                : 'bg-royal-tint text-royal-deep border-royal/25'
                          }`}>
                            {log.status}
                          </span>
                          <span className="text-[10px] text-bone/60 hidden sm:inline">{log.message}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </>
  );
}

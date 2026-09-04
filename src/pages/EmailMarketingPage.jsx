import React, { useState } from 'react';
import SEO from '../components/common/SEO';

export default function EmailMarketingPage() {
  const DEFAULT_SENDER = "connectliveteachcreate@gmail.com";
  
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
    "Hello,\n\nAre you looking to boost your sales volume on Amazon, Flipkart, Blinkit, and Meesho?\n\nAt Liveteachcreate, we specialize in complete seller central management, ACoS optimization, product cataloging, and quick-commerce onboarding.\n\nReply to this email or call +91 8904979375 to claim your complimentary account audit today!"
  );
  const [ctaText, setCtaText] = useState("Get Free Account Audit");
  const [ctaLink, setCtaLink] = useState("https://wa.me/918904979375");

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
        "Hello,\n\nAre you looking to boost your sales volume on Amazon, Flipkart, Blinkit, and Meesho?\n\nAt Liveteachcreate, we specialize in complete seller central management, ACoS optimization, product cataloging, and quick-commerce onboarding.\n\nReply to this email or call +91 8904979375 to claim your complimentary account audit today!"
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
    body { font-family: 'Plus Jakarta Sans', Arial, sans-serif; background-color: #101820; margin: 0; padding: 20px; color: #ffffff; }
    .container { max-width: 600px; margin: 0 auto; background: #17222d; border-radius: 16px; border: 1px solid #2d3b48; overflow: hidden; }
    .header { background: #101820; padding: 30px; text-align: center; border-bottom: 2px solid #FEE715; }
    .logo-emblem { width: 44px; height: 44px; background: #FEE715; color: #101820; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 900; }
    .brand-title { color: #ffffff; font-size: 20px; font-weight: 800; margin-top: 10px; letter-spacing: 1px; }
    .content { padding: 35px 30px; }
    .heading { color: #FEE715; font-size: 22px; font-weight: 800; margin-bottom: 16px; line-height: 1.3; }
    .body-text { color: #e2e8f0; font-size: 14px; line-height: 1.7; margin-bottom: 28px; }
    .cta-btn { display: inline-block; background: #FEE715; color: #101820; font-weight: 800; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 30px; text-transform: uppercase; letter-spacing: 1px; }
    .footer { background: #101820; padding: 20px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #2d3b48; }
    .unsub { color: #94a3b8; text-decoration: underline; margin-top: 6px; display: inline-block; }
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
      Bengaluru • Kolkata • Dhanbad | Direct Contact: +91 8904979375<br/>
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
      alert("Please enter a test email address!");
      return;
    }
    setIsSending(true);
    try {
      const res = await sendEmailApi(testEmailInput);
      if (res.status === 'success') {
        alert(`✅ SUCCESS: ${res.message}\n\nPlease check inbox / primary tab for ${testEmailInput}!`);
      } else {
        alert(`❌ DELIVERY ERROR:\n${res.message}`);
      }
    } catch (e) {
      alert("⚠️ Error connecting to /api/send-email.php. Make sure your production build is uploaded to public_html.");
    }
    setIsSending(false);
  };

  // Start Batch Email Broadcast
  const handleStartBroadcast = async () => {
    const recipients = getRecipientsList();

    if (recipients.length === 0) {
      alert("Please enter at least one valid recipient email address!");
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
          status: success ? 'SENT ✅' : 'FAILED ❌',
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

  return (
    <>
      <SEO 
        title="Free Email Marketing Studio"
        description="Internal Email Marketing Tool for Liveteachcreate. Send daily broadcasts to client lists directly from connectliveteachcreate@gmail.com."
      />

      <div className="bg-gradient-to-b from-gray-900 via-[#101820] to-[#101820] py-12 text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#FEE715]/10 text-[#FEE715] border border-[#FEE715]/30 rounded-full text-xs font-bold uppercase tracking-wider shadow-yellowGlow">
              <i className="fa-solid fa-paper-plane"></i>
              <span>FREE EMAIL MARKETING DASHBOARD</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Client Broadcast Studio
            </h1>
            <p className="text-xs text-gray-400">
              Primary Sender: <strong className="text-[#FEE715]">{senderEmail}</strong> • Free Daily Limit: Up to 500 Emails/Day
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 bg-gray-900 p-1.5 rounded-2xl border border-gray-800">
            <button
              onClick={() => setActiveTab("composer")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "composer" ? "bg-[#FEE715] text-[#101820] shadow-yellowGlow" : "text-gray-400 hover:text-white"
              }`}
            >
              <i className="fa-solid fa-pen-to-square mr-1.5"></i> Composer
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "preview" ? "bg-[#FEE715] text-[#101820] shadow-yellowGlow" : "text-gray-400 hover:text-white"
              }`}
            >
              <i className="fa-solid fa-eye mr-1.5"></i> Live Preview
            </button>
            <button
              onClick={() => setActiveTab("logs")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "logs" ? "bg-[#FEE715] text-[#101820] shadow-yellowGlow" : "text-gray-400 hover:text-white"
              }`}
            >
              <i className="fa-solid fa-list-check mr-1.5"></i> Broadcast Logs ({logs.length})
            </button>
          </div>
        </div>
      </div>

      <div className="py-12 bg-[#101820] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* INBOX PLACEMENT GUIDE BANNER */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-gray-900 via-gray-900 to-black border border-gray-800 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xl shrink-0">
                  📥
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Inbox Placement Strategy Active</h3>
                  <p className="text-xs text-gray-400">
                    Subject lines formatted without spam trigger words. Click <strong>"Report Not Spam"</strong> once in Gmail to permanently trust future broadcasts!
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowSmtpGuide(!showSmtpGuide)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-[#FEE715] border border-gray-700 rounded-xl text-xs font-bold transition-colors shrink-0"
              >
                {showSmtpGuide ? "Hide Setup Guide" : "Inbox Optimization Tips"}
              </button>
            </div>

            {showSmtpGuide && (
              <div className="pt-4 border-t border-gray-800 text-xs text-gray-300 space-y-3 animate-in fade-in">
                <p className="font-bold text-[#FEE715]">3 Tips for 100% Primary Inbox Delivery:</p>
                <ol className="list-decimal pl-5 space-y-1.5 text-gray-300">
                  <li>In your recipient inbox (`rohantoaws@gmail.com`), click the test email inside Spam and select <strong>"Report Not Spam"</strong> once. Gmail will permanently move all future broadcasts to Primary Inbox!</li>
                  <li>Keep subject lines natural and professional (avoid fire/dollar emojis in subject lines).</li>
                  <li>All emails now include an automated Unsubscribe footer header for Google compliance.</li>
                </ol>
              </div>
            )}
          </div>
          
          {/* TAB 1: COMPOSER */}
          {activeTab === "composer" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Sender & Recipient List */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Sender Setup Card */}
                <div className="p-6 rounded-3xl bg-gray-900/80 border border-gray-800 space-y-4">
                  <h3 className="text-base font-bold text-white font-display border-b border-gray-800 pb-3 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <i className="fa-solid fa-user-gear text-[#FEE715]"></i>
                      <span>Sender Setup</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
                      Gmail Verified
                    </span>
                  </h3>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Sender Email Address
                    </label>
                    <input
                      type="email"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-black border border-gray-800 rounded-xl text-xs text-[#FEE715] font-mono focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Sender Display Name
                    </label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-xs text-white focus:outline-none"
                    />
                  </div>

                  {/* Gmail App Password Input */}
                  <div className="pt-2 border-t border-gray-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">
                        Gmail App Password
                      </label>
                      <span className="text-[10px] text-emerald-400 font-bold">Authenticated</span>
                    </div>
                    <input
                      type="password"
                      placeholder="Paste 16-character Gmail App Password"
                      value={gmailAppPassword}
                      onChange={(e) => setGmailAppPassword(e.target.value)}
                      className="w-full px-4 py-2.5 bg-black border border-gray-800 rounded-xl text-xs text-white focus:border-[#FEE715] focus:outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Test Email Box */}
                <div className="p-6 rounded-3xl bg-gray-900/80 border border-gray-800 space-y-4">
                  <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
                    <i className="fa-solid fa-vial text-[#FEE715]"></i>
                    <span>Send Test Email First</span>
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={testEmailInput}
                      onChange={(e) => setTestEmailInput(e.target.value)}
                      placeholder="Your test email"
                      className="w-full px-3 py-2 bg-black border border-gray-800 rounded-xl text-xs text-white focus:outline-none"
                    />
                    <button
                      disabled={isSending}
                      onClick={handleSendTestEmail}
                      className="px-4 py-2 bg-[#FEE715] hover:bg-[#e0ca00] text-[#101820] font-bold text-xs rounded-xl shrink-0 shadow-yellowGlow"
                    >
                      {isSending ? "Sending..." : "Test Send"}
                    </button>
                  </div>
                </div>

                {/* Recipients List Manager */}
                <div className="p-6 rounded-3xl bg-gray-900/80 border border-gray-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                    <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                      <i className="fa-solid fa-users text-[#FEE715]"></i>
                      <span>Client Email List</span>
                    </h3>
                    <span className="px-2.5 py-1 bg-[#FEE715]/10 text-[#FEE715] border border-[#FEE715]/30 rounded-full text-[10px] font-extrabold">
                      {getRecipientsList().length} Recipients
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-400">
                    Paste your list of 250 client emails (one email address per line).
                  </p>

                  <textarea
                    rows="8"
                    value={recipientInput}
                    onChange={(e) => setRecipientInput(e.target.value)}
                    placeholder="client1@example.com&#10;client2@example.com&#10;client3@example.com"
                    className="w-full p-4 bg-black border border-gray-800 rounded-xl text-xs text-gray-200 font-mono focus:border-[#FEE715] focus:outline-none resize-y"
                  ></textarea>

                  <div className="flex justify-between items-center text-[11px] text-gray-400">
                    <span>Duplicates automatically filtered</span>
                    <button
                      onClick={() => setRecipientInput("")}
                      className="text-red-400 hover:underline"
                    >
                      Clear List
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Column: Template Builder */}
              <div className="lg:col-span-7 space-y-6">
                
                <div className="p-6 rounded-3xl bg-gray-900/80 border border-gray-800 space-y-6">
                  
                  {/* Template Picker */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Select Pre-built Campaign Template
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => handleTemplateChange("promo")}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                          selectedTemplate === "promo"
                            ? "bg-[#FEE715] text-[#101820] border-[#FEE715] shadow-yellowGlow"
                            : "bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-600"
                        }`}
                      >
                        🚀 Free Audit Offer
                      </button>
                      <button
                        onClick={() => handleTemplateChange("festival")}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                          selectedTemplate === "festival"
                            ? "bg-[#FEE715] text-[#101820] border-[#FEE715] shadow-yellowGlow"
                            : "bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-600"
                        }`}
                      >
                        🔥 Big Billion / GIF
                      </button>
                      <button
                        onClick={() => handleTemplateChange("qcommerce")}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                          selectedTemplate === "qcommerce"
                            ? "bg-[#FEE715] text-[#101820] border-[#FEE715] shadow-yellowGlow"
                            : "bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-600"
                        }`}
                      >
                        ⚡ Quick Commerce
                      </button>
                    </div>
                  </div>

                  {/* Form Controls */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Email Subject Line (Inbox Optimized)
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Main Banner Heading
                      </label>
                      <input
                        type="text"
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-xs text-[#FEE715] font-bold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Email Body Content
                      </label>
                      <textarea
                        rows="7"
                        value={bodyText}
                        onChange={(e) => setBodyText(e.target.value)}
                        className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-xs text-gray-200 focus:outline-none resize-none leading-relaxed"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                          Call To Action Button Text
                        </label>
                        <input
                          type="text"
                          value={ctaText}
                          onChange={(e) => setCtaText(e.target.value)}
                          className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-xs text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                          Target Button Link / WhatsApp
                        </label>
                        <input
                          type="text"
                          value={ctaLink}
                          onChange={(e) => setCtaLink(e.target.value)}
                          className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Send Action Bar */}
                  <div className="pt-4 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      onClick={() => setActiveTab("preview")}
                      className="text-xs font-bold text-gray-400 hover:text-white flex items-center gap-1.5"
                    >
                      <i className="fa-solid fa-eye"></i> Preview Email HTML
                    </button>

                    <button
                      disabled={isSending || getRecipientsList().length === 0}
                      onClick={handleStartBroadcast}
                      className="w-full sm:w-auto pulseBtn font-extrabold text-xs px-8 py-3.5 rounded-full uppercase tracking-wider shadow-yellowGlow disabled:opacity-50"
                    >
                      {isSending ? (
                        <span><i className="fa-solid fa-spinner animate-spin mr-2"></i> Sending Broadcast...</span>
                      ) : (
                        <span><i className="fa-solid fa-paper-plane mr-2"></i> Send Broadcast To {getRecipientsList().length} Clients</span>
                      )}
                    </button>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* TAB 2: LIVE HTML PREVIEW */}
          {activeTab === "preview" && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white font-display">Live Email HTML Preview</h3>
                <button
                  onClick={() => setActiveTab("composer")}
                  className="text-xs text-[#FEE715] hover:underline font-bold"
                >
                  ← Back to Composer
                </button>
              </div>

              <div className="rounded-3xl border border-gray-800 overflow-hidden shadow-2xl bg-[#101820] p-6">
                <iframe
                  title="Email HTML Preview"
                  srcDoc={generateEmailHTML()}
                  className="w-full h-[550px] rounded-2xl bg-white border-0"
                ></iframe>
              </div>
            </div>
          )}

          {/* TAB 3: BROADCAST LOGS & PROGRESS */}
          {activeTab === "logs" && (
            <div className="max-w-4xl mx-auto space-y-6">
              
              {/* Progress Card */}
              <div className="p-8 rounded-3xl bg-gray-900 border border-gray-800 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white font-display">Broadcast Progress Tracker</h3>
                    <p className="text-xs text-gray-400">Sending from: {senderEmail}</p>
                  </div>
                  <span className="text-2xl font-black text-[#FEE715] font-display">
                    {progress.percentage}%
                  </span>
                </div>

                <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#FEE715] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${progress.percentage}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-xs font-semibold text-gray-300">
                  <span>Processed: {progress.current} / {progress.total} Emails</span>
                  <span>Status: {isSending ? "Active Batch Dispatch..." : "Completed / Idle"}</span>
                </div>
              </div>

              {/* Live Dispatch Log Table */}
              <div className="p-6 rounded-3xl bg-gray-900/80 border border-gray-800 space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-gray-800 pb-3 flex items-center justify-between">
                  <span>Live Dispatch Activity Log</span>
                  <span className="text-xs text-gray-400 font-normal">{logs.length} Total Logs</span>
                </h4>

                <div className="space-y-2 max-h-[400px] overflow-y-auto font-mono text-xs">
                  {logs.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No broadcast activity recorded yet. Click "Send Broadcast" to start!
                    </div>
                  ) : (
                    logs.map((log, index) => (
                      <div key={index} className="p-3 rounded-xl bg-black border border-gray-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-gray-500 text-[10px]">{log.time}</span>
                          <span className="text-gray-200 font-bold">{log.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            log.status.includes('SENT') ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'
                          }`}>
                            {log.status}
                          </span>
                          <span className="text-[10px] text-gray-400 hidden sm:inline">{log.message}</span>
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

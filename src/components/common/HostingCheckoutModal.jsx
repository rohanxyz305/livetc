import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomerAuthForm, { inputCls } from './CustomerAuthForm';
import { createHostingOrder, verifyHostingPayment } from '../../services/customerApi';

const RAZORPAY_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js';

function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = RAZORPAY_SCRIPT;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function HostingCheckoutModal({ plan, customer, onCustomerChange, onClose }) {
  const [domain, setDomain] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');
  const [paymentId, setPaymentId] = useState('');

  if (!plan) return null;

  const handlePay = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    if (!(await loadRazorpay())) {
      setStatus('error');
      setMessage('Could not load the payment gateway. Please check your connection and try again.');
      return;
    }

    try {
      const order = await createHostingOrder(plan.name, domain);

      const rzp = new window.Razorpay({
        key: order.key_id,
        order_id: order.order_id,
        amount: order.amount,
        currency: order.currency,
        name: 'Liveteachcreate',
        description: `Web Hosting - ${order.plan} Plan (1 Year)`,
        prefill: { name: order.customer.name, email: order.customer.email, contact: order.customer.phone },
        theme: { color: '#FEE715' },
        handler: async (response) => {
          try {
            const verified = await verifyHostingPayment(response);
            setPaymentId(verified.payment_id);
            setStatus('success');
          } catch {
            setStatus('error');
            setMessage(
              `We received your payment (ID: ${response.razorpay_payment_id}) but could not confirm it automatically. It will appear in My Orders shortly, or our team will contact you.`
            );
          }
        },
        modal: { ondismiss: () => setStatus((s) => (s === 'loading' ? 'idle' : s)) },
      });

      rzp.on('payment.failed', (resp) => {
        setStatus('error');
        setMessage(resp?.error?.description || 'Payment failed. Please try again.');
      });

      rzp.open();
    } catch (err) {
      if (err.status === 401) onCustomerChange(null);
      setStatus('error');
      setMessage(err.message);
    }
  };

  const priceLabel = `₹${plan.price.toLocaleString('en-IN')}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4" onClick={onClose}>
      <div
        className="relative w-full max-w-md bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-8 text-white max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white" aria-label="Close">
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>

        <div className="mb-5 pr-6">
          <h3 className="text-xl font-bold font-display">{plan.name} Hosting Plan</h3>
          <p className="text-sm text-gray-400 mt-1">
            <span className="text-2xl font-extrabold text-[#FEE715]">{priceLabel}</span>
            <span className="ml-1">/{plan.period}</span>
            {plan.originalPrice && (
              <>
                <span className="ml-3 text-gray-500 line-through">₹{plan.originalPrice.toLocaleString('en-IN')}</span>
                <span className="ml-2 text-green-400 font-bold text-xs">{plan.discountPercent}% OFF</span>
              </>
            )}
          </p>
        </div>

        {status === 'success' ? (
          <div className="text-center space-y-4 py-2">
            <i className="fa-solid fa-circle-check text-5xl text-[#FEE715]"></i>
            <h3 className="text-xl font-bold font-display">Payment Successful!</h3>
            <p className="text-sm text-gray-300">
              Thank you, {customer?.name}. Our team will set up your hosting and email the login details to{' '}
              <strong>{customer?.email}</strong> shortly.
            </p>
            <p className="text-xs text-gray-500">Payment ID: {paymentId}</p>
            <Link
              to="/my-account"
              className="block w-full bg-[#FEE715] hover:bg-[#e0ca00] text-[#101820] font-bold text-xs py-3.5 rounded-xl uppercase tracking-wider"
            >
              View My Orders
            </Link>
          </div>
        ) : !customer ? (
          <CustomerAuthForm
            initialMode="register"
            subtitle="Create an account or sign in to buy this plan. You can track your orders anytime from My Account."
            onAuthed={onCustomerChange}
          />
        ) : (
          <form onSubmit={handlePay} className="space-y-4">
            <div className="text-xs text-gray-400 bg-[#101820] border border-gray-800 rounded-xl px-4 py-3">
              Signed in as <span className="text-white font-semibold">{customer.email}</span>
            </div>
            <input
              placeholder="Domain name (e.g. mybusiness.com) – optional"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className={inputCls}
            />

            {status === 'error' && <p className="text-xs text-red-400">{message}</p>}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-[#FEE715] hover:bg-[#e0ca00] disabled:opacity-60 text-[#101820] font-bold text-xs py-3.5 rounded-xl uppercase tracking-wider"
            >
              {status === 'loading' ? 'Processing…' : `Pay ${priceLabel} Securely`}
            </button>
            <p className="text-[11px] text-gray-500 text-center">
              <i className="fa-solid fa-lock mr-1"></i>
              Secured by Razorpay · UPI, Cards, Netbanking & Wallets accepted
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

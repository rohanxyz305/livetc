import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import CustomerAuthForm from '../components/common/CustomerAuthForm';
import { getCurrentCustomer, getMyOrders, logoutCustomer } from '../services/customerApi';

const HOSTING_URL = '/services/web-hosting-services-in-india';

function formatDate(value) {
  if (!value) return '-';
  return new Date(value.replace(' ', 'T')).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function MyAccountPage() {
  const [customer, setCustomer] = useState(undefined); // undefined = loading
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getCurrentCustomer().then(setCustomer).catch(() => setCustomer(null));
  }, []);

  useEffect(() => {
    if (!customer) return;
    setOrders(null);
    getMyOrders().then(setOrders).catch((err) => setError(err.message));
  }, [customer]);

  const logout = async () => {
    await logoutCustomer().catch(() => {});
    setCustomer(null);
    setOrders(null);
  };

  return (
    <>
      <SEO title="My Account" description="View your Liveteachcreate hosting orders." canonicalUrl="https://liveteachcreate.com/my-account" />

      <section className="min-h-[70vh] py-16 md:py-24 bg-[#0b1218] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {customer === undefined ? (
            <p className="text-center text-gray-400 text-sm">Loading…</p>
          ) : !customer ? (
            <div className="max-w-md mx-auto bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-5">
              <div>
                <h1 className="text-2xl font-extrabold font-display">My Account</h1>
                <p className="text-sm text-gray-400 mt-1">Sign in to view your hosting orders.</p>
              </div>
              <CustomerAuthForm onAuthed={setCustomer} />
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-display">Hi, {customer.name}</h1>
                  <p className="text-sm text-gray-400 mt-1">{customer.email} · {customer.phone}</p>
                </div>
                <div className="flex gap-3">
                  <Link
                    to={HOSTING_URL}
                    className="px-5 py-3 bg-[#FEE715] hover:bg-[#e0ca00] text-[#101820] font-bold text-xs rounded-xl uppercase tracking-wider"
                  >
                    Buy Hosting
                  </Link>
                  <button
                    onClick={logout}
                    className="px-5 py-3 border border-gray-700 hover:border-[#FEE715] font-bold text-xs rounded-xl uppercase tracking-wider"
                  >
                    Sign Out
                  </button>
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-bold font-display mb-5">
                  <i className="fa-solid fa-server text-[#FEE715] mr-2"></i>My Hosting Orders
                </h2>

                {error ? (
                  <p className="text-sm text-red-400">{error}</p>
                ) : orders === null ? (
                  <p className="text-sm text-gray-400">Loading orders…</p>
                ) : orders.length === 0 ? (
                  <div className="text-center py-8 space-y-4">
                    <p className="text-sm text-gray-400">You haven't purchased any hosting plans yet.</p>
                    <Link to={HOSTING_URL} className="inline-block text-[#FEE715] text-sm font-semibold hover:underline">
                      View hosting plans →
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((o) => {
                      const active = o.expires_at && new Date(o.expires_at.replace(' ', 'T')) > new Date();
                      return (
                        <div key={o.id} className="grid grid-cols-2 sm:grid-cols-5 gap-4 p-5 bg-[#101820] border border-gray-800 rounded-2xl text-sm">
                          <div className="col-span-2 sm:col-span-1">
                            <p className="text-[11px] text-gray-500 uppercase tracking-wider">Plan</p>
                            <p className="font-bold text-white">{o.plan}</p>
                            {o.domain && <p className="text-xs text-gray-400 break-all">{o.domain}</p>}
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-500 uppercase tracking-wider">Amount</p>
                            <p className="font-semibold">₹{Number(o.amount).toLocaleString('en-IN')}</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-500 uppercase tracking-wider">Purchased</p>
                            <p>{formatDate(o.paid_at)}</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-500 uppercase tracking-wider">Renews / Expires</p>
                            <p>{formatDate(o.expires_at)}</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-500 uppercase tracking-wider">Status</p>
                            <span className={`inline-block mt-0.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              active ? 'bg-green-500/15 text-green-400' : 'bg-gray-700 text-gray-300'
                            }`}>
                              {active ? 'Active' : 'Expired'}
                            </span>
                          </div>
                          <p className="col-span-2 sm:col-span-5 text-[11px] text-gray-500 break-all">
                            Payment ID: {o.razorpay_payment_id}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

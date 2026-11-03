import React, { useState } from 'react';
import { loginCustomer, registerCustomer } from '../../services/customerApi';

export const inputCls =
  'w-full bg-[#101820] border border-gray-700 focus:border-[#FEE715] outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500';

export default function CustomerAuthForm({ onAuthed, initialMode = 'login', subtitle }) {
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const customer =
        mode === 'login' ? await loginCustomer(form.email, form.password) : await registerCustomer(form);
      onAuthed(customer);
    } catch (err) {
      setError(err.message);
      if (err.status === 409) setMode('login');
    } finally {
      setLoading(false);
    }
  };

  const tab = (m, label) => (
    <button
      type="button"
      onClick={() => { setMode(m); setError(''); }}
      className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
        mode === m ? 'bg-[#FEE715] text-[#101820]' : 'text-gray-400 hover:text-white'
      }`}
    >
      {label}
    </button>
  );

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="flex gap-1 p-1 bg-[#101820] border border-gray-800 rounded-xl">
        {tab('login', 'Sign In')}
        {tab('register', 'Sign Up')}
      </div>
      {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}

      {mode === 'register' && (
        <input name="name" required placeholder="Full Name *" value={form.name} onChange={update} className={inputCls} autoComplete="name" />
      )}
      <input name="email" type="email" required placeholder="Email Address *" value={form.email} onChange={update} className={inputCls} autoComplete="email" />
      {mode === 'register' && (
        <input
          name="phone" type="tel" required pattern="[0-9+ ]{10,15}" placeholder="Phone Number *"
          value={form.phone} onChange={update} className={inputCls} autoComplete="tel"
        />
      )}
      <input
        name="password" type="password" required minLength={mode === 'register' ? 8 : undefined}
        placeholder={mode === 'register' ? 'Create Password (min 8 characters) *' : 'Password *'}
        value={form.password} onChange={update} className={inputCls}
        autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
      />

      {error && <p className="text-xs text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#FEE715] hover:bg-[#e0ca00] disabled:opacity-60 text-[#101820] font-bold text-xs py-3.5 rounded-xl uppercase tracking-wider"
      >
        {loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
      </button>
    </form>
  );
}

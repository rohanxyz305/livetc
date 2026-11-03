// Customer account + hosting order API (PHP endpoints in /public/api)

async function call(path, { method = 'GET', body } = {}) {
  const res = await fetch(`/api/${path}`, {
    method,
    credentials: 'same-origin',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error('Server error. Please try again.');
  }
  if (data.status !== 'success') {
    const err = new Error(data.message || 'Something went wrong.');
    err.status = res.status;
    throw err;
  }
  return data;
}

export const getCurrentCustomer = () => call('auth-me.php').then((d) => d.customer);
export const loginCustomer = (email, password) =>
  call('auth-login.php', { method: 'POST', body: { email, password } }).then((d) => d.customer);
export const registerCustomer = (form) =>
  call('auth-register.php', { method: 'POST', body: form }).then((d) => d.customer);
export const logoutCustomer = () => call('auth-logout.php', { method: 'POST', body: {} });
export const getMyOrders = () => call('hosting-my-orders.php').then((d) => d.orders);
export const createHostingOrder = (plan, domain) =>
  call('razorpay-create-order.php', { method: 'POST', body: { plan, domain } });
export const verifyHostingPayment = (response) =>
  call('razorpay-verify-payment.php', { method: 'POST', body: response });

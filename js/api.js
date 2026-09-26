// آدرس بک‌اند روی Render
const API_BASE = window.API_BASE || 'https://oloom-backend.onrender.com/api';

const api = {
  async request(path, options = {}) {
    const token = localStorage.getItem('token');
    const res = await fetch(API_BASE + path, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'خطایی رخ داد');
    return data;
  },
  get(path) { return this.request(path); },
  post(path, body) { return this.request(path, { method: 'POST', body }); },
};

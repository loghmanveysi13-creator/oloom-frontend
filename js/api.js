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

// عکس پروفایل کاربر را در آیکون «پروفایل» نوار پایین جایگزین ایموجی می‌کند (در همه صفحات)
async function loadNavAvatar() {
  try {
    const { user } = await api.get('/profile');
    if (!user || !user.avatar_path) return;
    const navIcon = document.querySelector('.nav-item[href="profile.html"] .icon');
    if (navIcon) {
      const img = document.createElement('img');
      img.src = API_BASE.replace('/api', '') + user.avatar_path + '?t=' + Date.now();
      img.className = 'nav-avatar-img';
      navIcon.replaceWith(img);
    }
  } catch (e) { /* اگر توکن نامعتبر بود، کاری نکن */ }
}
document.addEventListener('DOMContentLoaded', loadNavAvatar);

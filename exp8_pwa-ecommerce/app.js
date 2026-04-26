// ============================================================
//  KART — Mini E-Commerce PWA
//  app.js — All application logic
// ============================================================

// ---- PRODUCT DATA ----
const PRODUCTS = [
  { id: 1, name: 'Wireless Earbuds Pro', cat: 'electronics', emoji: '🎧', price: 2499, original: 3999, desc: 'Active noise cancellation, 30hr battery, IPX5 waterproof.', badge: 'HOT', rating: 4.5 },
  { id: 2, name: 'Smart Watch Series X', cat: 'electronics', emoji: '⌚', price: 8999, original: 12999, desc: 'Health tracking, GPS, always-on display, 7-day battery.', badge: 'NEW', rating: 4.7 },
  { id: 3, name: 'Mechanical Keyboard', cat: 'electronics', emoji: '⌨️', price: 3499, original: 4999, desc: 'TKL layout, RGB backlit, tactile switches, aluminium frame.', rating: 4.3 },
  { id: 4, name: 'USB-C Hub 7-in-1', cat: 'electronics', emoji: '🔌', price: 1299, original: 1899, desc: '4K HDMI, 3×USB-A, SD card, 100W PD charging.', rating: 4.4 },
  { id: 5, name: 'Oversized Hoodie', cat: 'fashion', emoji: '🧥', price: 1599, original: 2499, desc: '100% organic cotton, drop shoulder, unisex fit. Sizes XS-3XL.', badge: 'SALE', rating: 4.6 },
  { id: 6, name: 'Minimalist Sneakers', cat: 'fashion', emoji: '👟', price: 4299, original: 5999, desc: 'Premium leather, memory foam insole, minimalist design.', badge: 'NEW', rating: 4.8 },
  { id: 7, name: 'Crossbody Bag', cat: 'fashion', emoji: '👜', price: 2199, original: 3299, desc: 'Vegan leather, adjustable strap, multiple compartments.', rating: 4.2 },
  { id: 8, name: 'Linen Shirt', cat: 'fashion', emoji: '👕', price: 999, original: 1499, desc: 'Breathable linen, relaxed fit, perfect for warm days.', rating: 4.1 },
  { id: 9, name: 'Desk Lamp LED', cat: 'home', emoji: '💡', price: 1199, original: 1799, desc: 'Touch dimmer, 3 color temps, USB-A charging port built-in.', rating: 4.5 },
  { id: 10, name: 'Ceramic Coffee Mug Set', cat: 'home', emoji: '☕', price: 799, original: 1199, desc: 'Set of 4 hand-thrown mugs, microwave & dishwasher safe.', badge: 'HOT', rating: 4.9 },
  { id: 11, name: 'Yoga Mat Premium', cat: 'sports', emoji: '🧘', price: 1799, original: 2499, desc: '6mm thick, non-slip surface, eco-friendly TPE material.', rating: 4.6 },
  { id: 12, name: 'Water Bottle 1L', cat: 'sports', emoji: '🍶', price: 699, original: 999, desc: 'BPA-free Tritan, leak-proof lid, keeps cold 24hr/hot 12hr.', badge: 'NEW', rating: 4.7 },
];

// ---- STATE ----
let cart = JSON.parse(localStorage.getItem('kart_cart') || '[]');
let orders = JSON.parse(localStorage.getItem('kart_orders') || '[]');
let currentFilter = 'all';
let deferredInstallPrompt = null;

// ---- UTILS ----
const fmt = (n) => '₹' + n.toLocaleString('en-IN');
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
const saveCart = () => localStorage.setItem('kart_cart', JSON.stringify(cart));
const saveOrders = () => localStorage.setItem('kart_orders', JSON.stringify(orders));

function showToast(msg, type = '') {
  const t = $('#toast');
  t.textContent = msg;
  t.className = 'toast show ' + type;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.className = 'toast hidden', 2800);
}

// ---- NAVIGATION ----
function switchView(name) {
  $$('.view').forEach(v => v.classList.remove('active'));
  $$('.nav-tab').forEach(t => t.classList.remove('active'));
  $(`#view-${name}`)?.classList.add('active');
  $$('.nav-tab').forEach(t => { if (t.dataset.view === name) t.classList.add('active'); });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (name === 'cart') renderCart();
  if (name === 'orders') renderOrders();
}

$$('.nav-tab').forEach(btn => btn.addEventListener('click', () => switchView(btn.dataset.view)));
document.addEventListener('click', (e) => {
  const nav = e.target.closest('[data-nav]');
  if (nav) switchView(nav.dataset.nav);
});

// ---- PRODUCTS ----
function renderProducts(cat = 'all') {
  const grid = $('#products-grid');
  const filtered = cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);
  grid.innerHTML = filtered.map((p, i) => {
    const inCart = cart.find(c => c.id === p.id);
    return `
    <div class="product-card" data-id="${p.id}" style="animation-delay:${i * 0.05}s">
      <div class="product-card-img">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        ${p.emoji}
      </div>
      <div class="product-card-info">
        <p class="product-card-cat">${p.cat}</p>
        <p class="product-card-name">${p.name}</p>
        <p class="product-card-desc">${p.desc}</p>
        <div class="product-card-footer">
          <div class="product-price">
            <span class="original">${fmt(p.original)}</span>
            ${fmt(p.price)}
          </div>
          <button class="btn-add-cart ${inCart ? 'in-cart' : ''}" data-add="${p.id}">
            ${inCart ? '✓ Added' : '+ Cart'}
          </button>
        </div>
      </div>
    </div>`;
  }).join('');
}

// Product card click → quick view modal
$('#products-grid').addEventListener('click', (e) => {
  const addBtn = e.target.closest('[data-add]');
  if (addBtn) { e.stopPropagation(); addToCart(+addBtn.dataset.add); return; }
  const card = e.target.closest('.product-card');
  if (card) openProductModal(+card.dataset.id);
});

// ---- FILTER ----
$$('.filter-btn').forEach(btn => btn.addEventListener('click', () => {
  $$('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentFilter = btn.dataset.cat;
  renderProducts(currentFilter);
}));

// ---- PRODUCT MODAL ----
function openProductModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const inCart = cart.find(c => c.id === id);
  const stars = '★'.repeat(Math.floor(p.rating)) + (p.rating % 1 ? '½' : '') + '☆'.repeat(5 - Math.ceil(p.rating));
  const discount = Math.round((1 - p.price / p.original) * 100);
  $('#product-modal-content').innerHTML = `
    <div class="product-detail-img">${p.emoji}</div>
    <p class="product-detail-cat">${p.cat} · ${discount}% OFF</p>
    <h2 class="product-detail-name">${p.name}</h2>
    <p class="product-rating">${stars} <span style="color:var(--text2)">(${p.rating}/5)</span></p>
    <p class="product-detail-desc">${p.desc}</p>
    <p class="product-detail-price">${fmt(p.price)} <span style="font-size:1rem;color:var(--text3);text-decoration:line-through;font-weight:400">${fmt(p.original)}</span></p>
    <button class="btn-primary btn-full ${inCart ? 'in-cart' : ''}" data-modal-add="${id}">
      ${inCart ? '✓ Already in Cart' : '+ Add to Cart'}
    </button>
  `;
  $('#product-modal').classList.remove('hidden');
}
$('#close-product-modal').addEventListener('click', () => $('#product-modal').classList.add('hidden'));
$('#product-modal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) $('#product-modal').classList.add('hidden');
  const addBtn = e.target.closest('[data-modal-add]');
  if (addBtn) { addToCart(+addBtn.dataset.modalAdd); $('#product-modal').classList.add('hidden'); }
});

// ---- CART LOGIC ----
function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty += 1;
    showToast(`${p.name} qty updated ✓`, 'success');
  } else {
    cart.push({ id: p.id, name: p.name, price: p.price, emoji: p.emoji, qty: 1 });
    showToast(`${p.name} added to cart 🛒`, 'success');
  }
  saveCart();
  updateCartBadge();
  renderProducts(currentFilter);
}

function updateCartBadge() {
  const total = cart.reduce((s, c) => s + c.qty, 0);
  const badge = $('#cart-badge');
  badge.textContent = total;
  badge.classList.toggle('hidden', total === 0);
}

function renderCart() {
  const list = $('#cart-items');
  const empty = $('#cart-empty');
  const summary = $('#cart-summary');
  if (cart.length === 0) {
    list.innerHTML = '';
    empty.classList.remove('hidden');
    summary.classList.add('hidden');
    return;
  }
  empty.classList.add('hidden');
  summary.classList.remove('hidden');
  list.innerHTML = cart.map(item => `
    <div class="cart-item" data-cart-id="${item.id}">
      <div class="cart-item-emoji">${item.emoji}</div>
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">${fmt(item.price)} each</p>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" data-qty-dec="${item.id}">−</button>
        <span class="qty-val">${item.qty}</span>
        <button class="qty-btn" data-qty-inc="${item.id}">+</button>
        <button class="remove-item" data-remove="${item.id}">🗑</button>
      </div>
    </div>
  `).join('');

  const sub = cart.reduce((s, c) => s + c.price * c.qty, 0);
  $('#subtotal').textContent = fmt(sub);
  $('#total').textContent = fmt(sub);
}

$('#cart-items').addEventListener('click', (e) => {
  const inc = e.target.closest('[data-qty-inc]');
  const dec = e.target.closest('[data-qty-dec]');
  const rem = e.target.closest('[data-remove]');
  if (inc) updateQty(+inc.dataset.qtyInc, 1);
  if (dec) updateQty(+dec.dataset.qtyDec, -1);
  if (rem) removeFromCart(+rem.dataset.remove);
});

function updateQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else { saveCart(); updateCartBadge(); renderCart(); }
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  updateCartBadge();
  renderCart();
  renderProducts(currentFilter);
  showToast('Item removed from cart', 'error');
}

$('#clear-cart').addEventListener('click', () => {
  if (cart.length === 0) return;
  if (confirm('Clear all items from cart?')) {
    cart = [];
    saveCart();
    updateCartBadge();
    renderCart();
    renderProducts(currentFilter);
    showToast('Cart cleared', 'error');
  }
});

// ---- CHECKOUT ----
$('#checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) return;
  const orderId = 'ORD-' + Date.now().toString(36).toUpperCase();
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const order = {
    id: orderId,
    items: [...cart],
    total,
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    status: 'Confirmed'
  };
  orders.unshift(order);
  saveOrders();
  cart = [];
  saveCart();
  updateCartBadge();
  renderProducts(currentFilter);
  $('#order-id-display').textContent = orderId;
  $('#checkout-modal').classList.remove('hidden');
});

$('#close-modal').addEventListener('click', () => $('#checkout-modal').classList.add('hidden'));
$('#continue-shopping').addEventListener('click', () => {
  $('#checkout-modal').classList.add('hidden');
  switchView('shop');
});
$('#checkout-modal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) $('#checkout-modal').classList.add('hidden');
});

// ---- ORDERS ----
function renderOrders() {
  const list = $('#orders-list');
  const empty = $('#orders-empty');
  if (orders.length === 0) {
    list.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');
  list.innerHTML = orders.map(o => `
    <div class="order-card">
      <div class="order-header">
        <span class="order-id">${o.id} · ${o.date}</span>
        <span class="order-status">✓ ${o.status}</span>
      </div>
      <div class="order-items">
        ${o.items.map(i => `${i.emoji} ${i.name} ×${i.qty}`).join('<br/>')}
      </div>
      <p class="order-total">Total: ${fmt(o.total)}</p>
    </div>
  `).join('');
}

// ---- OFFLINE DETECTION ----
function updateOnlineStatus() {
  const banner = $('#offline-banner');
  if (!navigator.onLine) {
    banner.classList.remove('hidden');
  } else {
    banner.classList.add('hidden');
  }
}
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
updateOnlineStatus();

// ---- PWA INSTALL PROMPT ----
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  setTimeout(() => $('#install-banner')?.classList.remove('hidden'), 3000);
});

$('#install-btn')?.addEventListener('click', async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  const { outcome } = await deferredInstallPrompt.userChoice;
  if (outcome === 'accepted') {
    showToast('KART installed successfully! 🎉', 'success');
    $('#install-banner').classList.add('hidden');
  }
  deferredInstallPrompt = null;
});

$('#dismiss-install')?.addEventListener('click', () => $('#install-banner')?.classList.add('hidden'));

window.addEventListener('appinstalled', () => {
  showToast('KART has been installed 🎉', 'success');
  $('#install-banner')?.classList.add('hidden');
});

// ---- SERVICE WORKER REGISTRATION ----
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('./service-worker.js');
      console.log('[PWA] Service Worker registered:', reg.scope);
    } catch (err) {
      console.warn('[PWA] Service Worker registration failed:', err);
    }
  });
}

// ---- INIT ----
renderProducts();
updateCartBadge();

/* ============================================================
   HOME PAGE – Dynamic Content
   ============================================================ */

const FEATURED_VEHICLES = [
  { id: 1, make: 'Porsche', model: '911 Carrera S', year: 2023, price: 142500, miles: 8200, color: 'Guards Red', fuel: 'Gasoline', trans: 'PDK', badge: 'Certified', emoji: '🏎️' },
  { id: 2, make: 'Mercedes-Benz', model: 'S-Class S580', year: 2022, price: 118900, miles: 14300, color: 'Obsidian Black', fuel: 'Gasoline', trans: 'Auto', badge: 'Hot Deal', emoji: '🖤' },
  { id: 3, make: 'BMW', model: 'M8 Competition', year: 2023, price: 129000, miles: 6800, color: 'Frozen Blue', fuel: 'Gasoline', trans: 'M-DCT', badge: 'New Arrival', emoji: '🔵' },
  { id: 4, make: 'Bentley', model: 'Continental GT', year: 2021, price: 198000, miles: 22100, color: 'Beluga Black', fuel: 'Gasoline', trans: 'Auto', badge: 'Certified', emoji: '💎' },
  { id: 5, make: 'Audi', model: 'RS7 Sportback', year: 2023, price: 111500, miles: 9400, color: 'Daytona Grey', fuel: 'Gasoline', trans: 'Tiptronic', badge: 'Low Miles', emoji: '⚡' },
  { id: 6, make: 'Lamborghini', model: 'Huracán EVO', year: 2022, price: 289000, miles: 3200, color: 'Arancio Borealis', fueladed my car photos Monday, had an offer by Tuesday, and completed the transaction Wednesday. Smooth, professional, and genuinely fair.' },
  { name: 'Aisha M.', car: '2023 BMW M8', rating: 5, text: 'As a first-time luxury car buyer I was nervous, but the team made me feel completely at ease. They walked me through every detail of the financing and warranty options. Could not recommend more highly.' },
];

document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedVehicles();
  renderTestimonials();
  animateTradeCounter();
  initFavorites();
});

/* ---- Featured Vehicles ---- */
function renderFeaturedVehicles() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  grid.innerHTML = FEATURED_VEHICLES.map((v, i) => `
    <div class="vehicle-card reveal" style="transition-delay:${i * 0.08}s">
      <div class="vc-image">
        <div class="vc-image-placeholder">${v.emoji}</div>
        <div class="vc-badge-row">
          <span class="badge badge-gold">${v.badge}</span>
        </div>
        <button class="vc-favorite" data-id="${v.id}" aria-label="Favorite">♡</button>
      </div>
      <div class="vc-body">
        <div class="vc-make">${v.make}</div>
        <div class="vc-name">${v.year} ${v.model}</div>
        <div class="vc-specs">
          <div class="vc-spec"><span class="vc-spec-icon">🛣️</span>${v.miles.toLocaleString()} mi</div>
          <div class="vc-spec"><span class="vc-spec-icon">⛽</span>${v.fuel}</div>
          <div class="vc-spec"><span class="vc-spec-icon">⚙️</span>${v.trans}</div>
        </div>
        <div class="vc-footer">
          <div>
            <div class="vc-price">$${v.price.toLocaleString()}</div>ly inserted elements
  if (typeof initScrollReveal === 'function') initScrollReveal();
  else {
    document.querySelectorAll('.reveal').forEach(el => {
      new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add('visible'); }, { threshold: 0.1 }).observe(el);
    });
  }
}

/* ---- Testimonials Slider ---- */
let currentSlide = 0;
let sliderInterval;

function renderTestimonials() {
  const slider = document.getElementById('testimonialsSlider');
  const dots   = document.getElementById('sliderDots');
  if (!slider) return;

  slider.innerHTML = `<div class="testimonials-track" id="testimonialsTrack">
    ${TESTIMONIALS.map(t => `
      <div class="testimonial-slide">
        <div class="testimonial-inner">
          <div class="testimonial-stars">${'\u2605'.repeat(t.rating)}</div>
          <p class="testimonial-text">${t.text}</p>
          <div class="testimonial-author">
            <div class="author-avatar">${t.name[0]}</div>
            <div class="author-info">
              <div class="author-name">${t.name}</div>
              <div class="author-car">${t.car}</div>
            </div>
          </div>
        </div>
      </div>
    `).join('')}
  </div>`;

  if (dots) {
    dots.innerHTML = TESTIMONIALS.map((_, i) =>
      `<button class="slider-dot${i === 0 ? ' active' : ''}" data-idx="${i}"></button>`
    ).join('');
    dots.querySelectorAll('.slider-dot').forEach(btn => {
      btn.addEventListener('click', () => goToSlide(+btn.dataset.idx));
    });
  }

  sliderInterval = setInterval(() => goToSlide((currentSlide + 1) % TESTIMONIALS.length), 5500);
}

function goToSlide(idx) {getElementById('tradeCounter');
  const fill     = document.getElementById('tradeFill');
  const target   = 29800;
  if (!counter) return;

  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    let cur = 0;
    const step = target / 80;
    const t = setInterval(() => {
      cur = Math.min(cur + step, target);
      counter.textContent = Math.floor(cur).toLocaleString();
      if (fill) fill.style.width = `${(cur / 31200) * 100}%`;
      if (cur >= target) clearInterval(t);
    }, 20);
  }, { threshold: 0.3 });

  const section = document.querySelector('.trade-promo');
  if (section) io.observe(section);
}

/* ---- Favorites ---- */
function initFavorites() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.vc-favorite');
    if (!btn) return;
    btn.classList.toggle('active');
    btn.textContent = btn.classList.contains('active') ? '\u2665' : '\u2661';
    const id = btn.dataset.id;
    let favs = JSON.parse(localStorage.getItem('la_favorites') || '[]');
    if (btn.classList.contains('active')) { if (!favs.includes(id)) favs.push(id); }
    else { favs = favs.filter(f => f !== id); }
    localStorage.setItem('la_favorites', JSON.stringify(favs));
    if (typeof showToast === 'function') showToast(btn.classList.contains('active') ? 'Added to favorites!' : 'Removed from favorites', 'info');
  });

  // Restore favorites
  const favs = JSON.parse(localStorage.getItem('la_favorites') || '[]');
  favs.forEach(id => {
    const btn = document.querySelector(`.vc-favorite[data-id="${id}"]`);
    if (btn) { btn.classList.add('active'); btn.textContent = '\u2665'; }
  });
}

  currentSlide = idx;
  const track = document.getElementById('testimonialsTrack');
  if (track) track.style.transform = `translateX(-${idx * 100}%)`;
  document.querySelectorAll('.slider-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
}

/* ---- Trade Counter Animation ---- */
function animateTradeCounter() {
  const counter  = document.
            <div class="vc-price-sub">or est. $${Math.round(v.price/60).toLocaleString()}/mo</div>
          </div>
          <a href="inventory.html?id=${v.id}" class="btn btn-gold btn-sm">View Details</a>
        </div>
      </div>
    </div>
  `).join('');

  // Re-run scroll reveal for dynamical: 'Gasoline', trans: 'LDF', badge: 'Rare Find', emoji: '🟠' },
];

const TESTIMONIALS = [
  { name: 'Marcus T.', car: '2022 Mercedes S-Class', rating: 5, text: 'Absolutely the best car buying experience I\'ve ever had. The team at Luxury Automaxx treated me like royalty from the moment I walked in. My S-Class was detailed to perfection and delivered to my home. 10/10.' },
  { name: 'Priya S.', car: '2023 Porsche 911', rating: 5, text: 'I shopped around for months before finding Luxury Automaxx. Their pricing was transparent, no hidden fees, and my trade-in value was $4,000 more than any other dealer offered. I\'ll never buy from anyone else.' },
  { name: 'James R.', car: '2021 Bentley GT', rating: 5, text: 'The Max Trade Value program is incredible. I uplo

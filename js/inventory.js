/* ============================================================
   INVENTORY PAGE – JavaScript
   ============================================================ */

const INVENTORY = [
  { id:1,  make:'Porsche',       model:'911 Carrera S',        year:2023, price:142500, miles:8200,  color:'Guards Red',       fuel:'Gasoline', trans:'PDK',       type:'Coupe',       badge:'Certified',   emoji:'🔴' },
  { id:2,  make:'Mercedes-Benz', model:'S-Class S580',         year:2022, price:118900, miles:14300, color:'Obsidian Black',   fuel:'Gasoline', trans:'Auto',      type:'Sedan',       badge:'Hot Deal',    emoji:'🖤' },
  { id:3,  make:'BMW',           model:'M8 Competition',       year:2023, price:129000, miles:6800,  color:'Frozen Blue',      fuel:'Gasoline', trans:'M-DCT',     type:'Coupe',       badge:'New Arrival', emoji:'🔵' },
  { id:4,  make:'Bentley',       model:'Continental GT',       year:2021, price:198000, miles:22100, color:'Beluga Black',     fuel:'Gasoline', trans:'Auto',      type:'Coupe',       badge:'Certified',   emoji:'💎' },
  { id:5,  make:'Audi',          model:'RS7 Sportback',        year:2023, price:111500, miles:9400,  color:'Daytona Grey',     fuel:'Gasoline', trans:'Tiptronic', type:'Sedan',       badge:'Low Miles',   emoji:'⚡' },
  { id:6,  make:'Lamborghini',   model:'Huracán EVO',          year:2022, price:289000, miles:3200,  color:'Arancio Borealis', fuel:'Gasoline', trans:'LDF  { id:10, make:'Maserati',      model:'MC20',                 year:2023, price:218000, miles:4300,  color:'Bianco Audace',    fuel:'Gasoline', trans:'DCT',       type:'Supercar',    badge:'New Arrival', emoji:'⭐' },
  { id:11, make:'Porsche',       model:'Cayenne Turbo GT',     year:2023, price:175000, miles:7100,  color:'Jet Black',        fuel:'Gasoline', trans:'PDK',       type:'SUV',         badge:'Certified',   emoji:'🏁' },
  { id:12, make:'Mercedes-Benz', model:'AMG GT 63 S',          year:2022, price:159000, miles:13600, color:'Selenite Grey',    fuel:'Gasoline', trans:'AMG-Spd',   type:'Sedan',       badge:'Hot Deal',    emoji:'🌑' },
  { id:13, make:'BMW',           model:'XM',                   year:2023, price:164000, miles:8900,  color:'Frozen Dark Red',  fuel:'Hybrid',   trans:'Auto',      type:'SUV',         badge:'New Arrival', emoji:'🔶' },
  { id:14, make:'Audi',          model:'R8 V10 Spyder',        year:2022, price:195000, miles:9200,  color:'Nardo Grey',       fuel:'Gasoline', trans:'S-tronic',  type:'Convertible', badge:'Rare Find',   emoji:'🌀' },
  { id:15, make:'Bentley',       model:'Bentayga Speed',       year:2023, price:245000, miles:5800,  color:'Verdant',          fuel:'Gasoline', trans:'Auto',      type:'SUV',         badge:'Certified',   emoji:'🟢' },
  { id:16, make:'Ferrari',       model:'SF90 Stradale',        year:2022, price:565000, miles:2100,  color:'Giallo Modena',    fuel:'Hybrid',   trans:'DCT',       type:'Supercar',    badge:'Ultra Rare',  emoji:'💛' },
  { id:17, make:'Lamborghini',   model:'Urus Performante',     year:2023, price:278000, miles:6400,  color:'Blu Eleos',        fuel:'Gasoline', trans:'Auto',      type:'SUV',         badge:'Hot Deal',    emoji:'🔷' },
  { id:18, make:'Rolls-Royce',   model:'Cullinan Black Badge', year:2022, price:479000, miles:9800,  color:'Black Diamond',    fuel:'Gasoline', trans:'Auto',      type:'SUV',         badge:'Ultra Lux',   emoji:'🏆' },
];

const PER_PAGE = 9;
let currentPage = 1;
let filteredData = [...INVENTORY];

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('totalCount').textContent = INVENTORY.length;
  applyFilters();
  initFilters();
  initModal();
  initViewToggle();
});

function initFilters() {
  ['searchInput','makeFilter','typeFilter','yearFilter','priceFilter','sortFilter'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => { currentPage = 1; applyFilters(); });
  });
}

function applyFilters() {
  const search = document.getElementById('searchInput')?.value.toLowerCase().trim() || '';
  const make   = document.getElementById('makeFilter')?.value || '';
  const type   = document.getElementById('typeFilter')?.value || '';
  const year   = document.getElementById('yearFilter')?.value || '';
  const price  = document.getElementById('priceFilter')?.value || '';
  const sort   = document.getElementById('sortFilter')?.value || 'featured';
  filteredData = INVENTORY.filter(v => {
    if (search && !`${v.make} ${v.model} ${v.year}`.toLowerCase().includes(search)) return false;
    if (make && v.make !== make) return false;
    if (type && v.type !== type) return false;
    if (year && v.year !== +year) return false;
    if (price) { const [min,max] = price.split('-').map(Number); if (v.price < min || v.price > max) return false; }
    return true;
  });
  filteredData.sort((a,b) => {
    if (sort==='price-asc')  return a.price-b.price;
function renderGrid() {
  const grid = document.getElementById('inventoryGrid');
  if (!grid) return;
  const start = (currentPage-1)*PER_PAGE;
  const page = filteredData.slice(start, start+PER_PAGE);
  if (!page.length) {
    grid.innerHTML = '<div class="no-results"><h3>No vehicles match your search</h3><p>Try adjusting your filters or <a href="inventory.html">view all inventory</a>.</p></div>';
    return;
  }
  grid.innerHTML = page.map((v,i) => `
    <div class="inv-card reveal" style="animation-delay:${i*0.06}s" data-id="${v.id}">
      <div class="inv-card-image">
        <span class="car-emoji">${v.emoji}</span>
        <div class="inv-card-badges">
          <span class="badge badge-gold">${v.badge}</span>
          ${v.fuel==='Hybrid'?'<span class="badge badge-success">Hybrid</span>':''}
        </div>
        <button class="inv-fav-btn" data-id="${v.id}">♡</button>
      </div>
      <div class="inv-card-body">
        <div class="inv-make">${v.make}</div>
        <div class="inv-name">${v.year} ${v.model}</div>
        <div class="inv-specs">
          <span class="inv-spec">🛣️ ${v.miles.toLocaleString()} mi</span>
          <span class="inv-spec">⛽ ${v.fuel}</span>
          <span class="inv-spec">⚙️ ${v.trans}</span>
          <span class="inv-spec">🎨 ${v.color}</span>
        </div>
        <div class="inv-footer">
          <div>
            <div class="inv-price">$${v.price.toLocaleString()}</div>
            <div class="inv-monthly">~$${Math.round(v.price/60).toLocaleString()}/mo</div>
          </div>
          <button class="btn btn-gold btn-sm view-details-btn" data-id="${v.id}">View</button>
        </div>
      </div>
    </div>
  `).join('');
  const favs = JSON.parse(localStorage.getItem('la_favorites')||'[]');
  favs.forEach(id => {
    const btn = grid.querySelector(`.inv-fav-btn[data-id="${id}"]`);
    if (btn) { btn.classList.add('active'); btn.textContent = '♥'; }
  });
  grid.querySelectorAll('.inv-fav-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      btn.classList.toggle('active');
      btn.textContent = btn.classList.contains('active') ? '♥' : '♡';
      let favs = JSON.parse(localStorage.getItem('la_favorites')||'[]');
      const id = btn.dataset.id;
      if (btn.classList.contains('active')) { if (!favs.includes(id)) favs.push(id); }
      else { favs = favs.filter(f => f!==id); }
      localStorage.setItem('la_favorites', JSON.stringify(favs));
    });
function renderPagination() {
  const totalPages = Math.ceil(filteredData.length/PER_PAGE);
  const pag = document.getElementById('pagination');
  if (!pag) return;
  if (totalPages<=1) { pag.innerHTML=''; return; }
  let html = `<button class="page-btn" ${currentPage===1?'disabled':''} id="prevBtn">‹</button>`;
  for (let i=1;i<=totalPages;i++) html+=`<button class="page-btn${i===currentPage?' active':''}" data-p="${i}">${i}</button>`;
  html+=`<button class="page-btn" ${currentPage===totalPages?'disabled':''} id="nextBtn">›</button>`;
  pag.innerHTML = html;
  pag.querySelectorAll('[data-p]').forEach(btn=>{
    btn.addEventListener('click',()=>{currentPage=+btn.dataset.p;applyFilters();window.scrollTo({top:0,behavior:'smooth'});});
  });
  pag.querySelector('#prevBtn')?.addEventListener('click',()=>{if(currentPage>1){currentPage--;applyFilters();}});
  pag.querySelector('#nextBtn')?.addEventListener('click',()=>{if(currentPage<totalPages){currentPage++;applyFilters();}});
}
function initViewToggle() {
  const grid=document.getElementById('inventoryGrid');
  const gridBtn=document.getElementById('gridViewBtn');
  const listBtn=document.getElementById('listViewBtn');
  if(!grid||!gridBtn||!listBtn) return;
  gridBtn.addEventListener('click',()=>{grid.classList.remove('list-view');gridBtn.classList.add('active');listBtn.classList.remove('active');});
  listBtn.addEventListener('click',()=>{grid.classList.add('list-view');listBtn.classList.add('active');gridBtn.classList.remove('active');});
}
function initModal() {
  const overlay=document.getElementById('vehicleModal');
  const closeBtn=document.getElementById('modalCloseBtn');
  if(!overlay||!closeBtn) return;
  closeBtn.addEventListener('click',()=>overlay.classList.remove('open'));
  overlay.addEventListener('click',e=>{if(e.target===overlay)overlay.classList.remove('open');});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')overlay.classList.remove('open');});
}
function openModal(id) {
  const v=INVENTORY.find(x=>x.id===id);
  if(!v) return;
  const body=document.getElementById('modalBody');
  const overlay=document.getElementById('vehicleModal');
  if(!body||!overlay) return;
  body.innerHTML=`
    <div class="modal-gallery">${v.emoji}</div>
    <div class="modal-info">
      <div class="inv-make">${v.make}</div>
      <h2>${v.year} ${v.model}</h2>
      <div class="modal-price">$${v.price.toLocaleString()}</div>
      <div class="modal-spec-grid">
        <div class="modal-spec-item"><div class="label">Mileage</div><div class="val">${v.miles.toLocaleString()} mi</div></div>
        <div class="modal-spec-item"><div class="label">Fuel</div><div class="val">${v.fuel}</div></div>
        <div class="modal-spec-item"><div class="label">Transmission</div><div class="val">${v.trans}</div></div>
        <div class="modal-spec-item"><div class="label">Exterior</div><div class="val">${v.color}</div></div>
        <div class="modal-spec-item"><div class="label">Body Type</div><div class="val">${v.type}</div></div>
        <div class="modal-spec-item"><div class="label">Est. Monthly</div><div class="val">$${Math.round(v.price/60).toLocaleString()}/mo</div></div>
      </div>
      <div class="modal-actions">
        <a href="customer-portal.html" class="btn btn-gold">Apply for Financing</a>
        <a href="trade.html" class="btn btn-outline">Trade In</a>
      </div>
    </div>
  `;
  overlay.classList.add('open');
}
  });
  grid.querySelectorAll('.inv-card, .view-details-btn').forEach(el => {
    el.addEventListener('click', e => {
      if (e.target.classList.contains('inv-fav-btn')) return;
      const id = +el.closest('[data-id]').dataset.id;
      openModal(id);
    });
  });
}
    if (sort==='price-desc') return b.price-a.price;
    if (sort==='year-desc')  return b.year-a.year;
    if (sort==='miles-asc')  return a.miles-b.miles;
    return 0;
  });
  document.getElementById('resultsBadge').textContent = `${filteredData.length} result${filteredData.length!==1?'s':''}`;
  renderGrid();
  renderPagination();
}',       type:'Supercar',    badge:'Rare Find',   emoji:'🟠' },
  { id:7,  make:'Ferrari',       model:'Roma',                 year:2022, price:265000, miles:5100,  color:'Rosso Portofino',  fuel:'Gasoline', trans:'DCT',       type:'Coupe',       badge:'Certified',   emoji:'🟥' },
  { id:8,  make:'McLaren',       model:'720S',                 year:2021, price:248000, miles:7800,  color:'Papaya Spark',     fuel:'Gasoline', trans:'SSG',       type:'Supercar',    badge:'Certified',   emoji:'🟡' },
  { id:9,  make:'Rolls-Royce',   model:'Ghost',                year:2022, price:389000, miles:11200, color:'Boat Tail Blue',   fuel:'Gasoline', trans:'Auto',      type:'Sedan',       badge:'Ultra Lux',   emoji:'👑' },

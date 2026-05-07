/* ============================================================
   CLIENT (STAFF) PORTAL – JavaScript
   ============================================================ */

const STAFF_INVENTORY = [
  { id:1,  vehicle:'2023 Porsche 911 Carrera S',        year:2023, miles:8200,  price:142500, cost:118000, days:12, status:'available' },
  { id:2,  vehicle:'2022 Mercedes-Benz S580',           year:2022, miles:14300, price:118900, cost:96000,  days:28, status:'pending'   },
  { id:3,  vehicle:'2023 BMW M8 Competition',           year:2023, miles:6800,  price:129000, cost:105000, days:8,  status:'available' },
  { id:4,  vehicle:'2021 Bentley Continental GT',       year:2021, miles:22100, price:198000, cost:162000, days:41, status:'sold'      },
  { id:5,  vehicle:'2023 Audi RS7 Sportback',           year:2023, miles:9400,  price:111500, cost:91000,  days:6,  status:'available' },
  { id:6,  vehicle:'2022 Lamborghini Huracan EVO',      year:2022, miles:3200,  price:289000, cost:241000, days:19, status:'available' },
  { id:7,  vehicle:'2022 Ferrari Roma',                 year:2022, miles:5100,  price:265000, cost:221000, days:23, status:'sold'      },
  { id:8,  vehicle:'2021 McLaren 720S',                 year:2021, miles:7800,  price:248000, cost:204000, days:34, status:'available' },
  { id:9,  vehicle:'2022 Rolls-Royce Ghost',            
const ACTIVITY_FEED_DATA = [
  { type:'sale',    text:'<strong>Bentley Continental GT</strong> sold to Priya Sharma — $198,000', time:'12 min ago' },
  { type:'inquiry', text:'<strong>New lead:</strong> Elena Voss inquired about 2022 Lamborghini Huracan', time:'28 min ago' },
  { type:'trade',   text:'<strong>Trade-in offer accepted:</strong> 2020 BMW M5 — $78,500', time:'1 hr ago' },
  { type:'appt',   text:'<strong>Appointment confirmed:</strong> Alex Johnson – Test Drive, May 6 @ 2PM', time:'2 hrs ago' },
  { type:'inquiry', text:'<strong>Financing pre-approval submitted:</strong> Marcus Tillman — $250K', time:'3 hrs ago' },
  { type:'sale',    text:'<strong>Ferrari Roma</strong> delivered to James Whitfield', time:'4 hrs ago' },
  { type:'trade',   text:'<strong>New trade-in quote requested:</strong> 2021 Audi Q8', time:'5 hrs ago' },
];

const REVENUE_DATA = [
  { month:'Dec', amount:1320000 },
  { month:'Jan', amount:1420000 },
  { month:'Feb', amount:1580000 },
  { month:'Mar', amount:2210000 },
  { month:'Apr', amount:1970000 },
  { month:'May', amount:1840000 },
];

const MESSAGE_TEMPLATES = {
  followup:      'Hi [Name], just wanted to follow up on the [Vehicle]. We have special financing rates this week!',
  drivereminder: 'Hi [Name], reminder your test drive for the [Vehicle] is coming up. Call (708) 555-0100 to reschedule.',
  offer:         'Hi [Name], special offer on the [Vehicle] — $2,000 off sticker this week only. Interested?',
};

document.addEventListener('DOMContentLoaded', () => {
  const saved = sessionStorage.getItem('la_staff');
  if (saved) { const staff = JSON.parse(saved); showClientDashboard(staff); }
});

function staffSignIn() {
  const email   = document.getElementById('staffEmail')?.value.trim();
  const roleEl  = document.getElementById('staffRole');
  const roleName = roleEl ? roleEl.options[roleEl.selectedIndex].text : 'Sales Advisor';
  const roleVal  = roleEl?.value || 'sales';
  const firstPart = email ? email.split('@')[0] : 'Marcus';
  const name = capitalize(firstPart);
  const staff = {
    name:    name,
    initials: name.substring(0,2).toUpperCase(),
    role:    roleName,
    roleVal: roleVal,
    email:   email || 'staff@luxuryautomaxx.com'
  };
  sessionStorage.setItem('la_staff', JSON.stringify(staff));
  showClientDashboard(staff);
  showToast(`Welcome, ${name}! Dashboard loaded.`, 'success');
}

function showClientDashboard(staff) {
  const authSection = document.getElementById('clientAuthSection');
  const dashboard   = document.getElementById('clientDashboard');
  if (authSection) authSection.style.display = 'none';
  if (dashboard)   dashboard.classList.add('visible');
  setEl('staffName',      staff.name);
  setEl('staffFullName',  staff.name);
  setEl('staffAvatar',    staff.initials || staff.name[0]);
  setEl('staffRoleLabel', staff.role);
  renderActivityFeed();
  renderRevenueChart('revenueChart');
  renderRevenueChart('analyticsChart');
  renderInventoryTable(STAFF_INVENTORY);
  renderLeads('hotLeads', LEADS_DATA.slice(0,3));
  renderLeads('allLeads', LEADS_DATA);
}

function staffSignOut() {
  sessionStorage.removeItem('la_staff');
  document.getElementById('clientDashboard').classList.remove('visible');
  document.getElementById('clientAuthSection').style.display = '';
  showToast('Signed out. Stay productive! 👋', 'info');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function renderActivityFeed() {
  const feed = document.getElementById('activityFeed');
  if (!feed) return;
  feed.innerHTML = ACTIVITY_FEED_DATA.map(a => `
    <div class="activity-item">
      <div class="act-dot ${a.type}"></div>
      <div class="act-text">${a.text}</div>
      <div class="act-time">${a.time}</div>
    </div>
  `).join('');
}

function renderRevenueChart(containerId) {
  const chart = document.getElementById(containerId);
  if (!chart) return;
  const max = Math.max(...REVENUE_DATA.map(d => d.amount));
  chart.innerHTML = REVENUE_DATA.map(d => `
    <div class="chart-bar-wrap">
      <div class="chart-val" style="font-size:0.6rem;color:var(--gold);margin-bottom:4px;">$${(d.amount/1000000).toFixed(1)}M</div>
      <div class="chart-bar" style="height:${Math.round((d.amount/max)*80)}%;min-height:6px;"></div>
      <div class="chart-label">${d.month}</div>
    </div>
  `).join('');
}

let allInventory = [...STAFF_INVENTORY];

function renderInventoryTable(data) {
  const tbody = document.getElementById('inventoryTableBody');
  if (!tbody) return;
  tbody.innerHTML = data.map(v => {
    const margin = v.price - v.cost;
    const marginPct = Math.round((margin/v.price)*100);
    const daysColor = v.days>30 ? 'color:var(--danger)' : v.days>20 ? 'color:var(--gold)' : 'color:var(--success)';
    return `<tr>
      <td>${v.vehicle}</td>
      <td>${v.year}</td>
      <td>${v.miles.toLocaleString()} mi</td>
      <td style="color:var(--gold);font-weight:700;">$${v.price.toLocaleString()}</td>
      <td>$${v.cost.toLocaleString()}</td>
      <td><span style="color:var(--success);">$${margin.toLocaleString()}</span> <span style="font-size:.72rem;">(${marginPct}%)</span></td>
      <td style="${daysColor};font-weight:700;">${v.days}d</td>
      <td><span class="status-pill status-${v.status}">${capitalize(v.status)}</span></td>
      <td>
        <div style="display:flex;gap:6px;">
          <button class="btn btn-dark btn-sm" onclick="showToast('Editing.','info')">Edit</button>
          <button class="btn btn-outline btn-sm" onclick="showToast('Listing promoted!','success')">Promote</button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

function filterClientInventory(query) {
  const filtered = allInventory.filter(v =>
    v.vehicle.toLowerCase().includes(query.toLowerCase()) ||
    v.status.toLowerCase().includes(query.toLowerCase())
  );
  renderInventoryTable(filtered);
}

function renderLeads(containerId, leads) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = leads.map(l => `
    <div class="lead-item">
      <div class="lead-avatar">${l.name[0]}</div>
      <div>
        <div class="lead-name">${l.name}</div>
        <div class="lead-vehicle">${l.vehicle} · ${l.advisor}</div>
      </div>
      <div class="lead-meta">
        <div class="lead-score ${l.score}">${l.rating}</div>
        <div class="lead-score-label">${l.time}</div>
      </div>
      <div style="display:flex;gap:6px;margin-left:12px;">
        <button class="btn btn-gold btn-sm" onclick="showToast('Calling ${l.name}...','info')">Call</button>
        <button class="btn btn-dark btn-sm" onclick="showToast('Message sent!','success')">Text</button>
      </div>
    </div>
  `).join('');
}

function applyTemplate(select) {
  const key = select.value;
  const el  = document.getElementById('msgTemplate');
  if (!el || !key) return;
  el.value = MESSAGE_TEMPLATES[key] || '';
}

function setEl(id, val) { const el=document.getElementById(id); if(el) el.textContent=val; }
function capitalize(str) { return str ? str.charAt(0).toUpperCase()+str.slice(1) : ''; }
function showToast(msg, type='info', dur=3500) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  const icon = type==='success'?'✓':type==='error'?'✕':'ℹ';
  t.innerHTML = `<span>${icon}</span><span>${msg}</span>`;
  document.body.appendChild(t);
  setTimeout(()=>{t.style.opacity='0';setTimeout(()=>t.remove(),400);},dur);
}

function switchClientTab(name, btn) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.dash-tab').forEach(b => b.classList.remove('active'));
  const panel = document.getElementById(`ctab-${name}`);
  if (panel) panel.classList.add('active');
  if (btn)   btn.classList.add('active');
  if (name === 'analytics') setTimeout(() => renderRevenueChart('analyticsChart'), 50);
}year:2022, miles:11200, price:389000, cost:318000, days:17, status:'pending'   },
  { id:10, vehicle:'2023 Maserati MC20',                year:2023, miles:4300,  price:218000, cost:177000, days:4,  status:'available' },
];

const LEADS_DATA = [
  { name:'Alex Johnson',    vehicle:'2023 Porsche 911 Carrera S',  score:'hot',  rating:'🔥 98', time:'2 min ago',  advisor:'Marcus R.' },
  { name:'James Whitfield', vehicle:'2021 McLaren 720S',           score:'hot',  rating:'🔥 94', time:'18 min ago', advisor:'Marcus R.' },
  { name:'Priya Sharma',    vehicle:'2021 Bentley Continental GT', score:'warm', rating:'⚡ 78',    time:'1 hr ago',   advisor:'David K.'  },
  { name:'Robert Chen',     vehicle:'2023 BMW M8 Competition',     score:'warm', rating:'⚡ 71',    time:'2 hrs ago',  advisor:'Sarah L.'  },
  { name:'Aisha Monroe',    vehicle:'2022 Rolls-Royce Ghost',      score:'hot',  rating:'🔥 91', time:'3 hrs ago',  advisor:'David K.'  },
  { name:'Elena Voss',      vehicle:'2022 Lamborghini Huracan',    score:'hot',  rating:'🔥 96', time:'4 hrs ago',  advisor:'Marcus R.' },
  { name:'Marcus Tillman',  vehicle:'2022 Ferrari Roma',           score:'warm', rating:'⚡ 65',    time:'6 hrs ago',  advisor:'Sarah L.'  },
  { name:'Sophie Kim',      vehicle:'2023 Maserati MC20',          score:'cool', rating:'❄️ 42',  time:'Yesterday',  advisor:'Sarah L.'  },
];

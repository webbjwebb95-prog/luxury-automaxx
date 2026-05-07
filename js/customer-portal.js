/* ============================================================
   CUSTOMER PORTAL – JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const saved = sessionStorage.getItem('la_customer');
  if (saved) { const user = JSON.parse(saved); showDashboard(user); }
  calcFinancing();
});

function signIn() {
  const email    = document.getElementById('loginEmail')?.value.trim();
  const password = document.getElementById('loginPassword')?.value;
  const name = email ? email.split('@')[0] : 'Alex';
  const user = {
    firstName: capitalize(name),
    lastName:  'Johnson',
    email:     email || 'alex@example.com',
    initials:  (capitalize(name)[0] + 'J').toUpperCase()
  };
  sessionStorage.setItem('la_customer', JSON.stringify(user));
  showDashboard(user);
  showToast('Welcome back! You\'re signed in.', 'success');
}

function createAccount() {
  const first = document.getElementById('regFirst')?.value.trim();
  const last  = document.getElementById('regLast')?.value.trim();
  const email = document.getElementById('regEmail')?.value.trim();
  if (!first || !last || !email) { showToast('Please fill in all required fields.', 'error'); return; }
  if (!validateEmail(email)) { showToast('Please enter a valid email address.', 'error'); return; }
  const user = {
    firstName: first,
    lastName:  last,
    email:     email,
    initials:  (first[0] + last[0]).toUpperCase()
  };
  sessionStorage.setItem('la_customer', JSON.stringify(user));
  showDashboard(user);
  showToast(`Welcome, ${first}! Your account has been created.`, 'success');
}

function showDashboard(user) {
  document.getElementById('authSection').style.display = 'none';
  const dash = document.getElementById('customerDashboard');
  dash.classList.add('visible');
  const nameEl   = document.getElementById('dashUserName');
  const fullEl   = document.getElementById('dashFullName');
  const avatarEl = document.getElementById('dashAvatar');
  if (nameEl)   nameEl.textContent   = user.firstName;
  if (fullEl)   fullEl.textContent   = `${user.firstName} ${user.lastName}`;
  if (avatarEl) avatarEl.textContent = user.initials || user.firstName[0];
}

function signOut() {
  sessionStorage.removeItem('la_customer');
  document.getElementById('customerDashboard').classList.remove('visible');
  document.getElementById('authSection').style.display = '';
  showToast('You\'ve been signed out.', 'info');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchTab(name, btn) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.dash-tab').forEach(b => b.classList.remove('active'));
  const panel = document.getElementById(`tab-${name}`);
  if (panel) panel.classList.add('active');
  if (btn)   btn.classList.add('active');
}

function calcFinancing() {
  const vehiclePrice = 142500;
  const down     = parseFloat(document.getElementById('downPayment')?.value) || 20000;
  const termEl   = document.getElementById('loanTerm');
  const term     = termEl ? parseInt(termEl.value) : 60;
  const rate     = 0.069 / 12;
  const principal = Math.max(0, vehiclePrice - down);
  const monthly  = principal > 0
    ? (principal * rate * Math.pow(1+rate,term)) / (Math.pow(1+rate,term) - 1)
    : 0;
  const downEl    = document.getElementById('finDown');
  const amountEl  = document.getElementById('finAmount');
  const termLabel = document.getElementById('finTerm');
  const monthlyEl = document.getElementById('finMonthly');
  if (downEl)    downEl.textContent   = '$' + down.toLocaleString();
  if (amountEl)  amountEl.textContent = '$' + principal.toLocaleString();
  if (termLabel) termLabel.textContent = `${term} months`;
  if (monthlyEl) monthlyEl.textContent = '$' + Math.round(monthly).toLocaleString();
}

function submitFinancing() {
  showToast('Application submitted! You\'ll hear back within 24 hours.', 'success', 5000);
}

function selectTime(el) {
  document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
}

function bookAppointment() {
  const selected = document.querySelector('.time-slot.selected');
  if (!selected) { showToast('Please select a time slot.', 'error'); return; }
  showToast('Appointment booked! Check your email for confirmation.', 'success', 5000);
}

function capitalize(str) { return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''; }
function validateEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }
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

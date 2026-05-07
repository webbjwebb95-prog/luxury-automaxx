/* ============================================================
   MAX TRADE VALUE – JavaScript
   ============================================================ */

let currentStep = 1;
let selectedCondition = '';

function nextStep(from) {
  if (!validateStep(from)) return;
  goToStep(from + 1);
}

function prevStep(from) {
  goToStep(from - 1);
}

function goToStep(n) {
  document.querySelectorAll('.trade-step').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(`step${n}`);
  if (target) { target.classList.add('active'); currentStep = n; }
  document.querySelectorAll('.step-item').forEach(item => {
    const s = +item.dataset.step;
    item.classList.remove('active', 'complete');
    if (s < n)  item.classList.add('complete');
    if (s === n) item.classList.add('active');
  });
  window.scrollTo({ top: document.querySelector('.trade-form-panel').offsetTop - 100, behavior: 'smooth' });
}

function validateStep(step) {
  if (step === 1) {
    const year  = document.getElementById('tv-year')?.value;
    const make  = document.getElementById('tv-make')?.value;
    const model = document.getElementById('tv-model')?.value.trim();
    const miles = document.getElementById('tv-miles')?.value;
    if (!year || !make || !model || !miles) { showToast('Please fill in all required fields.', 'error'); return false; }
  }
  if (step === 2 && !selectedCondition) { showToast('Please select your vehicle condition.', 'error'); return false; }
  if (step === 4) {
    const fname = document.getElementById('tv-fname')?.value.trim();
    const email = document.getElementById('tv-email')?.value.trim();
    const phone = document.getElementById('tv-phone')?.value.trim();
    if (!fname || !email || !phone) { showToast('Please fill in your contact information.', 'error'); return false; }
    if (!validateEmail(email)) { showToast('Please enter a valid email address.', 'error'); return false; }
  }
  return true;
}

function selectCondition(el, condition) {
  document.querySelectorAll('.condition-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  selectedCondition = condition;
}

function submitTrade() {
  if (!validateStep(4)) return;
  const year  = +document.getElementById('tv-year').value;
  const miles = +document.getElementById('tv-miles').value;
  const condMultipliers = { Excellent: 1.0, Good: 0.92, Fair: 0.82, Poor: 0.68 };
  const multiplier = condMultipliers[selectedCondition] || 0.90;
  const age = 2026 - year;
  const baseValue = Math.max(5000, 45000 - (age * 2800) - (miles * 0.08));
  const featureBonus = document.querySelectorAll('.feature-check input:checked').length * 420;
  const ownerPenalty = (document.getElementById('tv-owners').value||'').includes('1') ? 0 :
                       (document.getElementById('tv-owners').value||'').includes('2') ? 800 : 1800;
  const accidentPenalty = { no:0, minor:1200, major:3500, unknown:600 }[document.getElementById('tv-accidents').value] || 0;
  const offerAmount = Math.round((baseValue * multiplier + featureBonus - ownerPenalty - accidentPenalty) / 100) * 100;
  const low  = Math.round(offerAmount * 0.95 / 100) * 100;
  const high = Math.round(offerAmount * 1.05 / 100) * 100;
  document.querySelectorAll('.trade-step').forEach(s => s.classList.remove('active'));
  const result = document.getElementById('resultPanel');
  result.classList.add('visible');
  document.querySelectorAll('.step-item').forEach(item => {
    item.classList.remove('active');
    item.classList.add('complete');
    item.querySelector('.step-circle').textContent = '✓';
  });
  const amountEl = document.getElementById('resultAmount');
  let cur = 0;
  const step = offerAmount / 60;
  const t = setInterval(() => {
    cur = Math.min(cur + step, offerAmount);
    amountEl.textContent = '$' + Math.floor(cur).toLocaleString();
    if (cur >= offerAmount) clearInterval(t);
  }, 18);
  document.getElementById('resultLow').textContent  = '$' + low.toLocaleString();
  document.getElementById('resultHigh').textContent = '$' + high.toLocaleString();
  window.scrollTo({ top: document.querySelector('.trade-form-panel').offsetTop - 100, behavior: 'smooth' });
  showToast('🎉 Your Max Trade Value offer is ready!', 'success', 5000);
}

function resetTrade() {
  document.querySelectorAll('.trade-step').forEach(s => s.classList.remove('active'));
  document.getElementById('resultPanel').classList.remove('visible');
  document.getElementById('step1').classList.add('active');
  document.querySelectorAll('.step-item').forEach((item, i) => {
    item.classList.remove('active', 'complete');
    item.querySelector('.step-circle').textContent = i + 1;
  });
  document.querySelector('.step-item').classList.add('active');
  selectedCondition = '';
  currentStep = 1;
}

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
function validateEmail(e){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);}

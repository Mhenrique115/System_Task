// ============================================================
//  utils.js — Shared formatting & UI helpers
// ============================================================

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function formatDateShort(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('pt-BR');
}

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
}

function formatDuration(minutes) {
  if (!minutes && minutes !== 0) return '—';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

function toast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const colors = {
    success: 'bg-emerald-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-amber-500',
  };

  const el = document.createElement('div');
  el.className = `${colors[type] || colors.success} text-white px-5 py-3 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2 translate-x-full transition-transform duration-300`;

  const icons = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' };
  el.innerHTML = `<span class="text-base">${icons[type]}</span> ${message}`;
  container.appendChild(el);

  requestAnimationFrame(() => el.classList.remove('translate-x-full'));

  setTimeout(() => {
    el.classList.add('translate-x-full');
    setTimeout(() => el.remove(), 300);
  }, 3500);
}

function showModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function hideModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function setLoading(btn, loading) {
  if (!btn) return;
  if (loading) {
    btn.dataset.originalText = btn.textContent;
    btn.textContent = 'Aguarde...';
    btn.disabled = true;
  } else {
    btn.textContent = btn.dataset.originalText || 'Salvar';
    btn.disabled = false;
  }
}

function statusBadge(status) {
  if (status === 'aberto' || status === 'Aberto') {
    return `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200">
      <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Aberto
    </span>`;
  }
  return `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Finalizado
  </span>`;
}

window.formatDate = formatDate;
window.formatDateShort = formatDateShort;
window.formatCurrency = formatCurrency;
window.formatDuration = formatDuration;
window.toast = toast;
window.showModal = showModal;
window.hideModal = hideModal;
window.setLoading = setLoading;
window.statusBadge = statusBadge;

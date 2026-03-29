// ============================================================
//  auth.js — Session helpers
// ============================================================

function getBasePath() {
  const path = window.location.pathname;
  const lastSlash = path.lastIndexOf('/');
  return path.substring(0, lastSlash + 1);
}

function getCurrentPage() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

function getUser() {
  try {
    return JSON.parse(localStorage.getItem('hd_user'));
  } catch {
    return null;
  }
}

function isLoggedIn() {
  return !!localStorage.getItem('hd_token') && !!getUser();
}

// Protege páginas autenticadas — redireciona para login se não logado
function requireAuth() {
  if (!isLoggedIn()) {
    window.location.replace(getBasePath() + 'login.html');
  }
}

// Protege página de login — redireciona para dashboard se já logado
function requireGuest() {
  if (isLoggedIn()) {
    window.location.replace(getBasePath() + 'index.html');
  }
}

function logout() {
  localStorage.removeItem('hd_token');
  localStorage.removeItem('hd_user');
  window.location.replace(getBasePath() + 'login.html');
}

function isAdmin() {
  const user = getUser();
  return user && user.role === 'admin';
}

function initHeader() {
  const user = getUser();
  if (!user) return;
  const el = document.getElementById('header-user');
  if (el) el.textContent = `Olá, ${user.username}`;
  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) logoutBtn.addEventListener('click', logout);
}

window.getBasePath = getBasePath;
window.getCurrentPage = getCurrentPage;
window.getUser = getUser;
window.isLoggedIn = isLoggedIn;
window.requireAuth = requireAuth;
window.requireGuest = requireGuest;
window.logout = logout;
window.isAdmin = isAdmin;
window.initHeader = initHeader;

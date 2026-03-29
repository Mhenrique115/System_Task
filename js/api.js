// ============================================================
//  api.js — Thin API client with JWT auth
// ============================================================

const BASE_URL = 'https://api-chamados-886w.onrender.com/api';

function getToken() {
  return localStorage.getItem('hd_token');
}

async function request(method, path, body = null) {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${BASE_URL}${path}`, opts);

  if (res.status === 401) {
    localStorage.removeItem('hd_token');
    localStorage.removeItem('hd_user');
    window.location.replace(getBasePath() + 'login.html');
    return;
  }

  if (res.status === 204) return null;

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro na requisição');
  return data;
}

const api = {
  // Auth
  login: (username, password) => request('POST', '/auth/login', { username, password }),

  // Users
  getUsers: () => request('GET', '/users'),
  createUser: (data) => request('POST', '/users', data),
  updateUser: (id, data) => request('PUT', `/users/${id}`, data),
  deleteUser: (id) => request('DELETE', `/users/${id}`),

  // Chamados
  getChamados: () => request('GET', '/chamados'),
  getChamado: (id) => request('GET', `/chamados/${id}`),
  createChamado: (data) => request('POST', '/chamados', data),
  updateChamado: (id, data) => request('PUT', `/chamados/${id}`, data),
  finalizarChamado: (id) => request('PATCH', `/chamados/${id}/finalizar`),
  deleteChamado: (id) => request('DELETE', `/chamados/${id}`),
  getDashboard: () => request('GET', '/chamados/dashboard'),

  // Tarefas
  getTarefas: (chamadoId) => request('GET', `/chamados/${chamadoId}/tarefas`),
  createTarefa: (chamadoId, data) => request('POST', `/chamados/${chamadoId}/tarefas`, data),
  fecharTarefa: (id) => request('PATCH', `/chamados/tarefas/${id}/fechar`),
  deleteTarefa: (id) => request('DELETE', `/chamados/tarefas/${id}`),
};

window.api = api;
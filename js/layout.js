// ============================================================
//  layout.js — Inject shared header + sidebar
// ============================================================

function renderLayout(activePage) {
  const base = getBasePath();

  const nav = [
    { page: 'index.html',    icon: '◈', label: 'Dashboard' },
    { page: 'chamados.html', icon: '⊞', label: 'Chamados'  },
    { page: 'usuarios.html', icon: '⊙', label: 'Usuários'  },
  ];

  const navLinks = nav.map(({ page, icon, label }) => {
    const active = activePage === page;
    return `
      <a href="javascript:void(0)" onclick="window.location.href='${base}${page}'"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer
               ${active
                 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                 : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'}">
        <span class="text-base mono">${icon}</span>
        <span>${label}</span>
      </a>`;
  }).join('');

  const user = getUser();
  const adminBadge = user?.role === 'admin'
    ? `<span class="mono text-xs bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded-full">ADMIN</span>`
    : `<span class="mono text-xs bg-slate-700 text-slate-400 border border-slate-600 px-2 py-0.5 rounded-full">DEV</span>`;

  document.getElementById('app-layout').innerHTML = `
    <aside class="w-60 bg-slate-900 border-r border-slate-800 flex flex-col min-h-screen fixed left-0 top-0 bottom-0 z-20">
      <div class="p-5 border-b border-slate-800">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow shadow-indigo-500/30">
            <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <div>
            <div class="text-slate-100 font-semibold text-sm leading-none">HelpDesk</div>
            <div class="text-slate-500 text-xs mono mt-0.5">v1.0.0</div>
          </div>
        </div>
      </div>

      <nav class="flex-1 p-4 space-y-1">
        ${navLinks}
      </nav>

      <div class="p-4 border-t border-slate-800">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
            ${(user?.username || 'U')[0].toUpperCase()}
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-slate-200 text-sm font-medium truncate">${user?.username || '—'}</div>
            ${adminBadge}
          </div>
        </div>
        <button id="btn-logout"
          class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 text-sm transition-colors">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          Sair
        </button>
      </div>
    </aside>

    <div class="ml-60 flex-1 flex flex-col min-h-screen">
      <header class="h-14 bg-slate-900/80 backdrop-blur border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10">
        <div id="page-title" class="text-slate-300 text-sm font-medium"></div>
        <div class="flex items-center gap-2 text-slate-400 text-sm">
          <svg class="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
          </svg>
          <span id="header-user"></span>
        </div>
      </header>
      <main class="flex-1 p-6" id="page-content"></main>
    </div>
  `;

  document.getElementById('btn-logout').addEventListener('click', logout);
  initHeader();
}

window.renderLayout = renderLayout;
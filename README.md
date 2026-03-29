# 🎫 HelpDesk — Frontend

Interface web do sistema de gestão de chamados (Help Desk), construída com HTML + TailwindCSS + Vanilla JavaScript puro.

**Backend:** [API_Chamados](https://github.com/Mhenrique115/API_Chamados) — https://api-chamados-886w.onrender.com

---

## 🌐 Demo

**https://mhenrique115.github.io/System_Task/**

| Usuário | Senha | Cargo |
|---------|-------|-------|
| admin | admin123 | Admin |

---

## 🛠️ Tecnologias

- **HTML5**
- **TailwindCSS** (via CDN)
- **Vanilla JavaScript** (sem frameworks)
- **IBM Plex Sans / Mono** (tipografia)

---

## 📁 Estrutura

```
├── login.html            # Tela de login
├── index.html            # Dashboard
├── chamados.html         # Lista de chamados
├── chamado-detalhe.html  # Detalhe + tarefas
├── usuarios.html         # Gestão de usuários
└── js/
    ├── api.js            # Cliente HTTP com JWT
    ├── auth.js           # Controle de sessão
    ├── utils.js          # Helpers de formatação e UI
    └── layout.js         # Sidebar + header
```

---

## ✨ Funcionalidades

- **Login** com autenticação JWT
- **Dashboard** com KPIs, resumo e rankings
- **Chamados** — criar, editar, finalizar, excluir, buscar e filtrar
- **Tarefas** — timeline estilo chat, fechar tarefas com tempo calculado automaticamente
- **Usuários** — gestão completa (somente Admin)
- **Permissões** — Admin vs Dev
- **Responsivo** — funciona em mobile e desktop

---

## ⚙️ Rodar localmente

### Pré-requisitos
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (VS Code) ou qualquer servidor HTTP

### VS Code

1. Abra a pasta do projeto no VS Code
2. Clique em **Go Live** no canto inferior direito
3. Acesse `http://127.0.0.1:5501/login.html`

### Terminal

```bash
npx serve . --listen tcp://127.0.0.1:5501
```

---

## 🔧 Configuração

Para apontar para um backend diferente, edite `js/api.js`:

```js
const BASE_URL = 'https://seu-backend.onrender.com/api';
```

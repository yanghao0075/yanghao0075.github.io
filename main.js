// 前端站点链接（占位，可根据实际部署地址调整）
const FRONTEND_URL = 'https://yanghao0075.github.io/my_website/';
document.getElementById('go-frontend').href = FRONTEND_URL;

// 后端 API 地址（固定为提供的 IP 与端口）
const API_BASE = 'http://106.14.242.106:38080';

// 简易 i18n 文案
const I18N = {
  zh: {
    brand: 'Yang Hao · 项目展示',
    pageTitle: '个人项目',
    frontendBtn: '进入前端',
    frontendTitle: '进入前端（需登录）',
    repoLink: '查看仓库',
    footer: '© 2025 Yang Hao',
  },
  ja: {
    brand: 'Yang Hao · プロジェクト展示',
    pageTitle: '個人プロジェクト',
    frontendBtn: 'フロントへ',
    frontendTitle: 'フロントへ（ログイン必要）',
    repoLink: 'リポジトリを見る',
    footer: '© 2025 Yang Hao',
  },
  en: {
    brand: 'Yang Hao · Projects',
    pageTitle: 'Projects',
    frontendBtn: 'Go to Frontend',
    frontendTitle: 'Go to Frontend (Login required)',
    repoLink: 'View Repo',
    footer: '© 2025 Yang Hao',
  },
};

const projectsEl = document.getElementById('projects');
const brandEl = document.getElementById('brand');
const pageTitleEl = document.getElementById('page-title');
const footerEl = document.getElementById('footer-text');
const goFrontendEl = document.getElementById('go-frontend');
const goFrontendTextEl = document.getElementById('go-frontend-text');
const langSwitchEl = document.getElementById('lang-switch');

function applyI18n(lang) {
  const t = I18N[lang] || I18N.zh;
  brandEl.textContent = t.brand;
  pageTitleEl.textContent = t.pageTitle;
  if (goFrontendTextEl) {
    goFrontendTextEl.textContent = t.frontendBtn;
  } else {
    // 兜底：旧结构仍更新整个链接文本
    goFrontendEl.textContent = t.frontendBtn;
  }
  goFrontendEl.title = t.frontendTitle;
  footerEl.textContent = t.footer;
}

function renderProjects(list, lang) {
  const t = I18N[lang] || I18N.zh;
  projectsEl.innerHTML = '';
  list.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <a href="${item.url}" target="_blank" rel="noopener noreferrer">${t.repoLink}</a>
    `;
    projectsEl.appendChild(card);
  });
}

async function loadProjects(lang) {
  try {
    const res = await fetch(`${API_BASE}/projects`, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    renderProjects(data, lang);
  } catch (e) {
    // 兜底静态数据（名称/描述保持中文，链接统一）
    renderProjects([
      { name: '个人项目展示网站', description: '静态展示个人项目，GitHub Pages 托管', url: 'https://yanghao0075.github.io/my_website/' },
      { name: '个人项目管理系统', description: '项目管理与配置仓库', url: 'https://github.com/yanghao0075/my_website' },
      { name: '个人项目展示网站的后端API', description: 'Go 提供 REST API', url: 'https://github.com/yanghao0075/my_website_backend' },
    ], lang);
  }
}

function setActiveLangButton(lang) {
  if (!langSwitchEl) return;
  const btns = langSwitchEl.querySelectorAll('.lang-btn');
  btns.forEach((b) => b.classList.toggle('active', b.dataset.lang === lang));
}

function initLang() {
  const saved = localStorage.getItem('lang') || 'zh';
  setActiveLangButton(saved);
  applyI18n(saved);
  loadProjects(saved);
}

function onLangChange(lang) {
  localStorage.setItem('lang', lang);
  applyI18n(lang);
  loadProjects(lang);
}

if (langSwitchEl) {
  langSwitchEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-btn');
    if (!btn) return;
    const lang = btn.dataset.lang;
    setActiveLangButton(lang);
    onLangChange(lang);
  });
  langSwitchEl.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('lang-btn')) {
      e.preventDefault();
      const lang = e.target.dataset.lang;
      setActiveLangButton(lang);
      onLangChange(lang);
    }
  });
} else {
  console.warn('lang-switch element not found');
}

// 保险：等待 DOM 就绪后初始化（尽管脚本在末尾）
document.addEventListener('DOMContentLoaded', initLang);
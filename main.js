// 前端站点链接（占位，可根据实际部署地址调整）
const FRONTEND_URL = 'https://admin-dashboard-chi-ten-96.vercel.app/';
document.getElementById('go-frontend').href = FRONTEND_URL;

// 后端 API 地址（固定为提供的 IP 与端口）
const API_BASE = 'http://106.14.242.106:38080';

// 简易 i18n 文案
const I18N = {
  zh: {
    brand: 'Yang Hao · 项目展示',
    pageTitle: '个人项目',
    bio: '独立开发者，热爱分享、旅行与写作。',
    frontendBtn: '进入前端',
    frontendTitle: '进入前端（需登录）',
    repoLink: '查看',
    footer: '© 2025 Yang Hao',
  },
  ja: {
    brand: 'Yang Hao · プロジェクト展示',
    pageTitle: '個人プロジェクト',
    bio: 'インディー開発者。共有、旅行、執筆が好きです。',
    frontendBtn: 'フロントへ',
    frontendTitle: 'フロントへ（ログイン必要）',
    repoLink: '見る',
    footer: '© 2025 Yang Hao',
  },
  en: {
    brand: 'Yang Hao · Projects',
    pageTitle: 'Projects',
    bio: 'Independent developer, enjoys sharing, traveling, and writing.',
    frontendBtn: 'Go to Frontend',
    frontendTitle: 'Go to Frontend (Login required)',
    repoLink: 'View',
    footer: '© 2025 Yang Hao',
  },
};

const linksEl = document.getElementById('links');
const brandEl = document.getElementById('brand');
const pageTitleEl = document.getElementById('page-title');
const handleEl = document.getElementById('handle');
const bioEl = document.getElementById('bio');
const footerEl = document.getElementById('footer-text');
const goFrontendEl = document.getElementById('go-frontend');
const langSwitchEl = document.getElementById('lang-switch');
const themeSwitchEl = document.getElementById('theme-switch');
const themeBtnEl = themeSwitchEl ? themeSwitchEl.querySelector('#theme-btn') : null;

// 项目名称多语言映射（后端暂未提供多语言字段时的本地兜底）
function getProjectName(item, lang) {
  // 优先使用后端返回的 i18n 字段
  if (item && item.i18n && item.i18n.name && item.i18n.name[lang]) {
    return item.i18n.name[lang];
  }
  const MAP = {
    '漫画翻译服务': { zh: '漫画翻译服务', ja: '漫画翻訳サービス', en: 'Manga Translation Service' },
    '纯色背景服务': { zh: '纯色背景服务', ja: '単色背景サービス', en: 'SolidColor Backgrounds' },
    '便签应用': { zh: '便签应用', ja: 'メモアプリ', en: 'Note App' },
    'JSON 格式化工具': { zh: 'JSON 格式化工具', ja: 'JSON フォーマットツール', en: 'JSON Formatter' },
    '纯色背景应用': { zh: '纯色背景应用', ja: '単色背景アプリ', en: 'SolidColor Backgrounds Application' },
    // webos 应用
    'webOS 应用': { zh: 'webOS 应用', ja: 'webOS アプリ', en: 'webOS Applications' },
    // 打字游戏
    '打字游戏': { zh: '打字游戏', ja: 'タイピングゲーム', en: 'Typing Game' },
    // 微信公众号编辑器
    '微信公众号编辑器': { zh: '微信公众号编辑器', ja: 'ブログエディター', en: 'Blog Editor' },
    // AI擦除服务
    'AI图片擦除服务': { zh: 'AI图片擦除服务', ja: 'AI画像消去サービス', en: 'AI Image Erasure Service' },
    // 渲染deepseek渲染服务
    '渲染deepseek渲染服务': { zh: '渲染deepseek渲染服务', ja: 'ディープセキュアレンダリングサービス', en: 'Deepseek Rendering Service' },
    // 小红书封面生成
    '小红书封面生成': { zh: '小红书封面生成', ja: 'ブログエディター', en: 'Blog Editor' },
    // 编程小游戏
    '编程小游戏': { zh: '编程小游戏', ja: 'プログラミングゲーム', en: 'Programming Games' },
  };
  const m = MAP[item?.name];
  return (m && m[lang]) || item.name;
}

function applyI18n(lang) {
  const t = I18N[lang] || I18N.zh;
  brandEl.textContent = t.brand;
  if (pageTitleEl) pageTitleEl.textContent = t.pageTitle;
  if (bioEl) bioEl.textContent = t.bio;
  // 按钮仅显示图标，文字作为提示与无障碍标签
  goFrontendEl.setAttribute('aria-label', t.frontendBtn);
  goFrontendEl.title = t.frontendTitle;
  footerEl.textContent = t.footer;
  document.title = `Yang Hao · ${t.pageTitle}`;
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

function updateThemeButton(theme) {
  if (!themeBtnEl) return;
  const icon = themeBtnEl.querySelector('.icon');
  if (!icon) return;
  if (theme === 'dark') {
    icon.textContent = '🌙';
    themeBtnEl.setAttribute('aria-label', '切换到浅色');
    themeBtnEl.title = '切换到浅色';
  } else {
    icon.textContent = '🌞';
    themeBtnEl.setAttribute('aria-label', '切换到深色');
    themeBtnEl.title = '切换到深色';
  }
}

function initTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  applyTheme(saved);
  updateThemeButton(saved);
}

function onThemeToggle() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
  updateThemeButton(next);
}

function renderProjects(list, lang) {
  const t = I18N[lang] || I18N.zh;
  linksEl.innerHTML = '';
  list.forEach((item) => {
    const a = document.createElement('a');
    a.className = 'link-item';
    a.href = item.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    const displayName = getProjectName(item, lang);
    a.innerHTML = `
      <span class="left"><span class="bullet" aria-hidden="true"></span><span class="title">${displayName}</span></span>
      <span class="right">${t.repoLink}</span>
    `;
    a.title = displayName;
    a.setAttribute('aria-label', `${displayName} - ${t.repoLink}`);
    linksEl.appendChild(a);
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
      { name: '漫画翻译服务', description: 'AI 漫画翻译服务', url: 'https://manga-translator-ai.vercel.app/' },
      { name: '纯色背景服务', description: '纯色背景生成服务，GitHub Pages 托管', url: 'https://solidcolor.github.io/' },
      { name: '便签应用', description: '轻量便签应用支持页面', url: 'https://support-hu-note.vercel.app/' },
      // 新增 https://json-format-sigma.vercel.app/ 的json格式化工具
      { name: 'JSON 格式化工具', description: '在线 JSON 格式化工具', url: 'https://json-format-sigma.vercel.app/' },
      // 新增 https://solidcolorx-support.vercel.app/ 支持页面
      { name: '纯色背景应用', description: '纯色背景应用支持页面', url: 'https://solidcolorx-support.vercel.app/' },
      // webos 应用
      { name: 'webOS 应用', description: 'webOS 应用支持页面', url: 'https://react-webos.vercel.app/' },
      // 打字游戏
      { name: '打字游戏', description: '在线打字游戏', url: 'https://super-word-smash.vercel.app/' },
      // 微信公众号编辑器
      { name: '微信公众号编辑器', description: '在线微信公众号编辑器', url: 'https://wechat-markdown-editor-eight.vercel.app/' },
      // 在线AI擦除服务
      { name: 'AI图片擦除服务', description: '在线AI图片擦除服务', url: 'https://eraser-omega.vercel.app/' },
      // 渲染deepseek渲染服务
      { name: '渲染deepseek渲染服务', description: '在线渲染deepseek渲染服务', url: 'https://deepseekrender.vercel.app/' },
      // 小红书封面生成
      { name: '小红书封面生成', description: '在线小红书封面生成', url: 'https://smart-card-forge.vercel.app/' },
      // 编程小游戏
      { name: '编程小游戏', description: '在线编程小游戏', url: 'https://niubi-logic.vercel.app/' },
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

if (themeSwitchEl && themeBtnEl) {
  themeSwitchEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.theme-btn');
    if (!btn) return;
    onThemeToggle();
  });
  themeSwitchEl.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('theme-btn')) {
      e.preventDefault();
      onThemeToggle();
    }
  });
} else {
  console.warn('theme-switch element not found');
}

// 保险：等待 DOM 就绪后初始化（尽管脚本在末尾）
document.addEventListener('DOMContentLoaded', () => { initTheme(); initLang(); });
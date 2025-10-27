// 前端站点链接（占位，可根据实际部署地址调整）
const FRONTEND_URL = 'https://yanghao0075.github.io/my_website/';
document.getElementById('go-frontend').href = FRONTEND_URL;

// 后端 API 地址（固定为提供的 IP 与端口）
const API_BASE = 'http://106.14.242.106:38080';

const projectsEl = document.getElementById('projects');

function renderProjects(list) {
  projectsEl.innerHTML = '';
  list.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <a href="${item.url}" target="_blank" rel="noopener noreferrer">查看仓库</a>
    `;
    projectsEl.appendChild(card);
  });
}

async function loadProjects() {
  try {
    const res = await fetch(`${API_BASE}/projects`, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    renderProjects(data);
  } catch (e) {
    // 兜底静态数据
    renderProjects([
      { name: '个人项目展示网站', description: '静态展示个人项目，GitHub Pages 托管', url: 'https://yanghao0075.github.io/my_website/' },
      { name: '个人项目管理系统', description: '项目管理与配置仓库', url: 'https://github.com/yanghao0075/my_website' },
      { name: '个人项目展示网站的后端API', description: 'Go 提供 REST API', url: 'https://github.com/yanghao0075/my_website_backend' },
    ]);
  }
}

loadProjects();
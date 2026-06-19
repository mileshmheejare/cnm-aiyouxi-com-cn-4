function createPageHelper(config) {
  const defaults = {
    siteUrl: "https://cnm-aiyouxi.com.cn",
    keyword: "爱游戏",
    containerId: "helper-root",
    tips: [
      { type: "info", text: "欢迎来到爱游戏平台！" },
      { type: "success", text: "本页面为您提供最新游戏资讯。" },
      { type: "warning", text: "请确保网络环境稳定，享受流畅体验。" }
    ],
    badges: ["热门推荐", "免费畅玩", "每日更新", "爱游戏专属"]
  };
  const settings = Object.assign({}, defaults, config);

  function buildStyles() {
    return `
      <style>
        #${settings.containerId} {
          font-family: -apple-system, Arial, sans-serif;
          max-width: 700px;
          margin: 20px auto;
          padding: 16px;
          border-radius: 12px;
          background: #f8faff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          border: 1px solid #e3e9f2;
        }
        .helper-card {
          background: white;
          border-radius: 10px;
          padding: 14px 18px;
          margin-bottom: 12px;
          border-left: 5px solid #3b82f6;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          font-size: 15px;
          color: #1e293b;
          line-height: 1.5;
        }
        .helper-card.success { border-left-color: #10b981; }
        .helper-card.warning { border-left-color: #f59e0b; }
        .helper-keyword {
          display: inline-block;
          background: #dbeafe;
          color: #1e40af;
          font-weight: 600;
          padding: 3px 12px;
          border-radius: 20px;
          font-size: 13px;
          margin: 4px 6px 4px 0;
        }
        .helper-badge {
          display: inline-block;
          background: #f1f5f9;
          color: #334155;
          padding: 4px 14px;
          border-radius: 30px;
          font-size: 12px;
          margin: 3px 5px 3px 0;
          border: 1px solid #cbd5e1;
        }
        .helper-access {
          margin-top: 14px;
          padding: 12px;
          background: #eef2ff;
          border-radius: 8px;
          font-size: 14px;
          color: #312e81;
          text-align: center;
          word-break: break-all;
        }
        .helper-access a {
          color: #2563eb;
          text-decoration: none;
          font-weight: 500;
        }
        .helper-access a:hover { text-decoration: underline; }
      </style>
    `;
  }

  function renderCards() {
    return settings.tips.map(tip => {
      const cls = tip.type === 'success' ? 'success' : tip.type === 'warning' ? 'warning' : '';
      return `<div class="helper-card ${cls}">${escapeHtml(tip.text)}</div>`;
    }).join('');
  }

  function renderBadges() {
    return settings.badges.map(b => `<span class="helper-badge">${escapeHtml(b)}</span>`).join('');
  }

  function renderKeyword() {
    return `<span class="helper-keyword">${escapeHtml(settings.keyword)}</span>`;
  }

  function renderAccess() {
    return `<div class="helper-access">🔗 立即访问：<a href="${escapeAttr(settings.siteUrl)}" target="_blank" rel="noopener">${escapeHtml(settings.siteUrl)}</a></div>`;
  }

  function escapeHtml(str) {
    const map = {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'};
    return String(str).replace(/[&<>"']/g, c => map[c]);
  }
  function escapeAttr(str) {
    return String(str).replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }

  function mount() {
    const existing = document.getElementById(settings.containerId);
    if (existing) existing.remove();

    const wrapper = document.createElement('div');
    wrapper.id = settings.containerId;
    wrapper.innerHTML = buildStyles() + renderCards() + '<div style="margin:8px 0;">' + renderKeyword() + renderBadges() + '</div>' + renderAccess();
    document.body.appendChild(wrapper);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
}

createPageHelper();
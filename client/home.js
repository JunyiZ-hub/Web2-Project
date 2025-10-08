const API_BASE = 'http://localhost:3000/api';

async function loadEvents() {
  try {
    const res = await fetch(`${API_BASE}/events`);
    const events = await res.json();
    renderEvents(events);
  } catch (err) {
    console.error('加载活动失败:', err);
    document.getElementById('event-list').innerHTML = '<p>无法加载活动数据。</p>';
  }
}

function renderEvents(events) {
  const container = document.getElementById('event-list');
  container.innerHTML = '';

  if (events.length === 0) {
    container.innerHTML = '<p>当前没有可用的活动。</p>';
    return;
  }

  events.forEach(ev => {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
      <h3>${ev.name}</h3>
      <p>${ev.description}</p>
      <p><strong>时间：</strong>${ev.event_date}</p>
      <p><strong>地点：</strong>${ev.location}</p>
      <button onclick="viewDetail(${ev.id})">查看详情</button>
    `;
    container.appendChild(card);
  });
}

function viewDetail(id) {
  window.location.href = `index.html?id=${id}`;
}

document.addEventListener('DOMContentLoaded', loadEvents);

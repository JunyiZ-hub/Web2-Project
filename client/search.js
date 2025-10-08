const API_BASE = 'http://localhost:3000/api';

async function searchEvents() {
  const keyword = document.getElementById('search-input').value.trim();
  const container = document.getElementById('search-results');
  container.innerHTML = '<p>Searching...</p>';

  try {
    const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(keyword)}`);
    const events = await res.json();
    renderSearchResults(events);
  } catch (err) {
    console.error('Something wrong:', err);
    container.innerHTML = '<p>Failed.</p>';
  }
}

function renderSearchResults(events) {
  const container = document.getElementById('search-results');
  container.innerHTML = '';

  if (events.length === 0) {
    container.innerHTML = '<p>Not Found.</p>';
    return;
  }

  events.forEach(ev => {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
      <h3>${ev.name}</h3>
      <p>${ev.description}</p>
      <p><strong>Date：</strong>${ev.event_date}</p>
      <button onclick="viewDetail(${ev.id})">View Details.</button>
    `;
    container.appendChild(card);
  });
}

function viewDetail(id) {
  window.location.href = `index.html?id=${id}`;
}

document.getElementById('search-button').addEventListener('click', searchEvents);

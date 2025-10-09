const API_BASE = 'http://localhost:3000/api';

async function searchEvents() {
  const keyword = document.getElementById('search-input').value.trim();
  const container = document.getElementById('search-results');
  container.innerHTML = '<p>Searching...</p>';

  if (!keyword) {
    container.innerHTML = '<p>Please enter a keyword.</p>';
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/events`);
    const events = await res.json();

    const results = events.filter(ev =>
      ev.name.toLowerCase().includes(keyword.toLowerCase()) ||
      (ev.description && ev.description.toLowerCase().includes(keyword.toLowerCase()))
    );

    renderSearchResults(results);
  } catch (err) {
    console.error('Something wrong:', err);
    container.innerHTML = '<p>Search failed.</p>';
  }
}

function renderSearchResults(events) {
  const container = document.getElementById('search-results');
  container.innerHTML = '';

  if (events.length === 0) {
    container.innerHTML = '<p>No events found.</p>';
    return;
  }

  events.forEach(ev => {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
      <h3>${ev.name}</h3>
      <p>${ev.description}</p>
      <p><strong>Date:</strong> ${ev.event_date}</p>
      <button onclick="viewDetail(${ev.id})">View Details</button>
    `;
    container.appendChild(card);
  });
}

function viewDetail(id) {
  window.location.href = `index.html?id=${id}`;
}

document.getElementById('search-button').addEventListener('click', searchEvents);

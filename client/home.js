const API_BASE = 'http://localhost:3000/api';

async function loadEvents() {
  try {
    const res = await fetch(`${API_BASE}/events`);
    const events = await res.json();
    renderEvents(events);
  } catch (err) {
    console.error('Failed to load the activity:', err);
    document.getElementById('event-list').innerHTML = '<p>Unable to load activity data.</p>';
  }
}

function renderEvents(events) {
  const container = document.getElementById('event-list');
  container.innerHTML = '';

  if (events.length === 0) {
    container.innerHTML = '<p>There are currently no available activities.</p>';
    return;
  }

  events.forEach(ev => {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
      <h3>${ev.name}</h3>
      <p>${ev.description}</p>
      <p><strong>Time:</strong>${ev.event_date}</p>
      <p><strong>Location:</strong>${ev.location}</p>
      <button onclick="viewDetail(${ev.id})">View Details.</button>
    `;
    container.appendChild(card);
  });
}

function viewDetail(id) {
  window.location.href = `index.html?id=${id}`;
}

document.addEventListener('DOMContentLoaded', loadEvents);

const API_BASE = 'http://localhost:3000/api';

async function loadEventDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const container = document.getElementById('event-detail');

  if (!id) {
    container.innerHTML = '<p>Event ID not found.</p>';
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/events/${id}`);
    if (!res.ok) throw new Error('Event not found');
    const event = await res.json();
    renderEvent(event);
  } catch (err) {
    console.error('Failed to load event details:', err);
    container.innerHTML = '<p>Failed to load event details. Please try again later.</p>';
  }
}

function renderEvent(event) {
  const container = document.getElementById('event-detail');
  container.innerHTML = `
    <h2>${event.name}</h2>
    <p><strong>Description:</strong> ${event.description}</p>
    <p><strong>Date:</strong> ${event.event_date}</p>
    <p><strong>Location:</strong> ${event.location}</p>
    <p><strong>Price:</strong> $${event.price}</p>
    <p><strong>Goal:</strong> ${event.goal}</p>
    <p><strong>Progress:</strong> ${event.progress}</p>
    <button onclick="window.history.back()">Go Back</button>
  `;
}

document.addEventListener('DOMContentLoaded', loadEventDetail);

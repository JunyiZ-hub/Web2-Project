// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./event_db');

const app = express();
app.use(cors());
app.use(express.json());

// Serve front-end static files (optional, so you can open http://localhost:3000/home.html)
app.use(express.static(path.join(__dirname, '../client')));

// Root route
app.get('/', (req, res) => {
  res.send('✅ API is working. Try /api/events');
});

// Get all events
app.get('/api/events', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM events');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single event by ID
app.get('/api/events/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.query('SELECT * FROM events WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Event not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categories');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search endpoint
app.get('/api/search', async (req, res) => {
  const { date, location, category } = req.query;
  let sql = 'SELECT * FROM events WHERE 1=1';
  const params = [];

  if (date) {
    sql += ' AND event_date >= ?';
    params.push(date);
  }
  if (location) {
    sql += ' AND location LIKE ?';
    params.push(`%${location}%`);
  }
  if (category) {
    sql += ' AND category_id = ?';
    params.push(category);
  }

  try {
    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});

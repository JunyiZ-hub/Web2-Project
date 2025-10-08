const express = require('express');
const cors = require('cors');
const db = require('./event_db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/events', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM events');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categories');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/search', async (req, res) => {
  const { date, location, category } = req.query;
  let sql = 'SELECT * FROM events WHERE 1=1';
  const params = [];

  if (date) {
    sql += ' AND date >= ?';
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
  console.log('Server running on http://localhost:3000');
});

const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all locations
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT l.*, COUNT(e.id) AS employee_count
      FROM locations l
      LEFT JOIN employees e ON e.location_id = l.id
      GROUP BY l.id
      ORDER BY l.city
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single location
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM locations WHERE id=$1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Location not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create location
router.post('/', async (req, res) => {
  const { city } = req.body;
  try {
    const result = await pool.query('INSERT INTO locations (city) VALUES ($1) RETURNING *', [city]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update location
router.put('/:id', async (req, res) => {
  const { city } = req.body;
  try {
    const result = await pool.query('UPDATE locations SET city=$1 WHERE id=$2 RETURNING *', [
      city,
      req.params.id,
    ]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Location not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE location
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM locations WHERE id=$1 RETURNING *', [
      req.params.id,
    ]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Location not found' });
    res.json({ message: 'Location deleted', location: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

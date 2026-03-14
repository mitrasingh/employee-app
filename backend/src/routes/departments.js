const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all departments
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT d.*, COUNT(e.id) AS employee_count
      FROM departments d
      LEFT JOIN employees e ON e.department_id = d.id
      GROUP BY d.id
      ORDER BY d.name
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single department
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM departments WHERE id=$1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Department not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create department
router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pool.query('INSERT INTO departments (name) VALUES ($1) RETURNING *', [
      name,
    ]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update department
router.put('/:id', async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pool.query('UPDATE departments SET name=$1 WHERE id=$2 RETURNING *', [
      name,
      req.params.id,
    ]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Department not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE department
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM departments WHERE id=$1 RETURNING *', [
      req.params.id,
    ]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Department not found' });
    res.json({ message: 'Department deleted', department: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

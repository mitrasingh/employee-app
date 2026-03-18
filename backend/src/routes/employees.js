const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all employees
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        e.id, e.first_name, e.last_name, e.email,
        e.job_title, e.hire_date, e.salary,
        e.is_active, e.avatar_url, e.created_at,
        e.department_id,
        d.name AS department_name,
        e.location_id,
        l.city AS location_city
      FROM employees e
      LEFT JOIN departments d ON e.department_id = d.id
      LEFT JOIN locations l ON e.location_id = l.id
      ORDER BY e.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET employee by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT 
        e.id, e.first_name, e.last_name, e.email,
        e.job_title, e.hire_date, e.salary,
        e.is_active, e.avatar_url, e.created_at,
        e.department_id,
        d.name AS department_name,
        e.location_id,
        l.city AS location_city
      FROM employees e
      LEFT JOIN departments d ON e.department_id = d.id
      LEFT JOIN locations l ON e.location_id = l.id
      WHERE e.id = $1
    `,
      [req.params.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create employee
router.post('/', async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    department_id,
    job_title,
    hire_date,
    salary,
    location_id,
    is_active,
    avatar_url,
  } = req.body;
  try {
    const result = await pool.query(
      `
      INSERT INTO employees (first_name, last_name, email, department_id, job_title, hire_date, salary, location_id, is_active, avatar_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `,
      [
        first_name,
        last_name,
        email,
        department_id,
        job_title,
        hire_date,
        salary,
        location_id,
        is_active ?? true,
        avatar_url ?? null,
      ],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update employee
router.put('/:id', async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    department_id,
    job_title,
    hire_date,
    salary,
    location_id,
    is_active,
    avatar_url,
  } = req.body;
  try {
    const result = await pool.query(
      `
      UPDATE employees
      SET first_name = $1, last_name = $2, email = $3, department_id = $4,
          job_title = $5, hire_date = $6, salary = $7, location_id = $8,
          is_active = $9, avatar_url = $10
      WHERE id = $11
      RETURNING *
    `,
      [
        first_name,
        last_name,
        email,
        department_id,
        job_title,
        hire_date,
        salary,
        location_id,
        is_active,
        avatar_url,
        req.params.id,
      ],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE employee
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM employees WHERE id = $1 RETURNING *', [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted', employee: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

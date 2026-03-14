require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const fs = require('fs');
const path = require('path');

const employeesRouter = require('./routes/employees');
const departmentsRouter = require('./routes/departments');
const locationsRouter = require('./routes/locations');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/employees', employeesRouter);
app.use('/api/departments', departmentsRouter);
app.use('/api/locations', locationsRouter);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Run schema on startup
async function initDb() {
  try {
    console.log('cwd:', process.cwd());
    console.log('__dirname:', __dirname);
    const schemaPath = path.join(process.cwd(), 'src/db/schema.sql');
    console.log('looking for schema at:', schemaPath);
    const schema = fs.readFileSync(schemaPath, 'utf8');
    await pool.query(schema);
    console.log('✅ Database schema ready');
  } catch (err) {
    console.error('❌ Failed to initialise schema:', err.message);
    process.exit(1);
  }
}

initDb().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});

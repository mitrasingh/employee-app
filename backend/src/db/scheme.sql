-- Departments
CREATE TABLE IF NOT EXISTS departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Locations
CREATE TABLE IF NOT EXISTS locations (
  id SERIAL PRIMARY KEY,
  city VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Employees
CREATE TABLE IF NOT EXISTS employees (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  department_id INTEGER REFERENCES departments(id) ON DELETE SET NULL,
  job_title VARCHAR(150),
  hire_date DATE,
  salary NUMERIC(10, 2),
  location_id INTEGER REFERENCES locations(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT TRUE,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Seed departments
INSERT INTO departments (name) VALUES
  ('Engineering'),
  ('Marketing'),
  ('Sales'),
  ('Human Resources'),
  ('Finance')
ON CONFLICT (name) DO NOTHING;

-- Seed locations
INSERT INTO locations (city) VALUES
  ('New York'),
  ('San Francisco'),
  ('Chicago')
ON CONFLICT (city) DO NOTHING;
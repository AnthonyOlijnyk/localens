const { Pool } = require('pg');

// Configure the PostgreSQL connection pool
const pool = new Pool({
  user: 'myuser', 
  host: 'localhost',
  database: 'localens', 
  password: 'postgres', 
  port: 5432, 
});

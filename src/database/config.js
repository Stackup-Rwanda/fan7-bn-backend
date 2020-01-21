import { config } from 'dotenv';
import { Pool } from 'pg';

config();

const environment = process.env.NODE_ENV || 'development';
const envVariables = require('../config/config')[environment];

const {
  username, password, host, database, port
} = envVariables;

const pool = new Pool({
  user: username,
  password,
  host,
  database,
  port,
  max: 10,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 3000
});

pool
  .connect()
  .then(console.log(`Connected to ${environment} database`))
  .catch((err) => console.log(`Error connecting to database.\n Error Details: ${err}`));

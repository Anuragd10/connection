import pg from 'pg';
import credentials from './credentials.js';

var config = {
  user: credentials.username,
  database: credentials.database,
  password: credentials.password,
  host: credentials.server, 
  port: 5432,  
  idleTimeoutMillis: 30000, 
};
  
const pool = new pg.Pool(config);
 
pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack);
});
 
export default pool;
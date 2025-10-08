const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '20040315Zjy.',
  database: 'charityevents_db'
});
module.exports = pool.promise();

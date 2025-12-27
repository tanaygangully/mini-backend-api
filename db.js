const mysql = require('mysql2');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root1234',
  database: 'mini_backend'
});

module.exports = db;

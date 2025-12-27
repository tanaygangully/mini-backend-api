const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

async function getDB() {
  return mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false }
  });
}

app.post('/create-point', async (req, res) => {
  try {
    const db = await getDB();
    const { point_name, latitude, longitude, district_id } = req.body;

    await db.query('CALL sp_create_point(?,?,?,?)', [
      point_name,
      latitude,
      longitude,
      district_id
    ]);

    res.json({ message: 'Point created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;

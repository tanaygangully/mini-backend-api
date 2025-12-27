import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false }
});

app.post('/create-point', async (req, res) => {
  try {
    const { point_name, latitude, longitude, district_id } = req.body;
    await db.query('CALL sp_create_point(?,?,?,?)', [point_name, latitude, longitude, district_id]);
    res.json({ message: 'Point created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/points/:district_id', async (req, res) => {
  const [rows] = await db.query('CALL sp_get_points_by_district(?)', [req.params.district_id]);
  res.json(rows[0]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on", PORT));

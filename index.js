const express = require('express');
const getDB = require('./db');

const app = express();
app.use(express.json());

app.post('/create-point', async (req, res) => {
  try {
    const db = getDB();
    const { point_name, latitude, longitude, district_id } = req.body;

    await db.promise().query(
      'CALL sp_create_point(?,?,?,?)',
      [point_name, latitude, longitude, district_id]
    );

    res.json({ message: 'Point created successfully' });
  } catch (err) {
    console.log("MYSQL ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


app.get('/points/:district_id', async (req, res) => {
  try {
    const db = getDB();
    const [rows] = await db.promise().query(
      'CALL sp_get_points_by_district(?)',
      [req.params.district_id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/create-cluster', async (req, res) => {
  try {
    const db = getDB();
    const { cluster_name, point_id } = req.body;

    await db.promise().query(
      'CALL sp_create_cluster(?,?)',
      [cluster_name, point_id]
    );

    res.json({ message: 'Cluster created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/clusters/:point_id', async (req, res) => {
  try {
    const db = getDB();
    const [rows] = await db.promise().query(
      'CALL sp_get_clusters_by_point(?)',
      [req.params.point_id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = app;

const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());

app.post('/create-point', (req, res) => {
  const { point_name, latitude, longitude, district_id } = req.body;

  db.query(
    'CALL sp_create_point(?,?,?,?)',
    [point_name, latitude, longitude, district_id],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Point created successfully' });
    }
  );
});
app.get('/points/:district_id', (req, res) => {
  const districtId = req.params.district_id;

  db.query('CALL sp_get_points_by_district(?)', [districtId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(result[0]);
  });
});
app.post('/create-cluster', (req, res) => {
  const { cluster_name, point_id } = req.body;

  db.query('CALL sp_create_cluster(?,?)', [cluster_name, point_id], (err) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ message: 'Cluster created successfully' });
  });
});

app.get('/clusters/:point_id', (req, res) => {
  db.query('CALL sp_get_clusters_by_point(?)', [req.params.point_id], (err, result) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(result[0]);
  });
});


module.exports = app;

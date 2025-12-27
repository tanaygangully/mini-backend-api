import { getDB } from './db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { point_name, latitude, longitude, district_id } = req.body;
    const db = getDB();

    await db.query('CALL sp_create_point(?,?,?,?)', [
      point_name, latitude, longitude, district_id
    ]);

    res.json({ message: 'Point created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

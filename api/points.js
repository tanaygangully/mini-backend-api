import { getDB } from './db.js';

export default async function handler(req, res) {
  const { district_id } = req.query;

  const db = getDB();
  const [rows] = await db.query('CALL sp_get_points_by_district(?)', [district_id]);
  res.json(rows[0]);
}

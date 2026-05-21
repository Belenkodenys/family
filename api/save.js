import { getRedis } from './_redis.js';

const KEY = 'family:expenses';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { expenses } = req.body;
    if (!Array.isArray(expenses)) {
      return res.status(400).json({ error: 'expenses must be an array' });
    }
    const redis = getRedis();
    await redis.set(KEY, JSON.stringify(expenses));
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error('Save error:', e);
    res.status(500).json({ error: e.message });
  }
}

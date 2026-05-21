import { getRedis } from './_redis.js';

const KEY = 'family:expenses';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const redis = getRedis();
    const raw = await redis.get(KEY);
    const expenses = raw ? JSON.parse(raw) : [];
    res.status(200).json({ expenses });
  } catch (e) {
    console.error('Load error:', e);
    res.status(500).json({ error: e.message });
  }
}

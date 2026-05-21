import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const data = await kv.get('expenses');
    res.status(200).json({ expenses: data || [] });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

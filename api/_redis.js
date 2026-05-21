import { createClient } from 'redis';

let client = null;

export async function getRedis() {
  if (client && client.isOpen) return client;

  client = createClient({
    url: process.env.REDIS_URL,
    socket: {
      tls: process.env.REDIS_URL?.startsWith('rediss://'),
      reconnectStrategy: false
    }
  });

  client.on('error', (err) => console.error('Redis error:', err));

  await client.connect();
  return client;
}

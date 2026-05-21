import Redis from 'ioredis';

let client = null;

export function getRedis() {
  if (client) return client;

  const url = process.env.REDIS_URL;
  if (!url) {
    throw new Error('REDIS_URL is not set');
  }

  client = new Redis(url, {
    maxRetriesPerRequest: 3,
    enableReadyCheck: false,
    lazyConnect: false
  });

  client.on('error', (err) => console.error('Redis error:', err.message));

  return client;
}

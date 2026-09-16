const Redis = require('ioredis');

let redis;
function getRedis() {
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL);
  }
  return redis;
}

export default async (req, res) => {
  const db = getRedis();
  const image = await db.get('image');

  if (!image) {
    return res.status(200).json({ filename: null });
  }

  // image may be a relative path ("/dark.png") or a full URL
  // (e.g. "https://pfp.lynn.pt/dark.png") — pull just the filename off the end.
  let filename = null;
  try {
    const url = new URL(image, 'https://placeholder.invalid');
    filename = url.pathname.split('/').filter(Boolean).pop() || null;
  } catch {
    filename = image.split('/').filter(Boolean).pop() || null;
  }

  res.status(200).json({ filename });
};

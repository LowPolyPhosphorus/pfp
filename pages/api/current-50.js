const Redis = require('ioredis');
const sharp = require('sharp');
const axios = require('axios');

let redis;
function getRedis() {
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL);
  }
  return redis;
}

export default async (req, res) => {
  try {
    const db = getRedis();
    const imageUrl = await db.get('image');
    
    if (!imageUrl) {
      return res.status(404).json({ error: 'No current profile picture found' });
    }

    // Fetch the image
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer'
    });

    // Resize to 50x50
    const resizedImage = await sharp(response.data)
      .resize(50, 50, {
        fit: 'cover',
        position: 'center'
      })
      .toBuffer();

    // Set appropriate headers
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(resizedImage);
  } catch (error) {
    console.error('Error resizing image:', error);
    res.status(500).json({ error: 'Failed to process image' });
  }
};

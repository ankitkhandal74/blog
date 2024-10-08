// pages/api/ads/add.js
import dbConnect from '@/lib/db';
import Ad from '@/models/Ad';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await dbConnect();
    
    const { identifier, adCode, description } = req.body;

    if (!identifier || !adCode) {
      return res.status(400).json({ message: 'Identifier and Ad code are required' });
    }

    try {
      const ad = new Ad({ identifier, adCode, description });
      await ad.save();
      return res.status(201).json({ message: 'Ad saved successfully' });
    } catch (error) {
      console.error('Error saving ad:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

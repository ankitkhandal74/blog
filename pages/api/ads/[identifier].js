// pages/api/ads/[identifier].js
import dbConnect from '@/lib/db';
import Ad from '@/models/Ad';

export default async function handler(req, res) {
  const { identifier } = req.query;

  await dbConnect();

  try {
    const ad = await Ad.findOne({ identifier });
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }
    res.status(200).json(ad);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ad' });
  }
}

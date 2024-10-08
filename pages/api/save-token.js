// pages/api/save-token.js
import dbConnect from '@/lib/db';
import Token from '@/models/Token';

export default async function handler(req, res) {
  await dbConnect();
  
  if (req.method === 'POST') {
    const { token, user } = req.body;
    
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    try {
      // Check if token already exists
      const existingToken = await Token.findOne({ token });
      if (!existingToken) {
        // Create new token document
        const newToken = new Token({ token, user });
        await newToken.save();
      }

      return res.status(200).json({ message: 'Token saved successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error saving token', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

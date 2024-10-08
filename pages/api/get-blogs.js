// /pages/api/get-blogs.js
import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      // Fetch all blogs sorted by createdAt in descending order
      const blogs = await Blog.find().sort({ createdAt: -1 }); 
      res.status(200).json({ success: true, data: blogs });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}

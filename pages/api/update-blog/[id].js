// /pages/api/update-blog/[id].js
import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json({ success: true, data: blog });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}

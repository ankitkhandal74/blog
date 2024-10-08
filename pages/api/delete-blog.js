// /pages/api/delete-blog.js

import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    await dbConnect();

    const { id } = req.body;

    try {
      await Blog.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error deleting blog" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}

import dbConnect from '@/lib/db';  // assuming you have a db connection utility
import Blog from '@/models/Blog';  // your Mongoose model

export default async function handler(req, res) {
  await dbConnect();

  try {
    // Fetch popular blogs, sorting by viewCount in descending order
    const popularBlogs = await Blog.find().sort({ viewCount: -1 }).limit(5); // Get top 5 popular blogs

    res.status(200).json(popularBlogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch popular blogs' });
  }
}

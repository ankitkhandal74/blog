// pages/api/get-blogs-by-category.js
import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';

export default async function handler(req, res) {
  const { category } = req.query; // Get the category from query parameters

  await dbConnect();

  try {
    // Fetch blogs that belong to the specified category
    const blogs = await Blog.find({ categories: category }).lean();

    if (!blogs.length) {
      return res.status(404).json({ message: 'No blogs found for this category' });
    }

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
}

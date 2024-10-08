import dbConnect from '@/lib/db';  // MongoDB connection utility
import Blog from '@/models/Blog';  // Your Mongoose Blog model

export default async function handler(req, res) {
  const { slug } = req.body;  // Get the slug from the request body

  await dbConnect();

  try {
    // Increment the viewCount by 1 for the blog with the given slug
    const updatedBlog = await Blog.findOneAndUpdate(
      { slug }, // Find the blog by slug
      { $inc: { viewCount: 1 } }, // Increment the viewCount field
      { new: true } // Return the updated blog
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to increment view count' });
  }
}

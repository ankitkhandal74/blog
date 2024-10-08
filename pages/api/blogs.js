// /pages/api/blogs.js
import dbConnect from '@/lib/db'; // Import your dbConnect function
import Blog from '@/models/Blog'; // Import your Blog model

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, description, content, date, categories, authors, tags, draft,viewCount  } = req.body;

    // Validate the required fields
    if (!title || !description || !content || !date) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      // Connect to the database
      await dbConnect();

      // Create a new blog post
      const blog = new Blog({
        title,
        description,
        content,
        date,
        categories: categories.split(',').map(c => c.trim()),
        authors: authors.split(',').map(a => a.trim()),
        tags: tags.split(',').map(t => t.trim()),
        draft: draft || false,
        image: '', // Add logic to handle image upload separately
        createdAt: new Date(),
        viewCount,
      });

      // Save the blog post to the database
      await blog.save();

      res.status(201).json({ message: 'Blog post saved successfully', blog });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  } else if (req.method === 'GET') {
    try {
      // Connect to the database
      await dbConnect();

      // Fetch the latest blog posts (limit to 3 for example)
      const blogs = await Blog.find({}).sort({ createdAt: -1 }).limit(3).lean();

      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

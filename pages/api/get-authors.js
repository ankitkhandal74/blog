// /pages/api/get-authors.js
import dbConnect from '@/lib/db';
import Author from '@/models/Author';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { authorSlugs } = req.body;

    try {
      // Find the authors based on the slugs provided
      const authors = await Author.find({
        slug: { $in: authorSlugs },
      }).select('name image slug');

      // Return the authors data
      res.status(200).json({ success: true, data: authors });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}

import dbConnect from '@/lib/db'; // Adjust the path based on your folder structure
import Blog from '@/models/Blog'; // Import your Blog schema if it's defined separately

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { title, description, content, date, categories, authors, tags, draft, image, slug } = req.body;

        // Validate required fields
        if (!title || !description || !content || !date) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        try {
            // Connect to the database
            await dbConnect();

            // Create slug from title
            

            // Insert the new blog post into the collection
            const newBlog = new Blog({
                title,
                description,
                content,
                date,
                categories: categories ? categories.split(',').map(c => c.trim()) : [],
                authors: authors ? authors.split(',').map(a => a.trim()) : [],
                tags: tags ? tags.split(',').map(t => t.trim()) : [],
                draft: draft || false,
                image, // Use the actual image URL here
                slug,  // Save generated slug
                createdAt: new Date(),
            });

            await newBlog.save();

            res.status(201).json({ message: 'Blog post saved successfully' });
        } catch (error) {
            console.error('Error saving blog:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

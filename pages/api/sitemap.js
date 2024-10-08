import dbConnect from '@/lib/db'; // Adjust the path to your dbConnect file
import Blog from '@/models/Blog'; // Replace with your Blog model if different

const BASE_URL = 'https://localhost:3000'; // Replace with your actual domain

const pages = [
  'About',
  'Blog',
  'Contact',
];

export default async function handler(req, res) {
  // Connect to the database
  await dbConnect();

  try {
    // Fetch slugs and dates from the database
    const blogs = await Blog.find({}, 'slug date'); // Fetch slug and date fields

    // Prepare the sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${BASE_URL}</loc>
        <priority>1.0</priority>
      </url>

      ${pages
        .map((page) => {
          return `
      <url>
        <loc>${BASE_URL}/${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>
    `;
        })
        .join('')}

      ${blogs
        .map((blog) => {
          return `
          <url>
            <loc>${BASE_URL}/${blog.slug}</loc>
            <lastmod>${new Date(blog.date).toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
          </url>
        `;
        })
        .join('')}
    
    </urlset>`;

    // Set the response header to XML
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).json({ error: 'Failed to generate sitemap' });
  }
}

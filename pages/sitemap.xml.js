import dbConnect from '@/lib/db'; // Adjust the path to your dbConnect file
import Blog from '@/models/Blog'; // Replace with your Blog model if different

const BASE_URL = 'https://readwithankit.vercel.app'; // Replace with your actual domain

const pages = [
  'About',
  'Blog',
  'Contact',
  'privacy-policy',
  'sitemap.xml',
  '404',
  'admin',
];

export const getServerSideProps = async ({ res }) => {
  await dbConnect();

  try {
    const blogs = await Blog.find({}, 'slug date'); // Fetch slugs and dates

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
    res.write(sitemap);
    res.end();

    return { props: {} }; // No props needed for the page
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return {
      notFound: true,
    };
  }
};

const Sitemap = () => null; // No need to render any component

export default Sitemap;

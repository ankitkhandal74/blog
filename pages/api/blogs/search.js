// import dbConnect from "@/lib/db";
// import Blog from "@/models/Blog"; // Your Blog model

// export default async function handler(req, res) {
//   const { query } = req.query;

//   if (!query) {
//     return res.status(400).json({ error: 'Query parameter is required' });
//   }

//   try {
//     await dbConnect(); // Connect to the database

//     // Search blogs by title or content that matches the query
//     const blogs = await Blog.find({
//       $or: [
//         { title: { $regex: query, $options: 'i' } }, 
//         { content: { $regex: query, $options: 'i' } }
//       ]
//     });

//     res.status(200).json({ blogs });
//   } catch (error) {
//     console.error('Error fetching blogs:', error);
//     res.status(500).json({ error: 'Error fetching blogs' });
//   }
// }


import dbConnect from "@/lib/db";
import Blog from "@/models/Blog"; // Your Blog model

export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    await dbConnect(); // Connect to the database

    // Search blogs by title, content, or category that matches the query
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },   // Case-insensitive search in title
        { content: { $regex: query, $options: 'i' } }, // Case-insensitive search in content
        { category: { $regex: query, $options: 'i' } } // Case-insensitive search in category
      ]
    });

    res.status(200).json({ blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Error fetching blogs' });
  }
}

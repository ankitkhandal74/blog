import cloudinary from 'cloudinary';
import formidable from 'formidable';
import fs from 'fs';

// Disable default body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Formidable error:', err);
        return res.status(500).json({ message: 'Error parsing the form' });
      }

      const file = files.file?.[0] || files.file; // Adjust based on formidable version and file structure

      if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      try {
        const filePath = file.filepath; // Formidable temp file path
        if (!filePath) {
          throw new Error('File path is not defined');
        }

        // Read the file from the temporary path
        const data = fs.readFileSync(filePath);

        // Upload to Cloudinary
        const uploadResponse = await new Promise((resolve, reject) => {
          const stream = cloudinary.v2.uploader.upload_stream(
            { folder: 'blog_images' },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );

          stream.end(data);
        });

        // Respond with the image URL
        res.status(200).json({ url: uploadResponse.secure_url });
        console.log('Image uploaded successfully');
      } catch (error) {
        console.error('Error during image upload:', error);
        res.status(500).json({ message: 'Image upload failed' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

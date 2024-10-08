import dbConnect from '@/lib/db';
import Contact from '@/models/Contact';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { name, number, email, message } = req.body;

      if (!name || !number || !email || !message) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const newContact = new Contact({
        name,
        number,
        email,
        message,
      });

      await newContact.save();

      res.status(201).json({ message: 'Message sent successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

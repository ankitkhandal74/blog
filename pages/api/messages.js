import dbConnect from '@/lib/db';
import Contact from '@/models/Contact';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const messages = await Contact.find({});
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching messages', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

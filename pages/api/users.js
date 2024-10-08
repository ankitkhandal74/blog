import dbConnect from '@/lib/db';
import Contact from '@/models/Contact';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      // Fetch contacts from the database
      const contacts = await Contact.find({});

      // Map the contacts to only include name, email, and number
      const userData = contacts.map(contact => ({
        name: contact.name,
        email: contact.email,
        number: contact.number
      }));

      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching contacts', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

import dbConnect from '@/lib/db';
import Contact from '@/models/Contact';
import User from '@/models/User';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      // Fetch all messages from the Contact collection
      const messages = await Contact.find({});
      
      if (messages.length === 0) {
        return res.status(404).json({ message: 'No messages found' });
      }

      let usersCreated = 0;
      
      // Iterate through each message
      for (const message of messages) {
        const { name, email, number } = message;

        // Check if the user already exists in the User collection
        const existingUser = await User.findOne({ email });
        
        if (!existingUser) {
          // Save the user to the User collection if not exists
          const newUser = new User({ name, email, number });
          await newUser.save();
          usersCreated++;
        }
      }

      res.status(201).json({ message: `${usersCreated} users synced successfully` });
    } catch (error) {
      console.error('Error syncing users:', error.message);
      res.status(500).json({ message: 'Error syncing users', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

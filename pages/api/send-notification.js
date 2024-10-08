import admin from '@/lib/firebaseAdmin'; // Ensure correct Firebase Admin setup
import dbConnect from '@/lib/db';
import Token from '@/models/Token'; // Token model for fetching FCM tokens

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await dbConnect();
      
      const { title, body, image, url } = req.body;

      // Fetch all tokens from the database
      const tokens = await Token.find({});
      if (!tokens || tokens.length === 0) {
        return res.status(400).json({ error: 'No FCM tokens available' });
      }

      const results = []; // Store the results of each message
      let errorCount = 0; // To track if any errors occurred

      // Loop through each token and send a notification
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i].token; // Assuming your token field is `token`
        const click_action = url;

        const message = {
          token, // Use the token from the database
          notification: {
            title: 'Notification title',
            body: 'Notification body',
            image, // Correct field for image in FCM notifications
          },
          data: {
            click_action: 'https://firebase.google.com?data',
            meta: 'root data',
            url,
          },
          android: {
            notification: {
              title: 'Android title',
              body: 'Android body',
              click_action: 'https://firebase.google.com?android',
            },
            data: {
              meta: 'android data',
              click_action: 'https://firebase.google.com?android_data',
            },
          },
          webpush: {
            notification: {
              title: title,
              body: body,
              click_action:  (url),
              icon: image,
              sound: 'default',
            },
            data: {
              click_action:  "https://google.com",
              meta: 'webpush data',
            },
            
          },
          
        };
        

        try {
          // Send the message to the current token
          const response = await admin.messaging().send(message);
          results.push({ token, success: true, response });
        } catch (error) {
          console.error(`Error sending notification to token ${token}:`, error);
          errorCount++;
          results.push({ token, success: false, error: error.message });
        }
      }

      return res.status(200).json({
        message: `Notifications sent with ${errorCount} errors`,
        results,
      });
    } catch (error) {
      console.error('Error sending notifications:', error);
      return res.status(500).json({ error: 'Error sending notifications' });
    }
  } else {
    // Handle method not allowed
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

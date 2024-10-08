import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyC73UHQ5ddEpPStWF6J2Dla0ccp9qgc9xA",
  authDomain: "blog-site-e9dd2.firebaseapp.com",
  projectId: "blog-site-e9dd2",
  storageBucket: "blog-site-e9dd2.appspot.com",
  messagingSenderId: "188426250183",
  appId: "1:188426250183:web:3c861d3ad0f1b597011be2",
  measurementId: "G-2HTX3YKSQH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let messaging = null;



// Function to initialize Firebase Messaging
export const initMessaging = () => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      messaging = getMessaging(app);
      return messaging;
    } catch (error) {
      console.error("Error initializing messaging:", error);
    }
  }
  return null; // Return null if not in a supported browser environment
};

// Function to request permission and get the token
export const requestPermission = async () => {
  try {
    messaging = initMessaging(); // Ensure messaging is initialized

    if (!messaging) {
      console.log('Firebase messaging is not available on this platform.');
      return;
    }

    // Check if Notification API is supported
    if (!('Notification' in window)) {
      console.error('This browser does not support notifications.');
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, { vapidKey: 'BGuvmRd0p9N88a8CKutnfU1cNQ2Z5zLB0rRXmKDpA3dz_PCCLO8JzXKogBUxmMBjnsO333KaH7epv_t06x3nftM' });

      // Send token to the server
      await fetch('/api/save-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
    } else {
      console.error('Permission not granted for Notification');
    }
  } catch (error) {
    console.error('Error getting token:', error);
  }
};

// Listen for messages
export const listenForMessages = () => {
  if (messaging) {
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
    });
  } else {
    console.error('Messaging is not initialized.');
  }
};

export default { initMessaging, requestPermission, listenForMessages };

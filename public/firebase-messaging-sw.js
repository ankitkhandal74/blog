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

// Function to initialize Firebase Messaging with service worker registration
export const initMessaging = async () => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      // Register service worker required for Firebase messaging
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      messaging = getMessaging(app);
      return messaging;
    } catch (error) {
      console.error("Error registering service worker or initializing messaging:", error);
    }
  } else {
    console.log("Service workers are not supported in this environment.");
  }
  return null; // Return null if not in a supported environment
};

// Function to request notification permission and retrieve token
export const requestPermission = async () => {
  try {
    messaging = await initMessaging(); // Ensure messaging is initialized

    if (!messaging) {
      console.log('Firebase messaging is not available on this platform.');
      return;
    }

    // Request permission after user interaction
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      // Get the FCM token with VAPID key
      const token = await getToken(messaging, { vapidKey: 'BGuvmRd0p9N88a8CKutnfU1cNQ2Z5zLB0rRXmKDpA3dz_PCCLO8JzXKogBUxmMBjnsO333KaH7epv_t06x3nftM' });
      
      if (token) {
        console.log('FCM Token:', token);
        alert(`FCM Token: ${token}`);

        // Send token to the server
        await fetch('/api/save-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
      } else {
        console.error('Failed to generate FCM token.');
      }
    } else {
      console.error('Permission not granted for Notification');
    }
  } catch (error) {
    console.error('Error getting token:', error);
  }
};

// Listen for incoming messages
export const listenForMessages = () => {
  if (messaging) {
    onMessage(messaging, (payload) => {
      console.log('Message received: ', payload);
    });
  } else {
    console.error('Firebase Messaging is not initialized.');
  }
};

// Call requestPermission on button click
const setupNotifications = () => {
  const button = document.getElementById('request-permission-btn');
  button.addEventListener('click', requestPermission);
};

export default { initMessaging, requestPermission, listenForMessages, setupNotifications };

// // lib/firebaseAdmin.js
// import admin from 'firebase-admin';
// import serviceAccount from './path-to-your-service-account-key.json'; 

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//       type: process.env.FIREBASE_TYPE,
//       project_id: process.env.FIREBASE_PROJECT_ID,
//       private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//       private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Ensure this is correctly formatted
//       client_email: process.env.FIREBASE_CLIENT_EMAIL,
//       client_id: process.env.FIREBASE_CLIENT_ID,
//       auth_uri: process.env.FIREBASE_AUTH_URI,
//       token_uri: process.env.FIREBASE_TOKEN_URI,
//       auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
//       client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
//     }),
//     databaseURL: `https://blog-site-e9dd2-default-rtdb.firebaseio.com/`, // Update to match your project
//   });
// }

// export default admin;

import admin from 'firebase-admin';

// Check if the app is already initialized to prevent errors
if (!admin.apps.length) {
  const serviceAccount = require('@/config/blog-site-e9dd2-firebase-adminsdk-v2ttw-44b02a7c66.json'); // Update the path to your service account key

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    messagingSenderId: "188426250183",
    databaseURL: 'https://blog-site-e9dd2-default-rtdb.firebaseio.com',
  });
}

export default admin;

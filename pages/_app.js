// pages/_app.js
import '@/styles/global.css' // Make sure Tailwind is imported here
import { useEffect } from 'react'
import firebase from '@/lib/firebase';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  // Example for custom behavior like theme or analytics initialization
  useEffect(() => {
    // Optional: custom logic such as setting a theme, initializing analytics, etc.
    console.log('App loaded')
  }, [])

  useEffect(() => {
    const messaging = firebase.initMessaging(); // Initialize messaging
    if (messaging) {
      firebase.requestPermission(); // Request permission to send notifications
      firebase.listenForMessages(); // Listen for incoming messages
    }
  }, []);

  return (
    <>
      <Head>
        <title>Read With Ankit</title>
        <meta name="description" content="Your website description here" />
        <meta name="keywords" content="your, keywords, here" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp

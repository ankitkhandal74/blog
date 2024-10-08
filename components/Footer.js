import React from 'react';
import { useEffect } from 'react';
import firebaseMessaging from '@/lib/firebase.js';
import { useRouter } from "next/router";
import Link from "next/link";

export default function Footer() {
  const router = useRouter();
  const currentRoute = router.pathname;

  useEffect(() => {
    // Initialize Firebase Messaging
    firebaseMessaging.initMessaging();
    // Listen for incoming messages
    firebaseMessaging.listenForMessages();
  }, []);

  const handleEnableNotifications = async () => {
    await firebaseMessaging.requestPermission();
  };


  return (
    <footer >
      <section>
        <div className='bg-violet-600 h-[90vh] w-full relative mt-20'>
          <img src='/Maskgroup.svg' className='h-60 absolute top-0 left-0' />
          <img src='/Maskgroup.svg' className='h-60 absolute bottom-0 right-0' style={{ transform: 'rotate(180deg)' }} />

          <div className=' flex md:px-10 pt-20 items-center justify-center'>
            <div className='flex flex-col items-center justify-center h-full text-white mx-4 md:w-[60vw]'>
              <h1 className='text-5xl font-bold Raleway text-center'>Get our stories delivered From us to your inbox weekly.</h1>
              <p className='text-xl mt-4 font-[Roboto]'>We share our thoughts and experiences with you</p>
              <p className='text-xl mt-4 font-[Roboto]'>Thank You For Join Us </p>

              <button className="bg-white text-xl text-violet-600 py-2 mt-16 hover:scale-95 px-8 rounded-lg">
                <a href="/Blog">Read Blogs</a>
              </button>
              <button onClick={handleEnableNotifications} className="bg-white text-xl text-violet-600 py-2 mt-16 mb-16  hover:scale-95 px-8 rounded-lg">
                Enable Notifications
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className=' fixed right-10 bottom-10 flex flex-col gap-y-4'>
        <button className=' h-14 w-14 bg-violet-600 rounded-full text-center text-3xl object-cover overflow-hidden cursor-pointer'>
          <a href='https://whatsapp.com/channel/0029VanNbPdEKyZKnHBgBV3V'>
            <img src='whatsapp.webp' />
          </a>
        </button>

        <button href='' className='h-14 w-14 bg-violet-600 rounded-full text-center text-3xl object-cover overflow-hidden cursor-pointer'>
          <a href='https://t.me/Sarkari_yojana_govt'>
            <img src='telegram.webp' />
          </a>
        </button>

      </section>

      <section className='flex flex-col justify-center items-center pb-10'>
        <div><img src='/logo1.png' className="h-40 w-auto" /></div>
        <ul className=' flex gap-10 max-md:gap-6 Raleway'>
          <li className={`cursor-pointer ${currentRoute === "/" ? "text-violet-600" : "hover:text-violet-600"}`}>
            <Link href="/">Home</Link>
          </li>
          <li className={`cursor-pointer ${currentRoute === "/Contact" ? "text-violet-600" : "hover:text-violet-600"}`}>
            <Link href="/Contact">Contact Us</Link>
          </li>
          <li className={`cursor-pointer ${currentRoute === "/About" ? "text-violet-600" : "hover:text-violet-600"}`}>
            <Link href="/About">About</Link>
          </li>
          <li className={`cursor-pointer ${currentRoute === "/privacy-policy" ? "text-violet-600" : "hover:text-violet-600"}`}>
            <Link href="/privacy-policy">privacy policy</Link>
          </li>
        </ul>
        <div className='flex gap-10 pt-10 Raleway text-white'>
          <button href='' className='h-10 w-10 bg-violet-600 rounded-full text-center text-3xl object-cover overflow-hidden' >
            <a href='https://www.instagram.com/ankit_khandal_me?igsh=MW45anJxMTJhdmNtbw=='>
              <img src='1583142.webp' className=' ' />
            </a>
          </button>
          <button className='h-10 w-10 bg-violet-600 rounded-full text-center text-3xl object-cover overflow-hidden'>
            <a href='https://whatsapp.com/channel/0029VanNbPdEKyZKnHBgBV3V'>
              <img src='whatsapp.webp' />
            </a>
          </button>

          <button href='' className='h-10 w-10 bg-violet-600 rounded-full text-center text-3xl object-cover overflow-hidden'>
            <a href='https://t.me/Sarkari_yojana_govt'>
              <img src='telegram.webp' />
            </a>
          </button>
        </div>
        <div className='w-[80vw] border-t-[2px] border-violet-300 mt-10'></div>
        <div className='mt-10 Raleway'>Copyright © 2024. All Right Reserved</div>
      </section>
    </footer>
  );
};


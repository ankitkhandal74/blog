// pages/404.js
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Custom404() {
  return (
    <div>
      <Header />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1> */}
      <img src='/4043D.webp' className='max-w-96'/>
      <h2 className="text-2xl font-medium text-gray-600 mb-8">Page Not Found</h2>
      <p className="text-center text-gray-500 mb-6">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/">
        <span className="bg-violet-500 text-white py-3 px-6 rounded-lg hover:bg-violet-600 cursor-pointer">
          Go Back to Home
        </span>
      </Link>
    </div>
    <Footer />
    </div>
  );
}

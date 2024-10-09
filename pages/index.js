import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { truncateText } from '@/utils/truncateText';
import PopularBlogs from '@/components/PopularBlogs';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [posts, setPosts] = useState([]);


  const handleReadMore = () => {
    setIsExpanded(true);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/get-blogs');
        const data = await res.json();
        if (data.success) {
          setPosts(data.data.slice(0, 1));
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/get-blogs');
        const data = await res.json();
        if (data.success) {
          setBlogs(data.data.slice(0, 3)); // Get only the first 3 blogs
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const [truncateLimit, setTruncateLimit] = useState(30); // Default to 30 words

  // Dynamically set the truncate limit based on screen size
  useEffect(() => {
    const updateTruncateLimit = () => {
      setTruncateLimit(window.innerWidth < 768 ? 10 : 30); // 15 for mobile, 30 for larger screens
    };

    updateTruncateLimit(); // Call on initial render
    window.addEventListener("resize", updateTruncateLimit); // Update on window resize

    return () => {
      window.removeEventListener("resize", updateTruncateLimit); // Cleanup on unmount
    };
  }, []);





  return (
    <div>
      <Header />
      <section>
        <div className='bg-violet-600  w-full relative'>
          <img src='/Maskgroup.svg' className='h-60 absolute top-0 left-0' />
          <img src='/Maskgroup.svg' className='h-60 absolute bottom-0 right-0' style={{ transform: 'rotate(180deg)' }} />
          <div className=' flex justify-between px-10  pt-5 max-md:flex-col'>
            <div className='flex flex-col items-center justify-center h-full text-white md:pt-40'>
              <h1 className='text-7xl font-bold Raleway'>Welcome to our Blog</h1>
              <p className='text-xl mt-4 font-[Roboto]'>We share our thoughts and experiences with you</p>

              <button className="bg-white text-xl text-violet-600 py-2 mt-16 hover:scale-95 px-8 rounded-lg">
                <a href="/Blog">Read Blogs</a>
              </button>
            </div>
            <div className='m-auto flex items-center justify-start md:pt-20'>
              <img
                src='/5102479.webp'
                className=''
                style={{ transform: 'scaleX(-1)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {posts.length > 0 ? (
        posts.map((blog, index) => (
          <section className='md:my-16 my-6 mb-16 relative md:h-[700px] max-md:h-[500px]' key={blog._id}>
            <Link href={`/${blog.slug}`} className="flex flex-col ">
              <div className="relative md:w-[95vw] md:h-[550px] m-auto mt-16 max-w-full overflow-hidden mx-2 flex items-center justify-center">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full md:object-cover rounded-2xl max-md:object-contain m-9 "
                />
              </div>

              <div className=' absolute bottom-0 md:right-[7vw] bg-white rounded-2xl md:px-10 px-4 py-6 shadow-2xl md:w-[65vw] w-[90vw] right-0'>
                <div className='flex md:gap-4 md:pb-4 items-center roboto max-md:flex-col'>
                  <p className='text-black text-xl font-medium  max-md:text-base max-md:text-start  max-md:w-full '>
                  {Array.isArray(blog.categories) ? (
                                        blog.categories.map((category, index) => (
                                            <span key={index}>
                                                <Link href={`/categories/${category.trim()}`}>
                                                    {category.trim()}
                                                </Link>
                                                {index < blog.categories.length - 1 && ', '}
                                            </span>
                                        ))
                                    ) : (
                                        typeof blog.categories === 'string' &&
                                        blog.categories.split(',').map((category, index) => (
                                            <span key={index}>
                                                <Link href={`/categories/${category.trim()}`}>
                                                    {category.trim()}
                                                </Link>
                                                {index < blog.categories.split(',').length - 1 && ', '}
                                            </span>
                                        ))
                                    )}
                  </p>
                  <p className='text-gray-500 text-base font-medium max-md:text-end max-md:w-full max-md:text-base'>{formatDate(blog.date)}</p>
                </div>
                <div className='text-4xl md:pb-4 pb-1 font-bold text-gray-800 Raleway max-md:text-xl '>{blog.title}</div>
                <div className='text-lg text-gray-600 roboto max-md:text-base'>
                  {isExpanded ? blog.description : truncateText(blog.description, truncateLimit, true)} 
                </div>

                <button className=" bg-white text-violet-600 py-2 px-8 rounded-lg border border-violet-600 md:mt-6 mt-2 roboto">
                  <a href="/Blog">Read More</a>
                </button>
              </div>
            </Link>
          </section>
        ))
      ) : (
        <p>No blogs available</p>
      )}


      <section>
        <div className='flex justify-between md:px-20 max-md:flex-col gap-y-4'>
          <h1 className='text-5xl font-bold Raleway text-gray-800 max-md:text-5xl max-md:text-center'>
            Our Recent Post
          </h1>
          <div className='max-md:flex justify-end px-10'>
          <a href="/Contact" className="bg-violet-500 text-sm text-white py-4  hover:scale-95 px-6 md:px-12 rounded-lg max-md:w-28" >
            View All
          </a>
          </div>
        </div>

        <div className=' grid grid-cols-3 max-md:grid-cols-1 md:p-10 p-4 md:px-20 m-auto gap-4'>
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div key={blog._id} className="flex flex-col justify-between">
                <Link href={`/${blog.slug}`} className="flex flex-col ">
                  <div>
                    <div className=' max-h-52 rounded-xl overflow-hidden'>
                      <img src={blog.image} alt={blog.title} className='object-cover rounded-xl  max-md:w-full max-md:h-auto w-auto m-auto' />
                    </div>
                    <div className=' pt-4 pb-2 flex gap-4 roboto'>
                      <p className='text-black text-sm'>
                      {Array.isArray(blog.categories) ? (
                                        blog.categories.map((category, index) => (
                                            <span key={index}>
                                                <Link href={`/categories/${category.trim()}`}>
                                                    {category.trim()}
                                                </Link>
                                                {index < blog.categories.length - 1 && ', '}
                                            </span>
                                        ))
                                    ) : (
                                        typeof blog.categories === 'string' &&
                                        blog.categories.split(',').map((category, index) => (
                                            <span key={index}>
                                                <Link href={`/categories/${category.trim()}`}>
                                                    {category.trim()}
                                                </Link>
                                                {index < blog.categories.split(',').length - 1 && ', '}
                                            </span>
                                        ))
                                    )}
                      </p>
                      <p className='text-gray-500 text-sm'> {formatDate(blog.date)}</p>
                    </div>
                    <div className=' text-2xl font-medium Raleway'>{blog.title}</div>
                    <div className='text-gray-600 py-2 roboto'>{isExpanded ? blog.description : truncateText(blog.description, 15)}
                    </div>
                  </div>

                </Link>
                <button href={`/${blog.slug}`} className=" bg-white text-violet-600 py-2 px-8 rounded-lg border border-violet-600 mt-2 roboto w-60"><a href={`/${blog.slug}`}>Read More ...</a>
                </button>
              </div>
            ))
          ) : (
            <p>No blogs available</p>
          )}
        </div>
      </section>


      <section>
        <PopularBlogs />
      </section>

      <Footer />
    </div>
  );
}


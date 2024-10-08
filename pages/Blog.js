import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { truncateText } from '@/utils/truncateText';


export default function Blog() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [blogs, setBlogs] = useState([]);

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    const handleReadMore = () => {
        setIsExpanded(true);
    };

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch('/api/get-blogs');
                const data = await res.json();
                if (data.success) {
                    setBlogs(data.data);
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);


    return (
        <div>
            <Header />
            <section>
                <div className='bg-violet-600 h-[75vh] w-full relative '>
                    <img src='/Maskgroup.svg' className='h-60 absolute top-0 left-0' />
                    <img src='/Maskgroup.svg' className='h-60 absolute bottom-0 right-0' style={{ transform: 'rotate(180deg)' }} />

                    <div className=' flex px-10 pt-20 items-center justify-center '>
                        <div className='flex flex-col items-center justify-center h-full text-white w-[60vw]'>
                            <p className='text-xl mt-4 font-[Roboto] pb-5'>Our Blogs</p>
                            <h1 className='text-5xl font-bold Raleway text-center'>Find our all blogs from here</h1>
                            <p className='text-xl mt-4 font-[Roboto] text-center'>our blogs are written from very research research and well known writers writers so that  we can provide you the best blogs and articles articles for you to read them all along</p>
                            <p className='text-xl mt-4 font-[Roboto] '>Thank You For Join Us </p>
                        </div>
                    </div>
                </div>
            </section>

            <section>

                <div className=' grid grid-cols-3 md:p-10 py-8 px-4 md:px-20 m-auto gap-4 max-md:grid-cols-1'>
                    {blogs.length > 0 ? (
                        blogs.map((blog, index) => (
                            <div key={blog._id} className="flex flex-col justify-between">
                                <Link href={`/${blog.slug}`} className="flex flex-col ">
                                    <div>
                                        <div className=' max-h-52 rounded-xl overflow-hidden'>
                                            <img src={blog.image} alt={blog.title} className='object-cover rounded-xl  max-md:w-full max-md:h-auto w-auto m-auto' />
                                        </div>
                                        <div className=' pt-4 pb-2 flex gap-4 roboto'>
                                            <p className='text-black text-sm'><p className='text-black text-sm'>
                                                <Link href={`/categories/${blog.categories}`}>
                                                    {blog.categories}
                                                </Link>
                                            </p></p>
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

            <Footer />
        </div>
    )
}
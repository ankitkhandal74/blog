import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { truncateText } from '@/utils/truncateText';

const PopularBlogs = () => {
    const [popularBlogs, setPopularBlogs] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    const handleReadMore = () => {
        setIsExpanded(true);
    };

    useEffect(() => {
        async function fetchPopularBlogs() {
            try {
                const response = await axios.get('/api/get-popular-blogs'); // Your API route
                setPopularBlogs(response.data.slice(0, 6));
            } catch (error) {
                console.error('Error fetching popular blogs', error);
            }
        }

        fetchPopularBlogs();
    }, []);

    return (
        <div>

            <section>
                <div className="flex justify-between md:px-20 max-md:flex-col gap-y-4">
                    <h1 className="text-5xl font-bold Raleway text-gray-800 max-md:text-6xl max-md:text-center max-md:mt-20">Popular Post</h1>
                    <div className='max-md:flex justify-end px-10'>

                        <a href="/Blog" className="bg-violet-500 text-sm text-white py-4  hover:scale-95 px-6 md:px-12 rounded-lg max-md:w-28" >
                            View All
                        </a>
                    </div>
                </div>

                {popularBlogs && popularBlogs.length > 0 ? (
                    <div className=" grid grid-cols-3 max-md:grid-cols-1 md:p-10 p-4 md:px-20 m-auto gap-4">
                        {popularBlogs.map((blog) => (
                            <div key={blog._id} className="flex flex-col justify-between">
                                <Link href={`/${blog.slug}`} className="flex flex-col">
                                    <div>
                                        <div className="max-h-52 rounded-xl overflow-hidden">
                                            <img
                                                src={blog.image}
                                                alt={blog.title}
                                                className="object-cover rounded-xl max-md:w-full max-md:h-auto w-auto m-auto"
                                            />
                                        </div>
                                        <div className="pt-4 pb-2 flex gap-4 roboto">
                                            <p className="text-black text-sm">
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
                                            <p className="text-gray-500 text-sm">{formatDate(blog.date)}</p>
                                        </div>
                                        <div className="text-2xl font-medium Raleway">{blog.title}</div>
                                        <div className="text-gray-600 py-2 roboto">
                                            {isExpanded ? blog.description : truncateText(blog.description, 15)}
                                        </div>
                                    </div>
                                </Link>
                                <button className="bg-white text-violet-600 py-2 px-8 rounded-lg border border-violet-600 mt-2 roboto w-60">
                                    <a href={`/${blog.slug}`}>Read More ...</a>
                                </button>
                                <div className='text-end pr-10 Raleway'>Views: {blog.viewCount}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center p-10">No blogs available</p>
                )}
            </section>
        </div>
    );
};

export default PopularBlogs;

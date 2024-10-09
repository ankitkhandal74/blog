import { useRouter } from 'next/router';
import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import axios from 'axios';
import PopularBlogs from '@/components/PopularBlogs';
import Link from 'next/link';

export default function BlogPost({ blog }) {
    const router = useRouter();
    const { slug } = router.query;

    // Increment the view count when the page renders
    useEffect(() => {
        if (slug) {
            axios.post('/api/increment-view', { slug })
                .then((response) => {
                    console.log('View count updated:', response.data);
                })
                .catch((error) => {
                    console.error('Error updating view count:', error);
                });
        }
    }, [slug]);

    const [authors, setAuthors] = useState([]);


    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    const hasBlogData = blog && Array.isArray(blog.authors);

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    useEffect(() => {
        async function fetchAuthors() {
            if (hasBlogData) {
                const authorSlugs = blog.authors.map((author) => author.slug); // Assuming `blog.authors` contains slugs
                const res = await fetch('/api/get-authors', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ authorSlugs }),
                });
                const data = await res.json();
                if (data.success) {
                    setAuthors(data.data);
                }
            }
        }

        fetchAuthors();
    }, [hasBlogData, blog.authors]);

    const [content, setContent] = useState(blog.content);

    useEffect(() => {
        const replaceAdPlaceholders = async () => {
            let updatedContent = blog.content;

            // Find all placeholders like {{AD_1}}, {{AD_2}}, etc.
            const adPlaceholders = blog.content.match(/{{AD_\d+}}/g);

            if (adPlaceholders) {
                for (const placeholder of adPlaceholders) {
                    const identifier = placeholder.replace(/{{|}}/g, ''); // Extract AD_1, AD_2, etc.
                    const response = await fetch(`/api/ads/${identifier}`);
                    const ad = await response.json();

                    // Replace placeholder with the actual ad script
                    const adHtml = ad.adCode;
                    updatedContent = updatedContent.replace(placeholder, adHtml);
                }
            }

            setContent(updatedContent);
        };

        replaceAdPlaceholders();
    }, [blog.content]);

    return (
        <div className="overflow-x-hidden">
            <Header />
            <div className="flex justify-center items-center">
                <div className="flex flex-col relative">
                    <div className="pt-20 pb-32 aboutbax titelbg ">
                        <h1 className="text-5xl max-md:text-3xl font-medium text-balance text-center Raleway">
                            {blog?.title || 'Loading...'}
                        </h1>
                        <ul className="mt-4 mb-8 flex flex-wrap items-center justify-center space-x-3 text-text Raleway">
                            <li>
                                {hasBlogData
                                    ? authors.map((author, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-2"
                                        >
                                            <div className="h-10 w-10 bg-yellow-500 rounded-full overflow-hidden">
                                                <img
                                                    src={author.image}
                                                    alt={blog.authors}
                                                    className="h-10 mr-2"
                                                />
                                            </div>
                                            <span>{blog.authors}</span>
                                        </div>
                                    ))
                                    : 'No authors available'}
                            </li>
                            <li className="top-1 right-4">
                                {hasBlogData
                                    ? formatDate(blog.date)
                                    : 'Loading...'}
                            </li>
                            <li>
                                <p>
                                    <Link href={/categories/${blog.categories}}>
                                        {blog.categories}
                                    </Link>
                                </p>
                            </li>
                            <li>Views: {blog.viewCount}</li>
                        </ul>
                    </div>
                    <div className="flex karla">
                        <div className="w-[30vw] max-md:hidden">
                            <div className="bg-gray-200 m-5 rounded-xl p-5 h-[600px]">
                                <h2 className="text-2xl p-2">Categories</h2>
                                <div className="mx-10 flex gap-2">
                                    {blog?.categories.map((category, i) => (
                                        <div key={i} className="p-2">
                                            <p>
                                                <Link href={`/categories/${blog.categories}`}>
                                                    {blog.categories}
                                                </Link>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t-[2px] border-gray-500 m-5"></div>
                                <h2 className="text-2xl p-2">Tags</h2>
                                <div className="mx-10 gap-2 grid grid-cols-3">
                                    {blog?.tags.map((tag, i) => (
                                        <div key={i} className="p-2">
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t-[2px] border-gray-500 m-5"></div>
                                <h2 className="text-2xl p-2">Authors</h2>
                                <div className="mx-10">
                                    {hasBlogData
                                        ? authors.map((author, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-2"
                                            >
                                                <div className="h-10 w-10 bg-yellow-500 rounded-full overflow-hidden">
                                                    <img
                                                        src={author.image}
                                                        alt={blog.authors}
                                                        className="h-10 mr-2"
                                                    />
                                                </div>
                                                <span>{blog.authors}</span>
                                            </div>
                                        ))
                                        : 'No authors available'}
                                </div>
                            </div>
                        </div>
                        <div className="w-[70vw] karla max-md:w-full">
                            <div className="">
                                <img
                                    src={
                                        blog?.image || '/default-image.jpg'
                                    }
                                    alt={blog?.title || 'Default Title'}
                                    className="md:max-h-[500px] md:max-w-[65vw] m-auto my-5 mb-10 rounded-xl max-md:w-full max-md:h-auto max-md:p-4 max-md:rounded-3xl"
                                />
                            </div>
                            <div className="text-xl p-10">
                                <h2 className="text-2xl mb-2">Description</h2>
                                {blog?.description || 'Loading...'}
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: content }} className="content text-xl p-10" />
                        </div>
                    </div>
                </div>
            </div>
            <section>
                <PopularBlogs />
            </section>

            <Footer />
        </div>
    );
}

export async function getServerSideProps({ params }) {
    await dbConnect();
    const blog = await Blog.findOne({ slug: params.slug }).lean();

    if (!blog) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            blog: JSON.parse(JSON.stringify(blog)),
        },
    };
}

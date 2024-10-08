import dbConnect from '@/lib/db'; // MongoDB connection utility
import Blog from '@/models/Blog'; // Your Mongoose Blog model
import { useRouter } from 'next/router';
import Link from 'next/link'; // Make sure to import Link
import { truncateText } from '@/utils/truncateText';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CategoryPage = ({ blogs }) => {
  const router = useRouter();
  const { categories } = router.query;

  const formatCategories = (categories) => {
    if (!categories) return '';
    return decodeURIComponent(categories).replace(/%20/g, ' ');
  };

  const formattedCategories = formatCategories(categories);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  if (!blogs || blogs.length === 0) {
    return (
      <div>
        <Header />
        <div>No blogs found for this category.</div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className='flex flex-col justify-center items-center pt-16 titelbg'>
        <h1 className='text-5xl Raleway'>Categories</h1>
        <h2 className='text-3xl Raleway mt-4'>{formattedCategories}</h2>
      </div>
      <div className='grid grid-cols-3 p-10 px-20 m-auto gap-4'>
        {blogs.map((blog) => (
          <div key={blog._id} className="flex flex-col justify-between">
            {/* Wrap the entire card in one Link instead of having multiple */}
            <Link href={`/${blog.slug}`} passHref>
              <div className="flex flex-col cursor-pointer">
                <div className='max-h-52 rounded-xl overflow-hidden'>
                  <img src={blog.image} alt={blog.title} className='object-cover rounded-xl max-md:w-full max-md:h-auto w-auto m-auto' />
                </div>
                <div className='pt-4 pb-2 flex gap-4 roboto'>
                  <p className='text-black text-sm'>
                    {blog.categories}
                  </p>
                  <p className='text-gray-500 text-sm'>{formatDate(blog.date)}</p>
                </div>
                <div className='text-2xl font-medium Raleway'>{blog.title}</div>
                <div className='text-gray-600 py-2 roboto'>
                  {truncateText(blog.description, 15)} {/* Adjust as needed */}
                </div>
                <button className="bg-white text-violet-600 py-2 px-8 rounded-lg border border-violet-600 mt-2 roboto w-60">
                  Read More ...
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  // Fetch blogs by category, ensure categories match the slug format
  const blogs = await Blog.find({ categories: { $regex: params.categories.replace(/-/g, ' '), $options: 'i' } }).lean();

  return {
    props: {
      blogs: JSON.parse(JSON.stringify(blogs)),
    },
  };
}

export default CategoryPage;

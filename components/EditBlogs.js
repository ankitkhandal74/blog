import { useEffect, useState } from 'react';
import { htmlToText } from 'html-to-text';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function EditBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    date: '',
    categories: '',
    authors: '',
    tags: '',
    draft: false,
    image: '',
  });
  const [imageFile, setImageFile] = useState(null);

  // Fetch blogs on component mount
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

  // const generateSlug = (title) => {
  //   return title
  //     .toLowerCase()
  //     .replace(/\s+/g, '-')
  //     .replace(/[^\w\-]+/g, '');
  // };

  const generateSlug = (title) => {
    return title
      .replace(/\s+/g, '-')  // White spaces replaced by hyphens
      .replace(/[^\w\-:\u0900-\u097F]+/g, '');  // Removes unwanted characters but keeps Hindi characters and punctuation like ":"
  };
  

  const handleBlogSelect = (blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      description: blog.description,
      content: blog.content, // Set HTML content directly
      date: blog.date,
      categories: blog.categories.join(', '),
      authors: blog.authors.join(', '),
      tags: blog.tags.join(', '),
      draft: blog.draft,
      image: blog.image,
    });
  };


  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle content change (for ReactQuill)
  const handleContentChange = (value) => {
    setFormData({
      ...formData,
      content: value,
    });
  };

  // Handle image change
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Upload image to server
  const uploadImage = async () => {
    if (!imageFile) return ''; // No image selected

    const imageFormData = new FormData();
    imageFormData.append('file', imageFile);

    try {
      const res = await fetch('/api/upload-image', {
        method: 'POST',
        body: imageFormData,
      });

      if (res.ok) {
        const data = await res.json();
        return data.url; // Return the URL of the uploaded image
      } else {
        alert('Error uploading image');
        return '';
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      return '';
    }
  };

  // Handle form submission to update the blog
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = await uploadImage();
    const slug = generateSlug(formData.title);

    const updatedFormData = {
      ...formData,
      image: imageUrl || selectedBlog.image,
      slug
    };

    if (!selectedBlog) return;

    try {
      const res = await fetch(`/api/update-blog/${selectedBlog._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });

      const data = await res.json();
      if (data.success) {
        alert('Blog updated successfully!');
      } else {
        alert('Failed to update the blog');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  const handleDelete = async (e, blogId) => {
    e.stopPropagation(); // Prevent triggering the blog selection when clicking the delete button

    const confirmed = confirm("Are you sure you want to delete this blog?");
    if (confirmed) {
      try {
        const res = await fetch(`/api/delete-blog`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: blogId }),
        });

        const data = await res.json();
        if (data.success) {
          alert("Blog deleted successfully");
          // Optionally refresh the list of blogs after deletion
          setBlogs(blogs.filter((blog) => blog._id !== blogId));
        } else {
          alert("Failed to delete the blog");
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("An error occurred while deleting the blog");
      }
    }
  };


  return (
    <div className="flex p-5">
      {/* Left column: List of blogs */}
      <div className="w-[18vw] border-r p-4">
        <h2 className="text-2xl mb-4">All Blogs</h2>
        <ul>
          {blogs.map((blog) => (
            <li
              key={blog._id}
              className={`cursor-pointer p-2 mb-2 ${selectedBlog && selectedBlog._id === blog._id ? 'bg-blue-200' : ''
                }`}
              onClick={() => handleBlogSelect(blog)}
            >
              <div className="flex justify-between items-center">
                <span>{blog.title}</span>
                <button
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-700"
                  onClick={(e) => handleDelete(e, blog._id)} // Pass the blog ID to delete function
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>


      {/* Right column: Edit selected blog */}
      <div className=" p-4">
        {selectedBlog ? (
          <div className="bg-white rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  {/* Title Field */}
                  <div>
                    <label className="block text-lg font-medium mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                      placeholder="Title"
                    />
                  </div>

                  {/* Description Field */}
                  <div>
                    <label className="block text-lg font-medium mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                      placeholder="Description"
                    />
                  </div>

                  {/* Content Field (ReactQuill) */}
                  <div>
                    <label className="block text-lg font-medium mb-2">Content</label>
                    <ReactQuill
                      theme="snow"
                      value={formData.content}
                      onChange={handleContentChange}
                      className="bg-white rounded-lg h-80 text-content"
                      placeholder="Write your blog content here..."
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, 3, 4, false] }],
                          ['bold', 'italic', 'underline', 'strike'],
                          [{ list: 'ordered' }, { list: 'bullet' }],
                          [{ indent: '-1' }, { indent: '+1' }],
                          [{ align: [] }],
                          ['link', 'image', 'video'],
                          ['clean'],
                        ],
                      }}
                      formats={[
                        'header',
                        'bold',
                        'italic',
                        'underline',
                        'strike',
                        'list',
                        'bullet',
                        'indent',
                        'align',
                        'link',
                        'image',
                        'video',
                      ]}
                    />
                  </div>
                  <div className='flex my-40 mx-10 gap-20'>
                    <div className="w-64">
                      {/* Date Field */}
                      <div>
                        <label className="block text-lg font-medium mb-2">Date</label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                        />
                      </div>

                      {/* Image Upload */}
                      <div>

                        <label className="block text-lg font-medium mb-2">Image Upload</label>
                        <img
                          src={formData.image}
                          alt={formData.title}
                          className={`object-cover rounded-xl transition-all duration-300 ease-in-out h-52 max-md:w-full max-md:h-auto`} // Same image size for all blogs in mobile view
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                        />
                      </div>


                    </div>
                    <div className="w-64">
                      {/* Categories */}
                      <div>
                        <label className="block text-lg font-medium mb-2">Categories</label>
                        <input
                          type="text"
                          name="categories"
                          placeholder="Comma-separated categories"
                          value={formData.categories}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                        />
                      </div>

                      {/* Authors */}
                      <div>
                        <label className="block text-lg font-medium mb-2">Authors</label>
                        <input
                          type="text"
                          name="authors"
                          placeholder="Comma-separated authors"
                          value={formData.authors}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                        />
                      </div>

                      {/* Tags */}
                      <div>
                        <label className="block text-lg font-medium mb-2">Tags</label>
                        <input
                          type="text"
                          name="tags"
                          placeholder="Comma-separated tags"
                          value={formData.tags}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                        />
                      </div>

                      {/* Draft Checkbox */}
                      <div className="mt-4">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="draft"
                            checked={formData.draft}
                            onChange={() =>
                              setFormData((prevState) => ({
                                ...prevState,
                                draft: !prevState.draft,
                              }))
                            }
                            className="form-checkbox h-4 w-4"
                          />
                          <span className="ml-2 text-lg font-medium">Draft</span>
                        </label>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
                      >
                        Save Changes
                      </button>

                    </div>
                  </div>
                </div>

                {/* Sidebar with Additional Fields */}

              </div>
            </form>
          </div>
        ) : (
          <div>Select a blog to edit</div>
        )}
      </div>
    </div>
  );
}

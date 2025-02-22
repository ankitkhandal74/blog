
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useRouter } from 'next/router';

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});

import 'react-quill/dist/quill.snow.css';

const WriteBlogs = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    image: '', // This will store the URL of the uploaded image
    categories: '',
    authors: '',
    tags: '',
    draft: false,
    content: '',
  });
  const [imageFile, setImageFile] = useState(null); // Track the selected image file
  const router = useRouter();

  // Upload image to the server
  const uploadImage = async () => {
    if (!imageFile) return '';

    const imageFormData = new FormData();
    imageFormData.append('file', imageFile);

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
  };

  // Generate slug from the title
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
  

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Generate slug and check if the title exists
    const slug = generateSlug(formData.title);
  
    // Upload image and get URL
    const imageUrl = await uploadImage();
  
    // Check if image upload failed
    if (!imageUrl) {
      alert('Image upload failed, please try again.');
      return; // Prevent form submission if image upload fails
    }
  
    const updatedFormData = { ...formData, image: imageUrl, slug };
  
    // Submit blog post data
    const res = await fetch('/api/save-blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFormData),
    });
  
    if (res.ok) {
      alert('Blog post saved successfully!');
    } else {
      alert('Error saving blog post');
    }
  };
  

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle ReactQuill content change
  const handleContentChange = (content) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      content,
    }));
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6">Write a New Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-4">
          <div className="flex-1">
            {/* Title Field */}
            <div>
              <label className="block text-lg font-medium mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
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
                onChange={handleChange}
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
                className="bg-white rounded-lg h-80"
                placeholder="Write your blog content here..."
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, 4, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ indent: '-1' }, { indent: '+1' }],
                    [{ align: [] }],
                    ['link', 'image', 'video'],
                    ['code-block', 'blockquote'],
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
                  'code-block',
                  'blockquote',
                  
                ]}
              />
            </div>
          </div>

          {/* Sidebar with Additional Fields */}
          <div className="w-64">
            {/* Date Field */}
            <div>
              <label className="block text-lg font-medium mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-lg font-medium mb-2">Image Upload</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Categories */}
            <div>
              <label className="block text-lg font-medium mb-2">Categories</label>
              <input
                type="text"
                name="categories"
                placeholder="Comma-separated categories"
                value={formData.categories}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Draft Checkbox */}
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                name="draft"
                checked={formData.draft}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-lg font-medium">Draft</label>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors duration-300"
            >
              Save Blog
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WriteBlogs;

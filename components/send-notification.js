import { useState } from 'react';


export default function SendNotification() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [action, setAction] = useState('');
  const [url , setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [imageFile, setImageFile] = useState(null);

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

  


  const sendNotification = async () => {

    const imageUrl = await uploadImage();

    setLoading(true);
    try {
      const res = await fetch('/api/send-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({title, body, image: imageUrl, action , url }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(JSON.stringify(data));
    } catch (error) {
      console.error('Error sending notification:', error);
      setResponse('Error sending notification', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div>
      <h1>Send Notification</h1>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Body:</label>
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      
      <div>
        <label>action</label>
        <input
          type="text"
          value={action}
          onChange={(e) => setAction(e.target.value)}
        />
      </div>
      <div>
        <label>url:</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div>
              <label className="block text-lg font-medium mb-2">Image Upload</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
              />
            </div>
      <button onClick={sendNotification} disabled={loading}>
        {loading ? 'Sending...' : 'Send Notification'}
      </button>
      {response && <div>Response: {response}</div>}
    </div>
  );
}

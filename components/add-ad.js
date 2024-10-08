// pages/admin/add-ad.js
import { useState } from 'react';

export default function AddAdPage() {
  const [identifier, setIdentifier] = useState('');
  const [adCode, setAdCode] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adData = { identifier, adCode, description };

    try {
      const res = await fetch('/api/ads/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adData),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage('Ad saved successfully!');
        setIdentifier('');
        setAdCode('');
        setDescription('');
      } else {
        setMessage(result.message || 'Error saving ad.');
      }
    } catch (error) {
      setMessage('Error saving ad.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 shadow-lg rounded bg-white">
      <h1 className="text-2xl font-bold mb-4">Add New Ad</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Identifier (e.g., AD_1)</label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Enter ad identifier"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Ad Code (e.g., Google Ad script)</label>
          <textarea
            value={adCode}
            onChange={(e) => setAdCode(e.target.value)}
            placeholder="Paste the ad code here"
            className="w-full px-3 py-2 border rounded h-40"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description (Optional)</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a description (optional)"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Ad</button>
      </form>

      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}

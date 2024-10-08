import { useState } from 'react';
import withAuth from '../components/withAuth';
import WriteBlogs from '@/components/WriteBlogs';
import EditBlogs from '@/components/EditBlogs';
import SendNotification from '@/components/send-notification.js'
import Messages from '@/components/Messages'

const Admin = () => {
  // State to track which section is currently active
  const [activeSection, setActiveSection] = useState('dashboard');

  // Function to render different content based on the active button
  const renderContent = () => {
    switch (activeSection) {
      case 'writeBlogs':
        return <WriteBlogs />;
      case 'editBlogs':
        return <EditBlogs />;
      case 'Contact Message':
        return <Messages />;
      case 'Send Notification':
        return <SendNotification />;
      default:
        return null; // You can return a fallback component or `null` for no content
    }
  };
  

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-2xl font-bold text-center border-b border-gray-700">
          Admin Panel
        </div>
        <ul className="p-4">
          <li className={`p-2 ${activeSection === 'writeBlogs' ? 'bg-gray-700' : ''}`}>
            <button onClick={() => setActiveSection('writeBlogs')} className="w-full text-left">
              Write Blogs
            </button>
          </li>
          <li className={`p-2 ${activeSection === 'editBlogs' ? 'bg-gray-700' : ''}`}>
            <button onClick={() => setActiveSection('editBlogs')} className="w-full text-left">
              Edit Blogs
            </button>
          </li>
          <li className={`p-2 ${activeSection === 'Add ads' ? 'bg-gray-700' : ''}`}>
            <button onClick={() => setActiveSection('Add ads')} className="w-full text-left">
              Add Ads
            </button>
          </li>
          <li className={`p-2 ${activeSection === 'Send Notification' ? 'bg-gray-700' : ''}`}>
            <button onClick={() => setActiveSection('Send Notification')} className="w-full text-left">
              Send Notification
            </button>
          </li>
          <li className={`p-2 ${activeSection === 'Contact Message' ? 'bg-gray-700' : ''}`}>
            <button onClick={() => setActiveSection('Contact Message')} className="w-full text-left">
            Contact Message
            </button>
          </li>
        </ul>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-8 bg-gray-100">
        {renderContent()}
      </div>
    </div>
  );
};

export default withAuth(Admin);

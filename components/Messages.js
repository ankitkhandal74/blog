import { useEffect, useState } from 'react';
import moment from 'moment'; // Import moment.js to format date and time

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch('/api/messages'); // API route to fetch messages from the DB
      const data = await res.json();
      setMessages(data);
      setLoading(false);
    };

    fetchMessages();
  }, []);

  if (loading) {
    return <p>Loading messages...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">User Messages</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Message</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Time</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message._id}>
                <td className="py-2 px-4 border">{message.name}</td>
                <td className="py-2 px-4 border">{message.email}</td>
                <td className="py-2 px-4 border">{message.number}</td>
                <td className="py-2 px-4 border">{message.message}</td>
                <td className="py-2 px-4 border">
                  {moment(message.createdAt).format('YYYY-MM-DD')} {/* Format date */}
                </td>
                <td className="py-2 px-4 border">
                  {moment(message.createdAt).format('HH:mm')} {/* Format time */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Messages;

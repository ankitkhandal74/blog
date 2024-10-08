import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Contact = () => {

  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    message: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/get-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setResponseMessage(data.message);
        setFormData({
          name: '',
          number: '',
          email: '',
          message: '',
        });
      } else {
        setResponseMessage(data.message || 'Failed to send message');
      }
    } catch (error) {
      setResponseMessage('An error occurred');
    }
  };

  
  useEffect(() => {
    const loadVantaEffect = () => {
      if (window.VANTA) {
        window.VANTA.WAVES({
          el: ".vanta-bg", // The div class where the Vanta background will be applied
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.0,
          scaleMobile: 1.0
        });
      }
    };

    // Load VANTA scripts
    const loadScripts = () => {
      const threeScript = document.createElement("script");
      threeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js";
      document.head.appendChild(threeScript);

      const vantaScript = document.createElement("script");
      vantaScript.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js";
      document.head.appendChild(vantaScript);

      vantaScript.onload = loadVantaEffect;
    };

    loadScripts();

    return () => {
      // Cleanup Vanta on unmount if required
      if (window.VANTA && window.VANTA.current) {
        window.VANTA.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      <Header />
      <div className=' vanta-bg  w-full md:pt-10 pt-8 pb-10 flex max-md:flex-col'>
        <div className="md:w-1/3 w-[90vw] m-auto  p-4 bg-cyan-500 bg-opacity-70  rounded-lg border-cyan-500 border-[2px] karla">
          <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder='Name'
                required
                className="w-full p-2 border border-gray-300 rounded text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black">Phone Number</label>
              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
                placeholder='Phone Number'
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder='Email'
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder='Message'
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            {responseMessage && <p>{responseMessage}</p>}
            <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded ">
              Send Message
            </button>
          </form>
        </div>

        <div>
          <div className="md:m-10 mt-10 mx-4 h-[350px] rounded-xl max-md:w-[90vw] karla">
            <div className="relative p-4 md:m-10 w-[500px] z-10 text-white bg-cyan-500 bg-opacity-70 rounded-xl border-[2px] border-cyan-500 max-md:w-[90vw]">
              <p className="text-xl text-center">We are available 24x7 for you!</p>
              <p className="my-2 text-3xl font-medium text-center">Contact Us</p>
              <p className="text-xl pl-10">
                Call us{" "}
                <a className="text-blue-500">
                Temporary Unavailable
                </a>
              </p>
              <p className="text-xl pl-10">
                Email:{" "}
                <a className="text-blue-500">
                Temporary Unavailable
                </a>
              </p>
              <p className="text-xl pl-10">
                WhatsApp us{" "}
                <a  className="text-blue-500">
                  Temporary Unavailable
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;

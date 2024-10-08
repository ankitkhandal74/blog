import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false); // State to manage mobile menu visibility
    const router = useRouter();
    const currentRoute = router.pathname;
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [searchOpen, setSearchOpen] = useState(false);

    // Function to toggle the mobile menu
    const toggleMenu = () => {
        setMenuOpen((prevState) => !prevState); // Toggle menuOpen state
    };

    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
    };

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            try {
                // Update the API endpoint to search for blogs
                const res = await fetch(`/api/blogs/search?query=${searchQuery}`);
                const data = await res.json();
                setSuggestions(data.blogs); // Adjust to whatever your API returns
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        };

        fetchSuggestions();
    }, [searchQuery]);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
    };

    const handleSuggestionClick = (slug) => {
        setSearchQuery(''); // Clear the search input
        setSuggestions([]); // Clear suggestions
        router.push(`/${slug}`); // Redirect to the blog post page using the slug
    };

    return (
        <div className="relative flex justify-between md:px-12 px-4 h-16 shadow-xl border-b-2 Raleway">
            <div className="flex justify-center">
                <img src='/logo1.png' className="h-40 max-md:h-32 w-auto absolute -top-8 max-md:-top-6  left-6" />
            </div>

            <div className="flex items-center gap-6">
                {/* Desktop Menu */}
                <ul className="flex gap-10 max-md:hidden">
                    <li className={`cursor-pointer ${currentRoute === "/" ? "text-violet-600" : "hover:text-violet-600"}`}>
                        <Link href="/">Home</Link>
                    </li>
                    <li className={`cursor-pointer ${currentRoute === "/Contact" ? "text-violet-600" : "hover:text-violet-600"}`}>
                        <Link href="/Contact">Contact Us</Link>
                    </li>
                    <li className={`cursor-pointer ${currentRoute === "/About" ? "text-violet-600" : "hover:text-violet-600"}`}>
                        <Link href="/About">About</Link>
                    </li>
                </ul>

                <div className="relative">
                    <img
                        src="/search.svg"
                        className="h-5 cursor-pointer"
                        alt="search icon"
                        onClick={toggleSearch}
                    />
                </div>
                {searchOpen && (
                    <div className='absolute inset-0 bg-opacity-50 z-20 flex md:left-[25vw] items-start md:mt-4 max-md:m-2'>
                        <div className='relative w-full max-w-lg rounded-2xl shadow-2xl p-4 bg-white drop-shadow-[0_10px_15px_rgba(0,0,0,0.1)]'>
                            <button onClick={toggleSearch} className='absolute top-2 right-2 text-black text-4xl'>×</button>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search for Blog..."
                                className="md:w-96 w-80 px-4 py-2 rounded-2xl text-black border-violet-600 border focus:outline-none"
                            />
                            {suggestions.length > 0 && (
                                <ul className="mt-2 bg-white border shadow-lg rounded-xl">
                                    {suggestions.map((blog) => (
                                        <li
                                            key={blog._id}
                                            className="px-4 py-2 hover:bg-violet-600 cursor-pointer "
                                            onClick={() => handleSuggestionClick(blog.slug)} // Use the slug for navigation
                                        >
                                            {blog.title} {/* Adjust to display the title or any other relevant info */}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                    </div>
                )}

                {/* Blogs link as button */}
                <Link href="/Blog">
                    <div className="bg-violet-500 text-sm text-white md:py-4 py-2 hover:scale-95 md:px-12 px-6 rounded-lg">
                        Blogs
                    </div>
                </Link>

                {/* Menu button for mobile view */}
                <button onClick={toggleMenu} className="md:hidden">
                    <img src="/menu_button.svg" className="h-6" alt="menu button" />
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <nav className="fixed top-2 right-2 h-80 z-50 shadow-2xl w-[60vw] rounded-2xl bg-gray-200">
                    <ul className="flex flex-col items-center space-y-4 py-4 mt-16">
                        <button onClick={toggleMenu} className="md:hidden absolute top-4 right-4">
                            <img src="/menu_button.svg" className="h-6" alt="menu button" />
                        </button>
                        <li className={`px-[20vw] rounded-lg text-center ${currentRoute === "/" ? "bg-violet-600 text-white" : "hover:bg-violet-600"}`}>
                            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
                        </li>
                        <li className={`px-[12vw] rounded-lg text-center ${currentRoute === "/Contact" ? "bg-violet-600 text-white" : "hover:bg-violet-600"}`}>
                            <Link href="/Contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
                        </li>
                        <li className={`px-[20vw] rounded-lg text-center ${currentRoute === "/About" ? "bg-violet-600 text-white" : "hover:bg-violet-600"}`}>
                            <Link href="/About" onClick={() => setMenuOpen(false)}>About</Link>
                        </li>
                        <li className={`px-[12vw] rounded-lg text-center ${currentRoute === "/privacy-policy" ? "bg-violet-600 text-white" : "hover:bg-violet-600"}`}>
                            <Link href="/privacy-policy" onClick={() => setMenuOpen(false)}>privacy policy</Link>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
}

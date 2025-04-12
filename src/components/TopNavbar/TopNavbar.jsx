import { useState, useEffect } from 'react';
import { Menu, X, BookOpen, Users, Home, Phone, LogIn,Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from "../../assets/EASC-logo.png";

const TopNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Toggle mobile menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Navigation items with icons
    const navItems = [
        { name: 'Home', icon: <Home size={18} />, path: '/' },
        { name: 'About Us', icon: <Users size={18} />, path: '/about' },
        { name: 'Courses', icon: <BookOpen size={18} />, path: '/courses' },
        { name: 'Services', icon: <Briefcase size={18} />, path: '/services' },
        { name: 'Contact Us', icon: <Phone size={18} />, path: '/contact' },
        
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled
                    ? 'bg-white shadow-md py-2'
                    : 'bg-white/90 backdrop-blur-sm py-4'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <div className="h-10 w-10  rounded-md flex items-center justify-center overflow-hidden">
                                {/* Replace the EA text with an image */}
                                <img src={logo} alt="EASC Logo" className="logo" />
                            </div>
                            <span className="ml-2 text-xl font-bold text-gray-800 hidden sm:block">
                                EASC
                            </span>
                            <span className="ml-2 text-sm text-gray-600 hidden lg:block">
                                Energy Auditors Study Centre
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className="flex items-center text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                            >
                                <span className="mr-1">{item.icon}</span>
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            to="/login"
                            className="ml-2 inline-flex items-center px-4 py-2 bg-emerald-600 border border-transparent rounded-md font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200"
                        >
                            <LogIn size={18} className="mr-1" />
                            Login
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 focus:outline-none"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-lg">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className="flex items-center text-gray-700 hover:text-emerald-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="mr-2">{item.icon}</span>
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            to="/login"
                            className="flex items-center justify-center w-full mt-2 px-4 py-2 bg-emerald-600 border border-transparent rounded-md font-medium text-white hover:bg-emerald-700"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <LogIn size={18} className="mr-1" />
                            Login
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default TopNavbar;
import { useState, useEffect, useRef } from 'react';
import { Menu, X, BookOpen, Users, Home, Phone, LogIn, Briefcase, PenLine, User, ShoppingCart, LogOut, Book, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/EASC-logo.png";
import Swal from "sweetalert2";

const TopNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isCoursesMenuOpen, setIsCoursesMenuOpen] = useState(false);
    // Add a separate state for mobile courses dropdown
    const [isMobileCoursesMenuOpen, setIsMobileCoursesMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    
    // Create refs for the dropdown menus
    const userMenuRef = useRef(null);
    const coursesMenuRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const mobileCoursesMenuRef = useRef(null);

    // Check authentication status on component mount
    useEffect(() => {
        // Check if user data exists in localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

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

    // Handle click outside dropdown menus
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Desktop dropdowns
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
            
            if (coursesMenuRef.current && !coursesMenuRef.current.contains(event.target)) {
                setIsCoursesMenuOpen(false);
            }
            
            // For the mobile menu, we don't want it to close when clicking inside it
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
                !event.target.closest('button[aria-label="toggle-menu"]')) {
                setIsMenuOpen(false);
            }
        };

        // Add event listener when any dropdown is open
        if (isUserMenuOpen || isCoursesMenuOpen || isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        
        // Clean up the event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isUserMenuOpen, isCoursesMenuOpen, isMenuOpen]);

    // Toggle mobile menu
    const toggleMenu = (e) => {
        if (e) e.stopPropagation(); // Prevent event from bubbling up
        setIsMenuOpen(!isMenuOpen);
    };

    // Toggle user dropdown menu
    const toggleUserMenu = (e) => {
        if (e) e.stopPropagation(); // Prevent event from bubbling up
        setIsUserMenuOpen(!isUserMenuOpen);
        // Close other menu when this one opens
        if (!isUserMenuOpen) {
            setIsCoursesMenuOpen(false);
        }
    };

    // Toggle courses dropdown menu (desktop)
    const toggleCoursesMenu = (e) => {
        if (e) e.stopPropagation(); // Prevent event from bubbling up
        setIsCoursesMenuOpen(!isCoursesMenuOpen);
        // Close other menu when this one opens
        if (!isCoursesMenuOpen) {
            setIsUserMenuOpen(false);
        }
    };

    // Toggle mobile courses dropdown menu
    const toggleMobileCoursesMenu = (e) => {
        if (e) e.stopPropagation(); // Prevent event from bubbling up
        setIsMobileCoursesMenuOpen(!isMobileCoursesMenuOpen);
    };

    // Handle logout
    const handleLogout = () => {
        // Remove user data from localStorage
        localStorage.removeItem('user');
        // Reset user state
        setUser(null);
        // Close dropdown menu
        setIsUserMenuOpen(false);
        // Close mobile menu
        setIsMenuOpen(false);

        // Show beautiful logout notification with SweetAlert2
        Swal.fire({
            icon: 'success',
            title: 'Logged Out!',
            text: 'You have successfully logged out.',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            position: 'top-end',
            toast: true,
            iconColor: '#10b981',
            customClass: {
                popup: 'colored-toast'
            }
        }).then(() => {
            // Redirect to home page after the alert closes
            navigate('/');
        });
    };

    // Navigation items with icons - note course is NOT included here as it's handled separately
    const navItems = [
        { name: 'Home', icon: <Home size={18} />, path: '/' },
        { name: 'About Us', icon: <Users size={18} />, path: '/about' },
        // Courses dropdown is inserted in the JSX between About Us and Services
        { name: 'Services', icon: <Briefcase size={18} />, path: '/services' },
        { name: 'Blogs', icon: <PenLine size={18} />, path: '/blogs' },
        { name: 'Contact Us', icon: <Phone size={18} />, path: '/contact' },
    ];

    // Course dropdown items
    const courseItems = [
        { name: 'CEMExamsPage',icon: <Book size={18} />, path: '/courses/cem-exams' },
        { name: 'CEAExamsPage',icon: <Book size={18} />, path: '/courses/cea-exams' },
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
                            <div className="h-10 w-10 rounded-md flex items-center justify-center overflow-hidden">
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
                        {/* Home and About Us */}
                        <Link
                            to="/"
                            className="flex items-center text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                        >
                            <Home size={18} className="mr-1" />
                            Home
                        </Link>

                        <Link
                            to="/about"
                            className="flex items-center text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                        >
                            <Users size={18} className="mr-1" />
                            About Us
                        </Link>

                        {/* Courses dropdown */}
                        <div className="relative" ref={coursesMenuRef}>
                            <button
                                onClick={toggleCoursesMenu}
                                className="flex items-center text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                            >
                                <BookOpen size={18} className="mr-1" />
                                Courses
                                <ChevronDown size={16} className="ml-1" />
                            </button>

                            {/* Courses Dropdown Menu */}
                            {isCoursesMenuOpen && (
                                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                    {courseItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.path}
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-emerald-600"
                                            onClick={() => setIsCoursesMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Services, Blogs, Contact Us */}
                        <Link
                            to="/services"
                            className="flex items-center text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                        >
                            <Briefcase size={18} className="mr-1" />
                            Services
                        </Link>

                        <Link
                            to="/blogs"
                            className="flex items-center text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                        >
                            <PenLine size={18} className="mr-1" />
                            Blogs
                        </Link>

                        <Link
                            to="/contact"
                            className="flex items-center text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                        >
                            <Phone size={18} className="mr-1" />
                            Contact Us
                        </Link>

                        {user ? (
                            <div className="relative" ref={userMenuRef}>
                                <button
                                    onClick={toggleUserMenu}
                                    className="flex items-center text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                                >
                                    <User size={20} className="text-emerald-600" />
                                    <span className="ml-2">{user.name?.split(' ')[0] || 'User'}</span>
                                </button>

                                {/* User Dropdown Menu */}
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                        <Link
                                            to="/my-cart"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            <ShoppingCart size={16} className="mr-2" />
                                            My Cart
                                        </Link>
                                        <Link
                                            to="/my-books"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            <Book size={16} className="mr-2" />
                                            My Books
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                        >
                                            <LogOut size={16} className="mr-2" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="ml-2 inline-flex items-center px-4 py-2 bg-emerald-600 border border-transparent rounded-md font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200"
                            >
                                <LogIn size={18} className="mr-1" />
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            aria-label="toggle-menu"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 focus:outline-none"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden" ref={mobileMenuRef}>
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-lg">
                        {/* Home */}
                        <Link
                            to="/"
                            className="flex items-center text-gray-700 hover:text-emerald-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Home size={18} className="mr-2" />
                            Home
                        </Link>

                        {/* About Us */}
                        <Link
                            to="/about"
                            className="flex items-center text-gray-700 hover:text-emerald-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Users size={18} className="mr-2" />
                            About Us
                        </Link>

                        {/* Courses dropdown for mobile */}
                        <div ref={mobileCoursesMenuRef}>
                            <button
                                className="flex items-center justify-between w-full text-gray-700 hover:text-emerald-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
                                onClick={toggleMobileCoursesMenu}
                            >
                                <div className="flex items-center">
                                    <BookOpen size={18} className="mr-2" />
                                    Courses
                                </div>
                                <ChevronDown size={18} className={`transition-transform ${isMobileCoursesMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isMobileCoursesMenuOpen && (
                                <div className="pl-8 mt-1 space-y-1">
                                    {courseItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.path}
                                            className="flex items-center text-gray-700 hover:text-emerald-600 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium"
                                            onClick={() => {
                                                setIsMobileCoursesMenuOpen(false);
                                                setIsMenuOpen(false);
                                            }}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Services */}
                        <Link
                            to="/services"
                            className="flex items-center text-gray-700 hover:text-emerald-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Briefcase size={18} className="mr-2" />
                            Services
                        </Link>

                        {/* Blogs */}
                        <Link
                            to="/blogs"
                            className="flex items-center text-gray-700 hover:text-emerald-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <PenLine size={18} className="mr-2" />
                            Blogs
                        </Link>

                        {/* Contact Us */}
                        <Link
                            to="/contact"
                            className="flex items-center text-gray-700 hover:text-emerald-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Phone size={18} className="mr-2" />
                            Contact Us
                        </Link>

                        {user ? (
                            <>
                                <div className="flex items-center px-3 py-2 text-gray-700">
                                    <User size={18} className="mr-2 text-emerald-600" />
                                    <span className="font-medium">{user.name || 'User'}</span>
                                </div>
                                <Link
                                    to="/my-cart"
                                    className="flex items-center px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <ShoppingCart size={18} className="mr-2" />
                                    My Cart
                                </Link>
                                <Link
                                    to="/my-books"
                                    className="flex items-center px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Book size={18} className="mr-2" />
                                    My Books
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center w-full text-left px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md"
                                >
                                    <LogOut size={18} className="mr-2" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center justify-center w-full mt-2 px-4 py-2 bg-emerald-600 border border-transparent rounded-md font-medium text-white hover:bg-emerald-700"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <LogIn size={18} className="mr-1" />
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default TopNavbar;
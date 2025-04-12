import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const TopNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`fixed w-full top-0 z-50 bg-white ${scrolled ? 'shadow-md' : 'border-b border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 border border-gray-300 px-6 py-2">
            <span className="font-bold text-gray-800">LOGO</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            <NavItem href="/" label="Home" />
            <NavItem href="/about" label="About Us" />
            <NavItem href="/books" label="Books" />
            <NavItem href="/contact" label="Contact US" />
            <NavItem href="/login" label="Login" />
          </div>

          {/* Mobile menu button */}
          {/* <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div> */}
        </div>
      </div>

      {/* Mobile Menu */}
      {/* {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
            <MobileNavItem href="/" label="Home" />
            <MobileNavItem href="/about" label="About Us" />
            <MobileNavItem href="/books" label="Books" />
            <MobileNavItem href="/contact" label="Contact US" />
            <MobileNavItem href="/login" label="Login" />
          </div>
        </div>
      )} */}
    </nav>
  );
};

// Desktop navigation item
const NavItem = ({ href, label }) => (
  <a
    href={href}
    className="border border-gray-300 px-4 py-1 text-sm text-gray-700 hover:bg-gray-100"
  >
    {label}
  </a>
);

// Mobile navigation item
const MobileNavItem = ({ href, label }) => (
  <a
    href={href}
    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
  >
    {label}8
  </a>
);

export default TopNavbar;
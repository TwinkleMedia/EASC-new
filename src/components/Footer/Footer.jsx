import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight, Send, BookOpen, Users, Briefcase, Home, PenLine } from 'lucide-react';
import logo from "../../assets/EASC-logo.png";
import Modal from './Modal';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter submission
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Top wave decoration */}
      {/* <div className="text-emerald-600">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path 
            fill="currentColor" 
            fillOpacity="0.2"
            d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          ></path>
        </svg>
      </div> */}

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Column 1: About */}
          <div>
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 bg-white rounded-md flex items-center justify-center overflow-hidden">
                <img src={logo} alt="EASC Logo" className="h-full w-full object-cover" />
              </div>
              <div className="ml-3">
                <h3 className="font-bold text-lg text-white">EAIC</h3>
                <p className="text-sm text-gray-300">Energy Auditors Information Centre</p>
              </div>
            </div>

            <p className="text-gray-400 mb-6">
              Leading the way in energy auditing education and certification. We provide comprehensive training programs for energy efficiency professionals.
            </p>

            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full bg-emerald-600/20 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-emerald-600/20 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-emerald-600/20 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Linkedin size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-emerald-600/20 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-emerald-600/20 flex items-center justify-center mr-2">
                <ArrowRight size={16} />
              </span>
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center">
                  <Home size={14} className="mr-2" /> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center">
                  <Users size={14} className="mr-2" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center">
                  <BookOpen size={14} className="mr-2" /> Courses
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center">
                  <Briefcase size={14} className="mr-2" /> Services
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center">
                  <PenLine size={14} className="mr-2" /> Blogs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center">
                  <Phone size={14} className="mr-2" /> Contact Us
                </Link>
              </li>
              {/* <li>
                <Link to="/login" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center">
                  <Award size={14} className="mr-2" /> Certification
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-emerald-600/20 flex items-center justify-center mr-2">
                <Phone size={16} />
              </span>
              Contact Us
            </h3>

            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="text-emerald-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Energy Street, Green Building<br />
                  Sustainable City, 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-emerald-400 mr-3 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-emerald-400 mr-3 flex-shrink-0" />
                <a href="mailto:info@easc.com" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  info@easc.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-emerald-600/20 flex items-center justify-center mr-2">
                <Send size={16} />
              </span>
              Newsletter
            </h3>

            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates, courses, and energy efficiency news.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-300 placeholder-gray-500"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-4 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>

            <div className="mt-6 p-4 bg-emerald-600/10 rounded-lg border border-emerald-600/20">
              <p className="text-sm text-emerald-400">
                Join over 2,500 energy professionals who trust our training programs and resources.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Energy Auditors Study Centre. All rights reserved.
            </p>

            <div className="flex space-x-6 mt-4 md:mt-0">
              <button
                onClick={() => setShowPrivacyModal(true)}
                className="text-gray-500 hover:text-emerald-400 text-sm transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setShowTermsModal(true)}
                className="text-gray-500 hover:text-emerald-400 text-sm transition-colors"
              >
                Terms of Service
              </button>
            </div>
            <Modal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)}>
              <PrivacyPolicy isModal={true} />
            </Modal>

            <Modal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)}>
              <TermsOfService isModal={true} />
            </Modal>
          </div>
        </div>
      </div>
    </footer>
  );

};

export default Footer;
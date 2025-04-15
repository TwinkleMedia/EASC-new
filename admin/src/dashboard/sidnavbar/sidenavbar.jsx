// SideNav.jsx
import { useState } from 'react';
import { Menu, X, Home, User, Settings, BarChart2, FileText, Calendar, HelpCircle, LogOut } from 'lucide-react';

const sidenavbar = () => {
  const [expanded, setExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };
  
//   **************************LogOut*************************************************************
const handleLogout = async () => {
    try {
      // Assuming your API endpoint is on the same domain
      const response = await fetch('/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Redirect to login page after successful logout
        window.location.href = '/login'; // Adjust the path as needed
      } else {
        console.error('Logout failed:', data.message);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
//   **********************************************************************************************
 


  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const menuItems = [
    { icon: <Home size={20} />, label: 'Dashboard', active: true },
    { icon: <BarChart2 size={20} />, label: 'Analytics' },
    { icon: <Calendar size={20} />, label: 'Calendar' },
    { icon: <FileText size={20} />, label: 'Documents' },
    { icon: <User size={20} />, label: 'Profile' },
    { icon: <Settings size={20} />, label: 'Settings' },
    { icon: <HelpCircle size={20} />, label: 'Help' },
  ];

  return (
    <>
      {/* Mobile toggle button - visible only on small screens */}
      <button 
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-green-600 text-white lg:hidden shadow-md hover:bg-green-700 transition-colors"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full bg-white shadow-xl z-40 transition-all duration-300 flex flex-col
          ${expanded ? 'w-64' : 'w-20'} 
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo section */}
        <div className="flex items-center justify-between p-4 border-b border-green-100">
          {expanded && (
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center">
               
              </div>
              <h1 className="ml-3 font-bold text-green-800 text-xl">EASC ADMIM</h1>
            </div>
          )}
          <button 
            className="p-2 rounded-md text-green-600 hover:bg-green-100 hidden lg:block"
            onClick={toggleSidebar}
          >
            {expanded ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation links */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a 
                  href="#" 
                  className={`flex items-center p-3 rounded-lg transition-colors
                    ${item.active 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'text-gray-700 hover:bg-green-100'
                    }
                    ${!expanded && 'justify-center'}`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {expanded && <span className="ml-3">{item.label}</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-green-100">
        <button 
            onClick={handleLogout}
            className={`flex items-center w-full p-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors
              ${!expanded && 'justify-center'}`}
          >
            <LogOut size={20} />
            {expanded && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default sidenavbar ;
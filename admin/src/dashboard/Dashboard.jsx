// Dashboard.jsx
import SideNav from './sidnavbar/sidenavbar';
import { Bell, Mail, Search, User } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Import the SideNav component */}
      <SideNav />
      
      {/* Main content area */}
      <div className="flex-1 lg:ml-64"> {/* Adjust margin to match expanded sidebar width */}
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center flex-1">
            <div className="relative w-64 max-w-full">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Mail size={20} className="text-gray-600" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-green-500 rounded-full"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-medium">
              <User size={20} />
            </div>
          </div>
        </header>
        
        {/* Dashboard content */}
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
          </div>
          
          {/* Stats Cards */}
          
          
          {/* Main content area */}
         
            
            {/* Right column - narrower content */}
            
              
              
         
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
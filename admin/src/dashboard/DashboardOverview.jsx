// page/DashboardOverview.jsx
import React from 'react';
import { BarChart2, Users, DollarSign, Award } from 'lucide-react';

const DashboardOverview = () => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Courses</h3>
              <p className="text-2xl font-bold mt-2">24</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <BarChart2 size={20} className="text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <span className="text-green-500 text-sm">+12%</span>
            <span className="text-gray-400 text-sm ml-2">from last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Active Students</h3>
              <p className="text-2xl font-bold mt-2">843</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users size={20} className="text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <span className="text-green-500 text-sm">+7%</span>
            <span className="text-gray-400 text-sm ml-2">from last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Revenue</h3>
              <p className="text-2xl font-bold mt-2">$12,453</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign size={20} className="text-purple-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <span className="text-green-500 text-sm">+18%</span>
            <span className="text-gray-400 text-sm ml-2">from last month</span>
          </div>
        </div>
        
    
      </div>
      
      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                <Users size={18} />
              </div>
              <div>
                <p className="font-medium">5 new students enrolled</p>
                <p className="text-sm text-gray-500">Web Development Course</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                <DollarSign size={18} />
              </div>
              <div>
                <p className="font-medium">New payment received</p>
                <p className="text-sm text-gray-500">$350 - Mobile App Development</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">5 hours ago</span>
          </div>
          
          
        </div>
      </div>
    </>
  );
};

export default DashboardOverview;
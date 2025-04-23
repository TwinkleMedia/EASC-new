import { useState } from 'react';
import CouponForm from './CouponForm';
import CouponList from './CouponList';

export default function CouponManagement() {
  const [activeTab, setActiveTab] = useState('list');
  const [refreshList, setRefreshList] = useState(false);
  
  // Reference to the CouponList component to call its refresh method
  const couponListRef = React.createRef();
  
  const handleCouponCreated = () => {
    // Set refreshList to trigger update in child component
    setRefreshList(prev => !prev);
    
    // Switch to list view after creating a coupon
    setActiveTab('list');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-green-800 mb-8">
        Coupon Management
      </h1>
      
      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setActiveTab('list')}
            className={`px-5 py-2.5 text-sm font-medium rounded-l-lg ${
              activeTab === 'list'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            } border border-gray-200`}
          >
            View Coupons
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('create')}
            className={`px-5 py-2.5 text-sm font-medium rounded-r-lg ${
              activeTab === 'create'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            } border border-l-0 border-gray-200`}
          >
            Create New Coupon
          </button>
        </div>
      </div>
      
      {/* Content area */}
      <div className="mt-6">
        {activeTab === 'list' && (
          <CouponList refreshTrigger={refreshList} />
        )}
        
        {activeTab === 'create' && (
          <CouponForm onCouponCreated={handleCouponCreated} />
        )}
      </div>
    </div>
  );
}
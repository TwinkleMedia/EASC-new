
import { useState } from 'react';

export default function CouponForm({ onCouponCreated }) {
  const [coupon, setCoupon] = useState({
    code: '',
    discountPercentage: 0,
    startDate: getTodayString(),
    endDate: getNextMonthString(),
    isActive: true
  });

  function getTodayString() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  function getNextMonthString() {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth.toISOString().split('T')[0];
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCoupon({
      ...coupon,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Use the direct PHP file endpoint
      const response = await fetch('http://localhost/EASCBackend/SaveCoupon.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(coupon)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create coupon');
      }
      
      const result = await response.json();
      console.log('Coupon created:', result);
      alert('Coupon created successfully!');
      
      // Reset the form
      setCoupon({
        code: '',
        discountPercentage: 0,
        startDate: getTodayString(),
        endDate: getNextMonthString(),
        isActive: true
      });
      
      // Notify parent component
      if (onCouponCreated) {
        onCouponCreated();
      }
      
    } catch (error) {
      console.error('Error creating coupon:', error);
      alert(`Error: ${error.message}`);
    }
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-green-800">Create Coupon Code</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        {/* Coupon Code */}
        <div className="space-y-1 md:space-y-2">
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">
            Coupon Code
          </label>
          <input
            type="text"
            id="code"
            name="code"
            value={coupon.code}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            placeholder="e.g. SUMMER20"
            required
          />
        </div>

        {/* Discount Percentage */}
        <div className="space-y-1 md:space-y-2">
          <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-700">
            Discount Percentage
          </label>
          <div className="relative">
            <input
              type="number"
              id="discountPercentage"
              name="discountPercentage"
              min="0"
              max="100"
              value={coupon.discountPercentage}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center mr-3 text-gray-500">
              %
            </div>
          </div>
        </div>

        {/* Responsive Grid for Date Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Start Date */}
          <div className="space-y-1">
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={coupon.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              required
            />
            <p className="text-xs text-gray-500">When the coupon becomes active</p>
          </div>

          {/* End Date */}
          <div className="space-y-1">
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={coupon.endDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              required
            />
            <p className="text-xs text-gray-500">When the coupon expires</p>
          </div>
        </div>

        {/* Status Toggle */}
        <div className="space-y-1 md:space-y-2">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <div className="flex items-center space-x-3">
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={coupon.isActive}
                onChange={handleChange}
                className="opacity-0 absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label
                htmlFor="isActive"
                className={`block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer ${
                  coupon.isActive ? 'bg-green-500' : ''
                }`}
              >
                <span
                  className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                    coupon.isActive ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </label>
            </div>
            <span className="text-sm text-gray-700">
              {coupon.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <p className="text-xs text-gray-500">Toggle to activate or deactivate the coupon</p>
        </div>


    {/* Alternative Status as Dropdown */}
    <div className="space-y-1 md:space-y-2">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status (Dropdown Alternative)
          </label>
          <select
            id="status"
            name="isActive"
            value={coupon.isActive.toString()}
            onChange={(e) => handleChange({
              target: {
                name: 'isActive',
                value: e.target.value === 'true'
              }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-medium bg-green-600 hover:bg-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Create Coupon
          </button>
        </div>
      </form>
    </div>
  );
}
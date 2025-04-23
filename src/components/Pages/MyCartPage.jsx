import React, { useState, useEffect } from "react";
import { Trash2, ShoppingBag, AlertCircle, CreditCard, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const MyCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [couponLoading, setCouponLoading] = useState(false);

  // Tax rate (18% GST)
  const taxRate = 0.18;

  useEffect(() => {
    // Fetch cart items from localStorage
    const fetchCartItems = () => {
      setLoading(true);
      try {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);
          setCartItems(parsedCart);
          
          // Calculate subtotal
          const total = parsedCart.reduce(
            (sum, item) => sum + parseFloat(item.discounted_price || item.price || 0),
            0
          );
          setSubtotal(total);
        } else {
          setCartItems([]);
          setSubtotal(0);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
    fetchCoupons(); // Fetch coupons when component mounts
  }, []);

  // Fetch available coupons from the backend
  const fetchCoupons = async () => {
    setCouponLoading(true);
    try {
      const response = await fetch('http://localhost/EASCBackend/GetCoupons.php');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch coupons: ${response.status}`);
      }
      
      const data = await response.json();
      // Filter for active coupons only
      const activeCoupons = data.filter(coupon => coupon.isActive);
      setAvailableCoupons(activeCoupons);
    } catch (error) {
      console.error('Error fetching coupons:', error);
      // Don't show error to user - just fail silently as this is not critical
    } finally {
      setCouponLoading(false);
    }
  };

  // Handle removing item from cart
  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    
    // Update subtotal
    const newSubtotal = updatedCart.reduce(
      (sum, item) => sum + parseFloat(item.discounted_price || item.price || 0),
      0
    );
    setSubtotal(newSubtotal);
    
    // Reset coupon if cart is modified
    if (couponApplied) {
      setCouponApplied(false);
      setDiscount(0);
      setCouponError("");
    }
    
    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Handle coupon code application
  const handleApplyCoupon = () => {
    // Reset previous application state
    setCouponApplied(false);
    setCouponError("");
    setDiscount(0);

    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }

    // Find the coupon in our available coupons
    const coupon = availableCoupons.find(
      c => c.code.toUpperCase() === couponCode.toUpperCase()
    );

    if (!coupon) {
      setCouponError("Invalid coupon code");
      return;
    }

    // Check if coupon is still valid (compare dates)
    const currentDate = new Date();
    const startDate = new Date(coupon.startDate);
    const endDate = new Date(coupon.endDate);
    
    if (currentDate < startDate) {
      setCouponError("This coupon is not active yet");
      return;
    }
    
    if (currentDate > endDate) {
      setCouponError("This coupon has expired");
      return;
    }

    // Apply discount
    const discountAmount = subtotal * (coupon.discountPercentage / 100);
    setDiscount(discountAmount);
    setCouponApplied(true);
  };

  // Calculate order summary
  const tax = (subtotal - discount) * taxRate;
  const totalAmount = subtotal - discount + tax;

  // Proceed to checkout
  const handleCheckout = () => {
    // This would normally redirect to a payment gateway
    // For demo purposes, we'll just show an alert
    alert("Proceeding to payment gateway...");
    
    // Could implement redirect to a checkout page:
    // navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="pb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Cart</h1>
          <p className="mt-2 text-gray-600">Review and manage your selected courses.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingBag size={64} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-medium text-gray-700 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added any courses to your cart yet.
            </p>
            <Link
              to="/courses/cem-exams"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">
                    Cart Items ({cartItems.length})
                  </h2>
                </div>

                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="p-6">
                      <div className="flex flex-col sm:flex-row">
                        {/* Course Image */}
                        <div className="sm:flex-shrink-0 h-24 w-32 mb-4 sm:mb-0 bg-gray-100 rounded-md overflow-hidden">
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.title}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.parentNode.classList.add(
                                  "bg-gradient-to-r",
                                  "from-emerald-600",
                                  "to-teal-500"
                                );
                                e.target.parentNode.innerHTML = `
                                <div class="flex items-center justify-center h-full">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                  </svg>
                                </div>`;
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-r from-emerald-600 to-teal-500 flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-white"
                              >
                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Course Details */}
                        <div className="sm:ml-6 flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">
                                {item.title}
                              </h3>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.subject} - {item.paper || "Standard"}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.duration || "Self-paced"}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-medium text-emerald-700">
                                ₹{parseInt(
                                  item.discounted_price || item.price || 0
                                ).toLocaleString()}
                              </p>
                              {item.discounted_price && 
                                item.discounted_price !== item.price && (
                                <p className="text-sm text-gray-500 line-through">
                                  ₹{parseInt(item.price || 0).toLocaleString()}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Remove Button */}
                          <div className="mt-4 flex justify-end">
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="flex items-center text-sm text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={16} className="mr-1" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
                </div>

                <div className="p-6">
                  {/* Pricing Details */}
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <p className="text-base text-gray-600">Subtotal</p>
                      <p className="text-base font-medium text-gray-900">₹{subtotal.toLocaleString()}</p>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-700">
                        <p className="text-base">Discount</p>
                        <p className="text-base font-medium">- ₹{discount.toLocaleString()}</p>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <p className="text-base text-gray-600">Tax (18% GST)</p>
                      <p className="text-base font-medium text-gray-900">₹{tax.toLocaleString()}</p>
                    </div>

                    <div className="border-t border-gray-200 pt-4 flex justify-between">
                      <p className="text-base font-bold text-gray-900">Total</p>
                      <p className="text-xl font-bold text-emerald-700">₹{totalAmount.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Coupon Code */}
                  <div className="mt-6">
                    <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-1">
                      Apply Coupon Code
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        id="coupon"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        disabled={couponLoading}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
                      >
                        {couponLoading ? "Loading..." : "Apply"}
                      </button>
                    </div>
                    
                    {couponApplied && (
                      <p className="mt-2 text-sm text-emerald-600 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Coupon applied successfully!
                      </p>
                    )}
                    
                    {couponError && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle size={16} className="mr-1" />
                        {couponError}
                      </p>
                    )}

                    {/* Available coupon codes display */}
                    {availableCoupons.length > 0 && (
                      <div className="mt-3 text-xs text-gray-500">
                        <p>Available coupon codes:</p>
                        <ul className="mt-1">
                          {availableCoupons.slice(0, 3).map((coupon) => (
                            <li key={coupon.id} className="mt-1">
                              <span className="font-medium">{coupon.code}</span> - {coupon.discountPercentage}% off
                            </li>
                          ))}
                          {availableCoupons.length > 3 && (
                            <li className="mt-1">+ {availableCoupons.length - 3} more coupons available</li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Checkout Button */}
                  <div className="mt-6">
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center font-medium"
                      disabled={cartItems.length === 0}
                    >
                      <CreditCard size={18} className="mr-2" />
                      Proceed to Checkout
                    </button>
                  </div>

                  {/* Continue shopping */}
                  <div className="mt-4 text-center">
                    <Link
                      to="/courses/cem-exams"
                      className="inline-flex items-center text-sm text-emerald-600 hover:text-emerald-700"
                    >
                      Continue Shopping
                      <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCartPage;
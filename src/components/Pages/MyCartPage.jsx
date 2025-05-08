import React, { useState, useEffect } from "react";
import { Trash2, ShoppingBag, AlertCircle, CreditCard, ArrowRight, Clock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const MyCartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [couponLoading, setCouponLoading] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  // Get user info from localStorage with proper error handling
  const [userInfo, setUserInfo] = useState({});

  // Create a more robust isLoggedIn check function
  const isLoggedIn = () => {
    try {
      const userInfoData = localStorage.getItem("userInfo");
      if (!userInfoData) return false;
      
      const parsedUserInfo = JSON.parse(userInfoData);
      return Boolean(parsedUserInfo && parsedUserInfo.id);
    } catch (error) {
      console.error("Error checking login status:", error);
      return false;
    }
  };
  
  useEffect(() => {
    // Load user info with proper error handling
    try {
      const userInfoData = localStorage.getItem("userInfo");
      if (userInfoData) {
        const parsedUserInfo = JSON.parse(userInfoData);
        setUserInfo(parsedUserInfo);
        console.log("Current user info:", parsedUserInfo);
      }
    } catch (error) {
      console.error("Error loading user info:", error);
    }
    
    // Check if we have a token but no userInfo (potential cause of the issue)
    const token = localStorage.getItem("token");
    const userInfoData = localStorage.getItem("userInfo");
    
    if (token && (!userInfoData || userInfoData === "{}")) {
      console.log("Token exists but userInfo is missing or empty. Authentication issue detected.");
      // You might want to implement a function to fetch user data here or clear tokens
      // fetchUserData(token);
    }
  }, []);

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

  // Calculate total amount
  const totalAmount = subtotal - discount;

// Load Razorpay SDK dynamically
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      console.error('Razorpay SDK failed to load');
      resolve(false); // Resolve with false to indicate error
    };
    document.body.appendChild(script);
  });
};

const handleCheckout = async () => {
  console.log("Checkout clicked, userInfo:", userInfo);
  
  // Check if user is logged in
  if (!isLoggedIn()) {
    console.log("User not logged in, redirecting to login");
    navigate("/login?redirect=cart");
    return;
  }
  
  // Check if cart is not empty
  if (cartItems.length === 0) {
    setPaymentError("Your cart is empty");
    return;
  }
  
  setProcessingPayment(true);
  setPaymentError("");
  
  try {
    // First, load the Razorpay SDK
    const razorpayLoaded = await loadRazorpayScript();
    if (razorpayLoaded === false) {
      setPaymentError("Payment gateway could not be loaded. Please try again later.");
      setProcessingPayment(false);
      return;
    }
    
    // Ensure total amount is correctly formatted for Razorpay (in paise)
    // Making sure we're sending the right amount format
    const amountInPaise = Math.round(totalAmount * 100);
    
    // Include all required fields for Razorpay
    const paymentData = {
      userId: userInfo.id,
      cartItems: cartItems,
      totalAmount: amountInPaise,
      email: userInfo.email || "user@example.com",
      name: userInfo.name || userInfo.username || "User",
      phone: userInfo.contact || "9999999999",
      subscriptionType: "yearly"
    };
    
    console.log("Sending payment data:", paymentData);
    
    // Make API request to create order
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const response = await fetch(`${apiUrl}index.php?route=razorpay_payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paymentData)
    });
    
    // Check for HTTP errors first
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Server error (${response.status}):`, errorText);
      let errorMessage = `Server error: ${response.status}`;
      
      try {
        // Try to parse error as JSON
        const errorJson = JSON.parse(errorText);
        if (errorJson.message) {
          errorMessage = errorJson.message;
        }
      } catch (e) {
        // If not JSON, use the raw text if it's not too long
        if (errorText.length < 100) {
          errorMessage = errorText;
        }
      }
      
      setPaymentError(errorMessage);
      setProcessingPayment(false);
      return;
    }
    
    // Try to parse the response as JSON
    let result;
    try {
      const responseText = await response.text();
      console.log("Raw server response:", responseText);
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse server response as JSON:", parseError);
      setPaymentError("Server returned invalid response format");
      setProcessingPayment(false);
      return;
    }
    
    // Check if the result contains success flag
    if (!result.success) {
      setPaymentError(result.message || "Payment initialization failed");
      setProcessingPayment(false);
      return;
    }
    
    // Initialize Razorpay checkout
    const options = {
      key: result.key_id,
      amount: result.amount,
      currency: result.currency,
      name: "EASC Learning",
      description: "Course Purchase",
      order_id: result.order_id,
      handler: async function(response) {
        console.log("Razorpay payment successful:", response);
        
        try {
          const verificationResponse = await fetch('http://localhost/EASCBackend/index.php?route=verify_payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            })
          });
          
          // Check if the response is OK
          if (!verificationResponse.ok) {
            const errorText = await verificationResponse.text();
            console.error(`Verification error (${verificationResponse.status}):`, errorText);
            setPaymentError(`Payment verification failed: ${verificationResponse.status}`);
            return;
          }
          
          // Check content type to handle HTML responses
          const contentType = verificationResponse.headers.get('content-type');
          
          if (contentType && contentType.includes('application/json')) {
            // It's JSON, parse normally
            const verificationResult = await verificationResponse.json();
            
            if (verificationResult.success) {
              // Clear cart and show success message
              localStorage.removeItem("cart");
              setCartItems([]);
              navigate("/payment-success");
            } else {
              setPaymentError(verificationResult.message || "Payment verification failed");
            }
          } else {
            // Not JSON, likely HTML error - log it and show generic error
            const errorText = await verificationResponse.text();
            console.error("Server returned non-JSON response:", errorText);
            setPaymentError("Server returned invalid response format. Please contact support.");
          }
        } catch (error) {
          console.error("Verification error:", error);
          setPaymentError("Payment verification failed: " + (error.message || "Unknown error"));
        }
      },
      prefill: {
        name: userInfo.name || userInfo.username || "User",
        email: userInfo.email || "",
        contact: userInfo.phone || userInfo.contact || ""
      },
      theme: {
        color: "#3399cc"
      },
      modal: {
        ondismiss: function() {
          setProcessingPayment(false);
          console.log("Payment modal dismissed");
        }
      }
    };
    
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error("Checkout error:", error);
    setPaymentError("Payment processing failed: " + (error.message || "Unknown error"));
    setProcessingPayment(false);
  }
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
                                e.target.style.display = "none";
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
                                {item.subject} - {item.paper || "Standard"}</p>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.duration || "Self-paced"}
                              </p>
                              {/* Subscription Duration Badge */}
                              <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                <Clock size={14} className="mr-1" />
                                1 Year Access
                              </div>
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

                    <div className="border-t border-gray-200 pt-4 flex justify-between">
                      <p className="text-base font-bold text-gray-900">Total</p>
                      <p className="text-xl font-bold text-emerald-700">₹{totalAmount.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  {/* Subscription Info */}
                  <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                    <div className="flex items-start">
                      <Clock size={18} className="mt-0.5 text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">All Courses Include:</p>
                        <p className="text-sm text-gray-600">1 Year Subscription Access</p>
                      </div>
                    </div>
                  </div>

                  {/* User Not Logged In Warning - FIXED: using isLoggedIn() function */}
                  {!isLoggedIn() && (
                    <div className="mt-4 p-3 bg-yellow-50 rounded-md border border-yellow-200">
                      <div className="flex items-start">
                        <AlertCircle size={18} className="mt-0.5 text-yellow-600 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-yellow-800">You need to be logged in to checkout</p>
                          <Link to="/login?redirect=cart" className="text-sm text-yellow-600 underline">
                            Click here to login
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                 

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
                  </div>

                  {/* Payment Error Message */}
                  {paymentError && (
                    <div className="mt-4 p-3 bg-red-50 rounded-md border border-red-200">
                      <p className="text-sm text-red-600 flex items-center">
                        <AlertCircle size={16} className="mr-1" />
                        {paymentError}
                      </p>
                    </div>
                  )}

                  {/* Checkout Button */}
                  <div className="mt-6">
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={cartItems.length === 0 || processingPayment}
                    >
                      {processingPayment ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard size={18} className="mr-2" />
                          Proceed to Checkout
                        </>
                      )}
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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Added missing axios import
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
const Login = () => {
  const navigate = useNavigate();
 
  
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  // **********************************************************************************

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost/EASCBackend/index.php', credentials);
      console.log('Server response data:', res.data);
      if (res.data.success) {
        navigate('/dashboard');
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Server Error');
    } finally {
      setIsLoading(false);
    }
  };
  
// ********************************************************************************
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
    <div className="w-full max-w-md px-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Green Header */}
        <div className="bg-green-600 py-6 px-8">
          <h2 className="text-3xl font-bold text-white text-center">Welcome Back</h2>
          <p className="text-green-100 text-center mt-2">Sign in to your account</p>
        </div>
        
        {/* Form Area */}
        <form className="p-8" onSubmit={handleLogin}>
          {error && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
              <p>{error}</p>
            </div>
          )}
          
          {/* Email Input */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={credentials.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              />
            </div>
          </div>
          
          {/* Password Input */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <a href="#" className="text-sm text-green-600 hover:text-green-800 font-medium">Forgot password?</a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={credentials.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>
          
          {/* Remember Me Checkbox */}
          <div className="flex items-center mb-6">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
              Remember me for 30 days
            </label>
          </div>
          
          {/* Submit Button */}
         {/* Submit Button */}
         <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium ${
                isLoading 
                  ? "bg-green-500 cursor-not-allowed" 
                  : "bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              } transition-all duration-300 ease-in-out`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  Sign In
                  <ArrowRight size={18} className="ml-2" />
                </span>
              )}
            </button>
        </form>
        
        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <a href="#" className="text-green-600 hover:text-green-800 font-medium">
              Sign up now
            </a>
          </p>
        </div>
      </div>
      
      {/* Trust Badges */}
      <div className="mt-6 flex justify-center space-x-4 text-gray-500 text-xs">
        <span className="flex items-center">
          <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Secure Login
        </span>
        <span className="flex items-center">
          <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
            <path d="M10 6a1 1 0 011 1v3a1 1 0 01-1 1H7a1 1 0 110-2h2V7a1 1 0 011-1z" />
          </svg>
          24/7 Support
        </span>
      </div>
    </div>
  </div>
  );
};

export default Login;
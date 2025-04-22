import { useState } from "react";
import { LogIn, Phone, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/EASC-logo.png";
import emailjs from "@emailjs/browser";

const LoginSystem = () => {
  // State to manage which form is currently shown
  const [currentForm, setCurrentForm] = useState("login"); // 'login', 'forgotPassword', or 'signup'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Form data states
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: "",
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    confirmPassword: "",
  });

  // Handle login form inputs
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle forgot password form inputs
  const handleForgotPasswordChange = (e) => {
    const { name, value } = e.target;
    setForgotPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost/EASCBackend/index.php?route=user_login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      const result = await response.json();
  
      if (result.success) {
        console.log("Login successful:", result.user);
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("loginRedirect", "home");
        alert("Login successful!");
        window.location.href = "/";
      } else {
        alert(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred while logging in.");
    }
  };
  
  const handleForgotPasswordSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    // First check if email exists in your database
    const checkResponse = await fetch("http://localhost/EASCBackend/index.php?route=check_email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: forgotPasswordData.email }),
    });
    
    const checkResult = await checkResponse.json();
    
    if (!checkResult.exists) {
      alert("No account found with this email address.");
      setIsSubmitting(false);
      return;
    }
    
    // Generate a reset token on backend
    const tokenResponse = await fetch("http://localhost/EASCBackend/index.php?route=generate_reset_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: forgotPasswordData.email }),
    });
    
    const tokenResult = await tokenResponse.json();
    
    if (!tokenResult.success) {
      throw new Error(tokenResult.message || "Failed to generate reset token");
    }
    
    // Create reset link
    const resetLink = `${window.location.origin}/reset-password?token=${tokenResult.token}&email=${encodeURIComponent(forgotPasswordData.email)}`;
    
    // Send email using EmailJS
    const templateParams = {
      to_name: tokenResult.name || "User",
      to_email: forgotPasswordData.email, // This ensures the email goes to the user
      from_name: "EASC Support",
      reset_link: resetLink,
      message: "Please click the link below to reset your password. This link will expire in 1 hour."
    };
    
    const emailResponse = await emailjs.send(
      "service_6uddxja", // your EmailJS service ID
      "template_u3ldfvy", // your EmailJS template ID
      templateParams,
      "WxHQ0YhdYDG9Q-FA2" // your EmailJS public key
    );
    
    console.log("Email sent successfully:", emailResponse);
    setResetSent(true);
    
  } catch (error) {
    console.error("Password reset error:", error);
    alert("An error occurred during the password reset process. Please try again later.");
  } finally {
    setIsSubmitting(false);
  }
};

  // Handle signup form inputs
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Update the handleSignupSubmit function to connect with your PHP backend
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    try {
      // Call the PHP signup endpoint
      const response = await fetch('http://localhost/EASCBackend/index.php?route=user_signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });
      
      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        
        if (data.success) {
          // Show success message
          alert(data.message);
          // Reset form
          setSignupData({
            name: '',
            email: '',
            contact: '',
            password: '',
            confirmPassword: ''
          });
          // Redirect to login
          setCurrentForm("login");
        } else {
          // Show error message
          alert(data.message || 'Signup failed. Please try again.');
        }
      } else {
        // Handle non-JSON response (likely an error)
        const textResponse = await response.text();
        console.error('Server returned non-JSON response:', textResponse);
        alert('Server error occurred. Please check your PHP backend configuration.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred during signup. Please try again later.');
    }
  };

  // Render the login form
  const renderLoginForm = () => (
    <div className="w-full max-w-xl">
      <div className="text-center mb-8">
        <div className="flex justify-center">
          <img src={logo} alt="EASC Logo" className="h-16 w-16" />
        </div>
        <h2 className="mt-4 text-3xl font-bold text-gray-800">Welcome back</h2>
        <p className="mt-2 text-gray-600">Please sign in to your account</p>
      </div>

      <form onSubmit={handleLoginSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={loginData.email}
              onChange={handleLoginChange}
              className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={loginData.password}
              onChange={handleLoginChange}
              className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>

          <button
            type="button"
            onClick={() => setCurrentForm("forgotPassword")}
            className="text-sm font-medium text-emerald-600 hover:text-emerald-500"
          >
            Forgot your password?
          </button>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            <LogIn size={18} className="mr-2" />
            Sign in
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => setCurrentForm("signup")}
            className="font-medium text-emerald-600 hover:text-emerald-500"
          >
            Sign up now
          </button>
        </p>
      </div>
    </div>
  );

  // Render the forgot password form
  const renderForgotPasswordForm = () => (
    <div className="w-full max-w-xl">
      <div className="text-center mb-8">
        <div className="flex justify-center">
          <img src={logo} alt="EASC Logo" className="h-16 w-16" />
        </div>
        <h2 className="mt-4 text-3xl font-bold text-gray-800">
          Forgot Password
        </h2>
        <p className="mt-2 text-gray-600">
          Enter your email to reset your password
        </p>
      </div>

      {resetSent ? (
        <div className="text-center space-y-4">
          <div className="p-4 bg-green-50 rounded-md">
            <p className="text-green-700">
              Password reset link has been sent to your email address.
            </p>
            <p className="text-sm text-green-600 mt-2">
              Please check your inbox and follow the instructions to reset your password.
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentForm("login");
              setResetSent(false);
              setForgotPasswordData({ email: "" });
            }}
            className="inline-flex items-center font-medium text-emerald-600 hover:text-emerald-500"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to login
          </button>
        </div>
      ) : (
        <>
          <form onSubmit={handleForgotPasswordSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="forgot-email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  id="forgot-email"
                  name="email"
                  type="email"
                  required
                  value={forgotPasswordData.email}
                  onChange={handleForgotPasswordChange}
                  className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-emerald-300"
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setCurrentForm("login")}
              className="inline-flex items-center font-medium text-emerald-600 hover:text-emerald-500"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to login
            </button>
          </div>
        </>
      )}
    </div>
  );

  // Render the signup form
  const renderSignupForm = () => (
    <div className="w-full max-w-xl">
      <div className="text-center mb-8">
        <div className="flex justify-center">
          <img src={logo} alt="EASC Logo" className="h-16 w-16" />
        </div>
        <h2 className="mt-4 text-3xl font-bold text-gray-800">
          Create Account
        </h2>
        <p className="mt-2 text-gray-600">Sign up to get started with EASC</p>
      </div>

      <form onSubmit={handleSignupSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={18} className="text-gray-400" />
            </div>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={signupData.name}
              onChange={handleSignupChange}
              className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter your full name"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="signup-email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-400" />
            </div>
            <input
              id="signup-email"
              name="email"
              type="email"
              required
              value={signupData.email}
              onChange={handleSignupChange}
              className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter your email"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="contact"
            className="block text-sm font-medium text-gray-700"
          >
            Contact Number
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone size={18} className="text-gray-400" />
            </div>
            <input
              id="contact"
              name="contact"
              type="tel"
              required
              value={signupData.contact}
              onChange={handleSignupChange}
              className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter your contact number"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="signup-password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input
              id="signup-password"
              name="password"
              type="password"
              required
              value={signupData.password}
              onChange={handleSignupChange}
              className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Create a password"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              required
              value={signupData.confirmPassword}
              onChange={handleSignupChange}
              className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Confirm your password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Create Account
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => setCurrentForm("login")}
            className="font-medium text-emerald-600 hover:text-emerald-500"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );

  // Render current form based on state
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        {currentForm === "login" && renderLoginForm()}
        {currentForm === "forgotPassword" && renderForgotPasswordForm()}
        {currentForm === "signup" && renderSignupForm()}
      </div>
    </div>
  );
};

export default LoginSystem;
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Lock, ArrowLeft, Check } from "lucide-react";
import logo from "../../assets/EASC-logo.png";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    token: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  // Extract token and email from URL parameters on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const email = params.get("email");

    if (token && email) {
      setFormData((prev) => ({
        ...prev,
        token,
        email,
      }));
    } else {
      setError("Invalid password reset link. Please request a new one.");
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate passwords
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost/EASCBackend/index.php?route=reset_password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: formData.token,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        // Reset form
        setFormData({
          token: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setError(result.message || "Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <img src={logo} alt="EASC Logo" className="h-16 w-16" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-800">
            Reset Your Password
          </h2>
          {!isSuccess && (
            <p className="mt-2 text-gray-600">
              Please enter your new password below
            </p>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {isSuccess ? (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="bg-green-100 rounded-full p-3">
                <Check size={32} className="text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Password Reset Successful!
            </h3>
            <p className="text-gray-600">
              Your password has been updated successfully.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Return to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
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
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter new password"
                  minLength={8}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Password must be at least 8 characters long
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting || !formData.token || !formData.email}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-emerald-300"
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center font-medium text-emerald-600 hover:text-emerald-500"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
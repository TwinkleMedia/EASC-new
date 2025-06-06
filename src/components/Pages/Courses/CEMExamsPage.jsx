import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Award,
  Check,
  X,
  ChevronRight,
  ShoppingCart,
  FileText,
} from "lucide-react";
import Swal from "sweetalert2"; // Import SweetAlert2

const CEMExamsPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch courses data from the API
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_API_BASE_URL;

        const response = await fetch(`${apiUrl}index.php?route=listcourses`);

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();

        // Process the API response to ensure we have a valid array of courses
        let cemCourses = [];

        if (Array.isArray(data)) {
          // If data is directly an array of courses
          cemCourses = data.filter(
            (course) =>
              (course.title && course.title.toLowerCase().includes("cem")) ||
              (course.subject &&
                course.subject.toLowerCase().includes("cem")) ||
              (course.paper && course.paper.includes("1"))
          );
        } else if (data && data.courses && Array.isArray(data.courses)) {
          // If data has a courses property that is an array
          cemCourses = data.courses.filter(
            (course) =>
              (course.title && course.title.toLowerCase().includes("cem")) ||
              (course.subject &&
                course.subject.toLowerCase().includes("cem")) ||
              (course.paper && course.paper.includes("1"))
          );
        } else {
          // If we can't find any array structure, use the whole data
          cemCourses = Array.isArray(data) ? data : [];
        }

        console.log("Fetched courses:", cemCourses);

        // Process courses to ensure they have all necessary properties
        const processedCourses = cemCourses.map((course) => {
          // Create a PDF materials array from individual PDF URLs
          const pdfs = [];

          if (course.master_notes_url) {
            pdfs.push({ name: "Master Notes", url: course.master_notes_url });
          }

          if (course.smart_short_notes_url) {
            pdfs.push({
              name: "Smart Short Notes",
              url: course.smart_short_notes_url,
            });
          }

          if (course.old_papers_url) {
            pdfs.push({ name: "Past Papers", url: course.old_papers_url });
          }

          if (course.question_bank_url) {
            pdfs.push({ name: "Question Bank", url: course.question_bank_url });
          }

          if (course.text_book_url) {
            pdfs.push({ name: "Text Book", url: course.text_book_url });
          }

          return {
            ...course,
            pdfs: pdfs,
            image_url: course.display_image_url || null,
            difficulty: course.difficulty || "Standard",
            duration: course.duration || "Self-paced",
          };
        });

        setCourses(processedCourses);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch courses");
        setLoading(false);
        console.error("Error fetching courses:", err);

        // Fallback to empty array
        setCourses([]);
      }
    };

    fetchCourses();
  }, []);

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
    setActiveTab("description");
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Improved Add to Cart function with SweetAlert2
  const handleAddToCart = (course) => {
    if (!course) return;

    // Get user data from localStorage
    const userData = localStorage.getItem("user");

    // If user isn't logged in, save the course ID and redirect to login
    if (!userData) {
      // Show beautiful alert message before redirecting
      Swal.fire({
        title: "Login Required",
        text: "Please log in to add courses to your cart.",
        icon: "info",
        confirmButtonText: "Login Now",
        confirmButtonColor: "#059669", // emerald-600
        showCancelButton: true,
        cancelButtonText: "Cancel",
        background: "#ffffff",
        iconColor: "#0284c7", // blue-600
        customClass: {
          confirmButton: "px-4 py-2 rounded-lg",
          cancelButton: "px-4 py-2 rounded-lg",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // Save current page and course info to localStorage
          localStorage.setItem("loginRedirect", "cem-exams");
          localStorage.setItem("pendingCartItem", JSON.stringify(course));

          // Redirect to login page
          navigate("/login");
        }
      });
      return;
    }

    // User is logged in, proceed with adding to cart
    const existingCart = localStorage.getItem("cart");
    let cartItems = existingCart ? JSON.parse(existingCart) : [];

    // Check if course is already in cart
    const isInCart = cartItems.some((item) => item.id === course.id);

    if (!isInCart) {
      // Add course to cart
      cartItems.push(course);
      // Save updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cartItems));

      // Show success message with SweetAlert2
      Swal.fire({
        title: "Added to Cart!",
        text: `${course.title} has been added to your cart.`,
        icon: "success",
        confirmButtonText: "View Cart",
        confirmButtonColor: "#059669", // emerald-600
        showCancelButton: true,
        cancelButtonText: "Continue Shopping",
        background: "#ffffff",
        iconColor: "#10b981", // emerald-500
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          confirmButton: "px-4 py-2 rounded-lg",
          cancelButton: "px-4 py-2 rounded-lg",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/my-cart"); // Redirect to cart page
        }
      });
    } else {
      // Course already in cart - show info message
      Swal.fire({
        title: "Already in Cart",
        text: "This course is already in your cart.",
        icon: "info",
        confirmButtonText: "View Cart",
        confirmButtonColor: "#059669", // emerald-600
        showCancelButton: true,
        cancelButtonText: "Continue Shopping",
        background: "#ffffff",
        iconColor: "#0284c7", // blue-600
        customClass: {
          confirmButton: "px-4 py-2 rounded-lg",
          cancelButton: "px-4 py-2 rounded-lg",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/my-cart"); // Redirect to cart page
        }
      });
    }
  };

  // Default learning outcomes if none provided by the API
  const defaultLearningOutcomes = [
    "Fundamental principles of energy management",
    "Energy audit techniques and methodologies",
    "Electrical systems optimization",
    "HVAC systems and building envelope analysis",
    "Economic analysis of energy conservation measures",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="relative py-20 bg-gradient-to-r from-emerald-800 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>

        {/* Animated dots background */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 8 + "px",
                height: Math.random() * 8 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                opacity: Math.random() * 0.5 + 0.3,
              }}
            ></div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our <span className="text-emerald-300">Courses</span>
          </h1>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-semibold tracking-wider text-sm uppercase">
              Our Offerings
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
              CEM Exam Preparatory Courses
            </h2>
            <div className="w-16 h-1 bg-emerald-600 mx-auto mb-6"></div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <X className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    {error} - Please try again later or contact support.
                  </p>
                </div>
              </div>
            </div>
          ) : courses.length === 0 ? (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-8 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <X className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    No CEM courses found. Please check back later or contact
                    support.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onViewCourse={() => handleViewCourse(course)}
                  onAddToCart={() => handleAddToCart(course)}
                />
              ))}
            </div>
          )}

          {/* Cart Button - Navigation to Cart Page */}
          <div className="fixed bottom-6 right-6 z-10">
            <Link
              to="/my-cart"
              className="flex items-center justify-center h-16 w-16 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-all hover:scale-105"
            >
              <ShoppingCart size={28} />
            </Link>
          </div>
        </div>
      </section>

      {/* Course Details Modal */}
      {showModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-screen overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-emerald-700 to-emerald-900 text-white">
              <h3 className="text-xl font-semibold flex items-center">
                <Award className="mr-2" size={20} />
                {selectedCourse.title}
              </h3>
              <button
                onClick={closeModal}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-auto">
              <div className="flex flex-col md:flex-row">
                {/* Left sidebar - Course info */}
                <div className="md:w-1/3 bg-gray-50 p-6 border-r border-gray-200">
                  {/* Course Image */}
                  <div className="mb-6 rounded-lg h-40 flex items-center justify-center shadow-md overflow-hidden">
                    {selectedCourse.image_url ? (
                      <img
                        src={selectedCourse.image_url}
                        alt={selectedCourse.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.parentNode.classList.add(
                            "bg-gradient-to-r",
                            "from-emerald-600",
                            "to-teal-500"
                          );
                          e.target.parentNode.innerHTML = `<div class="flex items-center justify-center h-full"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg></div>`;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-emerald-600 to-teal-500 flex items-center justify-center">
                        <BookOpen size={48} className="text-white" />
                      </div>
                    )}
                  </div>

                  {/* Course Details */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">
                        Subject
                      </h4>
                      <p className="font-semibold text-gray-800">
                        {selectedCourse.subject || "CEM"}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">
                        Paper
                      </h4>
                      <p className="font-semibold text-gray-800">
                        {selectedCourse.paper || "-"}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">
                        Difficulty
                      </h4>
                      <p className="font-semibold text-gray-800">
                        {selectedCourse.difficulty || "Standard"}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">
                        Duration
                      </h4>
                      <p className="font-semibold text-gray-800">
                        {selectedCourse.duration || "Self-paced"}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">
                        Price
                      </h4>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-emerald-700">
                          ₹
                          {parseInt(
                            selectedCourse.discounted_price ||
                              selectedCourse.price ||
                              0
                          ).toLocaleString()}
                        </span>
                        {selectedCourse.discounted_price &&
                          selectedCourse.discounted_price !==
                            selectedCourse.price && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              ₹
                              {parseInt(
                                selectedCourse.price || 0
                              ).toLocaleString()}
                            </span>
                          )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToCart(selectedCourse)}
                      className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center font-medium"
                    >
                      <ShoppingCart size={18} className="mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>

                {/* Right content area */}
                <div className="md:w-2/3 p-6">
                  {/* Tabs */}
                  <div className="border-b border-gray-200 mb-6">
                    <nav className="flex space-x-6" aria-label="Tabs">
                      <button
                        onClick={() => setActiveTab("description")}
                        className={`pb-4 px-1 ${
                          activeTab === "description"
                            ? "border-b-2 border-emerald-500 text-emerald-600 font-medium"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        Description
                      </button>
                      <button
                        onClick={() => setActiveTab("materials")}
                        className={`pb-4 px-1 ${
                          activeTab === "materials"
                            ? "border-b-2 border-emerald-500 text-emerald-600 font-medium"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        Course Materials
                      </button>
                      <button
                        onClick={() => setActiveTab("learning")}
                        className={`pb-4 px-1 ${
                          activeTab === "learning"
                            ? "border-b-2 border-emerald-500 text-emerald-600 font-medium"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        What You'll Learn
                      </button>
                    </nav>
                  </div>

                  {/* Tab Content */}
                  <div className="py-2">
                    {/* Description Tab */}
                    {activeTab === "description" && (
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-4">
                          Course Overview
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {selectedCourse.description ||
                            "This comprehensive course provides all the materials and guidance you need to excel in your CEM certification exam, focusing on essential energy management principles and methodologies."}
                        </p>

                        <div className="mt-8">
                          <h5 className="text-md font-medium text-gray-900 mb-3">
                            Who Should Take This Course
                          </h5>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <ChevronRight
                                size={18}
                                className="text-emerald-500 mt-0.5 mr-2 flex-shrink-0"
                              />
                              <span>Energy managers seeking certification</span>
                            </li>
                            <li className="flex items-start">
                              <ChevronRight
                                size={18}
                                className="text-emerald-500 mt-0.5 mr-2 flex-shrink-0"
                              />
                              <span>
                                Engineering professionals specializing in energy
                                systems
                              </span>
                            </li>
                            <li className="flex items-start">
                              <ChevronRight
                                size={18}
                                className="text-emerald-500 mt-0.5 mr-2 flex-shrink-0"
                              />
                              <span>
                                Facility managers responsible for energy
                                optimization
                              </span>
                            </li>
                            <li className="flex items-start">
                              <ChevronRight
                                size={18}
                                className="text-emerald-500 mt-0.5 mr-2 flex-shrink-0"
                              />
                              <span>
                                Consultants working in energy efficiency and
                                conservation
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Materials Tab */}
                    {activeTab === "materials" && (
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-4">
                          Available Study Materials
                        </h4>
                        <p className="text-gray-700 mb-6">
                          Access comprehensive study materials designed to help
                          you master all required concepts for the{" "}
                          {selectedCourse.paper || "CEM"} examination.
                        </p>

                        {selectedCourse.pdfs &&
                        selectedCourse.pdfs.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {selectedCourse.pdfs.map((pdf, index) => (
                              <div
                                key={index}
                                className="bg-white border border-gray-200 rounded-lg p-4 flex items-center hover:shadow-md transition-shadow"
                              >
                                <div className="flex-shrink-0 mr-4">
                                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                                    <FileText
                                      size={20}
                                      className="text-red-600"
                                    />
                                  </div>
                                </div>
                                <div className="flex-grow">
                                  <h5 className="font-medium text-gray-900">
                                    {pdf.name}
                                  </h5>
                                  <p className="text-sm text-gray-500 uppercase">
                                    PDF
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="bg-yellow-50 p-4 rounded-lg">
                            <p className="text-yellow-700">
                              No PDF materials are currently available for this
                              course. Please check back later.
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Learning Tab */}
                    {activeTab === "learning" && (
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-4">
                          What You'll Learn
                        </h4>
                        <p className="text-gray-700 mb-6">
                          By the end of this course, you'll have mastered these
                          key concepts and skills necessary for the{" "}
                          {selectedCourse.paper || "CEM"} examination:
                        </p>

                        <div className="bg-gray-50 rounded-xl p-6">
                          <ul className="space-y-4">
                            {(
                              selectedCourse.learning_outcomes ||
                              defaultLearningOutcomes
                            ).map((outcome, index) => (
                              <li key={index} className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                                    <Check
                                      size={12}
                                      className="text-emerald-600"
                                    />
                                  </div>
                                </div>
                                <span className="ml-3 text-gray-700">
                                  {outcome}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg mr-3 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleAddToCart(selectedCourse);
                  closeModal();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                <ShoppingCart size={16} className="mr-2" />
                <span className="font-medium">Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Course Card Component with working Add to Cart button
const CourseCard = ({ course, onViewCourse, onAddToCart }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-px flex flex-col h-full">
      {/* Card Header/Image */}
      <div className="relative">
        {course.image_url ? (
          <div className="h-48 overflow-hidden">
            <img
              src={course.image_url}
              alt={course.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.parentNode.classList.add(
                  "bg-gradient-to-r",
                  "from-emerald-600",
                  "to-teal-500"
                );
                e.target.parentNode.innerHTML =
                  '<div class="flex items-center justify-center h-full"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg></div>';
              }}
            />
          </div>
        ) : (
          <div className="h-48 bg-gradient-to-r from-emerald-600 to-teal-500 flex items-center justify-center">
            <BookOpen size={48} className="text-white" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-white rounded-full shadow-md">
          <span className="font-medium text-emerald-700 text-sm">
            {course.paper || "CEM"}
          </span>
        </div>

        <div className="absolute top-4 right-4 px-3 py-1 bg-white rounded-full shadow-md">
          <span className="font-medium text-emerald-700 text-sm">
            {course.difficulty || "Standard"}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>

        <p className="text-gray-600 mb-6 flex-grow">
          {course.description
            ? course.description.length > 100
              ? course.description.substring(0, 100) + "..."
              : course.description
            : "Comprehensive preparation for CEM certification exams..."}
        </p>

        {/* Course Details */}
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center text-gray-500 text-sm">
              <Award size={16} className="mr-1" />
              <span>CEM Certification</span>
            </div>
            <div className="text-gray-500 text-sm">
              {course.duration || "Self-paced"}
            </div>
          </div>

          {/* Price */}
          <div className="mb-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-emerald-700">
                ₹
                {parseInt(
                  course.discounted_price || course.price || 0
                ).toLocaleString()}
              </span>
              {course.discounted_price &&
                course.discounted_price !== course.price && (
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    ₹{parseInt(course.price || 0).toLocaleString()}
                  </span>
                )}
            </div>
          </div>

          {/* Action Buttons - Side by Side */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onViewCourse}
              className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-2 rounded-lg transition-colors flex items-center justify-center"
            >
              <span className="font-medium">View Details</span>
              <ChevronRight size={16} className="ml-1" />
            </button>

            <button
              onClick={onAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-2 rounded-lg transition-colors flex items-center justify-center"
            >
              <ShoppingCart size={16} className="mr-1" />
              <span className="font-medium">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CEMExamsPage;

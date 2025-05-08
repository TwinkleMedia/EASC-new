import React, { useState, useEffect } from "react";
import axios from "axios";
import EditCourseModal from "./EditCourseModal";

const Listofcourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    // Fetch courses data from the API
    const fetchCourses = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const apiUrl = import.meta.env.VITE_API_BASE_URL;

        const response = await axios.get(
          `${apiUrl}index.php?route=listcourses`
        );

        // Check the structure of the response and extract the courses array
        const coursesData = Array.isArray(response.data)
          ? response.data
          : response.data && response.data.courses
          ? response.data.courses
          : [];

        setCourses(coursesData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch courses");
        setLoading(false);
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  const handleEditCourse = (course) => {
    setEditingCourse({...course});
    setShowEditModal(true);
  };
  const handleEditSuccess = (updatedCourse) => {
    // Update the courses list with the new data
    setCourses(
      courses.map((course) =>
        course.id === updatedCourse.id ? updatedCourse : course
      )
    );
    setShowEditModal(false);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingCourse(null);
  };
  

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      try {
        // Show some loading indicator if you have one
        setLoading(true);
        
        const formData = new FormData();
        formData.append("id", courseId);

        console.log("Sending delete request for course ID:", courseId);
        
        const response = await axios.post(
          "http://localhost/EASCBackend/index.php?route=delectcourses",
          formData
        );
        
        console.log("Delete response:", response);

        if (response.data && response.data.status === "success") {
          // Update the local state to remove the deleted course
          setCourses(courses.filter((course) => course.id !== courseId));
          
          // Show a more detailed success message
          const deletedFiles = response.data.cloudinary_files_deleted ? 
                             response.data.cloudinary_files_deleted.length : 0;
          const message = `Course deleted successfully. ${deletedFiles} files removed from Cloudinary.`;
          alert(message);
        } else {
          const errorMessage = response.data && response.data.message 
            ? response.data.message 
            : "Unknown error occurred";
          alert("Error: " + errorMessage);
        }
      } catch (err) {
        console.error("Error deleting course:", err);
        
        if (err.response && err.response.data) {
          alert("Error: " + (err.response.data.message || "Unknown server error"));
        } else {
          alert("Failed to delete course. Please try again later.");
        }
      } finally {
        // Hide loading indicator
        setLoading(false);
      }
    }
  };

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };



  if (loading && courses.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && courses.length === 0) {
    return (
      <div
        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md"
        role="alert"
      >
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Courses List</h1>

      {/* Courses Table */}
      {Array.isArray(courses) && courses.length === 0 ? (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow-md">
          <p>No courses found</p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paper
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Array.isArray(courses) ? (
                courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {course.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {course.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.paper}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${course.discounted_price || course.price}
                      {course.discounted_price &&
                        course.discounted_price !== course.price && (
                          <span className="line-through text-gray-400 ml-2">
                            ${course.price}
                          </span>
                        )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.created_at
                        ? new Date(course.created_at).toLocaleDateString()
                        : ""}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewCourse(course)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => handleEditCourse(course)}
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    Error: Courses data is not in the expected format
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Course Details */}
      {showModal && selectedCourse && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            {/* Modal Header */}
            <div className="border-b px-6 py-3 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-lg font-medium text-gray-900">
                Course Details
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div>
                  {/* Course Image */}
                  <div className="mb-6">
                    {selectedCourse.display_image_url ? (
                      <img
                        src={selectedCourse.display_image_url}
                        alt={selectedCourse.title}
                        className="w-full h-64 object-cover rounded-lg shadow-md"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
                        <p className="text-gray-500">No image available</p>
                      </div>
                    )}
                  </div>

                  {/* Basic Info */}
                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
                    <h4 className="font-bold text-xl mb-2">
                      {selectedCourse.title}
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Subject</p>
                        <p className="font-medium">{selectedCourse.subject}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Paper</p>
                        <p className="font-medium">{selectedCourse.paper}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="font-medium">
                          $
                          {selectedCourse.discounted_price ||
                            selectedCourse.price}
                          {selectedCourse.discounted_price &&
                            selectedCourse.discounted_price !==
                              selectedCourse.price && (
                              <span className="line-through text-gray-400 ml-2">
                                ${selectedCourse.price}
                              </span>
                            )}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Created</p>
                        <p className="font-medium">
                          {selectedCourse.created_at
                            ? new Date(
                                selectedCourse.created_at
                              ).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Telegram Link */}
                  {selectedCourse.telegram_link && (
                    <div className="mb-6">
                      <a
                        href={selectedCourse.telegram_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 text-white py-2 px-4 rounded flex items-center justify-center hover:bg-blue-600 transition-colors"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.74 8.326l-1.692 7.995c-.127.6-.463.745-.937.463l-2.588-1.909-1.249 1.203c-.138.138-.254.254-.521.254l.184-2.613 4.755-4.293c.207-.184-.045-.285-.32-.101l-5.877 3.7-2.531-.792c-.55-.174-.563-.55.116-.812l9.876-3.804c.45-.168.84.112.686.71z" />
                        </svg>
                        Join Telegram Group
                      </a>
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div>
                  {/* Description */}
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-700 mb-2">
                      Description
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                      <p className="text-gray-600">
                        {selectedCourse.description ||
                          "No description available"}
                      </p>
                    </div>
                  </div>

                  {/* Course Materials */}
                  <div>
                    <h4 className="font-bold text-gray-700 mb-2">
                      Course Materials
                    </h4>
                    <div className="space-y-2">
                      {selectedCourse.master_notes_url && (
                        <a
                          href={selectedCourse.master_notes_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <svg
                            className="w-6 h-6 text-red-500 mr-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                            <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                          </svg>
                          <span>Master Notes</span>
                        </a>
                      )}

                      {selectedCourse.smart_short_notes_url && (
                        <a
                          href={selectedCourse.smart_short_notes_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <svg
                            className="w-6 h-6 text-red-500 mr-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                            <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                          </svg>
                          <span>Smart Short Notes</span>
                        </a>
                      )}

                      {selectedCourse.old_papers_url && (
                        <a
                          href={selectedCourse.old_papers_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <svg
                            className="w-6 h-6 text-red-500 mr-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                            <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                          </svg>
                          <span>Old Papers</span>
                        </a>
                      )}

                      {selectedCourse.question_bank_url && (
                        <a
                          href={selectedCourse.question_bank_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <svg
                            className="w-6 h-6 text-red-500 mr-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                            <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                          </svg>
                          <span>Question Bank</span>
                        </a>
                      )}

                      {selectedCourse.text_book_url && (
                        <a
                          href={selectedCourse.text_book_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <svg
                            className="w-6 h-6 text-red-500 mr-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                            <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                          </svg>
                          <span>Text Book</span>
                        </a>
                      )}

                      {!selectedCourse.master_notes_url &&
                        !selectedCourse.smart_short_notes_url &&
                        !selectedCourse.old_papers_url &&
                        !selectedCourse.question_bank_url &&
                        !selectedCourse.text_book_url && (
                          <p className="p-3 bg-gray-50 rounded-lg text-gray-500">
                            No materials available
                          </p>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t px-6 py-4 flex justify-end sticky bottom-0 bg-white">
              <button
                onClick={closeModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
 {editingCourse && (
    <EditCourseModal
      course={editingCourse}
      isOpen={showEditModal}
      onClose={closeEditModal}
      onSuccess={handleEditSuccess}
    />
  )}
    </div>
  );
};

export default Listofcourses;
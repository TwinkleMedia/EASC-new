import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [courseData, setCourseData] = useState({
    id: "",
    title: "",
    description: "",
    subject: "",
    paper: "",
    telegram_link: "",
    price: "",
    discounted_price: "",
    display_image_url: "",
    master_notes_url: "",
    smart_short_notes_url: "",
    old_papers_url: "",
    question_bank_url: "",
    text_book_url: "",
  });
  
  const [files, setFiles] = useState({
    display_image: null,
    master_notes: null,
    smart_short_notes: null,
    old_papers: null,
    question_bank: null,
    text_book: null,
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch the course data
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost/EASCBackend/index.php?route=getcourse&id=${id}`
        );
        
        if (response.data && response.data.status === "success") {
          setCourseData(response.data.course);
        } else {
          setError("Course not found or error fetching course data");
        }
      } catch (err) {
        console.error("Error fetching course data:", err);
        setError("Failed to load course. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourseData();
    }
  }, [id]);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files: uploadedFiles } = e.target;
    if (uploadedFiles.length > 0) {
      setFiles((prev) => ({
        ...prev,
        [name]: uploadedFiles[0],
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessMessage("");

    try {
      const formData = new FormData();
      
      // Append all text fields
      Object.keys(courseData).forEach(key => {
        if (courseData[key] !== null) {
          formData.append(key, courseData[key]);
        }
      });
      
      // Append all files that were selected for upload
      Object.keys(files).forEach(key => {
        if (files[key] !== null) {
          formData.append(key, files[key]);
        }
      });

      const response = await axios.post(
        "http://localhost/EASCBackend/index.php?route=updatecourse",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data && response.data.status === "success") {
        setSuccessMessage("Course updated successfully!");
        // Optional: redirect after a short delay
        setTimeout(() => {
          navigate("/courses");
        }, 2000);
      } else {
        setError(response.data.message || "Unknown error occurred");
      }
    } catch (err) {
      console.error("Error updating course:", err);
      setError("Failed to update course. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && !courseData.id) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md" role="alert">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Course</h1>
      
      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md mb-6">
          <p>{successMessage}</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md mb-6">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Basic Information</h2>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Course Title*
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              name="title"
              value={courseData.title || ""}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
              Subject*
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="subject"
              type="text"
              name="subject"
              value={courseData.subject || ""}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paper">
              Paper*
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="paper"
              type="text"
              name="paper"
              value={courseData.paper || ""}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telegram_link">
              Telegram Link
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="telegram_link"
              type="text"
              name="telegram_link"
              value={courseData.telegram_link || ""}
              onChange={handleChange}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Price*
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="number"
              name="price"
              value={courseData.price || ""}
              onChange={handleChange}
              step="0.01"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discounted_price">
              Discounted Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="discounted_price"
              type="number"
              name="discounted_price"
              value={courseData.discounted_price || ""}
              onChange={handleChange}
              step="0.01"
            />
          </div>
          
          <div className="mb-4 md:col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              value={courseData.description || ""}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>

          {/* Images and Files */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 mt-4">Images and Materials</h2>
          </div>
          
          {/* Display Image */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="display_image">
              Display Image
            </label>
            <div className="flex items-center space-x-4">
              {courseData.display_image_url && (
                <div className="relative group">
                  <img
                    src={courseData.display_image_url}
                    alt="Current display"
                    className="h-20 w-20 object-cover rounded-md border"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                    <span className="text-white text-xs">Current</span>
                  </div>
                </div>
              )}
              <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="display_image"
                type="file"
                name="display_image"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Leave empty to keep current image</p>
          </div>
          
          {/* Course Materials */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="master_notes">
              Master Notes (PDF)
            </label>
            <div className="flex items-center space-x-4">
              {courseData.master_notes_url && (
                <a 
                  href={courseData.master_notes_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                    <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                  </svg>
                  Current File
                </a>
              )}
              <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="master_notes"
                type="file"
                name="master_notes"
                onChange={handleFileChange}
                accept="application/pdf"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Leave empty to keep current file</p>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="smart_short_notes">
              Smart Short Notes (PDF)
            </label>
            <div className="flex items-center space-x-4">
              {courseData.smart_short_notes_url && (
                <a 
                  href={courseData.smart_short_notes_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                    <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                  </svg>
                  Current File
                </a>
              )}
              <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="smart_short_notes"
                type="file"
                name="smart_short_notes"
                onChange={handleFileChange}
                accept="application/pdf"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Leave empty to keep current file</p>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="old_papers">
              Old Papers (PDF)
            </label>
            <div className="flex items-center space-x-4">
              {courseData.old_papers_url && (
                <a 
                  href={courseData.old_papers_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                    <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                  </svg>
                  Current File
                </a>
              )}
              <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="old_papers"
                type="file"
                name="old_papers"
                onChange={handleFileChange}
                accept="application/pdf"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Leave empty to keep current file</p>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="question_bank">
              Question Bank (PDF)
            </label>
            <div className="flex items-center space-x-4">
              {courseData.question_bank_url && (
                <a 
                  href={courseData.question_bank_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                    <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                  </svg>
                  Current File
                </a>
              )}
              <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="question_bank"
                type="file"
                name="question_bank"
                onChange={handleFileChange}
                accept="application/pdf"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Leave empty to keep current file</p>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="text_book">
              Text Book (PDF)
            </label>
            <div className="flex items-center space-x-4">
              {courseData.text_book_url && (
                <a 
                  href={courseData.text_book_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                    <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                  </svg>
                  Current File
                </a>
              )}
              <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="text_book"
                type="file"
                name="text_book"
                onChange={handleFileChange}
                accept="application/pdf"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Leave empty to keep current file</p>
          </div>
        </div>

        <div className="flex items-center justify-end mt-6 border-t pt-6">
          <button
            type="button"
            onClick={() => navigate("/courses")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg mr-4"
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg flex items-center"
            type="submit"
            disabled={saving}
          >
            {saving ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
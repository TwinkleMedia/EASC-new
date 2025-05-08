import React, { useState, useEffect } from "react";
import axios from "axios";

const EditCourseModal = ({ course, isOpen, onClose, onSuccess }) => {
  const [editingCourse, setEditingCourse] = useState({});
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [files, setFiles] = useState({
    display_image: null,
    master_notes: null,
    smart_short_notes: null,
    old_papers: null,
    question_bank: null,
    text_book: null
  });
  const [filePreview, setFilePreview] = useState({});
  const [error, setError] = useState("");

  // Initialize form data when course changes
  useEffect(() => {
    if (course) {
      setEditingCourse({ ...course });
      // Clear file inputs and previews when modal reopens
      setFiles({
        display_image: null,
        master_notes: null,
        smart_short_notes: null,
        old_papers: null,
        question_bank: null,
        text_book: null
      });
      setFilePreview({});
    }
  }, [course, isOpen]);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingCourse({
      ...editingCourse,
      [name]: value
    });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles && selectedFiles[0]) {
      // Create a preview URL for images
      if (name === 'file_display_image' && selectedFiles[0].type.startsWith('image/')) {
        setFilePreview({
          ...filePreview,
          [name]: URL.createObjectURL(selectedFiles[0])
        });
      }
      
      // Extract the field name without 'file_' prefix
      const fieldName = name.replace('file_', '');
      
      setFiles({
        ...files,
        [fieldName]: selectedFiles[0]
      });
    }
  };

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      // Revoke any object URLs to avoid memory leaks
      Object.values(filePreview).forEach(url => {
        if (url && typeof url === 'string' && url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [filePreview]);

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
       
      setFormSubmitting(true);
      
      const formData = new FormData();
      
      // Add course ID to formData
      formData.append('id', editingCourse.id);
      
      // Add all course text fields to formData
      for (const key in editingCourse) {
        if (editingCourse[key] !== null && editingCourse[key] !== undefined) {
          formData.append(key, editingCourse[key]);
        }
      }

      // Add files to formData if they were selected
      for (const key in files) {
        if (files[key]) {
          formData.append(`file_${key}`, files[key]);
          formData.append(`update_${key}`, "true");
        }
      }
     // Now that formData is fully prepared, you can log it
     console.log("Sending form data:", Object.fromEntries(formData.entries()));
      // Make the API call to update the course 
      const apiUrl = import.meta.env.VITE_API_BASE_URL;

      const response = await axios.post(
        `${apiUrl}index.php?route=updatecourse`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log("Response received:", response);
    
      if (response.data && response.data.status === "success") {
        // Close the modal and show success message
        onSuccess(response.data.course || editingCourse);
        alert("Course updated successfully!");
        onClose();
      } else {
        const errorMessage = response.data && response.data.message 
          ? response.data.message 
          : "Unknown error occurred";
        setError(errorMessage);
        alert("Error: " + errorMessage);
      }
    } catch (err) {
        console.error("Error updating course:", err);
        console.error("Full error object:", err);
        console.error("Response data if available:", err.response?.data);
        const errorMessage = err.response?.data?.message || 
                             err.response?.statusText || 
                             err.message || 
                             "Unknown error occurred";
        
        setError(errorMessage);
        alert("Error: " + errorMessage);
    } finally {
        setFormSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
        {/* Modal Header */}
        <div className="border-b px-6 py-3 flex justify-between items-center sticky top-0 bg-white z-10">
          <h3 className="text-lg font-medium text-gray-900">
            Edit Course
          </h3>
          <button
            type="button"
            onClick={onClose}
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

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-6 mt-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Edit Form */}
        <form onSubmit={handleSubmitEdit} className="p-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Course ID - Hidden but included for reference */}
            <input type="hidden" name="id" value={editingCourse.id || ""} />

            {/* Basic Information Section */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-medium text-gray-800 mb-4">Basic Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={editingCourse.title || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={editingCourse.subject || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Paper */}
                <div>
                  <label htmlFor="paper" className="block text-sm font-medium text-gray-700 mb-1">
                    Paper
                  </label>
                  <input
                    type="text"
                    id="paper"
                    name="paper"
                    value={editingCourse.paper || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Price */}
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    step="0.01"
                    value={editingCourse.price || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Discounted Price */}
                <div>
                  <label htmlFor="discounted_price" className="block text-sm font-medium text-gray-700 mb-1">
                    Discounted Price (optional)
                  </label>
                  <input
                    type="number"
                    id="discounted_price"
                    name="discounted_price"
                    step="0.01"
                    value={editingCourse.discounted_price || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Telegram Link */}
                <div>
                  <label htmlFor="telegram_link" className="block text-sm font-medium text-gray-700 mb-1">
                    Telegram Link (optional)
                  </label>
                  <input
                    type="text"
                    id="telegram_link"
                    name="telegram_link"
                    value={editingCourse.telegram_link || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-medium text-gray-800 mb-4">Description</h4>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Course Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={editingCourse.description || ""}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
            </div>

            {/* Course Materials Section */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-medium text-gray-800 mb-4">Course Materials (Files)</h4>
              <div className="grid grid-cols-1 gap-4">
                {/* Display Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display Image
                  </label>
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <input
                        type="file"
                        id="file_display_image"
                        name="file_display_image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Current: {editingCourse.display_image_url ? 
                        <a href={editingCourse.display_image_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View current image</a> : 
                        'No image set'}
                      </p>
                    </div>
                    {(filePreview.file_display_image || editingCourse.display_image_url) && (
                      <div className="w-24 h-24">
                        <img 
                          src={filePreview.file_display_image || editingCourse.display_image_url} 
                          alt="Preview" 
                          className="w-full h-full object-cover rounded border"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* PDF Materials */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {/* Master Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Master Notes (PDF)
                    </label>
                    <input
                      type="file"
                      id="file_master_notes"
                      name="file_master_notes"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Current: {editingCourse.master_notes_url ? 
                      <a href={editingCourse.master_notes_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View current PDF</a> : 
                      'No file set'}
                    </p>
                  </div>

                  {/* Smart Short Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Smart Short Notes (PDF)
                    </label>
                    <input
                      type="file"
                      id="file_smart_short_notes"
                      name="file_smart_short_notes"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Current: {editingCourse.smart_short_notes_url ? 
                      <a href={editingCourse.smart_short_notes_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View current PDF</a> : 
                      'No file set'}
                    </p>
                  </div>

                  {/* Old Papers */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Old Papers (PDF)
                    </label>
                    <input
                      type="file"
                      id="file_old_papers"
                      name="file_old_papers"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Current: {editingCourse.old_papers_url ? 
                      <a href={editingCourse.old_papers_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View current PDF</a> : 
                      'No file set'}
                    </p>
                  </div>

                  {/* Question Bank */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Question Bank (PDF)
                    </label>
                    <input
                      type="file"
                      id="file_question_bank"
                      name="file_question_bank"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Current: {editingCourse.question_bank_url ? 
                      <a href={editingCourse.question_bank_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View current PDF</a> : 
                      'No file set'}
                    </p>
                  </div>

                  {/* Text Book */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Text Book (PDF)
                    </label>
                    <input
                      type="file"
                      id="file_text_book"
                      name="file_text_book"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Current: {editingCourse.text_book_url ? 
                      <a href={editingCourse.text_book_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View current PDF</a> : 
                      'No file set'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formSubmitting}
              className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center ${
                formSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {formSubmitting && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {formSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourseModal;
import { useState } from 'react';
import { Upload, FilePlus, Check, AlertCircle, Image } from 'lucide-react';

const UploadCourses = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: 'CEM', // Default value for subject dropdown
    paper: 'Paper 1', // Default value for paper dropdown (renamed from classBook)
    telegramLink: '', // New field for Telegram link
    price: '',
    discountedPrice: '',
    displayImage: null,
    pdfFile: null,
    masterNotes: null,
    smartShortNotes: null,
    oldPapers: null,
    questionBank: null,
    textBook: null
  });
  
  const [fileSelected, setFileSelected] = useState({
    displayImage: false,
    pdfFile: false,
    masterNotes: false,
    smartShortNotes: false,
    oldPapers: false,
    questionBank: false,
    textBook: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      setFormData({
        ...formData,
        [name]: files[0]
      });
      setFileSelected({
        ...fileSelected,
        [name]: true
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Create form data for multipart/form-data submission (for file upload)
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('subject', formData.subject);
      submitData.append('paper', formData.paper);
      submitData.append('telegramLink', formData.telegramLink);
      submitData.append('price', formData.price);
      submitData.append('discountedPrice', formData.discountedPrice);
      
      // Append all files to the form data
      if (formData.displayImage) {
        submitData.append('displayImage', formData.displayImage);
      }
      
      if (formData.pdfFile) {
        submitData.append('courseFile', formData.pdfFile);
      }
      
      if (formData.masterNotes) {
        submitData.append('masterNotes', formData.masterNotes);
      }
      
      if (formData.smartShortNotes) {
        submitData.append('smartShortNotes', formData.smartShortNotes);
      }
      
      if (formData.oldPapers) {
        submitData.append('oldPapers', formData.oldPapers);
      }
      
      if (formData.questionBank) {
        submitData.append('questionBank', formData.questionBank);
      }
      
      if (formData.textBook) {
        submitData.append('textBook', formData.textBook);
      }
      
      // Example API call - replace with your actual endpoint
      const response = await fetch('http://localhost/EASCBackend/index.php?route=courses', {
        method: 'POST',
        body: submitData,
        // No Content-Type header is needed as FormData sets it automatically with boundary
      });
      
      // Get the raw text response before trying to parse as JSON
      const responseText = await response.text();
      console.log('Raw API response:', responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (error) {
        console.error('JSON parse error:', error);
        console.error('Problematic JSON string:', responseText);
        throw new Error('Server returned invalid JSON response');
      }
      
      if (data.success) {
        // Reset form after successful submission
        setFormData({
          title: '',
          description: '',
          subject: 'CEM',
          paper: 'Paper 1',
          telegramLink: '',
          price: '',
          discountedPrice: '',
          displayImage: null,
          pdfFile: null,
          masterNotes: null,
          smartShortNotes: null,
          oldPapers: null,
          questionBank: null,
          textBook: null
        });
        
        setFileSelected({
          displayImage: false,
          pdfFile: false,
          masterNotes: false,
          smartShortNotes: false,
          oldPapers: false,
          questionBank: false,
          textBook: false
        });
        
        setSubmitSuccess(true);
        
        // Reset success message after 3 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 3000);
      } else {
        setSubmitError(data.message || 'Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during upload:', error);
      setSubmitError(error.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Reusable file upload component
  const FileUploadField = ({ id, name, label, fileSelected, file }) => (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50">
        <input
          type="file"
          id={id}
          name={name}
          onChange={handleFileChange}
          accept=".pdf"
          className="hidden"
        />
        <label 
          htmlFor={id} 
          className="cursor-pointer flex flex-col items-center justify-center w-full"
        >
          {fileSelected ? (
            <>
              <FilePlus size={32} className="text-green-500 mb-1" />
              <span className="text-green-600 font-medium text-sm">{file?.name}</span>
              <span className="text-gray-500 text-xs mt-1">Click to replace file</span>
            </>
          ) : (
            <>
              <Upload size={32} className="text-gray-400 mb-1" />
              <span className="text-gray-600 font-medium text-sm">Upload {label}</span>
              <span className="text-gray-500 text-xs mt-1">PDF files only</span>
            </>
          )}
        </label>
      </div>
    </div>
  );
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Upload New Course</h1>
        <p className="text-gray-600">Add a new course to your catalog.</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          {/* Course Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Course Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter course title"
            />
          </div>
          
          {/* Subject and Paper - Side by side for larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Subject Dropdown */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="CEM">CEM</option>
                <option value="CEA">CEA</option>
              </select>
            </div>
            
            {/* Paper Dropdown (renamed from Class Book) */}
            <div>
              <label htmlFor="paper" className="block text-sm font-medium text-gray-700 mb-1">
                Paper
              </label>
              <select
                id="paper"
                name="paper"
                value={formData.paper}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Paper 1">Paper 1</option>
                <option value="Paper 2">Paper 2</option>
                <option value="Paper 3">Paper 3</option>
                <option value="Paper 4">Paper 4</option>
              </select>
            </div>
          </div>
          
          {/* Telegram Live Lecture Link */}
          <div className="mb-4">
            <label htmlFor="telegramLink" className="block text-sm font-medium text-gray-700 mb-1">
              Telegram Live Lecture Link
            </label>
            <input
              type="url"
              id="telegramLink"
              name="telegramLink"
              value={formData.telegramLink}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="https://t.me/yourlecture"
            />
          </div>
          
          {/* Course Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Course Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter course description"
            />
          </div>
          
          {/* Price and Discounted Price - Side by side for larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Regular Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Regular Price ($)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="0.00"
              />
            </div>
            
            {/* Discounted Price */}
            <div>
              <label htmlFor="discountedPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Discounted Price ($)
              </label>
              <input
                type="number"
                id="discountedPrice"
                name="discountedPrice"
                value={formData.discountedPrice}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="0.00"
              />
            </div>
          </div>
          
          {/* Course Display Image Upload */}
          <div className="mb-4">
            <label htmlFor="displayImage" className="block text-sm font-medium text-gray-700 mb-1">
              Course Display Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50">
              <input
                type="file"
                id="displayImage"
                name="displayImage"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <label 
                htmlFor="displayImage" 
                className="cursor-pointer flex flex-col items-center justify-center w-full"
              >
                {fileSelected.displayImage ? (
                  <>
                    <Image size={32} className="text-green-500 mb-1" />
                    <span className="text-green-600 font-medium text-sm">{formData.displayImage?.name}</span>
                    <span className="text-gray-500 text-xs mt-1">Click to replace image</span>
                  </>
                ) : (
                  <>
                    <Image size={32} className="text-gray-400 mb-1" />
                    <span className="text-gray-600 font-medium text-sm">Upload Course Image</span>
                    <span className="text-gray-500 text-xs mt-1">JPG, PNG, or GIF</span>
                  </>
                )}
              </label>
            </div>
          </div>
          
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Course Materials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
              {/* Master Notes PDF */}
              <FileUploadField 
                id="masterNotes" 
                name="masterNotes" 
                label="Master Notes" 
                fileSelected={fileSelected.masterNotes} 
                file={formData.masterNotes} 
              />
              
              {/* Smart Short Notes PDF */}
              <FileUploadField 
                id="smartShortNotes" 
                name="smartShortNotes" 
                label="Smart Short Notes" 
                fileSelected={fileSelected.smartShortNotes} 
                file={formData.smartShortNotes} 
              />
              
              {/* Old Papers PDF */}
              <FileUploadField 
                id="oldPapers" 
                name="oldPapers" 
                label="Old Papers" 
                fileSelected={fileSelected.oldPapers} 
                file={formData.oldPapers} 
              />
              
              {/* Question Bank PDF */}
              <FileUploadField 
                id="questionBank" 
                name="questionBank" 
                label="Question Bank" 
                fileSelected={fileSelected.questionBank} 
                file={formData.questionBank} 
              />
              
              {/* Text Book PDF */}
              <FileUploadField 
                id="textBook" 
                name="textBook" 
                label="Text Book" 
                fileSelected={fileSelected.textBook} 
                file={formData.textBook} 
              />
            </div>
          </div>
          
          {/* Error Message */}
          {submitError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 flex items-center">
              <AlertCircle size={18} className="mr-2" />
              {submitError}
            </div>
          )}
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-lg text-white font-medium flex items-center justify-center min-w-32
                ${isSubmitting ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {isSubmitting ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Uploading...
                </>
              ) : submitSuccess ? (
                <>
                  <Check size={18} className="mr-2" />
                  Uploaded!
                </>
              ) : (
                'Upload Course'
              )}
            </button>
          </div>
          
          {/* Success Message */}
          {submitSuccess && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700 flex items-center">
              <Check size={18} className="mr-2" />
              Course uploaded successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UploadCourses;
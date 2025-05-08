import { useState, useEffect } from 'react';
import { BookOpen, Clock, Eye, ExternalLink } from 'lucide-react';

const MyBooksPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  
  useEffect(() => {
    // Fetch purchased courses for the logged-in user
    const fetchMyCourses = async () => {
      try {
        // Adjust the URL to match your actual API endpoint
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}index.php?route=my_courses`;
        
        console.log('Fetching courses from:', apiUrl);
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          credentials: 'include', // Include cookies for session authentication
          headers: {
            'Content-Type': 'application/json',
            // Add any other headers your API requires
          }
        });
        
        // Check if the response is OK
        if (!response.ok) {
          // Handle HTTP error statuses
          if (response.status === 401) {
            setError('You must be logged in to view your courses. Please log in and try again.');
            setLoading(false);
            return;
          }
          
          throw new Error(`Server responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received data:', data);
        
        if (data.success) {
          setCourses(data.courses || []);
        } else {
          setError(data.message || 'Failed to fetch courses');
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
        
        // Provide more specific error message based on the error
        if (err.message && err.message.includes('blocked by CORS policy')) {
          setError('CORS error: The application cannot communicate with the server. Please contact support.');
        } else {
          setError('Error connecting to server. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchMyCourses();
  }, []);
  
  // Function to open PDF in the viewer
  const openPdfViewer = (url) => {
    setPdfUrl(url);
    setShowPdfViewer(true);
  };
  
  // Function to close PDF viewer
  const closePdfViewer = () => {
    setShowPdfViewer(false);
    setPdfUrl(null);
  };
  
  // PDF Viewer Modal Component
  const PdfViewerModal = () => {
    if (!showPdfViewer || !pdfUrl) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl h-5/6 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-medium">Document Viewer</h3>
            <button 
              onClick={closePdfViewer}
              className="p-1 rounded-full hover:bg-gray-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-grow p-0 overflow-hidden">
            <iframe 
              src={`${pdfUrl}#toolbar=0`} 
              className="w-full h-full border-0" 
              title="PDF Viewer"
            />
          </div>
        </div>
      </div>
    );
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
            <p className="font-medium">Error: {error}</p>
            <p className="mt-2">Please try again or contact support.</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Books & Courses</h1>
          <p className="mt-2 text-gray-600">Access all your purchased educational materials</p>
        </div>
        
        {courses.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No courses purchased yet</h3>
            <p className="mt-2 text-gray-500">Explore our catalog to find courses that interest you.</p>
            <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
                {course.display_image_url ? (
                  <img 
                    src={course.display_image_url} 
                    alt={course.title} 
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                
                <div className="p-4 flex-grow">
                  <div className="uppercase tracking-wide text-sm text-blue-500 font-semibold">
                    {course.subject}
                  </div>
                  <h3 className="mt-1 text-lg font-medium text-gray-900 leading-tight">
                    {course.title}
                  </h3>
                  <p className="mt-2 text-gray-600 text-sm line-clamp-3">
                    {course.description}
                  </p>
                </div>
                
                <div className="border-t border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Purchased on {new Date(course.start_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {course.master_notes_url && (
                      <button 
                        onClick={() => openPdfViewer(course.master_notes_url)}
                        className="flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Master Notes
                      </button>
                    )}
                    
                    {course.text_book_url && (
                      <button 
                        onClick={() => openPdfViewer(course.text_book_url)}
                        className="flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Textbook
                      </button>
                    )}
                    
                    {course.telegram_link && (
                      <a 
                        href={course.telegram_link}
                        className="flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 col-span-2"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Join Telegram Group
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* PDF Viewer Modal */}
        <PdfViewerModal />
      </div>
    </div>
  );
};

export default MyBooksPage;
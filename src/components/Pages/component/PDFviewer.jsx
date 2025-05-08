import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Spinner } from './index';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfViewer = ({ pdfUrl, onClose }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to handle PDF document loading
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
    setLoading(false);
  }

  // Function to handle PDF document loading failure
  function onDocumentLoadError(error) {
    setError('Failed to load PDF. Please try again.');
    setLoading(false);
  }

  // Function to change page
  const changePage = (offset) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  };

  // Function to go to previous page
  const previousPage = () => {
    changePage(-1);
  };

  // Function to go to next page
  const nextPage = () => {
    changePage(1);
  };

  // Prevent right-click on PDF (to prevent download)
  const preventRightClick = (e) => {
    e.preventDefault();
    return false;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-full max-w-6xl h-5/6 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold">PDF Viewer</div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-grow overflow-auto" onContextMenu={preventRightClick}>
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="flex justify-center items-center h-full">
                <Spinner />
              </div>
            }
            error={
              <div className="text-red-500 text-center p-10">
                {error || 'Failed to load PDF. Please try again.'}
              </div>
            }
          >
            {!loading && !error && (
              <Page 
                pageNumber={pageNumber} 
                width={Math.min(window.innerWidth * 0.8, 800)}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            )}
          </Document>
        </div>
        
        {numPages && (
          <div className="flex justify-between items-center mt-4">
            <div className="text-gray-600">
              Page {pageNumber} of {numPages}
            </div>
            <div className="flex space-x-2">
              <button 
                disabled={pageNumber <= 1}
                onClick={previousPage}
                className={`px-4 py-2 rounded ${pageNumber <= 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                Previous
              </button>
              <button 
                disabled={pageNumber >= numPages}
                onClick={nextPage}
                className={`px-4 py-2 rounded ${pageNumber >= numPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfViewer;
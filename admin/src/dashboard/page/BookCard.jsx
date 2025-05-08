
// BookCard.jsx
import React from 'react';

const BookCard = ({ book, onViewPdf }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full border border-gray-200">
      <div className="h-48 overflow-hidden relative">
        {book.display_image_url ? (
          <img 
            src={book.display_image_url} 
            alt={book.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-3 flex-1">{book.description}</p>
        <div className="text-xs text-gray-500 mb-3">
          <p>Subject: {book.subject}</p>
          <p>Paper: {book.paper}</p>
        </div>
        <button
          onClick={() => onViewPdf(book)}
          className="mt-auto flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors w-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View Book
        </button>
      </div>
    </div>
  );
};

export default BookCard;
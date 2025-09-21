import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start mb-4">
      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center mr-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-teal-600"
        >
          <path d="M12 18h.01" />
          <path d="M19 7v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          <path d="M7 15a3 3 0 0 0 3-3V4" />
          <path d="M14 4v8a3 3 0 0 0 3 3" />
        </svg>
      </div>
      <div className="px-4 py-3 rounded-2xl bg-gray-100 text-gray-800 rounded-tl-none flex items-center">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
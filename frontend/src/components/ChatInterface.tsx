import React, { useRef, useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import QuickActions from './QuickActions';
import ChatJobCard from './ChatJobCard'; // Import ChatJobCard
import useChatBot from '../hooks/useChatBot';

const ChatInterface: React.FC = () => {
  const { messages, isTyping, sendMessage, clearChat } = useChatBot();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [jobResults, setJobResults] = useState<any[]>([]); // State to store job results

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, jobResults]);

  const handleSendMessage = async (message: string) => {
    const response = await sendMessage(message);

    // Check if the response contains job results
    if (response.type === 'job_results' && response.jobs) {
      setJobResults(response.jobs); // Update job results state
    } else {
      setJobResults([]); // Clear job results if no jobs are found
    }
  };

  return (
    <div className="flex flex-col max-w-md w-full mx-auto bg-white rounded-xl shadow-lg h-[90vh]"> {/* constrain height */}
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-700 to-purple-600 text-white">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center mr-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-600"
            >
              <path d="M12 18h.01" />
              <path d="M19 7v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              <path d="M7 15a3 3 0 0 0 3-3V4" />
              <path d="M14 4v8a3 3 0 0 0 3 3" />
            </svg>
          </div>
          <div>
            <h2 className="font-bold text-lg">Asha AI</h2>
            <p className="text-xs text-purple-100">JobsForHer Assistant</p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="text-sm px-3 py-1 bg-purple-800 rounded-full hover:bg-purple-900 transition-colors"
        >
          New Chat
        </button>
      </div>

      {/* Chat Body */}
      <div className="flex flex-col flex-1 overflow-hidden"> {/* flex column body */}
        
        {/* Scrollable Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-2 bg-white">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isTyping && <TypingIndicator />}
          
          {/* Render job results */}
          {jobResults.map((job) => (
            <a key={job.id} href={`/job/${job.id}`} target="_blank" rel="noopener noreferrer">
              <ChatJobCard job={job} />
            </a>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-2 border-t border-gray-100 bg-white">
          <QuickActions onActionClick={handleSendMessage} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

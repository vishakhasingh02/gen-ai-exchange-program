import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, X } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const clearInput = () => setMessage('');

  // Auto-resize textarea
  const handleInput = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-end bg-white border border-gray-200 rounded-xl shadow-sm">
      <textarea
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        placeholder="Type your message..."
        className="flex-1 max-h-[120px] p-4 pr-12 outline-none resize-none rounded-l-xl"
        rows={1}
        disabled={disabled}
      />
      
      {message && (
        <button 
          type="button"
          onClick={clearInput}
          className="absolute right-14 bottom-4 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      )}
      
      <div className="flex p-2">
        <button
          type="button"
          className="p-2 mr-1 text-gray-500 rounded-full hover:bg-gray-100"
          aria-label="Voice input"
        >
          <Mic size={20} />
        </button>
        
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className={`p-2 rounded-full ${
            !message.trim() || disabled
              ? 'bg-gray-200 text-gray-400'
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
          aria-label="Send message"
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
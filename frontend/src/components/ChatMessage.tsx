import React from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import { MessageCircle, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      data-testid={`message-${message.id}`}
    >
      <div className={`flex items-start max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center 
          ${isUser ? 'bg-purple-100 ml-2' : 'bg-teal-100 mr-2'}`}
        >
          {isUser ? 
            <MessageCircle size={16} className="text-purple-600" /> : 
            <Bot size={16} className="text-teal-600" />
          }
        </div>
        
        <div 
          className={`px-4 py-3 rounded-2xl ${
            isUser 
              ? 'bg-purple-600 text-white rounded-tr-none' 
              : 'bg-gray-100 text-gray-800 rounded-tl-none'
          }`}
        >
          {message.content.split('\n').map((text, i) => (
            <React.Fragment key={i}>
              {text}
              {i !== message.content.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
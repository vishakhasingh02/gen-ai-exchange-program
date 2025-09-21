import { useState, useCallback, useEffect } from 'react';
import { ChatMessage } from '../types';
import { createChatMessage, detectBias, getRandomResponseTime } from '../utils/helpers';
import { sampleResponses } from '../data/mockData';

export const useChatBot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversation, setConversation] = useState<string[]>([]);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = createChatMessage(sampleResponses.greeting, 'assistant');
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

  const sendMessage = useCallback((content: string) => {
    // Prevent empty messages
    if (!content.trim()) return;

    // Add user message
    const userMessage = createChatMessage(content, 'user');
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Update conversation context
    setConversation(prev => [...prev, content]);
    
    // Simulate bot thinking
    setIsTyping(true);
    
    // Check for bias
    if (detectBias(content)) {
      setTimeout(() => {
        const biasResponse = createChatMessage(sampleResponses.biasDetection, 'assistant');
        setMessages(prevMessages => [...prevMessages, biasResponse]);
        setIsTyping(false);
      }, getRandomResponseTime());
      return;
    }
    
    // Fetch bot response with delay to simulate thinking
    setTimeout(async () => {
      try {
        const response = await fetch('http://localhost:5000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: content,
            history: conversation,  // You can send context for better answers
          }),
        });

        const data = await response.json();

        const botMessage = createChatMessage(data.reply, 'assistant');
        setMessages(prevMessages => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error fetching bot response:', error);
        const fallbackMessage = createChatMessage('Sorry, I can`t help', 'assistant');
        setMessages(prevMessages => [...prevMessages, fallbackMessage]);
      } finally {
        setIsTyping(false);
      }
    }, getRandomResponseTime());
  }, [conversation]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setConversation([]);
    // Re-initialize with welcome message
    const welcomeMessage = createChatMessage(sampleResponses.greeting, 'assistant');
    fetch('http://localhost:5000/reset', {
      method: 'POST'});
    setMessages([welcomeMessage]);
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
    clearChat,
    conversationContext: conversation.join(' ')
  };
};

export default useChatBot;

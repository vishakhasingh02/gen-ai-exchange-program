import { v4 as uuidv4 } from 'uuid';
import { ChatMessage, JobListing } from '../types';
import { jobListings, events, mentorshipPrograms, sampleResponses } from '../data/mockData';

export const createChatMessage = (content: string, role: 'user' | 'assistant'): ChatMessage => {
  return {
    id: uuidv4(),
    content,
    role,
    timestamp: new Date()
  };
};

export const detectIntent = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('job') || lowerMessage.includes('work') || lowerMessage.includes('career')) {
    return 'job';
  } else if (lowerMessage.includes('event') || lowerMessage.includes('workshop') || lowerMessage.includes('conference')) {
    return 'event';
  } else if (lowerMessage.includes('mentor') || lowerMessage.includes('guidance') || lowerMessage.includes('advice')) {
    return 'mentorship';
  } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return 'greeting';
  } else {
    return 'unknown';
  }
};

export const getBotResponse = (message: string, history: ChatMessage[]): string => {
  const intent = detectIntent(message);
  
  switch (intent) {
    case 'job':
      return sampleResponses.jobSearch;
    case 'event':
      return sampleResponses.events;
    case 'mentorship':
      return sampleResponses.mentorship;
    case 'greeting':
      return sampleResponses.greeting;
    default:
      // Check for follow-up questions using history
      if (history.length > 1) {
        const prevAssistantMessage = [...history].reverse().find(msg => msg.role === 'assistant');
        if (prevAssistantMessage && prevAssistantMessage.content.includes('job')) {
          return `Here are some job opportunities that might interest you:\n\n${formatJobListings(jobListings.slice(0, 2))}`;
        } else if (prevAssistantMessage && prevAssistantMessage.content.includes('event')) {
          return `Here are some upcoming events:\n\n${events.slice(0, 2).map(e => e.title + ' - ' + e.date).join('\n')}`;
        }
      }
      return sampleResponses.fallback;
  }
};

export const formatJobListings = (jobs: JobListing[]): string => {
  return jobs.map(job => `${job.jobTitle} at ${job.organizationName} (${job.jobLocation.join(', ')})`).join('\n');
};

export const detectBias = (message: string): boolean => {
  const biasedPhrases = [
    'women can\'t', 'women are not good at', 'women should stick to', 'men are better',
    'technical roles are for', 'leadership positions should be'
  ];
  
  return biasedPhrases.some(phrase => message.toLowerCase().includes(phrase));
};

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const getRandomResponseTime = (): number => {
  return Math.floor(Math.random() * 1000) + 500; // Between 500ms and 1500ms
};
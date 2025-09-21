import { JobListing, Event, MentorshipProgram, AnalyticsData } from '../types';

export const jobListings: JobListing[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'TechInnovate',
    location: 'Remote',
    type: 'Full-time',
    description: 'Looking for an experienced software engineer to lead development projects in our growing tech team.',
    skills: ['JavaScript', 'React', 'Node.js', 'Cloud Architecture'],
    postedDate: '2025-03-10',
    url: '#job-listing-1'
  },
  {
    id: '2',
    title: 'Data Scientist',
    company: 'AnalyticsPro',
    location: 'Bangalore, India',
    type: 'Full-time',
    description: 'Join our data science team to build ML models that drive business decisions.',
    skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization'],
    postedDate: '2025-03-08',
    url: '#job-listing-2'
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    company: 'DesignHub',
    location: 'Hybrid - Mumbai',
    type: 'Contract',
    description: 'Create beautiful, intuitive designs for our suite of products.',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    postedDate: '2025-03-12',
    url: '#job-listing-3'
  },
  {
    id: '4',
    title: 'Product Manager',
    company: 'GrowthTech',
    location: 'Delhi NCR',
    type: 'Full-time',
    description: 'Lead product development for our SaaS platform targeting small businesses.',
    skills: ['Agile', 'Product Strategy', 'User Stories', 'Roadmapping'],
    postedDate: '2025-03-05',
    url: '#job-listing-4'
  }
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Women in Tech Leadership Summit',
    date: '2025-04-15',
    time: '9:00 AM - 5:00 PM',
    description: 'Join industry leaders for a day of insights, networking, and career opportunities.',
    location: 'Bangalore, India',
    type: 'Conference',
    imageUrl: 'https://images.pexels.com/photos/2566581/pexels-photo-2566581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '2',
    title: 'Resume Building Workshop',
    date: '2025-03-25',
    time: '3:00 PM - 5:00 PM',
    description: 'Learn how to craft the perfect resume that highlights your skills and experience.',
    location: 'Virtual',
    type: 'Workshop',
    imageUrl: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '3',
    title: 'Returning to Work After a Career Break',
    date: '2025-04-02',
    time: '4:00 PM - 6:00 PM',
    description: 'Strategies and support for women looking to restart their careers.',
    location: 'Hybrid - Mumbai',
    type: 'Panel Discussion',
    imageUrl: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

export const mentorshipPrograms: MentorshipProgram[] = [
  {
    id: '1',
    title: 'Women in Leadership',
    description: 'One-on-one mentorship focused on developing leadership skills for mid-career professionals.',
    duration: '3 months',
    mentorName: 'Priya Sharma',
    mentorTitle: 'CTO, CloudSolutions',
    topics: ['Leadership', 'Strategic Thinking', 'Team Management'],
    startDate: '2025-04-10'
  },
  {
    id: '2',
    title: 'Tech Career Accelerator',
    description: 'Guidance for women starting or transitioning into technical roles.',
    duration: '6 months',
    mentorName: 'Anita Desai',
    mentorTitle: 'Senior Engineering Manager, GlobalTech',
    topics: ['Technical Skills', 'Career Planning', 'Networking'],
    startDate: '2025-05-01'
  },
  {
    id: '3',
    title: 'Entrepreneurship Basics',
    description: 'Support for women looking to start their own businesses or freelance careers.',
    duration: '4 months',
    mentorName: 'Lakshmi Iyer',
    mentorTitle: 'Founder & CEO, StartupBoost',
    topics: ['Business Planning', 'Funding', 'Marketing'],
    startDate: '2025-03-20'
  }
];

export const analyticsData: AnalyticsData = {
  totalConversations: 1243,
  averageRating: 4.7,
  popularTopics: [
    { topic: 'Job Search', count: 426 },
    { topic: 'Career Advice', count: 318 },
    { topic: 'Resume Help', count: 287 },
    { topic: 'Events', count: 212 }
  ],
  responseAccuracy: 92
};

export const sampleResponses = {
  greeting: "Hello! I'm Asha, your AI assistant for JobsForHer Foundation. I can help you with job searches, career advice, events, and mentorship programs. How can I assist you today?",
  jobSearch: "I'd be happy to help you find job opportunities. Could you tell me what kind of role you're looking for? Or I can show you some recent listings.",
  events: "There are several upcoming events that might interest you. Would you like to know about networking events, workshops, or conferences?",
  mentorship: "Mentorship can be a great way to grow your career. We have programs focused on leadership, technical skills, and entrepreneurship. Which area interests you most?",
  careerAdvice: "I'd be happy to provide some career guidance. Are you looking to advance in your current field, make a career change, or return to work after a break?",
  fallback: "I'm sorry, I didn't quite understand that. Could you rephrase your question? I'm here to help with job searches, career advice, events, and mentorship programs.",
  biasDetection: "I notice that question contains assumptions that might not align with our commitment to gender equality. Let me provide some balanced information instead..."
};
import React from 'react';
import { mentorshipPrograms } from '../data/mockData';
import MentorshipCard from '../components/MentorshipCard';
import { Users, Search, Filter } from 'lucide-react';

const MentorshipPage: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-rose-700 to-rose-600 text-white">
        <div className="flex items-center mb-2">
          <Users className="mr-2" size={20} />
          <h2 className="text-xl font-bold">Mentorship Programs</h2>
        </div>
        <p className="text-rose-100 text-sm">Connect with industry leaders and accelerate your career growth</p>
      </div>
      
      <div className="p-6">
        {/* Search and filter */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for mentorship programs or topics..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 pr-8 text-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none">
                <option>All Categories</option>
                <option>Leadership</option>
                <option>Technical Skills</option>
                <option>Career Transition</option>
                <option>Entrepreneurship</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 pr-8 text-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none">
                <option>Duration</option>
                <option>1-3 Months</option>
                <option>3-6 Months</option>
                <option>Over 6 Months</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            
            <button className="flex items-center px-3 py-1.5 bg-rose-600 text-white text-sm rounded-lg hover:bg-rose-700 transition-colors">
              <Filter size={14} className="mr-1" />
              Filter
            </button>
          </div>
        </div>
        
        {/* Introduction banner */}
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-lg">
          <h3 className="text-lg font-medium text-rose-800 mb-2">Why Join a Mentorship Program?</h3>
          <p className="text-sm text-rose-700 mb-2">
            Mentorship can accelerate your career growth by providing guidance from experienced professionals. Our mentors are industry leaders committed to supporting women in their professional journeys.
          </p>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center px-2 py-1 bg-white rounded-md border border-rose-200">
              <div className="h-2 w-2 rounded-full bg-rose-500 mr-1"></div>
              <span className="text-xs text-rose-700">Personalized guidance</span>
            </div>
            <div className="flex items-center px-2 py-1 bg-white rounded-md border border-rose-200">
              <div className="h-2 w-2 rounded-full bg-rose-500 mr-1"></div>
              <span className="text-xs text-rose-700">Expand your network</span>
            </div>
            <div className="flex items-center px-2 py-1 bg-white rounded-md border border-rose-200">
              <div className="h-2 w-2 rounded-full bg-rose-500 mr-1"></div>
              <span className="text-xs text-rose-700">Develop new skills</span>
            </div>
          </div>
        </div>
        
        {/* Mentorship programs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mentorshipPrograms.map(program => (
            <MentorshipCard key={program.id} program={program} />
          ))}
        </div>
        
        {/* Apply as mentor */}
        <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Interested in Becoming a Mentor?</h3>
          <p className="text-sm text-gray-600 mb-4">
            Share your expertise and help other women professionals grow in their careers
          </p>
          <button className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
            Apply as a Mentor
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorshipPage;
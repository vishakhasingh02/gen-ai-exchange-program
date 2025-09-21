import React from 'react';
import { MentorshipProgram } from '../types';
import { Calendar, Clock, User } from 'lucide-react';
import { formatDate } from '../utils/helpers';

interface MentorshipCardProps {
  program: MentorshipProgram;
}

const MentorshipCard: React.FC<MentorshipCardProps> = ({ program }) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg text-gray-800">{program.title}</h3>
      </div>
      
      <div className="flex items-center text-gray-700 mb-2">
        <User size={14} className="mr-1" />
        <span className="text-sm font-medium">{program.mentorName}</span>
        <span className="mx-1 text-gray-400">•</span>
        <span className="text-sm text-gray-500">{program.mentorTitle}</span>
      </div>
      
      <div className="flex items-center text-gray-500 text-sm mb-2">
        <Calendar size={14} className="mr-1" />
        <span>Starts {formatDate(program.startDate)}</span>
      </div>
      
      <div className="flex items-center text-gray-500 text-sm mb-3">
        <Clock size={14} className="mr-1" />
        <span>Duration: {program.duration}</span>
      </div>
      
      <p className="text-gray-600 text-sm mb-3">{program.description}</p>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {program.topics.map((topic, index) => (
          <span key={index} className="px-2 py-1 bg-rose-100 text-rose-600 text-xs rounded-full">
            {topic}
          </span>
        ))}
      </div>
      
      <button className="px-4 py-2 bg-rose-600 text-white text-sm rounded-lg hover:bg-rose-700 transition-colors w-full">
        Apply for Mentorship
      </button>
    </div>
  );
};

export default MentorshipCard;
import React from 'react';
import { Briefcase, Calendar, Users, BookOpen } from 'lucide-react';

interface QuickActionsProps {
  onActionClick: (message: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  const actions = [
    { icon: <Briefcase size={18} />, label: 'Find Jobs', message: 'Show me job opportunities for women' },
    { icon: <Calendar size={18} />, label: 'Upcoming Events', message: 'What events are coming up?' },
    { icon: <Users size={18} />, label: 'Mentorship', message: 'Tell me about mentorship programs' },
    { icon: <BookOpen size={18} />, label: 'Career Advice', message: 'I need career advice' }
  ];

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-xl">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => onActionClick(action.message)}
          className="flex items-center px-3 py-2 text-sm bg-white text-gray-700 rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-300 transition-colors duration-200"
        >
          <span className="mr-2 text-purple-600">{action.icon}</span>
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
import React from 'react';
import { Event } from '../types';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { formatDate } from '../utils/helpers';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-200">
      {event.imageUrl && (
        <div className="h-40 overflow-hidden">
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-800">{event.title}</h3>
          <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full">
            {event.type}
          </span>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <Calendar size={14} className="mr-1" />
          <span>{formatDate(event.date)}</span>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <Clock size={14} className="mr-1" />
          <span>{event.time}</span>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin size={14} className="mr-1" />
          <span>{event.location}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3">{event.description}</p>
        
        <button className="px-4 py-2 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 transition-colors w-full">
          Register Now
        </button>
      </div>
    </div>
  );
};

export default EventCard;
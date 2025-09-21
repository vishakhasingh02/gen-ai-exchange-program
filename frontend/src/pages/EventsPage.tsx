import React from 'react';
import { events } from '../data/mockData';
import EventCard from '../components/EventCard';
import { Calendar, Search, Filter } from 'lucide-react';

const EventsPage: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-teal-700 to-teal-600 text-white">
        <div className="flex items-center mb-2">
          <Calendar className="mr-2" size={20} />
          <h2 className="text-xl font-bold">Upcoming Events</h2>
        </div>
        <p className="text-teal-100 text-sm">Discover workshops, conferences, and networking opportunities</p>
      </div>
      
      <div className="p-6">
        {/* Search and filter */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for events, topics, or locations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          
          <div className="flex justify-between items-center mt-3">
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 pr-8 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none">
                  <option>All Event Types</option>
                  <option>Workshop</option>
                  <option>Conference</option>
                  <option>Webinar</option>
                  <option>Networking</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 pr-8 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none">
                  <option>All Locations</option>
                  <option>Virtual</option>
                  <option>Bangalore</option>
                  <option>Mumbai</option>
                  <option>Delhi NCR</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              
              <button className="flex items-center px-3 py-1.5 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 transition-colors">
                <Filter size={14} className="mr-1" />
                Filter
              </button>
            </div>
            
            <div className="hidden sm:flex gap-1 p-1 bg-gray-100 rounded-lg">
              <button className="px-3 py-1 text-sm bg-white shadow-sm rounded-md font-medium">
                Upcoming
              </button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 rounded-md">
                Past
              </button>
            </div>
          </div>
        </div>
        
        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        
        {/* Show more button */}
        <div className="mt-6 text-center">
          <button className="px-4 py-2 bg-teal-100 text-teal-700 text-sm font-medium rounded-lg hover:bg-teal-200 transition-colors">
            Show More Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
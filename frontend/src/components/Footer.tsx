import React from 'react';
import { Heart, Github, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start">
              <div className="h-8 w-8 bg-gradient-to-r from-purple-600 to-purple-500 rounded-md flex items-center justify-center shadow-sm mr-2">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="font-bold text-xl text-gray-800">Asha AI</span>
            </div>
            <p className="text-sm text-gray-500 mt-1 text-center md:text-left">
              Enhancing women's professional journeys
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-2">
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                <ExternalLink size={20} />
              </a>
            </div>
            <p className="text-sm text-gray-500 flex items-center">
              Made with <Heart size={14} className="text-rose-500 mx-1" /> for ASHA AI HACKATHON 2025
            </p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-500 mb-2 md:mb-0">
              © 2025 Asha AI. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Terms of Service</a>
              <a href="#" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
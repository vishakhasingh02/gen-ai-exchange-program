import React, { useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, we would implement dark mode functionality here
  };

  const tabs = [
    { id: 'chat', label: 'Chat' },
    { id: 'jobs', label: 'Jobs' },
    { id: 'events', label: 'Events' },
    { id: 'mentorship', label: 'Mentorship' },
    { id: 'dashboard', label: 'Dashboard' }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center mr-2">
              <div className="h-8 w-8 bg-gradient-to-r from-purple-600 to-purple-500 rounded-md flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg">A</span>
              </div>
            </div>
            <span className="font-bold text-xl text-gray-800">Asha AI</span>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          
          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-gray-500 hover:bg-gray-100"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl z-50">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="font-bold text-lg text-gray-800">Menu</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="p-4">
              <ul className="space-y-1">
                {tabs.map(tab => (
                  <li key={tab.id}>
                    <button
                      onClick={() => {
                        onTabChange(tab.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
                        activeTab === tab.id
                          ? 'bg-purple-100 text-purple-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
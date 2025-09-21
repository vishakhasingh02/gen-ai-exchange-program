import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatInterface from './components/ChatInterface';
import JobsPage from './pages/JobsPage';
import EventsPage from './pages/EventsPage';
import MentorshipPage from './pages/MentorshipPage';
import Dashboard from './components/Dashboard';

function App() {
  const [activeTab, setActiveTab] = useState('chat');

  const renderContent = () => {
    switch (activeTab) {
      case 'jobs':
        return <JobsPage />;
      case 'events':
        return <EventsPage />;
      case 'mentorship':
        return <MentorshipPage />;
      case 'dashboard':
        return <Dashboard />;
      case 'chat':
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {renderContent()}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
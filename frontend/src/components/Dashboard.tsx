import React from 'react';
import { analyticsData } from '../data/mockData';
import { PieChart, BarChart, Activity, Users } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { totalConversations, averageRating, popularTopics, responseAccuracy } = analyticsData;
  
  const stats = [
    { 
      icon: <Users className="h-6 w-6 text-purple-600" />,
      label: "Total Conversations", 
      value: totalConversations.toLocaleString(),
      change: "+12% from last month",
      color: "bg-purple-100"
    },
    { 
      icon: <PieChart className="h-6 w-6 text-teal-600" />,
      label: "Average Rating", 
      value: averageRating.toFixed(1) + "/5.0",
      change: "+0.2 from last month",
      color: "bg-teal-100"
    },
    { 
      icon: <Activity className="h-6 w-6 text-rose-600" />,
      label: "Response Accuracy", 
      value: responseAccuracy + "%",
      change: "+3% from last month",
      color: "bg-rose-100"
    },
    { 
      icon: <BarChart className="h-6 w-6 text-amber-600" />,
      label: "Response Time", 
      value: "1.2s",
      change: "-0.3s from last month",
      color: "bg-amber-100"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-700 text-white">
        <h2 className="text-xl font-bold mb-1">Analytics Dashboard</h2>
        <p className="text-gray-300 text-sm">Monitor Asha AI's performance and user engagement</p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <div className={`p-2 rounded-lg ${stat.color} mr-3`}>
                  {stat.icon}
                </div>
                <span className="text-gray-500 text-sm font-medium">{stat.label}</span>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-xs text-green-600">{stat.change}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Popular Topics</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="space-y-3">
              {popularTopics.map((topic, index) => (
                <div key={index} className="relative pt-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{topic.topic}</span>
                    <span className="text-sm text-gray-600">{topic.count} queries</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-purple-600 to-rose-500"
                      style={{ width: `${(topic.count / popularTopics[0].count) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-3">Recent Updates</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-green-500 mt-2 mr-2"></div>
                <div>
                  <p className="text-sm text-gray-700">Bias detection algorithm improved with 15% higher accuracy</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 mr-2"></div>
                <div>
                  <p className="text-sm text-gray-700">Added 120 new job listings from partner companies</p>
                  <p className="text-xs text-gray-500">5 days ago</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-purple-500 mt-2 mr-2"></div>
                <div>
                  <p className="text-sm text-gray-700">Updated event database with 15 new workshops and webinars</p>
                  <p className="text-xs text-gray-500">1 week ago</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
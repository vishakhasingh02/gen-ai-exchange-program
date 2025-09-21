import React from 'react';

interface JobCardProps {
  job: {
    id: string;
    jobTitle: string;
    location: string[];
    organizationName: string;
    workingHours: string;
    experience: string;
    skills: string[];
  };
}

const ChatJobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-md mb-4">
      <h3 className="font-bold text-lg text-gray-800">{job.jobTitle}</h3>
      <p className="text-sm text-gray-600 mb-2">
        <strong>Organization:</strong> {job.organizationName}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        <strong>Location:</strong> {job.location.join(', ')}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        <strong>Working Hours:</strong> {job.workingHours}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        <strong>Experience:</strong> {job.experience}
      </p>
      <div className="flex flex-wrap gap-1">
        {job.skills.map((skill, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ChatJobCard;
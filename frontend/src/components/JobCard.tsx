import React from 'react';
import { JobListing } from '../types';
import { Briefcase, MapPin } from 'lucide-react';

interface JobCardProps {
  job: JobListing;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg text-gray-800">{job.jobTitle}</h3>
        {job.isConfidential ? (
          <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">Confidential</span>
        ) : (
          <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">Regular</span>
        )}
      </div>
      
      <p className="font-medium text-gray-700 mb-2">{job.organizationName}</p>
      
      <div className="flex items-center text-gray-500 text-sm mb-2">
        <MapPin size={14} className="mr-1" />
        <span>{job.jobLocation.join(', ')}</span>
      </div>
      
      {/* Render the job description as HTML */}
      <div className="text-gray-600 text-base mb-3">Posted On: 
         {new Date(job.createdOn).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
      </div>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {job.requiredSkills.slice(0, 3).map((skill, index) => (
          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
            {skill}
          </span>
        ))}
        {job.requiredSkills.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
            +{job.requiredSkills.length - 3} more
          </span>
        )}
      </div>
      
      <a 
        href={`https://www.she-jobs.com/job/${job._id}`} target="_blank"
        className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800"
      >
        <Briefcase size={14} className="mr-1" />
        View Job Details
      </a>
    </div>
  );
};

export default JobCard;
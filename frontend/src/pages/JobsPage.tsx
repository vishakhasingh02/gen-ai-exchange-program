import React, { useState, useEffect } from 'react';
import { Search, Briefcase } from 'lucide-react';
import JobCard from '../components/JobCard';
import { JobListing } from '../types';
import jobData from '../data/jobs.json';

const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [jobsPerPage] = useState<number>(6);

  useEffect(() => {
    // Ensure jobData is treated as JobListing[]
    setJobs(jobData as JobListing[]);
  }, []);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-purple-700 to-purple-600 text-white">
        <div className="flex items-center mb-2">
          <Briefcase className="mr-2" size={20} />
          <h2 className="text-xl font-bold">Job Opportunities</h2>
        </div>
        <p className="text-purple-100 text-sm">Find your perfect career match with these opportunities</p>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for jobs, skills, or companies..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {currentJobs.map(job => (
            <JobCard key={job.jobId} job={job} />
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{indexOfFirstJob + 1}-{Math.min(indexOfLastJob, jobs.length)}</span> of <span className="font-medium">{jobs.length}</span> jobs
          </div>
          
          <div className="flex space-x-1">
            <button 
              className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
              const page = Math.max(1, currentPage - 2) + index;
              if (page > totalPages) return null;
              return (
          <button
            key={page}
            className={`px-3 py-1 border border-gray-300 rounded-md text-sm ${currentPage === page ? 'bg-purple-100 text-purple-700' : ''}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
              );
            })}
            {currentPage + 2 < totalPages && (
              <button
          className="px-3 py-1 border border-gray-300 rounded-md text-sm"
          onClick={() => handlePageChange(currentPage + 1)}
              >
          ...
              </button>
            )}
            <button
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;

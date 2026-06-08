import React from 'react';
import { useNavigate } from 'react-router-dom';

const LabDetailsHeader = ({ details }) => {
  const navigate = useNavigate();
  
  let labTitle = "Loading Lab...";
  if (details) {
    labTitle = details.title;
  }

  return (
    <header className="w-full bg-[#f8fafc] pt-4 pb-6 flex justify-between items-start box-border border-b border-gray-200 mb-2">
      <div>
        <h1 className="text-3xl font-extrabold text-blue-600 tracking-tight uppercase">
          {labTitle}
        </h1>
        <p className="text-sm text-gray-500 mt-1 font-semibold">
          Exam Workspace Context
        </p>
      </div>
      
      <button 
        onClick={function() { navigate("/TeacherHomePage"); }}
        className="bg-[#6b7280] hover:bg-slate-700 text-white font-bold text-sm px-5 py-2.5 rounded-md transition-colors shadow-sm flex items-center gap-1 cursor-pointer"
      >
        &larr; Back to List
      </button>
    </header>
  );
};

export default LabDetailsHeader;
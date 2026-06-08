import React from 'react';

// 1. Destructured onOpenModal right here alongside profile
const TeacherHomePageHeader = ({ profile, onOpenModal }) => {
  let teacherName = "Loading...";
  let teacherEmail = "";
  let teacherRole = "Faculty Access";

  if (profile) {
    teacherName = profile.name;
    teacherEmail = profile.email;
    
    if (profile.role === "faculty") {
      teacherRole = "Faculty Access";
    } else {
      teacherRole = profile.role + " Access";
    }
  }

  return (
    <header className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex justify-between items-center box-border">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          {teacherName}
        </h1>
        <p className="text-sm text-gray-500 mt-1.5 font-medium">
          {teacherEmail} <span className="text-gray-300 mx-1.5">•</span> {teacherRole}
        </p>
      </div>

      <div className="flex gap-4">
        {/* 2. Fixed onClick to call onOpenModal directly and added clean blue styles */}
        <button 
          onClick={onOpenModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm cursor-pointer"
        >
          Create New Quiz +
        </button>
        
        <button className="bg-[#ef4444] hover:bg-red-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm cursor-pointer">
          Logout
        </button>
      </div>
    </header>
  );
};

export default TeacherHomePageHeader;
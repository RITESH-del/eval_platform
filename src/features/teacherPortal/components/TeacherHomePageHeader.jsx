import React from 'react';

const TeacherHomePageHeader = ({ profile }) => {
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
        <button className="bg-[#20b2aa] hover:bg-teal-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm cursor-pointer">
          + Create New Quiz
        </button>
        <button className="bg-[#ef4444] hover:bg-red-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm cursor-pointer">
          Logout
        </button>
      </div>
    </header>
  );
};

export default TeacherHomePageHeader;
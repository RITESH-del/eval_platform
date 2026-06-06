import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentDetailsHeader = ({ data }) => {
  const navigate = useNavigate();

  // Set default placeholder strings so you can visually spot fallback states
  let studentName = "Loading Name...";
  let rollNumber = "------";
  let examTitle = "Loading Exam Title...";

  // Explicit conditional checks matching your specific nested JSON nodes
  if (data) {
    if (data.student_details) {
      if (data.student_details.name) {
        studentName = data.student_details.name;
      }
      if (data.student_details.university_id) {
        rollNumber = data.student_details.university_id;
      }
    }
    
    if (data.exam_details) {
      if (data.exam_details.title) {
        examTitle = data.exam_details.title;
      }
    }
  }

  return (
    <header className="w-full bg-[#f8fafc] pt-4 pb-6 flex justify-between items-start box-border border-b border-gray-200 mb-2">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Review Submission: <span className="text-blue-600">{studentName}</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1.5 font-semibold">
          Roll Number: {rollNumber} <span className="text-gray-300 mx-1.5">|</span> {examTitle}
        </p>
      </div>

      <button 
        onClick={() => navigate("/TeacherHomePage/LabDetails")}
        className="bg-[#6b7280] hover:bg-slate-700 text-white font-bold text-sm px-5 py-2.5 rounded-md transition-colors shadow-sm flex items-center gap-1 cursor-pointer"
      >
        &larr; Back to Submissions
      </button>
    </header>
  );
};

export default StudentDetailsHeader;
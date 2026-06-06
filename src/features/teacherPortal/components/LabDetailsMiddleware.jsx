import React from 'react';
import { useNavigate } from 'react-router-dom';

const LabDetailsMiddleware = ({ submissions }) => {
  const navigate = useNavigate();

  if (!submissions || submissions.length === 0) {
    return (
      <main className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 min-h-[50vh] box-border">
        <p className="text-gray-500">No student sessions found for this lab.</p>
      </main>
    );
  }

  return (
    <main className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 min-h-[55vh] box-border">
      <h2 className="text-xl font-bold text-slate-800 tracking-wide mb-6">
        Student Submissions Tracking
      </h2>
      
      <div className="flex flex-col gap-4">
        {submissions.map((student) => {
          // 1. Classic if/else handling for student programming language text
          let langText = "";
          if (student.language === null) {
            langText = "N/A";
          } else {
            langText = student.language;
          }

          // 2. Classic if/else handling for autograding software test scores
          let autoScore = "";
          if (student.autograding_score === null) {
            autoScore = "-";
          } else {
            autoScore = student.autograding_score;
          }

          // 3. Classic if/else handling for instructor grading inputs
          let manScore = "";
          if (student.manual_score === null) {
            manScore = "-";
          } else {
            manScore = student.manual_score;
          }

          // 4. Classic if/else handling for custom attendance layout border styles
          let statusBadgeClass = "";
          let cardCursorClass = "";
          if (student.status === "absent") {
            statusBadgeClass = "bg-red-50 text-red-500 border-red-200";
            cardCursorClass = "opacity-60 cursor-not-allowed";
          } else {
            statusBadgeClass = "bg-green-50 text-green-600 border-green-200";
            cardCursorClass = "cursor-pointer";
          }

          return (
            <div 
              key={student.session_id} 
              onClick={() => {
                // Only push into submission panel if the student was present
                if (student.status !== "absent") {
                  navigate("/TeacherHomePage/LabDetails/StudentDetails");
                }
              }}
              className={`w-full border border-gray-200 rounded-xl p-5 flex justify-between items-center bg-white hover:border-gray-300 transition-colors box-border ${cardCursorClass}`}
            >
              {/* Left Side Content layout block */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400 font-semibold">
                  Roll: <span className="text-gray-600">{student.university_id}</span>
                </span>
                
                <span className="bg-gray-100 text-gray-600 font-bold text-xs px-2.5 py-1 rounded-md border border-gray-200">
                  Sec - {student.section}
                </span>

                <span className="text-blue-600 font-bold text-lg hover:underline">
                  {student.name}
                </span>
              </div>

              {/* Right Side Content layout block */}
              <div className="flex items-center gap-8 text-sm">
                <div className="text-gray-500 font-medium">
                  Language: <span className="text-gray-700 font-bold">{langText}</span>
                </div>
                
                <div className="text-gray-500 font-medium">
                  App Marks: <span className="text-teal-600 font-black text-base">{autoScore}</span>
                </div>

                <div className="text-gray-500 font-medium">
                  Teacher Marks: <span className="text-blue-600 font-black text-base">{manScore}</span>
                </div>

                <span className={`px-3 py-1 text-xs font-black uppercase rounded-md border tracking-wider ${statusBadgeClass}`}>
                  {student.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default LabDetailsMiddleware;
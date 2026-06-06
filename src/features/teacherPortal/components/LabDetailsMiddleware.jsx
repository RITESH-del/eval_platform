import React from 'react';

const LabDetailsMiddleware = ({ submissions }) => {
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
          let langText = student.language;
          let autoScore = student.autograding_score;
          let manScore = student.manual_score;

          if (langText === null) langText = "N/A";
          if (autoScore === null) autoScore = "-";
          if (manScore === null) manScore = "-";

          let statusBadgeClass = "bg-green-50 text-green-600 border-green-200";
          if (student.status === "absent") {
            statusBadgeClass = "bg-red-50 text-red-500 border-red-200";
          }

          return (
            <div 
              key={student.session_id} 
              className="w-full border border-gray-200 rounded-xl p-5 flex justify-between items-center bg-white hover:border-gray-300 transition-colors box-border"
            >
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400 font-semibold">
                  Roll: <span className="text-gray-600">{student.university_id}</span>
                </span>
                
                <span className="bg-gray-100 text-gray-600 font-bold text-xs px-2.5 py-1 rounded-md border border-gray-200">
                  Sec - {student.section}
                </span>

                <span className="text-blue-600 font-bold text-lg hover:underline cursor-pointer">
                  {student.name}
                </span>
              </div>

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

                <span className={"px-3 py-1 text-xs font-black uppercase rounded-md border tracking-wider " + statusBadgeClass}>
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
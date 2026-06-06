import React from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherHomePageMiddleware = ({ practicals }) => {
  const navigate = useNavigate();

  const getReadableDate = (isoString) => {
    let dateObj = new Date(isoString);
    let day = dateObj.getUTCDate();
    let month = dateObj.getUTCMonth() + 1;
    let year = dateObj.getUTCFullYear();

    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;

    return day + "-" + month + "-" + year;
  };

  const getReadableTime = (isoString) => {
    let dateObj = new Date(isoString);
    let hours = dateObj.getUTCHours();
    let minutes = dateObj.getUTCMinutes();
    let ampm = "AM";

    if (hours >= 12) ampm = "PM";
    if (hours > 12) hours = hours - 12;
    if (hours === 0) hours = 12;

    if (minutes < 10) minutes = "0" + minutes;
    if (hours < 10) hours = "0" + hours;

    return hours + ":" + minutes + " " + ampm;
  };

  const getDurationText = (totalMinutes) => {
    let hours = Math.floor(totalMinutes / 60);
    return hours + " Hrs";
  };

  const getBatchRange = (graduationYear) => {
    let startYear = graduationYear - 4;
    return startYear + "-" + graduationYear;
  };

  if (!practicals || practicals.length === 0) {
    return (
      <main className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 min-h-[50vh] box-border">
        <h2 className="text-xl font-bold text-gray-700 border-b border-gray-100 pb-4 mb-6">
          Past Practicals Details
        </h2>
        <p className="text-gray-500">No past practicals found.</p>
      </main>
    );
  }

  return (
    <main className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 min-h-[55vh] box-border">
      <h2 className="text-xl font-bold text-gray-700 border-b border-gray-100 pb-4 mb-6">
        Past Practicals Details
      </h2>
      
      <div className="flex flex-col gap-5">
        {practicals.map((practical) => (
          <div 
            key={practical.id} 
            onClick={() => navigate("/TeacherHomePage/LabDetailsPage")}
            className="w-full border border-gray-200 rounded-xl p-6 flex justify-between items-center hover:shadow-md transition-shadow bg-white box-border cursor-pointer"
          >
            <div>
              <h3 className="text-blue-600 font-extrabold text-xl mb-1.5 uppercase tracking-wide">
                {practical.title}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-3">
                <span>
                  <strong className="text-gray-600 font-semibold">Section:</strong> {practical.target_section}
                </span>
                <span className="text-gray-300">|</span>
                <span>
                  <strong className="text-gray-600 font-semibold">Batch:</strong> {getBatchRange(practical.target_graduation_year)}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-8 text-sm text-gray-700 font-medium">
              <div>
                <strong className="text-gray-900 font-bold">Date:</strong> {getReadableDate(practical.start_time)}
              </div>
              <div>
                <strong className="text-gray-900 font-bold">Time:</strong> {getReadableTime(practical.start_time)}
              </div>
              <div className="bg-gray-100 text-gray-600 text-xs font-black px-4 py-2 rounded-lg border border-gray-200 tracking-wide">
                {getDurationText(practical.duration_minutes)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default TeacherHomePageMiddleware;
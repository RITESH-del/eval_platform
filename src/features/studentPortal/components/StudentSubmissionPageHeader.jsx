import React from 'react';

export default function StudentSubmissionPageHeader() {
  const studentName = "Shivesh Kumar";
  const avatarLetter = studentName.charAt(0);

  return (
    <header className="flex items-center justify-between bg-[#0a0a0a] text-white px-6 py-4 border-b border-zinc-800 select-none">
      
      {/* Left Section: Platform Identity */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold tracking-tight text-emerald-500">
          Black P
        </h1>
        <span className="bg-zinc-800 text-zinc-400 text-xs px-2 py-0.5 rounded-md font-medium">
          Student Workspace
        </span>
      </div>

      {/* Center Section: View Mode */}
      <div className="text-center">
        <h2 className="text-base font-semibold tracking-wide text-zinc-200">
          Practical Code Evaluation Report
        </h2>
      </div>

      {/* Right Section: Student Badge */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white font-semibold text-sm">
          {avatarLetter}
        </div>
        <span className="text-sm font-medium text-zinc-300">
          {studentName}
        </span>
      </div>

    </header>
  );
}
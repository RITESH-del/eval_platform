import { useSelector } from 'react-redux';

export default function StudentSubmissionPageHeader() {
  const profile = useSelector((state) => state.student?.profile);
  const studentName = profile?.name || 'Student';
  const avatarLetter = studentName.charAt(0).toUpperCase();

  return (
    <header className="flex items-center justify-between bg-white text-gray-900 px-6 py-4 border-b border-gray-200 select-none">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold tracking-tight">
          <span className="text-blue-600">Academic</span> Portal
        </h1>
        <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-md font-medium">
          Student Workspace
        </span>
      </div>

      <div className="text-center">
        <h2 className="text-base font-semibold tracking-wide text-gray-700">
          Practical Code Evaluation Report
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
          {avatarLetter}
        </div>
        <span className="text-sm font-medium text-gray-700">
          {studentName}
        </span>
      </div>
    </header>
  );
}
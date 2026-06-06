import React from 'react';

const StudentDetailsFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-8 pt-4 text-center text-sm text-gray-400 border-t border-gray-100">
      <p>&copy; {currentYear} Faculty Portal. Evaluation Workspace Environment.</p>
    </footer>
  );
};

export default StudentDetailsFooter;
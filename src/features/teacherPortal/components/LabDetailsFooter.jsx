import React from 'react';

const LabDetailsFooter = () => {
  let currentYear = new Date().getFullYear();

  return (
    <footer className="mt-8 pt-4 text-center text-sm text-gray-400">
      <p>&copy; {currentYear} Faculty Portal. All rights reserved.</p>
    </footer>
  );
};

export default LabDetailsFooter;
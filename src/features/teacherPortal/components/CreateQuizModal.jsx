import React, { useState } from 'react';

const CreateQuizModal = ({ isOpen, onClose, configData }) => {
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  // 1. If the modal state is not open, do not render anything on screen
  if (!isOpen) {
    return null;
  }

  // 2. Setup fallbacks using classic if/else checks to prevent crashes if JSON hasn't loaded yet
  let batches = [];
  let sections = [];

  if (configData) {
    if (configData.target_graduation_year) {
      batches = configData.target_graduation_year;
    }
    // FIXED: Removed the 'data &&' typo so it looks at configData safely
    if (configData.target_section) {
      sections = configData.target_section;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedBatch === "" || selectedSection === "") {
      alert("Please select both Batch and Section before proceeding.");
      return;
    }
    
    console.log("Creating quiz for:", { batch: selectedBatch, section: selectedSection });
    // You can handle further redirection logic here when you build the quiz builder form!
    onClose(); 
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 box-border animate-fade-in">
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-8 w-full max-w-md mx-4 box-border">
        
        {/* Header Title block */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
          <h2 className="text-xl font-bold text-gray-800 tracking-wide">
            Create New Quiz
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold text-lg cursor-pointer bg-none border-none"
          >
            &times;
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* Dropdown 1: Target Graduation Batch */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">
              Select Batch (Graduation Year)
            </label>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-700 font-medium focus:border-blue-500 focus:outline-none box-border cursor-pointer"
            >
              <option value="">-- Choose Batch --</option>
              {batches.map((year) => {
                let startYear = year - 4;
                return (
                  <option key={year} value={year}>
                    {startYear} - {year} (Batch of {year})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Dropdown 2: Target Section */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">
              Select Section
            </label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-700 font-medium focus:border-blue-500 focus:outline-none box-border cursor-pointer"
            >
              <option value="">-- Choose Section --</option>
              {sections.map((sec) => (
                <option key={sec} value={sec}>
                  Section {sec}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons panel */}
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-5 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-sm rounded-lg border border-gray-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              Proceed
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default CreateQuizModal;
import React, { useState } from 'react';

const StudentDetailsMiddleware = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);

  // Safety fallback if data or responses array hasn't resolved yet
  if (!data || !data.responses || data.responses.length === 0) {
    return (
      <main className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 min-h-[50vh] box-border">
        <p className="text-gray-500">No submission content found for this session.</p>
      </main>
    );
  }

  const currentResponse = data.responses[activeTab];

  // Classic fallback block to determine code snippet rendering based on question choice
  let dynamicCodeBody = "";
  if (activeTab === 0) {
    dynamicCodeBody = `#include <iostream>\nusing namespace std;\n\nint main() {\n    int queue[100], front = 0, rear = 0;\n    queue[rear++] = 10;\n    cout << queue[front];\n    return 0;\n}`;
  } else {
    dynamicCodeBody = `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Stack balancing parentheses implementation logic\n    cout << "Checking balanced brackets..." << endl;\n    return 0;\n}`;
  }

  return (
    <main className="w-full flex flex-col gap-6 box-border">
      
      {/* 1. Tabs Bar mapped directly off your JSON 'responses' array */}
      <div className="flex gap-3 border-b border-gray-200 pb-4">
        {data.responses.map((response, index) => {
          const isActive = index === activeTab;
          
          let tabClass = "";
          if (isActive) {
            tabClass = "bg-[#ef4444] text-white border-[#ef4444] shadow-sm";
          } else {
            tabClass = "bg-white text-slate-700 border-gray-200 hover:bg-gray-50";
          }

          return (
            <button
              key={response.question_id || index}
              onClick={() => setActiveTab(index)}
              className={`px-5 py-2.5 font-bold text-sm rounded-lg border transition-all cursor-pointer ${tabClass}`}
            >
              Q{index + 1}: {response.title}
            </button>
          );
        })}
      </div>

      {/* 2. Question Prompt Box Card */}
      <div className="w-full bg-white border border-gray-200 rounded-xl p-6 shadow-sm box-border">
        <h2 className="text-lg font-bold text-slate-800 mb-2">
          Question {activeTab + 1} Statement
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          {currentResponse.description}
        </p>
      </div>

      {/* 3. Dark Code Display Block */}
      <div className="w-full flex flex-col box-border">
        <h3 className="text-lg font-bold text-slate-800 mb-3 tracking-wide">
          Submitted Code Response
        </h3>
        
        <div className="w-full bg-[#0b1329] rounded-xl border border-slate-900 shadow-lg p-6 font-mono text-sm text-slate-200 overflow-x-auto leading-relaxed whitespace-pre">
          <code>{dynamicCodeBody}</code>
        </div>
      </div>
    </main>
  );
};

export default StudentDetailsMiddleware;
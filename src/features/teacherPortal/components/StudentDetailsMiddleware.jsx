import React, { useState } from 'react';
import { Box } from '@mantine/core';

const StudentDetailsMiddleware = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!data?.responses || data.responses.length === 0) {
    return (
      <Box p="md">
        No submission content found.
      </Box>
    );
  }

  const responses = data.responses;

  const currentResponse = responses[activeTab];

//   const getCodeSnippet = (index) => {
//     if (index === 0) {
//       return `#include <iostream>
// using namespace std;

// int main() {
//     int queue[100], front = 0, rear = 0;
//     queue[rear++] = 10;
//     cout << queue[front];
//     return 0;
// }`;
//     }

//     return `#include <iostream>
// using namespace std;

// int main() {
//     // Stack balancing parentheses implementation logic
//     cout << "Checking balanced brackets..." << endl;
//     return 0;
// }`;
//   };

  const dynamicCodeBody =
    currentResponse?.code ||
    currentResponse?.submitted_code ||
    currentResponse?.answer;
    // getCodeSnippet(activeTab);

  return (
    <div>
      <main className="flex flex-col gap-6">
        {/* Question Prompt Box */}
        <div className="w-full bg-white border border-gray-200 rounded-xl p-6 shadow-sm box-border">
          <h2 className="text-lg font-bold text-slate-800 mb-2">
            Question {activeTab + 1} Statement
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed">
            {currentResponse?.description ||
              currentResponse?.question ||
              'No question description available.'}
          </p>
        </div>

        {/* Submitted Code Block */}
        <div className="w-full flex flex-col box-border">
          <h3 className="text-lg font-bold text-slate-800 mb-3 tracking-wide">
            Submitted Code Response
          </h3>

          <div className="w-full bg-[#0b1329] rounded-xl border border-slate-900 shadow-lg p-6 font-mono text-sm text-slate-200 overflow-x-auto leading-relaxed whitespace-pre">
            <code>{dynamicCodeBody}</code>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDetailsMiddleware;
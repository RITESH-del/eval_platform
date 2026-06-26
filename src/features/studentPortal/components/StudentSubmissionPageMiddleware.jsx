import React, { useEffect, useState } from 'react';
import { getStudentSubmissionDetails } from '../api/studentApi';
import Spinner from '../../../shared/components/Spinner';

export default function StudentSubmissionPageMiddleware({ examId, onBack }) {
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubmissionData() {
      setLoading(true);
      const result = await getStudentSubmissionDetails(examId);
      setSubmission(result);
      setLoading(false);
    }

    if (examId) {
      fetchSubmissionData();
    }
  }, [examId]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#121212]">
        <Spinner />
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#121212] text-zinc-400 gap-4">
        <p className="text-lg font-semibold text-red-500">Submission data not found for ID: {examId}</p>
        <button 
          onClick={onBack}
          className="px-4 py-2 bg-zinc-800 text-white rounded hover:bg-zinc-700 transition-colors"
        >
          Go Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] bg-[#121212] text-white p-6 max-w-7xl mx-auto">
      {/* Top action bar */}
      <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-4">
        <div>
          <button 
            onClick={onBack}
            className="text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-2 text-sm font-medium mb-1"
          >
            &larr; Back to Dashboard
          </button>
          <h2 className="text-2xl font-bold tracking-tight">{submission.examName} Report</h2>
        </div>

        <div className="flex gap-6 bg-[#1a1a1a] p-3 rounded-lg border border-zinc-800 text-sm">
          <div><span className="text-zinc-400">Score:</span> <span className="text-emerald-400 font-bold">{submission.score}/{submission.totalMarks}</span></div>
          <div className="border-l border-zinc-700 pl-4"><span className="text-zinc-400">Rank:</span> <span className="font-semibold text-zinc-200">{submission.rank}</span></div>
          <div className="border-l border-zinc-700 pl-4"><span className="text-zinc-400">Date:</span> <span className="text-zinc-300">{submission.date}</span></div>
        </div>
      </div>

      {/* Render list of practical problems solved during the exam */}
      <div className="space-y-8">
        {submission.problems.map((problem) => (
          <div key={problem.problemId} className="bg-[#1a1a1a] border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
            {/* Header of individual problem container */}
            <div className="p-4 bg-[#222] border-b border-zinc-800 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-zinc-200">
                {problem.problemId}. {problem.title}
              </h3>
              <span className={`px-2.5 py-1 rounded text-xs font-bold tracking-wider ${
                problem.status === 'Accepted' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-red-950 text-red-400 border border-red-900'
              }`}>
                {problem.status} ({problem.marksObtained}/{problem.maxMarks} Marks)
              </span>
            </div>

            {/* Layout body splitting description vs source code block */}
            <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800">
              {/* Problem Meta Details Context */}
              <div className="p-5 lg:col-span-2 space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Problem Statement</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">{problem.description}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Constraints</h4>
                  <pre className="text-xs font-mono text-zinc-400 bg-zinc-900 p-2 rounded border border-zinc-800">{problem.constraints}</pre>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Testcase Verdict</h4>
                  <p className="text-sm text-zinc-300 font-medium">Passed {problem.testCasesPassed} out of {problem.totalTestCases} test cases.</p>
                </div>
                {problem.compilerOutput && (
                  <div>
                    <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">Execution / Trace Error</h4>
                    <pre className="text-xs font-mono text-red-400 bg-red-950/30 p-3 rounded border border-red-900/50 whitespace-pre-wrap">{problem.compilerOutput}</pre>
                  </div>
                )}
              </div>

              {/* Code Display block */}
              <div className="p-5 lg:col-span-3 bg-[#141414]">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Submitted Solution ({problem.language.toUpperCase()})</h4>
                </div>
                <pre className="p-4 bg-[#0a0a0a] rounded-lg border border-zinc-800 text-sm font-mono overflow-x-auto text-zinc-300 max-h-[400px]">
                  <code>{problem.submittedCode}</code>
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
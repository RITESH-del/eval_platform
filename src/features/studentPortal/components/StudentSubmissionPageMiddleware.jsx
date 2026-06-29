import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Spinner from '../../../shared/components/Spinner';
import { fetchStudentExamDetail } from '../models/studentThunks.js';

export default function StudentSubmissionPageMiddleware({ onBack }) {
  const dispatch = useDispatch();
  const { examId } = useParams();
  const selectedExam = useSelector((state) => state.student?.selectedExam);
  const loading = useSelector((state) => state.student?.loadingExamDetail);
  const error = useSelector((state) => state.student?.error);

  useEffect(() => {
    if (examId) {
      dispatch(fetchStudentExamDetail(examId));
    }
  }, [dispatch, examId]);

  const submission = selectedExam
    ? {
        examName: selectedExam.exam_details?.title || selectedExam.title || 'Exam Report',
        score: (selectedExam.total_manual_score || 0) + (selectedExam.total_autograding_score || 0),
        totalMarks: selectedExam.exam_details?.total_marks || selectedExam.total_marks || 100,
        rank: selectedExam.rank || '-',
        date: selectedExam.submitted_at
          ? new Date(selectedExam.submitted_at).toLocaleDateString('en-IN')
          : '—',
        problems: (selectedExam.responses || []).map((response, index) => ({
          problemId: index + 1,
          title: response.title || `Question ${index + 1}`,
          description: response.description || 'No description available.',
          constraints: response.constraints || '—',
          testCasesPassed: response.testcases_passed || 0,
          totalTestCases: response.total_testcases || 0,
          compilerOutput: response.compiler_output || '',
          status: response.manual_score || response.autograding_score ? 'Accepted' : 'Pending',
          marksObtained: (response.manual_score || 0) + (response.autograding_score || 0),
          maxMarks: response.max_marks || selectedExam.exam_details?.total_marks || 100,
          language: response.language || 'cpp',
          submittedCode: response.submission_history?.[0]?.code || '// No code submitted',
        })),
      }
    : null;

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#121212]">
        <Spinner />
      </div>
    );
  }

  if (error || !submission) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#121212] text-zinc-400 gap-4">
        <p className="text-lg font-semibold text-red-500">
          {error || `Submission data not found for ID: ${examId}`}
        </p>
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
          <div>
            <span className="text-zinc-400">Score:</span>{' '}
            <span className="text-emerald-400 font-bold">
              {submission.score}/{submission.totalMarks}
            </span>
          </div>
          <div className="border-l border-zinc-700 pl-4">
            <span className="text-zinc-400">Rank:</span>{' '}
            <span className="font-semibold text-zinc-200">{submission.rank}</span>
          </div>
          <div className="border-l border-zinc-700 pl-4">
            <span className="text-zinc-400">Date:</span>{' '}
            <span className="text-zinc-300">{submission.date}</span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {submission.problems.map((problem) => (
          <div key={problem.problemId} className="bg-[#1a1a1a] border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
            <div className="p-4 bg-[#222] border-b border-zinc-800 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-zinc-200">
                {problem.problemId}. {problem.title}
              </h3>
              <span className={`px-2.5 py-1 rounded text-xs font-bold tracking-wider ${
                problem.status === 'Accepted'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : 'bg-red-950 text-red-400 border border-red-900'
              }`}>
                {problem.status} ({problem.marksObtained}/{problem.maxMarks} Marks)
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800">
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
                  <p className="text-sm text-zinc-300 font-medium">
                    Passed {problem.testCasesPassed} out of {problem.totalTestCases} test cases.
                  </p>
                </div>
                {problem.compilerOutput && (
                  <div>
                    <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">Execution / Trace Error</h4>
                    <pre className="text-xs font-mono text-red-400 bg-red-950/30 p-3 rounded border border-red-900/50 whitespace-pre-wrap">
                      {problem.compilerOutput}
                    </pre>
                  </div>
                )}
              </div>

              <div className="p-5 lg:col-span-3 bg-[#141414]">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                    Submitted Solution ({problem.language.toUpperCase()})
                  </h4>
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
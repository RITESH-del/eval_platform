import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Spinner from '../../../shared/components/Spinner';
import { fetchStudentExamDetail } from '../models/studentThunks.js';

const PAGE_SIZE = 5;

const normalizeStatus = (value) => String(value ?? '').trim().toLowerCase();

const formatStatus = (value) => String(value ?? 'PENDING')
  .trim()
  .replace(/_/g, ' ')
  .replace(/\b\w/g, (letter) => letter.toUpperCase());

function AttemptsTable({ attempts }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(attempts.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const visible = attempts.slice(start, start + PAGE_SIZE);

  return (
    <div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="text-left px-3 py-2">#</th>
              <th className="text-left px-3 py-2">Language</th>
              <th className="text-left px-3 py-2">Submitted At</th>
              <th className="text-left px-3 py-2">Autograde</th>
              <th className="text-left px-3 py-2">Manual</th>
              <th className="text-left px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((attempt, i) => (
              <tr key={attempt.id} className="border-t border-gray-200">
                <td className="px-3 py-2 text-gray-500">{attempts.length - (start + i)}</td>
                <td className="px-3 py-2 text-gray-700">{attempt.language?.toUpperCase()}</td>
                <td className="px-3 py-2 text-gray-500">
                  {new Date(attempt.created_at).toLocaleString('en-IN')}
                </td>
                <td className="px-3 py-2 text-gray-700">{attempt.autograding_score ?? 0}</td>
                <td className="px-3 py-2 text-gray-700">{attempt.manual_score ?? '—'}</td>
                <td className="px-3 py-2 text-gray-700">{formatStatus(attempt.autograding_status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-2 text-sm">
          <span className="text-gray-500">
            Page {page} of {totalPages} ({attempts.length} total attempts)
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Prev
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

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
        examName: selectedExam.exam_details?.title || 'Exam Report',
        score: (selectedExam.total_manual_score || 0) + (selectedExam.total_autograding_score || 0),
        totalMarks: selectedExam.exam_details?.total_marks ?? 100,
        date: selectedExam.submitted_at
          ? new Date(selectedExam.submitted_at).toLocaleDateString('en-IN')
          : '—',
        problems: (selectedExam.responses ?? []).map((response, index) => ({
          problemId: index + 1,
          title: response.title || `Question ${index + 1}`,
          description: response.description || 'No description available.',
          status: response.status,
          marksObtained: (response.manual_score ?? 0) + (response.autograding_score ?? 0),
          maxMarks: response.max_marks ?? '—',
          attempts: [...(response.submission_history || [])].reverse(),
        })),
      }
    : null;

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white">
        <Spinner />
      </div>
    );
  }

  if (error || !submission) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white text-gray-500 gap-4">
        <p className="text-lg font-semibold text-red-600">
          {error || `Submission data not found for ID: ${examId}`}
        </p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Go Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] bg-white text-gray-900 p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
        <div>
          <button
            onClick={onBack}
            className="text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-2 text-sm font-medium mb-1"
          >
            &larr; Back to Dashboard
          </button>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">{submission.examName} Report</h2>
        </div>

        <div className="flex gap-6 bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm">
          <div>
            <span className="text-gray-500">Score:</span>{' '}
            <span className="text-blue-600 font-bold">
              {submission.score}/{submission.totalMarks}
            </span>
          </div>
          <div className="border-l border-gray-200 pl-4">
            <span className="text-gray-500">Submitted:</span>{' '}
            <span className="text-gray-700">{submission.date}</span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {submission.problems.map((problem) => (
          <div key={problem.problemId} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                {problem.problemId}. {problem.title}
              </h3>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${
                normalizeStatus(problem.status) === 'pending'
                  ? 'bg-yellow-50 text-yellow-700'
                  : ['passed', 'graded'].includes(normalizeStatus(problem.status))
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
              }`}>
                {formatStatus(problem.status)} ({problem.marksObtained}/{problem.maxMarks} Marks)
              </span>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{problem.description}</p>

              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Submission History
                </h4>
                <AttemptsTable attempts={problem.attempts} />
              </div>

              {problem.attempts[0] && (
                <div className="bg-gray-50 rounded-lg border border-gray-200">
                  <div className="p-3 border-b border-gray-200 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Latest Submission ({problem.attempts[0].language?.toUpperCase()})
                  </div>
                  <pre className="p-4 text-sm font-mono overflow-x-auto text-gray-800 max-h-[400px]">
                    <code>{problem.attempts[0].code}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
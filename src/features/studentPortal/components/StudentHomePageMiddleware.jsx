import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../../../shared/components/Spinner';
import { fetchStudentExams } from '../models/studentThunks.js';

const getExamIcon = (examName) => {
  const name = examName?.toLowerCase() || '';
  if (name.includes('dsa')) return '📊';
  if (name.includes('contest')) return '🌐';
  if (name.includes('quiz')) return '❓';
  return '📝';
};

const ProgressBar = ({ score, maxScore = 100 }) => {
  const percentage = Math.min(100, (score / maxScore) * 100);
  let barColor = '#10b981';

  if (percentage < 60) barColor = '#ef4444';
  else if (percentage < 75) barColor = '#f59e0b';
  else if (percentage < 90) barColor = '#3b82f6';

  return (
    <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${percentage}%`, backgroundColor: barColor }}
      />
    </div>
  );
};

const formatDate = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';

  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export default function StudentHomePageMiddleware() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const exams = useSelector((state) => state.student?.exams || []);
  const pagination = useSelector((state) => state.student?.pagination);
  const loading = useSelector((state) => state.student?.loadingExams);
  const error = useSelector((state) => state.student?.error);
  const [currentPage, setCurrentPage] = useState(1);

  const isDashboardView = location.pathname.includes('/dashboard');

  useEffect(() => {
    dispatch(fetchStudentExams({ page: currentPage }));
  }, [dispatch, currentPage]);

  const derivedMetrics = useMemo(() => {
    const normalizedExams = exams.map((exam) => {
      const manualScore = Number(exam.total_manual_score ?? exam.manual_score ?? exam.score ?? 0);
      const autoScore = Number(exam.total_autograding_score ?? exam.autograding_score ?? exam.auto_score ?? 0);
      const maxScore = Number(exam.total_marks ?? exam.max_marks ?? exam.maximum_marks ?? 100);
      const scoreValue = manualScore + autoScore;
      const status = (exam.status || '').toLowerCase();

      const hasSubmitted = status === 'submitted';
      const resultsAvailable = hasSubmitted && !!exam.result_published;

      return {
        ...exam,
        scoreValue,
        maxScore,
        hasSubmitted,
        resultsAvailable,
        isPending: !hasSubmitted, // true only if student hasn't submitted at all
        isAwaitingResults: hasSubmitted && !exam.result_published, // submitted, waiting on faculty to publish
        title: exam.title || exam.exam_title || exam.name || exam.examName || 'Untitled exam',
        submittedAt: exam.submitted_at || exam.submittedAt || exam.created_at || exam.updated_at,
        examId: exam.exam_id || exam.id || exam.session_id,
      };
    });

    const completed = normalizedExams.filter((exam) => exam.resultsAvailable);
    const averageScore = completed.length
      ? Math.round(completed.reduce((sum, exam) => sum + (exam.maxScore ? (exam.scoreValue / exam.maxScore) * 100 : 0), 0) / completed.length)
      : 0;
    const bestScore = completed.length
      ? Math.max(...completed.map((exam) => (exam.maxScore ? (exam.scoreValue / exam.maxScore) * 100 : 0)))
      : 0;

    return { normalizedExams, completed, averageScore, bestScore };
  }, [exams]);

  const handleRetry = () => {
    dispatch(fetchStudentExams({ page: currentPage }));
  };

  if (loading && exams.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error && exams.length === 0) {
    return (
      <div className="flex-1 px-8 py-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
          <p className="font-semibold">Unable to load exam data right now.</p>
          <p className="mt-1 text-sm">{error}</p>
          <button
            onClick={handleRetry}
            className="mt-3 rounded-lg border border-red-300 px-3 py-2 text-sm font-medium hover:bg-red-100"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 overflow-auto bg-white">
      <div className="px-8 py-6">
        <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              {isDashboardView ? 'STUDENT DASHBOARD' : 'RECENT EXAMS'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {isDashboardView
                ? 'Live performance insights from the latest exam data.'
                : 'Your recent results and submissions pulled from the server.'}
            </p>
          </div>
          <button
            onClick={() => navigate(isDashboardView ? '/student/results' : '/student/dashboard')}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
          >
            {isDashboardView ? 'View exam results' : 'View dashboard'}
            <span>→</span>
          </button>
        </div>

        {isDashboardView ? (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-sm text-gray-500">Total exams</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">{derivedMetrics.normalizedExams.length}</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-sm text-gray-500">Completed</p>
                <p className="mt-2 text-2xl font-bold text-green-600">{derivedMetrics.completed.length}</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-sm text-gray-500">Pending</p>
                <p className="mt-2 text-2xl font-bold text-yellow-600">{derivedMetrics.normalizedExams.length - derivedMetrics.completed.length}</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-sm text-gray-500">Average score</p>
                <p className="mt-2 text-2xl font-bold text-blue-600">{derivedMetrics.averageScore}%</p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent activity</h3>
                  <span className="text-sm text-gray-500">Latest server data</span>
                </div>
                {derivedMetrics.normalizedExams.length === 0 ? (
                  <p className="text-sm text-gray-500">No exams have been returned by the server yet.</p>
                ) : (
                  <ul className="space-y-3">
                    {derivedMetrics.normalizedExams.slice(0, 5).map((exam) => (
                      <li key={exam.examId || exam.title} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-3">
                        <div>
                          <p className="font-medium text-gray-900">{exam.title}</p>
                          <p className="text-sm text-gray-500">{exam.submittedAt ? formatDate(exam.submittedAt) : 'Date not available'}</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          exam.isPending
                            ? 'bg-yellow-50 text-yellow-700'
                            : exam.isAwaitingResults
                              ? 'bg-orange-50 text-orange-700'
                              : 'bg-green-50 text-green-700'
                        }`}>
                          {exam.isPending
                            ? 'Pending'
                            : exam.isAwaitingResults
                              ? 'Submitted'
                              : `${Math.round(exam.scoreValue)} / ${exam.maxScore}`}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">Performance snapshot</h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Best score</span>
                      <span className="font-semibold text-gray-900">{Math.round(derivedMetrics.bestScore)}%</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                      <div className="h-2 rounded-full bg-blue-600" style={{ width: `${Math.min(100, derivedMetrics.bestScore)}%` }} />
                    </div>
                  </div>
                  <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-700">
                    The dashboard updates from the same exam API used for the results page, so the data stays in sync with the server.
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">EXAM NAME</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">SCORE</th>
                      <th className="text-center py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">STATUS</th>
                      <th className="text-center py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">DATE</th>
                      <th className="text-right py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">VIEW</th>
                    </tr>
                  </thead>

                  <tbody>
                    {derivedMetrics.normalizedExams.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-12 text-center">
                          <p className="text-gray-500">No exams found for this student yet.</p>
                        </td>
                      </tr>
                    ) : (
                      derivedMetrics.normalizedExams.map((exam) => (
                        <tr key={exam.examId || exam.title} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors group">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                                <span className="text-lg">{getExamIcon(exam.title)}</span>
                              </div>
                              <span className="text-gray-900 font-medium text-sm">{exam.title}</span>
                            </div>
                          </td>

                          <td className="py-4 px-6">
                            {exam.resultsAvailable ? (
                              <div className="flex items-center gap-3">
                                <span className="font-bold text-lg text-green-600">{Math.round(exam.scoreValue)}</span>
                                <span className="text-gray-400 text-xs">/ {exam.maxScore}</span>
                                <ProgressBar score={exam.scoreValue} maxScore={exam.maxScore} />
                              </div>
                            ) : (
                              <span className="text-gray-400 text-sm">-- / {exam.maxScore}</span>
                            )}
                          </td>

                          <td className="py-4 px-6 text-center">
                            {exam.isPending ? (
                              <span className="inline-block px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-semibold rounded-full">PENDING</span>
                            ) : exam.isAwaitingResults ? (
                              <span className="inline-block px-3 py-1 bg-orange-50 text-orange-700 text-xs font-semibold rounded-full">SUBMITTED</span>
                            ) : (
                              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">COMPLETED</span>
                            )}
                          </td>

                          <td className="py-4 px-6 text-center">
                            <span className="text-gray-600 text-xs font-mono">{formatDate(exam.submittedAt)}</span>
                          </td>

                          <td className="py-4 px-6 text-right">
                            {exam.resultsAvailable ? (
                              <button
                                onClick={() => navigate(`/student/submission/${exam.examId}`)}
                                className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white transition-all duration-300 flex items-center justify-center group-hover:scale-110"
                                title="View submission details"
                              >
                                <span className="text-lg">›</span>
                              </button>
                            ) : (
                              <span
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-400"
                                title={exam.isPending ? 'Not yet submitted' : 'Waiting for faculty to publish results'}
                              >
                                🔒
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {pagination && (
              <div className="mt-6 flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Page {pagination.page} of {Math.max(1, Math.ceil(pagination.total / (pagination.limit || 15)))}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={!pagination.hasMore}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
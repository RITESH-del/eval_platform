import { useEffect, useState } from "react";
import { getStudentDashboardResults } from "../api/studentApi";
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../shared/components/Spinner';

const EXAM_ICONS = {
  'dsa': '🔤',
  'contest': '⭐',
  'quiz': '🔒',
  'default': '📝'
};

const getExamIcon = (examName) => {
  const name = examName.toLowerCase();
  if (name.includes('dsa')) return EXAM_ICONS.dsa;
  if (name.includes('contest')) return EXAM_ICONS.contest;
  if (name.includes('quiz')) return EXAM_ICONS.quiz;
  return EXAM_ICONS.default;
};

const ProgressBar = ({ score, maxScore = 100 }) => {
  const percentage = (score / maxScore) * 100;
  let barColor = '#10b981';

  if (percentage < 60) barColor = '#ef4444';
  else if (percentage < 75) barColor = '#f59e0b';
  else if (percentage < 90) barColor = '#3b82f6';

  return (
    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${percentage}%`, backgroundColor: barColor }}
      />
    </div>
  );
};

export default function StudentHomePageMiddlewarecopy() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      const result = await getStudentDashboardResults();
      if (result) setData(result);
      setLoading(false);
    }
    fetchResults();
  }, []);

  if (loading) {
    return (
      <section className="flex-1 flex items-center justify-center">
        <Spinner />
      </section>
    );
  }

  if (!data) {
    return (
      <section className="flex-1 px-12 py-8">
        <p className="text-red-600 font-medium">Unable to fetch exam data</p>
      </section>
    );
  }

  return (
    <section className="ml-60 flex-1 overflow-auto bg-white">
      <div className="px-12 py-8">
        {/* Header with View all history link */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            RECENT EXAMS
          </h2>
          <a
            href="#history"
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 text-sm"
          >
            View all history
            <span>→</span>
          </a>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">
                  EXAM NAME
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">
                  SCORE
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">
                  RANK
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">
                  DATE
                </th>
                <th className="text-center py-4 px-4 font-semibold text-gray-700 text-sm">
                  VIEW
                </th>
              </tr>
            </thead>
            <tbody>
              {data.examResults.map((exam) => {
                const scoreValue = parseInt(exam.score.split('/')[0]);
                const maxScore = parseInt(exam.score.split('/')[1]) || 100;
                const isPending = exam.score === '--';

                return (
                  <tr
                    key={exam.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    {/* Exam Name with Icon */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">
                          {getExamIcon(exam.name)}
                        </span>
                        <span className="text-gray-900 font-medium">
                          {exam.name}
                        </span>
                      </div>
                    </td>

                    {/* Score with Progress Bar */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {isPending ? (
                          <span className="text-gray-400">-- / 100</span>
                        ) : (
                          <>
                            <span className="font-bold text-blue-600">
                              {scoreValue}
                            </span>
                            <span className="text-gray-400 text-sm">
                              / {maxScore}
                            </span>
                            <ProgressBar
                              score={scoreValue}
                              maxScore={maxScore}
                            />
                          </>
                        )}
                      </div>
                    </td>

                    {/* Rank */}
                    <td className="py-4 px-4">
                      {isPending ? (
                        <span className="inline-block px-2 py-1 bg-yellow-50 text-yellow-700 text-xs font-semibold rounded">
                          PENDING
                        </span>
                      ) : (
                        <span className="text-blue-600 font-medium">
                          {exam.rank}
                        </span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4">
                      <span className="text-gray-600 text-sm">{exam.date}</span>
                    </td>

                    {/* View Button */}
                    <td className="py-4 px-4 text-center">
                      {!isPending ? (
                        <button
                          onClick={() => navigate(`/student/submission/${exam.id}`)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-blue-50 text-blue-600 hover:text-blue-700 transition-colors"
                          title="View submission details"
                        >
                          <span>›</span>
                        </button>
                      ) : (
                        <span className="text-gray-400">
                          <span>🔒</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
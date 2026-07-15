import { useParams } from 'react-router-dom';
import StudentSubmissionPageHeader from '../components/StudentSubmissionPageHeader.jsx';
import StudentSubmissionPageMiddleware from '../components/StudentSubmissionPageMiddleware.jsx';
import StudentSubmissionPageFooter from '../components/StudentSubmissionPageFooter.jsx';

export default function StudentSubmissionPage() {
  const { examId } = useParams();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <StudentSubmissionPageHeader />
      <StudentSubmissionPageMiddleware
        examId={examId}
        onBack={() => window.history.back()}
      />
      <StudentSubmissionPageFooter />
    </div>
  );
}
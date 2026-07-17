import { useParams } from 'react-router-dom';
import StudentSubmissionPageHeader from '../components/StudentSubmissionPageHeader.jsx';
import StudentSubmissionPageMiddleware from '../components/StudentSubmissionPageMiddleware.jsx';
import StudentSubmissionPageFooter from '../components/StudentSubmissionPageFooter.jsx';

export default function StudentSubmissionPage() {
  const { examId } = useParams();

  return (
    <div className="min-h-screen text-white">
      {/* <StudentSubmissionPageHeader /> */}
      <StudentSubmissionPageMiddleware
        examId={examId}
        onBack={() => window.history.back()}
      />
      <StudentSubmissionPageFooter />
    </div>
  );
}
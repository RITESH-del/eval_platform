import StudentSubmissionPageHeader from '../components/StudentSubmissionPageHeader.jsx';
import StudentSubmissionPageMiddleware from '../components/StudentSubmissionPageMiddleware.jsx';
import StudentSubmissionPageFooter from '../components/StudentSubmissionPageFooter.jsx';

export default function StudentSubmissionPage() {
    const examId = 'dsa-test-5';

    return (
        <div className="min-h-screen bg-[#121212] text-white">
            <StudentSubmissionPageHeader />
            <StudentSubmissionPageMiddleware
                examId={examId}
                onBack={() => window.history.back()}
            />
            <StudentSubmissionPageFooter />
        </div>
    );
}
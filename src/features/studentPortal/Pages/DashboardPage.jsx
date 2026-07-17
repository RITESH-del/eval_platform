import StudentHomePageMiddleware from '../components/StudentHomePageMiddleware.jsx';
import StudentHomePageFooter from '../components/StudentHomePageFooter.jsx';
import StudentDashboardPage from '../components/StudentDashboardMiddleware.jsx';

export default function StudentDashPage() {
  return (
    <div className=" text-gray-900 min-h-screen font-body-lg overflow-x-hidden">
      

      {/* Main Content */}
        {/* Middleware (exam table) */}
        <StudentDashboardPage />

        {/* Footer */}
        <StudentHomePageFooter />
    </div>
  );
}

import StudentHomePageHeader from '../components/StudentHomePageHeader.jsx';
import StudentHomePageMiddleware from '../components/StudentHomePageMiddleware.jsx';
import StudentHomePageFooter from '../components/StudentHomePageFooter.jsx';

export default function StudentHomePage() {
  return (
    <div className="bg-white text-gray-900 min-h-screen font-body-lg overflow-x-hidden">
      {/* Header (includes sidebar + top header) */}
      <StudentHomePageHeader />

      {/* Main Content */}
      <main className="pt-20 pl-64 min-h-screen flex flex-col">
        {/* Middleware (exam table) */}
        <StudentHomePageMiddleware />

        {/* Footer */}
        <StudentHomePageFooter />
      </main>
    </div>
  );
}

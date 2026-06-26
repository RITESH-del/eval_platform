// 1. StudentHomePage.jsx
import StudentHomePageHeader from '../components/StudentHomePageHeader.jsx';
import StudentHomePageMiddleware from '../components/StudentHomePageMiddleware.jsx';
import StudentHomePageFooter from '../components/StudentHomePageFooter.jsx';
import StudentHomePageHeadercopy from '../components/StudentHomePageHeadercopy.jsx';
import StudentHomePageMiddlewarecopy from '../components/StudentHomePageMiddlewarecopy.jsx';
import StudentHomePageFootercopy from '../components/StudentHomePageFootercopy.jsx';

export default function StudentHomePage() {
    return (
        <div className="bg-background text-on-background min-h-screen font-body-lg overflow-x-hidden">
            <StudentHomePageHeadercopy />
            <main className="ml-64 min-h-screen flex flex-col justify-between">
                <StudentHomePageMiddlewarecopy />
                <StudentHomePageFootercopy />
            </main>
        </div>
    );
}
import StudentHomePageHeader from '../components/StudentHomePageHeader.jsx';
import StudentHomePageMiddleware from '../components/StudentHomePageMiddleware.jsx';
import StudentHomePageFooter from '../components/StudentHomePageFooter.jsx';

export default function StudentHomePage()
{
    return(
        <div className="min-h-screen bg-[#121212] flex flex-col justify-between">
            <div>
                <StudentHomePageHeader/>
                <StudentHomePageMiddleware/>
            </div>
            <StudentHomePageFooter/>
        </div>
    )
}
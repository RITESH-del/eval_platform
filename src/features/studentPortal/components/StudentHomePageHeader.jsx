import { useState, useEffect } from 'react';
import { getStudentHeaderContext } from '../api/studentApi';

const STUDENT_NAV_LINKS = [
    { id: 'nav-results', label: 'Results', href: '#results' }
];

export default function StudentHomePageHeader() 
{
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchHeader() {
            const result = await getStudentHeaderContext();
            if (result) setData(result);
        }
        fetchHeader();
    }, []);

    // Render a subtle dark placeholder while reading state data
    if (!data) return <header className="h-[10vh] bg-[#1e1e1e] border-b border-[#333]" />;

    return (
        <header className="sticky top-0 z-50 h-[10vh] flex justify-between items-center px-8 bg-[#1e1e1e] text-white border-b border-[#333]">
            {/* 1. BRANDING / LOGO */}
            <div className="flex items-center gap-2.5">
                <span className="font-bold text-lg text-[#4edf7a]">
                    {data.appContext.appName}
                </span>
                <span className="text-xs px-1.5 py-0.5 bg-[#333] rounded">
                    {data.appContext.roleBadge}
                </span>
            </div>

            {/* 2. NAVIGATION */}
            <nav>
                <ul className="flex list-none gap-5 m-0 p-0">
                    {STUDENT_NAV_LINKS.map((link) => (
                        <li key={link.id}>
                            <a href={link.href} className="text-white no-underline font-medium hover:text-[#4edf7a] transition-colors">
                                <div className='text-xl' > {link.label} </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* 3. USER INFORMATION */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#4edf7a] text-[#1e1e1e] flex items-center justify-center font-bold text-sm">
                    {data.userProfile.initials}
                </div>
                <span className="text-sm">{data.userProfile.fullName}</span>
            </div>
        </header>
    );
}
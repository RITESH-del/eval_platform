import { useState, useEffect } from 'react';
import { getStudentHeaderContext } from '../api/studentApi';

const STUDENT_NAV_LINKS = [
  { id: 'nav-dashboard', label: 'Dashboard', icon: '📊', href: '#dashboard' },
  { id: 'nav-results', label: 'Exam Results', icon: '⭐', href: '#results' }
];

export default function StudentHomePageHeader() {
  const [data, setData] = useState(null);
  const [activeNav, setActiveNav] = useState('nav-results');

  useEffect(() => {
    async function fetchHeader() {
      const result = await getStudentHeaderContext();
      if (result) setData(result);
    }
    fetchHeader();
  }, []);

  if (!data) return <header className="h-40 bg-gray-50 animate-pulse" />;

  return (
    <>
      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 w-60 h-screen bg-white border-r border-gray-200 p-6 flex flex-col overflow-y-auto">
        {/* Logo */}
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-gray-900">
            <span className="text-blue-600">Black</span>
            <br />
            P
          </h1>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 flex-1">
          {STUDENT_NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setActiveNav(link.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeNav === link.id
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-semibold'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        {/* Footer Links */}
        <div className="border-t border-gray-200 pt-4 text-xs text-gray-500 space-y-2">
          <a href="#privacy" className="block hover:text-gray-700">
            Privacy Policy
          </a>
          <a href="#terms" className="block hover:text-gray-700">
            Terms of Service
          </a>
          <a href="#support" className="block hover:text-gray-700">
            Support
          </a>
        </div>
      </aside>

      {/* HEADER CONTENT */}
      <header className="ml-60 bg-white border-b border-gray-200 px-12 py-8">
        {/* User Info & Profile Icon */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-lg font-bold text-blue-600">
                {data?.userProfile?.initials}
              </span>
            </div>
            <div>
              <p className="text-base text-gray-500">Welcome back,</p>
              <p className="text-3xl font-bold text-gray-900">
                Hi {data?.userProfile?.fullName?.split(' ')[0]}
              </p>
            </div>
          </div>

          {/* Profile Icon Button */}
          <button className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors">
            <span className="text-lg font-bold text-blue-600">
              {data?.userProfile?.initials}
            </span>
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-600">
          Detailed breakdown of your recent academic assessments and rankings.
        </p>
      </header>
    </>
  );
}
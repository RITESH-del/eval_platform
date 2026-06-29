import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { fetchStudentProfile } from '../models/studentThunks.js';

const STUDENT_NAV_LINKS = [
  { id: 'nav-results', label: 'Exam Results', icon: '⭐', path: '/student/results' },
  { id: 'nav-dashboard', label: 'Dashboard', icon: '📊', path: '/student/dashboard' },
];

export default function StudentHomePageHeader() {
  const dispatch = useDispatch();
  const location = useLocation();
  const profile = useSelector((state) => state.student?.profile);
  const loading = useSelector((state) => state.student?.loading);

  useEffect(() => {
    dispatch(fetchStudentProfile());
  }, [dispatch]);

  const isDashboardView = location.pathname.includes('/dashboard');

  const displayName = useMemo(() => {
    return profile?.name || profile?.fullName || profile?.student_name || profile?.user?.name || 'Student';
  }, [profile]);

  const initials = (displayName || 'U')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (loading && !profile) {
    return <header className="h-20 bg-gray-100 animate-pulse" />;
  }

  return (
    <>
      <aside className="fixed left-0 top-0 w-64 h-screen bg-white border-r border-gray-200 p-6 flex flex-col overflow-y-auto">
        <div className="mb-8 px-2">
          <h1 className="text-2xl font-bold text-gray-900">
            <span className="text-blue-600">Academic</span>
            <br />
            <span className="text-gray-900">Portal</span>
          </h1>
        </div>

        <nav className="space-y-2 flex-1">
          {STUDENT_NAV_LINKS.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
                isDashboardView === (link.path === '/student/dashboard')
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-gray-200 pt-4 space-y-2 text-xs">
          <a href="#privacy" className="block text-gray-600 hover:text-gray-900">
            Privacy Policy
          </a>
          <a href="#terms" className="block text-gray-600 hover:text-gray-900">
            Terms of Service
          </a>
          <a href="#support" className="block text-gray-600 hover:text-gray-900">
            Support
          </a>
        </div>
      </aside>

      <header className="fixed top-0 left-64 right-0 bg-white border-b border-gray-200 h-20 px-8 flex items-center justify-between z-40">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-sm font-bold text-blue-600">{initials}</span>
          </div>
          <div>
            <p className="text-xs text-gray-500">Welcome back,</p>
            <p className="text-lg font-bold text-gray-900">Hi {displayName.split(' ')[0]}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors">
            🔔
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
          </button>
          <div className="w-px h-6 bg-gray-200"></div>
          <button className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors">
            <span className="text-sm font-bold text-blue-600">{initials}</span>
          </button>
        </div>
      </header>
    </>
  );
}

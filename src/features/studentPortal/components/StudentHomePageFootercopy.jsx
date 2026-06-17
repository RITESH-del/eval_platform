export default function StudentHomePageFootercopy() {
  return (
    <footer className="ml-60 bg-white border-t border-gray-200 px-12 py-6">
      <div className="flex justify-between items-center text-xs text-gray-600">
        <p>© 2024 Academic Faculty Intelligence System. All rights reserved.</p>

        <div className="flex gap-6">
          <a href="#privacy" className="hover:text-gray-900 transition-colors">
            Privacy Policy
          </a>
          <a href="#terms" className="hover:text-gray-900 transition-colors">
            Terms of Service
          </a>
          <a href="#support" className="hover:text-gray-900 transition-colors">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-extrabold text-blue-600 tracking-widest">404</h1>
        <div className="bg-blue-600 px-2 text-sm rounded rotate-12 absolute transform -translate-y-24 translate-x-32 hidden sm:block">
          Page Not Found
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Oops! You are lost.</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-4">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          <Home className="mr-2" size={20} />
          Go back home
        </button>
      </div>
    </div>
  );
}

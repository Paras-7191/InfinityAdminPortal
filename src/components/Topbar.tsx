import { Sun, Moon, LogOut } from 'lucide-react';
import { useAuthStore } from '../stores/useAuthStore';
import { useThemeStore } from '../stores/useThemeStore';

export default function Topbar() {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <span className="hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer">Portal</span>
        <span className="mx-2">/</span>
        <span className="font-medium text-gray-900 dark:text-white capitalize">
          {window.location.pathname.split('/').filter(Boolean).pop() || 'Dashboard'}
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-2" />

        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.fullName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role}</p>
          </div>
          <button
            onClick={() => logout()}
            className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

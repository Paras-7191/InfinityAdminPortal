import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserRound, 
  Monitor, 
  Cpu, 
  ClipboardList, 
  Settings, 
  ShieldAlert, 
  History,
  Activity
} from 'lucide-react';
import { useAuthStore } from '../stores/useAuthStore';
import { PermissionGuard } from './PermissionGuard';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admins', label: 'Admins', icon: ShieldAlert, permission: 'USER_VIEW' },
  { to: '/agents', label: 'Agents', icon: UserRound, permission: 'USER_VIEW' },
  { to: '/clients', label: 'Clients', icon: Monitor, permission: 'CLIENT_VIEW' },
  { to: '/software', label: 'Software', icon: Cpu, permission: 'SOFTWARE_VIEW' },
  { to: '/assignments', label: 'Assignments', icon: ClipboardList, permission: 'ASSIGN_CLIENTS' },
  { to: '/settings', label: 'Settings', icon: Settings, permission: 'SETTINGS_VIEW' },
];

const logItems = [
  { to: '/logs/system', label: 'System Logs', icon: History, permission: 'SYSTEM_LOG_VIEW' },
  { to: '/logs/security', label: 'Security Logs', icon: ShieldAlert, permission: 'SECURITY_LOG_VIEW' },
  { to: '/logs/runtime', label: 'Runtime Logs', icon: Activity, permission: 'RUNTIME_LOG_VIEW' },
];

export default function Sidebar() {
  const { user } = useAuthStore();

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Admin Portal</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{user?.role}</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {navItems.map((item) => {
          
          if (item.permission) {
            return (
              <PermissionGuard key={item.to} permission={item.permission}>
                <NavItem {...item} />
              </PermissionGuard>
            );
          }
          return <NavItem key={item.to} {...item} />;
        })}

        <div className="pt-4 pb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Logs
        </div>
        
        {logItems.map((item) => (
          <PermissionGuard key={item.to} permission={item.permission}>
            <NavItem {...item} />
          </PermissionGuard>
        ))}

        <div className="pt-4">
          <NavItem to="/settings" label="Settings" icon={Settings} permission="SETTINGS_VIEW" />
        </div>
      </nav>
    </aside>
  );
}

function NavItem({ to, label, icon: Icon }: any) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          isActive
            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
            : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'
        }`
      }
    >
      <Icon className="mr-3 h-5 w-5" />
      {label}
    </NavLink>
  );
}

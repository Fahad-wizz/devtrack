import { BarChart3, ClipboardList, UserCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { to: '/tasks', label: 'Tasks', icon: ClipboardList },
  { to: '/profile', label: 'Profile', icon: UserCircle },
];

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-200 bg-white px-4 py-5 dark:border-slate-800 dark:bg-slate-900 lg:block">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand text-lg font-black text-white">D</div>
        <div>
          <p className="text-lg font-bold">DevTrack</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Workflow console</p>
        </div>
      </div>
      <nav className="space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-blue-50 text-brand dark:bg-blue-950/50 dark:text-blue-300'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

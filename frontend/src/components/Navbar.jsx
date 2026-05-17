import { LogOut, Menu, Moon, Sun } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import Button from './Button.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 lg:hidden">
          <Menu size={20} />
          <span className="font-bold">DevTrack</span>
        </div>
        <nav className="hidden gap-2 lg:flex">
          <NavLink to="/dashboard" className="text-sm font-medium text-slate-500 dark:text-slate-400">Dashboard</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold">{user?.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{user?.role}</p>
          </div>
          <Button variant="secondary" onClick={logout} className="h-10 px-3" aria-label="Log out">
            <LogOut size={17} />
          </Button>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto border-t border-slate-100 px-4 py-2 dark:border-slate-800 lg:hidden">
        {[
          ['Dashboard', '/dashboard'],
          ['Tasks', '/tasks'],
          ['Profile', '/profile'],
        ].map(([label, to]) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `rounded-md px-3 py-1.5 text-sm font-medium ${isActive ? 'bg-blue-50 text-brand dark:bg-blue-950/60 dark:text-blue-300' : 'text-slate-500 dark:text-slate-300'}`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </header>
  );
}

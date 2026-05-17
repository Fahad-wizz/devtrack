import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-center dark:bg-slate-950">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">404</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Page not found</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">The route you requested is not available.</p>
        <Link to="/dashboard" className="mt-6 inline-flex">
          <Button>Back to dashboard</Button>
        </Link>
      </div>
    </main>
  );
}

import { Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import Field from '../components/Field.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { getErrorMessage } from '../utils/error.js';

export default function Login() {
  const [form, setForm] = useState({ email: 'admin@devtrack.local', password: 'admin123' });
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(form);
      toast.success('Welcome back');
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
        <section className="flex items-center px-6 py-12 sm:px-10 lg:px-16">
          <div className="max-w-xl animate-fade-in">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-brand text-xl font-black">D</div>
            <h1 className="text-4xl font-bold sm:text-5xl">DevTrack</h1>
            <p className="mt-4 max-w-lg text-lg text-slate-300">
              A focused command center for tasks, ownership, delivery status, and team workflow visibility.
            </p>
            <div className="mt-8 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">JWT auth</div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">Role access</div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">Analytics</div>
            </div>
          </div>
        </section>
        <section className="flex items-center justify-center bg-white px-6 py-12 text-slate-900 dark:bg-slate-900 dark:text-white">
          <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-panel dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-2xl font-bold">Sign in</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Use the seeded admin account or your own registration.</p>
            <div className="mt-6 space-y-4">
              <Field label="Email">
                <div className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700">
                  <Mail size={18} className="text-slate-400" />
                  <input
                    className="w-full bg-transparent text-sm"
                    value={form.email}
                    type="email"
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    required
                  />
                </div>
              </Field>
              <Field label="Password">
                <div className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700">
                  <Lock size={18} className="text-slate-400" />
                  <input
                    className="w-full bg-transparent text-sm"
                    value={form.password}
                    type="password"
                    onChange={(event) => setForm({ ...form, password: event.target.value })}
                    required
                  />
                </div>
              </Field>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>
            <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
              New here? <Link className="font-semibold text-brand" to="/register">Create account</Link>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}

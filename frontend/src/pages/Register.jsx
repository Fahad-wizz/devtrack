import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import Field from '../components/Field.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { getErrorMessage } from '../utils/error.js';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'USER' });
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await register(form);
      toast.success('Account created');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 dark:bg-slate-950">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-panel dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create DevTrack account</h1>
        <div className="mt-6 space-y-4">
          <Field label="Name">
            <input className="w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm dark:border-slate-700 dark:text-white" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
          </Field>
          <Field label="Email">
            <input className="w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm dark:border-slate-700 dark:text-white" value={form.email} type="email" onChange={(event) => setForm({ ...form, email: event.target.value })} required />
          </Field>
          <Field label="Password">
            <input className="w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm dark:border-slate-700 dark:text-white" value={form.password} type="password" minLength={6} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
          </Field>
          <Field label="Role">
            <select className="w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm dark:border-slate-700 dark:text-white" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </Field>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating...' : 'Create account'}
          </Button>
        </div>
        <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
          Already have access? <Link className="font-semibold text-brand" to="/login">Sign in</Link>
        </p>
      </form>
    </main>
  );
}

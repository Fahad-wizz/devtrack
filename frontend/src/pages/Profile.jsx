import { Mail, Shield, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Profile() {
  const { user } = useAuth();

  return (
    <section className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Current authenticated account.</p>
      </div>
      <div className="max-w-2xl rounded-lg border border-slate-200 bg-white p-6 shadow-panel dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-50 text-brand dark:bg-blue-950/50">
            <UserCircle size={34} />
          </div>
          <div>
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'today'}</p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-100 p-4 dark:border-slate-800">
            <Mail className="mb-3 text-brand" size={20} />
            <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
            <p className="font-semibold">{user?.email}</p>
          </div>
          <div className="rounded-lg border border-slate-100 p-4 dark:border-slate-800">
            <Shield className="mb-3 text-mint" size={20} />
            <p className="text-sm text-slate-500 dark:text-slate-400">Role</p>
            <p className="font-semibold">{user?.role}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

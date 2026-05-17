import { CheckCircle2, Clock3, ListTodo, Loader2, SignalHigh } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import StatCard from '../components/StatCard.jsx';
import api from '../services/api.js';
import { getErrorMessage } from '../utils/error.js';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const { data } = await api.get('/dashboard/stats');
        setStats(data);
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return <div className="flex min-h-[50vh] items-center justify-center"><Loader2 className="animate-spin text-brand" /></div>;
  }

  return (
    <section className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Delivery health and current task activity.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total tasks" value={stats?.totalTasks ?? 0} icon={ListTodo} accent="bg-brand" />
        <StatCard label="Completed" value={stats?.completedTasks ?? 0} icon={CheckCircle2} accent="bg-mint" />
        <StatCard label="Pending" value={stats?.pendingTasks ?? 0} icon={Clock3} accent="bg-amber" />
        <StatCard label="In progress" value={stats?.inProgressTasks ?? 0} icon={SignalHigh} accent="bg-rose" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold">Tasks by priority</h2>
          <div className="mt-5 space-y-4">
            {Object.entries(stats?.tasksByPriority || {}).map(([priority, count]) => (
              <div key={priority}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{priority}</span>
                  <span className="font-semibold">{count}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-2 rounded-full bg-brand" style={{ width: `${Math.min(100, (count / Math.max(stats.totalTasks, 1)) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold">Recent activity</h2>
          <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
            {(stats?.recentActivities || []).map((activity) => (
              <div key={activity.taskId} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{activity.status}</p>
                </div>
                <span className="text-xs text-slate-400">{new Date(activity.updatedAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

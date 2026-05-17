import { Plus, Search, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../components/Button.jsx';
import Field from '../components/Field.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../services/api.js';
import { getErrorMessage } from '../utils/error.js';

const emptyForm = {
  title: '',
  description: '',
  priority: 'MEDIUM',
  status: 'PENDING',
  dueDate: '',
  assignedUserId: '',
};

export default function Tasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ search: '', status: '', priority: '' });
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const isAdmin = user?.role === 'ADMIN';

  const query = useMemo(() => {
    const params = new URLSearchParams({ page, size: 8 });
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    return params.toString();
  }, [filters, page]);

  async function loadTasks() {
    setLoading(true);
    try {
      const { data } = await api.get(`/tasks?${query}`);
      setTasks(data.content || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, [query]);

  useEffect(() => {
    if (!isAdmin) return;
    api.get('/users')
      .then(({ data }) => setUsers(data))
      .catch((error) => toast.error(getErrorMessage(error)));
  }, [isAdmin]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      dueDate: form.dueDate || null,
      assignedUserId: form.assignedUserId ? Number(form.assignedUserId) : null,
    };
    try {
      if (editingId) {
        await api.put(`/tasks/${editingId}`, payload);
        toast.success('Task updated');
      } else {
        await api.post('/tasks', payload);
        toast.success('Task created');
      }
      setForm(emptyForm);
      setEditingId(null);
      loadTasks();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const editTask = (task) => {
    setEditingId(task.id);
    setForm({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate || '',
      assignedUserId: task.assignedUser?.id || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      toast.success('Task deleted');
      loadTasks();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <section className="animate-fade-in space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Create, assign, search, and track delivery work.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Plus size={20} className="text-brand" />
          {editingId ? 'Update task' : 'Create task'}
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Field label="Title">
            <input className="w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm dark:border-slate-700" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required />
          </Field>
          <Field label="Priority">
            <select className="w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm dark:border-slate-700" value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value })}>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </Field>
          <Field label="Status">
            <select className="w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm dark:border-slate-700" value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </Field>
          <Field label="Due date">
            <input className="w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm dark:border-slate-700" type="date" value={form.dueDate} onChange={(event) => setForm({ ...form, dueDate: event.target.value })} />
          </Field>
          {isAdmin && (
            <Field label="Assignee">
              <select className="w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm dark:border-slate-700" value={form.assignedUserId} onChange={(event) => setForm({ ...form, assignedUserId: event.target.value })}>
                <option value="">Unassigned</option>
                {users.map((candidate) => <option key={candidate.id} value={candidate.id}>{candidate.name}</option>)}
              </select>
            </Field>
          )}
          <Field label="Description">
            <textarea className="min-h-10 w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm dark:border-slate-700" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
          </Field>
        </div>
        <div className="mt-4 flex gap-2">
          <Button type="submit">{editingId ? 'Save changes' : 'Create task'}</Button>
          {editingId && <Button type="button" variant="secondary" onClick={() => { setEditingId(null); setForm(emptyForm); }}>Cancel</Button>}
        </div>
      </form>

      <div className="rounded-lg border border-slate-200 bg-white shadow-panel dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-3 border-b border-slate-100 p-4 dark:border-slate-800 md:grid-cols-4">
          <div className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700 md:col-span-2">
            <Search size={17} className="text-slate-400" />
            <input className="w-full bg-transparent text-sm" placeholder="Search tasks" value={filters.search} onChange={(event) => { setPage(0); setFilters({ ...filters, search: event.target.value }); }} />
          </div>
          <select className="rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm dark:border-slate-700" value={filters.status} onChange={(event) => { setPage(0); setFilters({ ...filters, status: event.target.value }); }}>
            <option value="">All statuses</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
          <select className="rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm dark:border-slate-700" value={filters.priority} onChange={(event) => { setPage(0); setFilters({ ...filters, priority: event.target.value }); }}>
            <option value="">All priorities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-950 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3">Task</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Assignee</th>
                <th className="px-4 py-3">Due</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3">
                    <button onClick={() => editTask(task)} className="text-left font-semibold text-slate-900 hover:text-brand dark:text-white">{task.title}</button>
                    <p className="mt-1 max-w-md truncate text-xs text-slate-500 dark:text-slate-400">{task.description}</p>
                  </td>
                  <td className="px-4 py-3">{task.priority}</td>
                  <td className="px-4 py-3">{task.status}</td>
                  <td className="px-4 py-3">{task.assignedUser?.name || 'Unassigned'}</td>
                  <td className="px-4 py-3">{task.dueDate || '-'}</td>
                  <td className="px-4 py-3 text-right">
                    {isAdmin && (
                      <button className="inline-flex h-9 w-9 items-center justify-center rounded-md text-rose hover:bg-red-50 dark:hover:bg-red-950/40" onClick={() => deleteTask(task.id)} aria-label="Delete task">
                        <Trash2 size={17} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && tasks.length === 0 && <p className="p-6 text-center text-sm text-slate-500">No tasks found.</p>}
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 p-4 text-sm dark:border-slate-800">
          <span className="text-slate-500 dark:text-slate-400">Page {page + 1} of {totalPages}</span>
          <div className="flex gap-2">
            <Button variant="secondary" disabled={page === 0} onClick={() => setPage((current) => Math.max(0, current - 1))}>Previous</Button>
            <Button variant="secondary" disabled={page + 1 >= totalPages} onClick={() => setPage((current) => current + 1)}>Next</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

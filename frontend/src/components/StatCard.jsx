export default function StatCard({ label, value, icon: Icon, accent = 'bg-brand' }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-lg text-white ${accent}`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}

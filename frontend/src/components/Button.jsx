export default function Button({ children, className = '', variant = 'primary', ...props }) {
  const variants = {
    primary: 'bg-brand text-white hover:bg-blue-700 focus:ring-blue-300',
    secondary: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800',
    danger: 'bg-rose text-white hover:bg-red-600 focus:ring-red-300',
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

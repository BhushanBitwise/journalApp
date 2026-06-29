const Loader = ({ label = 'Loading...' }) => (
  <div className="flex min-h-[220px] flex-col items-center justify-center gap-3">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
    <p className="text-sm font-medium text-slate-500">{label}</p>
  </div>
);

export default Loader;

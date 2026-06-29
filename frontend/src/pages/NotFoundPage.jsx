import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md rounded-[2rem] border border-white/70 bg-white/70 p-8 text-center shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">404</p>
        <h1 className="mt-3 text-3xl font-semibold">Page not found</h1>
        <p className="mt-3 text-sm text-slate-500">The page you are looking for does not exist or has moved.</p>
        <Link to="/dashboard" className="mt-6 inline-flex rounded-2xl bg-sky-600 px-4 py-2 font-semibold text-white">Go home</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

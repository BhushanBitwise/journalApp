import { useEffect, useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const AdminDashboardPage = () => {
  const [loading, setLoading] = useState(false);

  const clearCache = async () => {
    setLoading(true);
    try {
      await api.get('/admin/clear-app-cache');
      toast.success('Cache cleared');
    } catch (error) {
      toast.error('Could not clear cache');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
        <p className="text-sm font-semibold text-sky-500">Admin Dashboard</p>
        <h2 className="mt-2 text-2xl font-semibold">Manage your application</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
          <h3 className="text-lg font-semibold">All users</h3>
          <p className="mt-3 text-sm text-slate-500">Review and manage all registered users from one place.</p>
          <a href="/admin/users" className="mt-4 inline-flex rounded-2xl bg-sky-600 px-4 py-2 font-semibold text-white">Open users</a>
        </div>
        <div className="rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
          <h3 className="text-lg font-semibold">App cache</h3>
          <p className="mt-3 text-sm text-slate-500">Reset cached state and keep the application fresh.</p>
          <button disabled={loading} onClick={clearCache} className="mt-4 rounded-2xl bg-violet-600 px-4 py-2 font-semibold text-white">{loading ? 'Refreshing...' : 'Clear cache'}</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

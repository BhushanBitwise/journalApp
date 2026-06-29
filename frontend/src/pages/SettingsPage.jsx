import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';

const SettingsPage = () => {
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      await api.delete('/user');
      toast.success('Account deleted');
      window.location.href = '/login';
    } catch (error) {
      toast.error('Could not delete account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
        <p className="text-sm font-semibold text-sky-500">Settings</p>
        <h2 className="mt-2 text-2xl font-semibold">Customize your experience</h2>
        <p className="mt-3 text-sm text-slate-500">Theme preferences and account management live here.</p>
      </div>
      <div className="rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
        <h3 className="text-lg font-semibold">Delete account</h3>
        <p className="mt-2 text-sm text-slate-500">This action removes your account and associated journal data.</p>
        <button disabled={loading} onClick={handleDeleteAccount} className="mt-4 rounded-2xl bg-rose-500 px-4 py-3 font-semibold text-white">{loading ? 'Deleting...' : 'Delete account'}</button>
      </div>
    </div>
  );
};

export default SettingsPage;

import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({ userName: '', password: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.username) setForm((prev) => ({ ...prev, userName: user.username }));
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/user', form);
      toast.success('Profile updated');
    } catch (error) {
      toast.error('Could not update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
      <p className="text-sm font-semibold text-sky-500">Profile</p>
      <h2 className="mt-2 text-2xl font-semibold">Manage your account</h2>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Username</span>
          <input value={form.userName} onChange={(e) => setForm({ ...form, userName: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-800" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium">New password</span>
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-800" />
        </label>
        <button disabled={loading} className="rounded-2xl bg-sky-600 px-5 py-3 font-semibold text-white">{loading ? 'Saving...' : 'Save Changes'}</button>
      </form>
    </div>
  );
};

export default ProfilePage;

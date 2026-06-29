import { useEffect, useState } from 'react';
import api from '../services/api';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/admin/all-users');
        setUsers(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
        <p className="text-sm font-semibold text-sky-500">Users Management</p>
        <h2 className="mt-2 text-2xl font-semibold">Registered users</h2>
      </div>
      {loading ? <Loader label="Loading users..." /> : users.length === 0 ? <EmptyState title="No users found" description="There are no registered users at the moment." /> : <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70"><table className="min-w-full text-left text-sm"><thead className="bg-slate-100/70 dark:bg-slate-800/70"><tr><th className="px-4 py-3">Username</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Roles</th></tr></thead><tbody>{users.map((user) => <tr key={user.id} className="border-t border-slate-200 dark:border-slate-800"><td className="px-4 py-3 font-semibold">{user.userName}</td><td className="px-4 py-3">{user.email}</td><td className="px-4 py-3">{(user.roles || []).join(', ') || 'USER'}</td></tr>)}</tbody></table></div>}
    </div>
  );
};

export default AdminUsersPage;

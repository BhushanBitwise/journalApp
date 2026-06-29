import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Plus, Sparkles, TrendingUp } from 'lucide-react';
import api from '../services/api';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';

const DashboardPage = () => {
  const [entries, setEntries] = useState([]);
  const [greeting, setGreeting] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [journalsRes, userRes] = await Promise.all([api.get('/journal'), api.get('/user')]);
        setEntries(journalsRes.data || []);
        setGreeting(userRes.data || '');
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
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-white/70 bg-gradient-to-br from-sky-500 via-cyan-400 to-violet-500 p-6 text-white shadow-soft sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-100">Journal Dashboard</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{greeting || 'Welcome back to your journal practice.'}</h2>
            <p className="mt-3 max-w-2xl text-sm text-sky-50/90">Track your mood, write your thoughts, and keep your creative streak alive.</p>
          </div>
          <Link to="/journals/new" className="flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-sky-700">
            <Plus size={18} /> New Entry
          </Link>
        </div>
      </motion.section>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-sky-500">Your recent journals</p>
              <h3 className="mt-1 text-xl font-semibold">Keep your ideas flowing</h3>
            </div>
            <Link to="/journals" className="text-sm font-semibold text-sky-600">View all</Link>
          </div>
          {loading ? <Loader label="Loading journals..." /> : entries.length === 0 ? <EmptyState title="No journal entries yet" description="Create your first entry and start documenting your day." action={<Link to="/journals/new" className="mt-4 inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white">Create journal</Link>} /> : <div className="mt-6 grid gap-4">{entries.slice(0, 3).map((entry) => <div key={entry.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/40"><div className="flex items-center justify-between"><h4 className="font-semibold">{entry.title}</h4><span className="text-xs text-slate-400">{entry.date ? new Date(entry.date).toLocaleDateString() : 'Today'}</span></div><p className="mt-2 line-clamp-2 text-sm text-slate-500">{entry.content}</p></div>)}</div>}
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-sky-100 p-3 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400"><TrendingUp size={18} /></div>
              <div>
                <p className="text-sm font-semibold text-sky-500">Momentum</p>
                <h3 className="text-xl font-semibold">{entries.length} entries logged</h3>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-violet-100 p-3 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"><BookOpen size={18} /></div>
              <div>
                <p className="text-sm font-semibold text-violet-500">Insights</p>
                <h3 className="text-xl font-semibold">A calm place to reflect</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, SlidersHorizontal } from 'lucide-react';
import api from '../services/api';
import JournalCard from '../components/JournalCard';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import ConfirmationModal from '../components/ConfirmationModal';

const JournalsPage = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [selectedId, setSelectedId] = useState(null);

  const loadEntries = async () => {
    try {
      const { data } = await api.get('/journal');
      setEntries(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const filtered = useMemo(() => {
    const filteredEntries = entries.filter((entry) => `${entry.title} ${entry.content}`.toLowerCase().includes(search.toLowerCase()));
    return filteredEntries.sort((a, b) => sort === 'newest' ? new Date(b.date || 0) - new Date(a.date || 0) : new Date(a.date || 0) - new Date(b.date || 0));
  }, [entries, search, sort]);

  const handleDelete = async () => {
    try {
      await api.delete(`/journal/id/${selectedId}`);
      setSelectedId(null);
      loadEntries();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-sky-500">Journal Library</p>
          <h2 className="text-2xl font-semibold">All your reflections</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800">
            <SlidersHorizontal size={16} />
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-transparent outline-none">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </label>
          <Link to="/journals/new" className="flex items-center gap-2 rounded-2xl bg-sky-600 px-4 py-2 font-semibold text-white">
            <Plus size={16} /> New entry
          </Link>
        </div>
      </div>

      <SearchBar value={search} onChange={setSearch} />

      {loading ? <Loader label="Loading your journal entries..." /> : filtered.length === 0 ? <EmptyState title="No matching entries" description="Try a different keyword or create your first journal entry." action={<Link to="/journals/new" className="mt-4 inline-flex rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white">Create entry</Link>} /> : <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map((entry) => <JournalCard key={entry.id} journal={entry} onDelete={setSelectedId} />)}</div>}

      <ConfirmationModal open={Boolean(selectedId)} title="Delete journal?" description="This action cannot be undone." onCancel={() => setSelectedId(null)} onConfirm={handleDelete} />
    </div>
  );
};

export default JournalsPage;

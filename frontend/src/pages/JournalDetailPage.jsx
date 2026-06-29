import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, PencilLine } from 'lucide-react';
import api from '../services/api';
import Loader from '../components/Loader';

const JournalDetailPage = () => {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get(`/journal/id/${id}`);
        setEntry(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <Loader label="Loading journal details..." />;
  if (!entry) return <div className="rounded-3xl bg-white/70 p-6 shadow-soft">Entry not found.</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
        <div>
          <p className="text-sm font-semibold text-sky-500">Journal Detail</p>
          <h2 className="text-2xl font-semibold">{entry.title}</h2>
        </div>
        <div className="flex gap-3">
          <Link to="/journals" className="flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold dark:border-slate-700">
            <ArrowLeft size={16} /> Back
          </Link>
          <Link to={`/journals/edit/${id}`} className="flex items-center gap-2 rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white">
            <PencilLine size={16} /> Edit
          </Link>
        </div>
      </div>
      <div className="rounded-[2rem] border border-white/70 bg-white/70 p-8 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
        <p className="text-sm text-slate-500">{entry.date ? new Date(entry.date).toLocaleString() : 'Recent entry'}</p>
        <p className="mt-6 whitespace-pre-wrap text-base leading-8 text-slate-600 dark:text-slate-300">{entry.content}</p>
      </div>
    </div>
  );
};

export default JournalDetailPage;

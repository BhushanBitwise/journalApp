import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, PencilLine, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const JournalCard = ({ journal, onDelete }) => {
  return (
    <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/60 bg-white/70 p-5 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-sky-500">{journal?.date ? new Date(journal.date).toLocaleDateString() : 'Recent'}</p>
          <h3 className="mt-1 text-xl font-semibold">{journal.title}</h3>
        </div>
        <div className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">Journal</div>
      </div>
      <p className="mt-4 line-clamp-3 text-sm text-slate-600 dark:text-slate-400">{journal.content}</p>
      <div className="mt-5 flex items-center justify-between">
        <Link to={`/journals/${journal.id}`} className="flex items-center gap-2 text-sm font-semibold text-sky-600">
          View details <ArrowRight size={16} />
        </Link>
        <div className="flex items-center gap-2">
          <Link to={`/journals/edit/${journal.id}`} className="rounded-2xl border border-slate-200 p-2 text-slate-600 dark:border-slate-700 dark:text-slate-300">
            <PencilLine size={16} />
          </Link>
          <button onClick={() => onDelete(journal.id)} className="rounded-2xl border border-rose-200 p-2 text-rose-500">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default JournalCard;

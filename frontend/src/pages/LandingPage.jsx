import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
      <header className="flex items-center justify-between rounded-full border border-white/70 bg-white/70 px-4 py-3 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
        <div>
          <p className="text-xl font-semibold">JournalFlow</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300">Login</Link>
          <Link to="/signup" className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white">Get started</Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col justify-center py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-2 text-sm font-medium text-sky-700 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-300">
              <Sparkles size={16} /> AI-powered journaling experience
            </div>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">Capture every thought in a beautiful, private journal.</h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">Create, review, and secure your journal entries with a modern dashboard designed for your daily reflection.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/signup" className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 font-semibold text-white shadow-lg shadow-sky-600/20">Start free <ArrowRight size={18} /></Link>
              <Link to="/login" className="rounded-full border border-slate-200 px-6 py-3 font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">Login</Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
            <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Today’s reflection</p>
                  <h3 className="mt-2 text-2xl font-semibold">My creative momentum</h3>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <Zap size={20} />
                </div>
              </div>
              <div className="mt-8 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <div className="flex items-center gap-2 text-sm text-slate-300"><ShieldCheck size={16} /> Secure and resilient</div>
                  <p className="mt-2 text-sm text-slate-400">Protected routes, JWT auth, and polished mobile experience.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-sm text-slate-300">“A calm place to turn ideas into lasting memories.”</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;

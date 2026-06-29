import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock, UserRound, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, loading } = useAuth();
  const [form, setForm] = useState({ userName: '', email: '', password: '', sentimentAnalysis: true });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signup(form);
    if (success) navigate('/login');
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="bg-slate-950 px-8 py-10 text-white sm:px-10">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-400">JournalFlow</p>
            <h1 className="mt-4 text-3xl font-semibold">Create your account</h1>
            <p className="mt-3 text-sm text-slate-400">Join thousands of people turning daily reflections into a life journal.</p>
          </div>
          <div className="p-8 sm:p-10">
            <h2 className="text-2xl font-semibold">Sign up</h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium">Username</span>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                  <UserRound size={18} className="text-slate-400" />
                  <input value={form.userName} onChange={(e) => setForm({ ...form, userName: e.target.value })} className="w-full bg-transparent outline-none" placeholder="bhushan" />
                </div>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium">Email</span>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                  <Mail size={18} className="text-slate-400" />
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-transparent outline-none" placeholder="name@example.com" />
                </div>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium">Password</span>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                  <Lock size={18} className="text-slate-400" />
                  <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full bg-transparent outline-none" placeholder="••••••" />
                </div>
              </label>
              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800">
                <input type="checkbox" checked={form.sentimentAnalysis} onChange={(e) => setForm({ ...form, sentimentAnalysis: e.target.checked })} />
                <span>Enable sentiment analysis insights</span>
              </label>
              <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-600 px-4 py-3 font-semibold text-white">
                {loading ? 'Creating account...' : 'Create account'} <ArrowRight size={16} />
              </button>
            </form>
            <p className="mt-6 text-sm text-slate-500">Already have an account? <Link to="/login" className="font-semibold text-sky-600">Sign in</Link></p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;

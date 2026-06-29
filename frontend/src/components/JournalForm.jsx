import { useState } from 'react';

const JournalForm = ({ initialValues, onSubmit, loading }) => {
  const [form, setForm] = useState(initialValues || { title: '', content: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = 'Title is required';
    if (!form.content.trim()) nextErrors.content = 'Content is required';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-white/60 bg-white/70 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
      <div>
        <label className="mb-2 block text-sm font-semibold">Title</label>
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 outline-none focus:border-sky-500 dark:border-slate-700 dark:bg-slate-800" placeholder="My Day" />
        {errors.title && <p className="mt-2 text-sm text-rose-500">{errors.title}</p>}
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold">Content</label>
        <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={8} className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 outline-none focus:border-sky-500 dark:border-slate-700 dark:bg-slate-800" placeholder="How did your day go?" />
        {errors.content && <p className="mt-2 text-sm text-rose-500">{errors.content}</p>}
      </div>
      <button disabled={loading} className="rounded-2xl bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-700 disabled:opacity-70">
        {loading ? 'Saving...' : 'Save Journal'}
      </button>
    </form>
  );
};

export default JournalForm;

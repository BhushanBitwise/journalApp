import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = 'Search journals...' }) => (
  <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
    <Search size={18} className="text-slate-400" />
    <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-transparent text-sm outline-none" />
  </label>
);

export default SearchBar;

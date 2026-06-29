import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import JournalForm from '../components/JournalForm';
import toast from 'react-hot-toast';

const CreateJournalPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (payload) => {
    setLoading(true);
    try {
      await api.post('/journal', payload);
      toast.success('Journal created');
      navigate('/journals');
    } catch (error) {
      toast.error('Could not create journal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
        <p className="text-sm font-semibold text-sky-500">Create Journal</p>
        <h2 className="mt-2 text-2xl font-semibold">Write something beautiful</h2>
      </div>
      <JournalForm initialValues={{ title: '', content: '' }} onSubmit={handleCreate} loading={loading} />
    </div>
  );
};

export default CreateJournalPage;

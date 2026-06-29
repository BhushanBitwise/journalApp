import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import JournalForm from '../components/JournalForm';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';

const EditJournalPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', content: '' });

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get(`/journal/id/${id}`);
        setForm({ title: data.title || '', content: data.content || '' });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleUpdate = async (payload) => {
    setLoading(true);
    try {
      await api.put(`/journal/id/${id}`, payload);
      toast.success('Journal updated');
      navigate('/journals');
    } catch (error) {
      toast.error('Could not update journal');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader label="Loading journal..." />;

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
        <p className="text-sm font-semibold text-sky-500">Edit Journal</p>
        <h2 className="mt-2 text-2xl font-semibold">Refine your entry</h2>
      </div>
      <JournalForm initialValues={form} onSubmit={handleUpdate} loading={loading} />
    </div>
  );
};

export default EditJournalPage;

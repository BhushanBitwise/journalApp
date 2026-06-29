import { motion } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen">
        <AppRoutes />
      </motion.div>
    </AuthProvider>
  );
}

export default App;

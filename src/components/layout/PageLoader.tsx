'use client';

import { motion } from 'framer-motion';
import { Car } from 'lucide-react';

interface PageLoaderProps {
  isLoading: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 mx-auto mb-4 text-blue-600"
        >
          <Car className="w-full h-full" />
        </motion.div>
        
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-semibold text-gray-800 mb-2"
        >
          Загрузка...
        </motion.h2>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 200 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-1 bg-blue-600 rounded-full mx-auto"
        />
      </div>
    </motion.div>
  );
};

export default PageLoader; 
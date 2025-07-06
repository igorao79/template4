'use client';

import { motion } from 'framer-motion';
import { usePageLoader } from '@/contexts/PageLoaderContext';

const Hero = () => {
  const { isPageReady } = usePageLoader();

  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={isPageReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6"
          >
            Премиальные автомобили
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isPageReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto px-4"
          >
            Более 2500 проверенных автомобилей с гарантией качества
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isPageReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4"
          >
            <motion.a
              href="/catalog"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-blue-900 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              Посмотреть каталог
            </motion.a>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-white text-sm sm:text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-900 transition-colors duration-200"
            >
              Связаться с нами
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 
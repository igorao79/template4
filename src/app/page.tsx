'use client';

import { motion } from 'framer-motion';
import Hero from '@/components/hero/Hero';
import CarCard from '@/components/car/CarCard';
import { mockCars } from '@/utils/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

export default function Home() {
  return (
    <div>
      <Hero />
      
      {/* Популярные автомобили */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Популярные автомобили
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Самые востребованные модели с лучшими характеристиками
            </p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          >
            {mockCars.slice(0, 8).map((car) => (
              <motion.div key={car.id} variants={itemVariants}>
                <CarCard car={car} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Статистика */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
          >
            <div className="text-center">
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-2"
              >
                2500+
              </motion.div>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                Автомобилей в наличии
              </p>
            </div>
            <div className="text-center">
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-2"
              >
                10000+
              </motion.div>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                Довольных клиентов
              </p>
            </div>
            <div className="text-center">
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-2"
              >
                100%
              </motion.div>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                Гарантия качества
              </p>
            </div>
            <div className="text-center">
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-2"
              >
                15+
              </motion.div>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                Лет на рынке
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

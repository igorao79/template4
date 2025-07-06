'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Search, Car, Users, Shield, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика поиска
    console.log('Поиск:', { searchQuery, selectedBrand, selectedCategory });
  };

  const carBrands = [
    'BMW', 'Mercedes-Benz', 'Audi', 'Toyota', 'Honda', 'Nissan', 
    'Ford', 'Volkswagen', 'Hyundai', 'Kia', 'Mazda', 'Subaru'
  ];

  const categories = [
    { value: 'sedan', label: 'Седан' },
    { value: 'suv', label: 'Внедорожник' },
    { value: 'hatchback', label: 'Хэтчбек' },
    { value: 'coupe', label: 'Купе' },
    { value: 'convertible', label: 'Кабриолет' },
    { value: 'truck', label: 'Пикап' },
  ];

  const stats = [
    { icon: Car, value: '2,500+', label: 'Автомобилей в наличии' },
    { icon: Users, value: '10,000+', label: 'Довольных клиентов' },
    { icon: Shield, value: '100%', label: 'Гарантия качества' },
    { icon: Award, value: '15+', label: 'Лет на рынке' },
  ];

  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6"
          >
            Премиальные автомобили
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto px-4"
          >
            Более 2500 проверенных автомобилей с гарантией качества
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
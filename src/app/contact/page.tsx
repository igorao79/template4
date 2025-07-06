'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
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

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Контакты
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            Свяжитесь с нами любым удобным способом
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          <motion.div variants={itemVariants}>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-lg font-semibold mb-2">Адрес</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  г. Москва, ул. Автомобильная, д. 123
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <Phone className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-lg font-semibold mb-2">Телефон</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  +7 (999) 123-45-67
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <Mail className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  info@autolux.ru
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <Clock className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-lg font-semibold mb-2">Часы работы</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Ежедневно: 9:00 - 21:00
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 
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

        {/* Карта */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 sm:mt-12"
        >
          <Card>
            <CardContent className="p-0">
              <div className="relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.426280233899!2d37.61730331592795!3d55.75581998055516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2z0KPQu9C40YbQsCDQotCy0LXRgNGB0LrQsNGPLCDQnNC-0YHQutCy0LAsINCg0L7RgdGB0LjRjw!5e0!3m2!1sru!2sru!4v1685123456789!5m2!1sru!2sru"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 
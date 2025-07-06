'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Users, Shield, Clock, Car, MapPin, Phone, Mail } from 'lucide-react';

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

export default function AboutPage() {
  const stats = [
    { icon: Car, value: '2,500+', label: 'Автомобилей продано', description: 'За последние 3 года' },
    { icon: Users, value: '10,000+', label: 'Довольных клиентов', description: 'Постоянные покупатели' },
    { icon: Shield, value: '100%', label: 'Гарантия качества', description: 'На все автомобили' },
    { icon: Clock, value: '15+', label: 'Лет на рынке', description: 'Опыт и надежность' },
  ];

  const team = [
    {
      name: 'Александр Иванов',
      position: 'Генеральный директор',
      experience: '15 лет в автомобильной индустрии',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    },
    {
      name: 'Мария Петрова',
      position: 'Менеджер по продажам',
      experience: '8 лет в продажах премиальных авто',
      photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face',
    },
    {
      name: 'Дмитрий Сидоров',
      position: 'Технический эксперт',
      experience: '12 лет в диагностике автомобилей',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face',
    },
  ];

  const advantages = [
    {
      icon: Shield,
      title: 'Проверенное качество',
      description: 'Каждый автомобиль проходит 150-точечную проверку нашими экспертами',
    },
    {
      icon: Award,
      title: 'Лучшие цены',
      description: 'Гарантируем честные рыночные цены без скрытых комиссий',
    },
    {
      icon: Users,
      title: 'Персональный подход',
      description: 'Индивидуальная консультация и помощь в выборе автомобиля',
    },
    {
      icon: Clock,
      title: 'Быстрое оформление',
      description: 'Документы готовы за 1 день, доставка в любую точку России',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              О компании AutoLux
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 opacity-90">
              15 лет опыта в продаже премиальных автомобилей
            </p>
            <p className="text-sm sm:text-base md:text-lg opacity-80 max-w-3xl mx-auto">
              Мы - ведущий дилер премиальных автомобилей в России. Наша миссия - 
              помочь каждому клиенту найти автомобиль мечты, предоставляя честный 
              сервис и гарантию качества на всех этапах покупки.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                      <stat.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </div>
                    <div className="font-semibold text-gray-700 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sm text-gray-500">
                      {stat.description}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12"
            >
              Наша история
            </motion.h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                  alt="Наш автосалон"
                  width={600}
                  height={400}
                  className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-lg"
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-4 sm:space-y-6"
              >
                <p className="text-base sm:text-lg text-gray-700">
                  <strong>AutoLux</strong> была основана в 2008 году с простой идеей: 
                  сделать покупку премиального автомобиля максимально прозрачной 
                  и комфортной для каждого клиента.
                </p>
                <p className="text-sm sm:text-base text-gray-700">
                  За 15 лет работы мы построили репутацию надежного партнера, 
                  который предлагает только проверенные автомобили с полной 
                  историей обслуживания. Наша команда экспертов тщательно 
                  отбирает каждый автомобиль в нашем каталоге.
                </p>
                <p className="text-sm sm:text-base text-gray-700">
                  Сегодня мы - один из лидеров рынка премиальных автомобилей 
                  с сетью партнеров по всей России и собственным сервисным центром.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12"
          >
            Наши преимущества
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          >
            {advantages.map((advantage, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                          <advantage.icon className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                          {advantage.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-700">
                          {advantage.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12"
          >
            Наша команда
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
          >
            {team.map((member, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-2">
                      {member.position}
                    </p>
                    <p className="text-sm sm:text-base text-gray-600">
                      {member.experience}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12"
          >
            Как нас найти
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
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
          </motion.div>
        </div>
      </section>
    </div>
  );
} 
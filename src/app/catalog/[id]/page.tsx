'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  Calendar, 
  Fuel, 
  Users, 
  Gauge 
} from 'lucide-react';
import { getCarById } from '@/utils/mockData';
import CarViewer3D from '@/components/car/CarViewer3D';

interface CarDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function CarDetailPage({ params }: CarDetailPageProps) {
  const { id } = use(params);
  const car = getCarById(id);
  
  if (!car) {
    notFound();
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Breadcrumb */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-4 sm:mb-6"
        >
          <Link href="/catalog" className="flex items-center gap-2 text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Назад к каталогу
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Левая колонка - 3D просмотр */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6"
          >
            <CarViewer3D
              carName={`${car.brand} ${car.model}`}
              modelPath={car.model3d}
            />
            
            {/* Фото галерея */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Фотогалерея</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <Image
                    src={car.image}
                    alt={`${car.brand} ${car.model} - Вид 1`}
                    width={128}
                    height={96}
                    className="w-full h-24 sm:h-32 object-cover rounded-lg"
                  />
                  <Image
                    src={car.image}
                    alt={`${car.brand} ${car.model} - Вид 2`}
                    width={128}
                    height={96}
                    className="w-full h-24 sm:h-32 object-cover rounded-lg filter sepia-0 contrast-125"
                  />
                  <Image
                    src={car.image}
                    alt={`${car.brand} ${car.model} - Вид 3`}
                    width={128}
                    height={96}
                    className="w-full h-24 sm:h-32 object-cover rounded-lg filter brightness-110"
                  />
                  <Image
                    src={car.image}
                    alt={`${car.brand} ${car.model} - Вид 4`}
                    width={128}
                    height={96}
                    className="w-full h-24 sm:h-32 object-cover rounded-lg filter saturate-150"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Правая колонка - Информация */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Основная информация */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl sm:text-2xl md:text-3xl">
                      {car.brand} {car.model}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      {car.isNew && (
                        <Badge className="bg-green-500 text-xs">Новый</Badge>
                      )}
                      <Badge variant="outline" className="text-xs">{car.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs sm:text-sm font-medium">4.8</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                      {formatPrice(car.price)}
                    </div>
                    {car.specifications.mileage > 0 && (
                      <div className="text-xs sm:text-sm text-gray-600">
                        {car.specifications.mileage.toLocaleString()} км
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
                  {car.description}
                </p>

                {/* Основные характеристики */}
                <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                    <span className="text-gray-600">Год:</span>
                    <span className="font-medium">{car.year}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Fuel className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                    <span className="text-gray-600">Топливо:</span>
                    <span className="font-medium">{car.specifications.fuelType}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Users className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                    <span className="text-gray-600">Мест:</span>
                    <span className="font-medium">{car.specifications.seating}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Gauge className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                    <span className="text-gray-600">Мощность:</span>
                    <span className="font-medium">{car.specifications.horsepower} л.с.</span>
                  </div>
                </div>

                {/* Кнопки действий */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <Button 
                    className="flex-1 h-10 sm:h-12 text-sm sm:text-base"
                    disabled={!car.isAvailable}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {car.isAvailable ? 'Купить сейчас' : 'Продано'}
                  </Button>
                  <Button variant="outline" className="flex-1 h-10 sm:h-12 text-sm sm:text-base">
                    <Heart className="h-4 w-4 mr-2" />
                    В избранное
                  </Button>
                  <Button variant="outline" size="icon" className="h-10 w-10 sm:h-12 sm:w-12">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Характеристики */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Характеристики</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between py-1 sm:py-2 border-b border-gray-100">
                    <span className="text-xs sm:text-sm text-gray-600">Двигатель</span>
                    <span className="font-medium text-xs sm:text-sm">{car.specifications.engine}</span>
                  </div>
                  <div className="flex justify-between py-1 sm:py-2 border-b border-gray-100">
                    <span className="text-xs sm:text-sm text-gray-600">Мощность</span>
                    <span className="font-medium text-xs sm:text-sm">{car.specifications.horsepower} л.с.</span>
                  </div>
                  <div className="flex justify-between py-1 sm:py-2 border-b border-gray-100">
                    <span className="text-xs sm:text-sm text-gray-600">КПП</span>
                    <span className="font-medium text-xs sm:text-sm">{car.specifications.transmission}</span>
                  </div>
                  <div className="flex justify-between py-1 sm:py-2 border-b border-gray-100">
                    <span className="text-xs sm:text-sm text-gray-600">Привод</span>
                    <span className="font-medium text-xs sm:text-sm">{car.specifications.drivetrain}</span>
                  </div>
                  <div className="flex justify-between py-1 sm:py-2 border-b border-gray-100">
                    <span className="text-xs sm:text-sm text-gray-600">Цвет</span>
                    <span className="font-medium text-xs sm:text-sm">{car.specifications.color}</span>
                  </div>
                  <div className="flex justify-between py-1 sm:py-2">
                    <span className="text-xs sm:text-sm text-gray-600">Пробег</span>
                    <span className="font-medium text-xs sm:text-sm">{car.specifications.mileage.toLocaleString()} км</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Особенности */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Особенности и опции</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {car.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs sm:text-sm">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
} 
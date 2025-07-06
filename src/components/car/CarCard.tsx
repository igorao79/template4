'use client';

import React, { memo, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/stores/cart';
import { useAuthStore } from '@/stores/auth';
import { Car } from '@/types';
import { 
  Heart, 
  ShoppingCart, 
  Fuel, 
  Users, 
  Calendar, 
  Gauge,
  Check,
  Star,
  Lock
} from 'lucide-react';

interface CarCardProps {
  car: Car;
  isWishlist?: boolean;
  onToggleWishlist?: (carId: string) => void;
}

const CarCard = memo(({ car, isWishlist, onToggleWishlist }: CarCardProps) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { addToCart, isInCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  
  // Исправляем проблему гидратации
  const inCart = isClient ? isInCart(car.id) : false;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleBuyNow = () => {
    if (!car.isAvailable) return;
    
    // Проверяем авторизацию
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    // Добавляем в корзину если еще не добавлено
    if (!inCart) {
      addToCart(car);
    }
    
    // Перенаправляем к оформлению заказа
    router.push('/checkout');
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    if (!inCart && car.isAvailable) {
      addToCart(car);
    }
  };

  const handleToggleWishlist = () => {
    if (onToggleWishlist) {
      onToggleWishlist(car.id);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
        <div className="relative">
          <Image
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            width={400}
            height={300}
            className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {car.isNew && (
              <Badge className="bg-green-500 hover:bg-green-600 text-xs">
                Новый
              </Badge>
            )}
            {!car.isAvailable && (
              <Badge variant="destructive" className="text-xs">
                Продан
              </Badge>
            )}
            {!isAuthenticated && (
              <Badge variant="outline" className="bg-white/90 text-xs">
                <Lock className="h-3 w-3 mr-1" />
                Вход
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          {onToggleWishlist && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
              onClick={handleToggleWishlist}
            >
              <Heart 
                className={`h-4 w-4 ${isWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
              />
            </Button>
          )}

          {/* Quick Actions */}
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0"
                onClick={handleAddToCart}
                disabled={!car.isAvailable || inCart}
              >
                {inCart ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : !isAuthenticated ? (
                  <Lock className="h-4 w-4" />
                ) : (
                  <ShoppingCart className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <CardContent className="p-3 sm:p-4 flex-1 flex flex-col">
          <div className="space-y-2 sm:space-y-3 flex-1">
            {/* Title */}
            <div>
              <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-1 line-clamp-1">
                {car.brand} {car.model}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                {car.description}
              </p>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{car.year}</span>
              </div>
              <div className="flex items-center gap-1">
                <Fuel className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{car.specifications.fuelType}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{car.specifications.seating} мест</span>
              </div>
              <div className="flex items-center gap-1">
                <Gauge className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{car.specifications.horsepower} л.с.</span>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-1">
              {car.features.slice(0, 2).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {car.features.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{car.features.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-3 sm:p-4 pt-0">
          <div className="w-full space-y-2 sm:space-y-3">
            {/* Price */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg sm:text-xl font-bold text-gray-900">
                  {formatPrice(car.price)}
                </span>
                {car.specifications.mileage > 0 && (
                  <div className="text-xs sm:text-sm text-gray-600">
                    {car.specifications.mileage.toLocaleString()} км
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-xs sm:text-sm font-medium">4.8</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Link href={`/catalog/${car.id}`} className="flex-1">
                <Button variant="outline" className="w-full text-xs sm:text-sm h-8 sm:h-9">
                  Подробнее
                </Button>
              </Link>
              <Button
                className="flex-1 text-xs sm:text-sm h-8 sm:h-9"
                onClick={handleBuyNow}
                disabled={!car.isAvailable}
              >
                {!car.isAvailable ? (
                  'Продано'
                ) : !isAuthenticated ? (
                  <>
                    <Lock className="h-3 w-3 mr-1" />
                    Войти
                  </>
                ) : (
                  'Купить'
                )}
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
});

CarCard.displayName = 'CarCard';

export default CarCard; 
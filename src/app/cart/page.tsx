'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/stores/cart';
import { useAuthStore } from '@/stores/auth';
import { 
  Trash2, 
  ShoppingBag, 
  ArrowLeft, 
  Plus, 
  Minus,
  CreditCard,
  Car
} from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  
  const total = getCartTotal();
  
  // Проверка авторизации
  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleIncrement = (carId: string, currentQuantity: number) => {
    updateQuantity(carId, currentQuantity + 1);
  };

  const handleDecrement = (carId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(carId, currentQuantity - 1);
    }
  };

  const handleRemove = (carId: string) => {
    removeFromCart(carId);
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="max-w-md mx-auto">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </motion.div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Корзина пуста
              </h1>
              <p className="text-gray-600 mb-6">
                Добавьте автомобили из каталога, чтобы продолжить покупки
              </p>
              <Link href="/catalog">
                <Button size="lg" className="gap-2">
                  <Car className="w-5 h-5" />
                  Перейти в каталог
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-4">
            <Link href="/catalog" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" />
              Продолжить покупки
            </Link>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Корзина</h1>
            <p className="text-sm text-gray-600">{cart.items.length} товар(ов)</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item, index) => (
              <motion.div
                key={item.car.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row gap-4">
                          {/* Image */}
                          <div className="w-full sm:w-48 h-32 sm:h-36 bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                              src={item.car.image}
                              alt={`${item.car.brand} ${item.car.model}`}
                              width={192}
                              height={128}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Details */}
                          <div className="flex-1 space-y-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {item.car.brand} {item.car.model}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {item.car.year} год • {item.car.specifications.fuelType}
                              </p>
                            </div>
                            
                            <div className="flex flex-wrap gap-1">
                              {item.car.features.slice(0, 3).map((feature, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleDecrement(item.car.id, item.quantity || 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity || 1}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleIncrement(item.car.id, item.quantity || 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <div className="text-lg font-semibold text-gray-900">
                              {formatPrice(item.car.price * (item.quantity || 1))}
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatPrice(item.car.price)} за шт.
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            onClick={() => handleRemove(item.car.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Итого к оплате</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Товары ({cart.items.length})</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Доставка</span>
                      <span className="text-green-600">Бесплатно</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold">Общая сумма:</span>
                        <span className="text-lg font-bold text-blue-600">
                          {formatPrice(total)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Button 
                      className="w-full gap-2" 
                      size="lg"
                      onClick={handleCheckout}
                    >
                      <CreditCard className="w-5 h-5" />
                      Оформить заказ
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full text-sm"
                      onClick={clearCart}
                    >
                      Очистить корзину
                    </Button>
                  </div>

                  {/* Trust badges */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Безопасная оплата</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Гарантия качества</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Поддержка 24/7</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 
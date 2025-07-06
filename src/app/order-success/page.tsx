'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  Car, 
  Phone, 
  Mail,
  Home,
  ShoppingCart
} from 'lucide-react';
import { useCartStore } from '@/stores/cart';
import { useAuthStore } from '@/stores/auth';

export default function OrderSuccessPage() {
  const router = useRouter();
  const { clearCart, cart } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const [isCleared, setIsCleared] = useState(false);

  useEffect(() => {
    // Очищаем корзину при загрузке страницы
    if (!isCleared && cart.items.length > 0) {
      clearCart();
      setIsCleared(true);
    }
  }, [clearCart, cart.items.length, isCleared]);

  // Если пользователь не авторизован, перенаправляем на главную
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          {/* Главная карточка успеха */}
          <Card className="mb-6 shadow-xl">
            <CardContent className="text-center p-6 sm:p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="h-10 w-10 text-white" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
              >
                Заказ успешно оформлен!
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-gray-600 mb-6 text-base sm:text-lg"
              >
                Спасибо за покупку, <strong>{user?.name}</strong>! 
                Наш менеджер свяжется с вами в ближайшее время для подтверждения деталей.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Car className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-900">Номер заказа</span>
                </div>
                <p className="text-blue-700 font-mono text-lg">
                  #{Date.now().toString().slice(-8)}
                </p>
              </motion.div>
            </CardContent>
          </Card>

          {/* Что дальше */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Что происходит дальше?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Обработка заказа</h4>
                    <p className="text-gray-600 text-sm">Мы проверим наличие автомобиля и подготовим документы</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Связь с вами</h4>
                    <p className="text-gray-600 text-sm">Менеджер позвонит в течение 2 часов для уточнения деталей</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Встреча и оформление</h4>
                    <p className="text-gray-600 text-sm">Назначим удобное время для осмотра и оформления покупки</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Контакты */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Есть вопросы?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Телефон</p>
                      <p className="text-gray-600">+7 (999) 123-45-67</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">info@autolux.ru</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Кнопки действий */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button 
              onClick={() => router.push('/')}
              className="flex-1 h-12"
            >
              <Home className="h-4 w-4 mr-2" />
              На главную
            </Button>
            <Button 
              variant="outline"
              onClick={() => router.push('/catalog')}
              className="flex-1 h-12"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Продолжить покупки
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 
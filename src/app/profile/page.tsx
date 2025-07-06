'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Mail, 
  Phone, 
  ShoppingCart,
  LogOut,
  Calendar
} from 'lucide-react';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';

export default function ProfilePage() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { cart } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Личный кабинет
            </h1>
            <p className="text-gray-600">
              Управляйте своим профилем и отслеживайте покупки
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Info */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Информация о профиле
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{user?.name}</h3>
                      <p className="text-gray-600">{user?.email}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-gray-600">{user?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="text-sm font-medium">Дата регистрации</p>
                        <p className="text-sm text-gray-600">Сегодня</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Корзина
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {cart.items.length}
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      {cart.items.length === 0 ? 'Пусто' : 'Товаров в корзине'}
                    </p>
                    <Button 
                      onClick={() => router.push('/cart')}
                      className="w-full"
                      disabled={cart.items.length === 0}
                    >
                      Перейти в корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Быстрые действия</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    onClick={() => router.push('/catalog')}
                    className="w-full justify-start gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Каталог автомобилей
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push('/contact')}
                    className="w-full justify-start gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    Связаться с нами
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleLogout}
                    className="w-full justify-start gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Выйти из аккаунта
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 
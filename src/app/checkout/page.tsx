'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, CheckCircle, CreditCard, User, MapPin } from 'lucide-react';
import { useCartStore } from '@/stores/cart';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


interface FormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: string;
  };
  delivery: {
    address: string;
    city: string;
    postalCode: string;
    notes: string;
  };
  payment: {
    method: 'bank' | 'cash' | 'leasing';
    bankName?: string;
    accountNumber?: string;
  };
}

const steps = [
  { id: 1, title: 'Персональные данные', icon: User },
  { id: 2, title: 'Доставка', icon: MapPin },
  { id: 3, title: 'Оплата', icon: CreditCard },
];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { cart, getCartTotal } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      firstName: user?.name.split(' ')[0] || '',
      lastName: user?.name.split(' ')[1] || '',
      email: user?.email || '',
      phone: '',
      birthDate: '',
    },
    delivery: {
      address: '',
      city: '',
      postalCode: '',
      notes: '',
    },
    payment: {
      method: 'bank',
    },
  });

  // Проверка авторизации
  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  // Проверка на пустую корзину
  if (cart.items.length === 0) {
    router.push('/catalog');
    return null;
  }

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.personalInfo.firstName) newErrors.firstName = 'Обязательное поле';
      if (!formData.personalInfo.lastName) newErrors.lastName = 'Обязательное поле';
      if (!formData.personalInfo.email) newErrors.email = 'Обязательное поле';
      if (!formData.personalInfo.phone) newErrors.phone = 'Обязательное поле';
      if (!formData.personalInfo.birthDate) newErrors.birthDate = 'Обязательное поле';
    }
    
    if (step === 2) {
      if (!formData.delivery.address) newErrors.address = 'Обязательное поле';
      if (!formData.delivery.city) newErrors.city = 'Обязательное поле';
      if (!formData.delivery.postalCode) newErrors.postalCode = 'Обязательное поле';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    
    // Симуляция отправки заказа
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Не очищаем корзину сразу, это будет сделано на странице успеха
    router.push('/order-success');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-6"
        >
          <Link href="/cart" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
            Назад к корзине
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Steps */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      currentStep >= step.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      <step.icon className="h-5 w-5" />
                    </div>
                    <div className="ml-3 hidden sm:block">
                      <div className={`text-sm font-medium ${
                        currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-12 sm:w-16 h-0.5 mx-3 sm:mx-4 ${
                        currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    {steps[currentStep - 1].title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {currentStep === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Имя *
                        </label>
                        <Input
                          value={formData.personalInfo.firstName}
                          onChange={(e) => setFormData({
                            ...formData,
                            personalInfo: { ...formData.personalInfo, firstName: e.target.value }
                          })}
                          placeholder="Введите имя"
                          className={errors.firstName ? 'border-red-500' : ''}
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Фамилия *
                        </label>
                        <Input
                          value={formData.personalInfo.lastName}
                          onChange={(e) => setFormData({
                            ...formData,
                            personalInfo: { ...formData.personalInfo, lastName: e.target.value }
                          })}
                          placeholder="Введите фамилию"
                          className={errors.lastName ? 'border-red-500' : ''}
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <Input
                          type="email"
                          value={formData.personalInfo.email}
                          onChange={(e) => setFormData({
                            ...formData,
                            personalInfo: { ...formData.personalInfo, email: e.target.value }
                          })}
                          placeholder="example@email.com"
                          className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Телефон *
                        </label>
                        <Input
                          type="tel"
                          value={formData.personalInfo.phone}
                          onChange={(e) => setFormData({
                            ...formData,
                            personalInfo: { ...formData.personalInfo, phone: e.target.value }
                          })}
                          placeholder="+7 (999) 123-45-67"
                          className={errors.phone ? 'border-red-500' : ''}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Дата рождения *
                        </label>
                        <Input
                          type="date"
                          value={formData.personalInfo.birthDate}
                          onChange={(e) => setFormData({
                            ...formData,
                            personalInfo: { ...formData.personalInfo, birthDate: e.target.value }
                          })}
                          className={errors.birthDate ? 'border-red-500' : ''}
                        />
                        {errors.birthDate && (
                          <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Адрес доставки *
                        </label>
                        <Input
                          value={formData.delivery.address}
                          onChange={(e) => setFormData({
                            ...formData,
                            delivery: { ...formData.delivery, address: e.target.value }
                          })}
                          placeholder="Улица, дом, квартира"
                          className={errors.address ? 'border-red-500' : ''}
                        />
                        {errors.address && (
                          <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Город *
                          </label>
                          <Input
                            value={formData.delivery.city}
                            onChange={(e) => setFormData({
                              ...formData,
                              delivery: { ...formData.delivery, city: e.target.value }
                            })}
                            placeholder="Москва"
                            className={errors.city ? 'border-red-500' : ''}
                          />
                          {errors.city && (
                            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Почтовый индекс *
                          </label>
                          <Input
                            value={formData.delivery.postalCode}
                            onChange={(e) => setFormData({
                              ...formData,
                              delivery: { ...formData.delivery, postalCode: e.target.value }
                            })}
                            placeholder="123456"
                            className={errors.postalCode ? 'border-red-500' : ''}
                          />
                          {errors.postalCode && (
                            <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Примечания к доставке
                        </label>
                        <textarea
                          value={formData.delivery.notes}
                          onChange={(e) => setFormData({
                            ...formData,
                            delivery: { ...formData.delivery, notes: e.target.value }
                          })}
                          placeholder="Дополнительные пожелания к доставке"
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={3}
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Способ оплаты *
                        </label>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="bank"
                              name="payment"
                              value="bank"
                              checked={formData.payment.method === 'bank'}
                              onChange={(e) => setFormData({
                                ...formData,
                                payment: { ...formData.payment, method: e.target.value as 'bank' | 'cash' | 'leasing' }
                              })}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <label htmlFor="bank" className="ml-2 block text-sm text-gray-900">
                              Банковский перевод
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="cash"
                              name="payment"
                              value="cash"
                              checked={formData.payment.method === 'cash'}
                              onChange={(e) => setFormData({
                                ...formData,
                                payment: { ...formData.payment, method: e.target.value as 'bank' | 'cash' | 'leasing' }
                              })}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <label htmlFor="cash" className="ml-2 block text-sm text-gray-900">
                              Наличные при получении
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="leasing"
                              name="payment"
                              value="leasing"
                              checked={formData.payment.method === 'leasing'}
                              onChange={(e) => setFormData({
                                ...formData,
                                payment: { ...formData.payment, method: e.target.value as 'bank' | 'cash' | 'leasing' }
                              })}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <label htmlFor="leasing" className="ml-2 block text-sm text-gray-900">
                              Лизинг
                            </label>
                          </div>
                        </div>
                      </div>

                      {formData.payment.method === 'bank' && (
                        <div className="space-y-4 pt-4 border-t">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Название банка
                            </label>
                            <Input
                              value={formData.payment.bankName || ''}
                              onChange={(e) => setFormData({
                                ...formData,
                                payment: { ...formData.payment, bankName: e.target.value }
                              })}
                              placeholder="Сбербанк"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Номер счета
                            </label>
                            <Input
                              value={formData.payment.accountNumber || ''}
                              onChange={(e) => setFormData({
                                ...formData,
                                payment: { ...formData.payment, accountNumber: e.target.value }
                              })}
                              placeholder="40817810099910004312"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between pt-6">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      disabled={currentStep === 1}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Назад
                    </Button>
                    
                    {currentStep < 3 ? (
                      <Button onClick={handleNext}>
                        Далее
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Оформление...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Оформить заказ
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky top-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Ваш заказ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cart.items.map((item) => (
                    <div key={item.car.id} className="flex items-center gap-3">
                      <Image
                        src={item.car.image}
                        alt={`${item.car.brand} ${item.car.model}`}
                        className="w-16 h-12 object-cover rounded"
                        width={64}
                        height={48}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">
                          {item.car.brand} {item.car.model}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.car.year} год
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        {formatPrice(item.car.price)}
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Итого:</span>
                      <span>{formatPrice(getCartTotal())}</span>
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
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X,
  ShoppingCart, 
  Car,
  Phone,
  Mail,
  MapPin,
  User,
  LogIn
} from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Главная', href: '/' },
    { name: 'Каталог', href: '/catalog' },
    { name: 'О нас', href: '/about' },
    { name: 'Контакты', href: '/contact' },
  ];

  const contactInfo = [
    { icon: Phone, label: '+7 (999) 123-45-67', href: 'tel:+79991234567' },
    { icon: Mail, label: 'info@carshop.ru', href: 'mailto:info@carshop.ru' },
    { icon: MapPin, label: 'Москва, ул. Тверская, 1', href: '#' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors"
            >
              <Car className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </motion.div>
            <div className="hidden sm:block">
              <div className="text-lg sm:text-xl font-bold text-gray-900">AutoLux</div>
              <div className="text-xs text-gray-600">Премиальные авто</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <User className="h-4 w-4" />
              Профиль
            </Button>
            <Button size="sm" className="gap-2">
              <LogIn className="h-4 w-4" />
              Войти
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
              {/* Navigation Links */}
              <nav className="space-y-3 mb-6">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 py-3 px-4 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Contact Info */}
              <div className="space-y-3 mb-6 pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Контактная информация</h3>
                {contactInfo.map((contact, index) => (
                  <motion.div
                    key={contact.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navigationItems.length + index) * 0.1 }}
                  >
                    <Link
                      href={contact.href}
                      className="flex items-center gap-3 py-2 px-4 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                    >
                      <contact.icon className="h-4 w-4" />
                      <span className="text-sm">{contact.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col gap-3 pt-4 border-t border-gray-200"
              >
                <Button variant="outline" className="w-full gap-2">
                  <User className="h-4 w-4" />
                  Мой профиль
                </Button>
                <Button className="w-full gap-2">
                  <LogIn className="h-4 w-4" />
                  Войти в систему
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header; 
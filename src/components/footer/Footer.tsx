import Link from 'next/link';
import { Car, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Каталог', href: '/catalog' },
    { name: 'О нас', href: '/about' },
    { name: 'Контакты', href: '/contact' },
    { name: 'Условия продажи', href: '/terms' },
  ];

  const carCategories = [
    { name: 'Седаны', href: '/catalog?category=sedan' },
    { name: 'Внедорожники', href: '/catalog?category=suv' },
    { name: 'Хэтчбеки', href: '/catalog?category=hatchback' },
    { name: 'Купе', href: '/catalog?category=coupe' },
  ];

  const supportLinks = [
    { name: 'Гарантия', href: '/warranty' },
    { name: 'Сервис', href: '/service' },
    { name: 'Финансирование', href: '/financing' },
    { name: 'Обмен авто', href: '/trade-in' },
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'YouTube', href: '#', icon: Youtube },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-8 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Car className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">AutoLux</span>
            </Link>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Ведущий дилер премиальных автомобилей с 15-летним опытом работы. 
              Гарантируем качество, надежность и профессиональный сервис.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span className="text-sm">+7 (999) 123-45-67</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span className="text-sm">info@autolux.ru</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  г. Москва, ул. Автомобильная, д. 123
                  <br />
                  Ежедневно: 9:00 - 21:00
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Быстрые ссылки</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Car Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Категории</h3>
            <ul className="space-y-2">
              {carCategories.map((category) => (
                <li key={category.name}>
                  <Link 
                    href={category.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Поддержка</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-6 sm:py-8 border-t border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Подпишитесь на новости</h3>
              <p className="text-gray-400 text-sm">
                Получайте информацию о новых поступлениях и специальных предложениях
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
              <input
                type="email"
                placeholder="Ваш email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button className="px-4 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 text-sm whitespace-nowrap">
                Подписаться
              </button>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="py-4 sm:py-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label={social.name}
              >
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
          
          <div className="text-center md:text-right text-gray-400 text-sm">
            <p>&copy; {currentYear} AutoLux. Все права защищены.</p>
            <div className="flex flex-col sm:flex-row sm:space-x-4 mt-1 space-y-1 sm:space-y-0">
              <Link href="/privacy" className="hover:text-white transition-colors duration-200">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors duration-200">
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
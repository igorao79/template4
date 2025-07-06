import { Car, Testimonial } from '@/types';

export const mockCars: Car[] = [
  {
    id: '1',
    brand: 'BMW',
    model: 'i8 Roadster',
    year: 2019,
    price: 12500000,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop',
    description: 'Гибридный спорткар BMW i8 Roadster 2019 года с революционным дизайном и передовыми технологиями. Сочетает в себе электрический двигатель мощностью 143 л.с. и 3-цилиндровый бензиновый двигатель TwinPower Turbo мощностью 231 л.с.',
    category: 'coupe',
    specifications: {
      engine: '1.5L TwinPower Turbo + электромотор',
      horsepower: 374,
      transmission: 'Автоматическая',
      fuelType: 'Гибрид',
      drivetrain: 'Полный привод',
      seating: 2,
      color: 'Синий Кристал',
      mileage: 15000
    },
    features: [
      'Система eDrive',
      'Карбоновая конструкция',
      'LED-фары Laser',
      'Активная подвеска',
      'Спортивные сиденья',
      'Навигационная система Professional',
      'Харман Кардон аудиосистема',
      'Адаптивный круиз-контроль'
    ],
    model3d: '/template4/models/2019_bmw_i8_roadster.glb',
    isNew: false,
    isAvailable: true,
    tags: ['спорткар', 'гибрид', 'люкс', 'BMW', 'родстер']
  },
  {
    id: '2',
    brand: 'Aston Martin',
    model: 'Valour',
    year: 2024,
    price: 45000000,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop',
    description: 'Эксклюзивный Aston Martin Valour 2024 года - лимитированная серия, вдохновленная классическими гоночными автомобилями. Всего 110 экземпляров в мире. Мощный V12 двигатель и механическая коробка передач.',
    category: 'coupe',
    specifications: {
      engine: '5.2L V12',
      horsepower: 705,
      transmission: 'Механическая 6-ступенчатая',
      fuelType: 'Бензин',
      drivetrain: 'Задний привод',
      seating: 2,
      color: 'Зеленый Британский',
      mileage: 500
    },
    features: [
      'Лимитированная серия (110 экземпляров)',
      'Механическая коробка передач',
      'Карбоновое шасси',
      'Система стабилизации',
      'Кожаный интерьер Bridge of Weir',
      'Адаптивная подвеска',
      'Система активного выхлопа',
      'Историческая ливрея'
    ],
    model3d: '/template4/models/2024_aston_martin_valour.glb',
    isNew: true,
    isAvailable: true,
    tags: ['эксклюзив', 'коллекционный', 'V12', 'Aston Martin', 'лимитированная серия']
  },
  {
    id: '3',
    brand: 'Hennessey',
    model: 'Venom F5 Roadster',
    year: 2023,
    price: 85000000,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop',
    description: 'Hennessey Venom F5 Roadster 2023 - один из самых быстрых открытых суперкаров в мире. Двигатель V8 twin-turbo мощностью 1817 л.с. и максимальная скорость свыше 480 км/ч.',
    category: 'coupe',
    specifications: {
      engine: '6.6L V8 Twin-Turbo',
      horsepower: 1817,
      transmission: 'Автоматическая',
      fuelType: 'Бензин',
      drivetrain: 'Задний привод',
      seating: 2,
      color: 'Черный Карбон',
      mileage: 200
    },
    features: [
      'Рекордная мощность 1817 л.с.',
      'Максимальная скорость 480+ км/ч',
      'Карбоновый монокок',
      'Активная аэродинамика',
      'Система Launch Control',
      'Многорежимная подвеска',
      'Премиальная аудиосистема',
      'Спортивные ковши Sparco'
    ],
    model3d: '/template4/models/2023_hennessey_venom_f5_roadster.glb',
    isNew: true,
    isAvailable: true,
    tags: ['гиперкар', 'рекорд скорости', 'эксклюзив', 'Hennessey', 'родстер']
  },
  {
    id: '4',
    brand: 'Ferrari',
    model: 'Monza SP1',
    year: 2019,
    price: 55000000,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop',
    description: 'Ferrari Monza SP1 2019 - однополосный спидстер, вдохновленный гоночными автомобилями Ferrari 750 Monza и 860 Monza. Часть лимитированной серии Icona с естественно аспирируемым V12.',
    category: 'coupe',
    specifications: {
      engine: '6.5L V12',
      horsepower: 810,
      transmission: 'Автоматическая',
      fuelType: 'Бензин',
      drivetrain: 'Задний привод',
      seating: 1,
      color: 'Красный Росса',
      mileage: 800
    },
    features: [
      'Однополосный спидстер',
      'Лимитированная серия Icona',
      'Естественно аспирируемый V12',
      'Карбоновое шасси',
      'Система Side Slip Control',
      'Адаптивная подвеска',
      'Виртуальная ветрозащита',
      'Эксклюзивный дизайн'
    ],
    model3d: '/template4/models/2019_ferrari_monza_sp1.glb',
    isNew: false,
    isAvailable: true,
    tags: ['спидстер', 'лимитированная серия', 'V12', 'Ferrari', 'коллекционный']
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Александр Петров',
    avatar: '/avatars/user1.jpg',
    rating: 5,
    comment: 'Невероятный BMW i8 Roadster! Технологии будущего уже сегодня. Гибридная система работает безупречно.',
    date: new Date('2023-11-15'),
    carPurchased: 'BMW i8 Roadster',
  },
  {
    id: '2',
    name: 'Мария Иванова',
    avatar: '/avatars/user2.jpg',
    rating: 5,
    comment: 'Aston Martin Valour - это произведение искусства! Эксклюзивность и мощь в одном автомобиле.',
    date: new Date('2023-10-28'),
    carPurchased: 'Aston Martin Valour',
  },
  {
    id: '3',
    name: 'Дмитрий Сидоров',
    avatar: '/avatars/user3.jpg',
    rating: 5,
    comment: 'Hennessey Venom F5 - это просто космос! Мощность, которую сложно описать словами.',
    date: new Date('2023-12-02'),
    carPurchased: 'Hennessey Venom F5 Roadster',
  },
  {
    id: '4',
    name: 'Сергей Волков',
    avatar: '/avatars/user4.jpg',
    rating: 5,
    comment: 'Ferrari Monza SP1 - мечта всей жизни! Однополосный спидстер с душой гоночного автомобиля.',
    date: new Date('2023-09-18'),
    carPurchased: 'Ferrari Monza SP1',
  }
];

export const getRandomCars = (count: number): Car[] => {
  const shuffled = [...mockCars].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getCarById = (id: string): Car | undefined => {
  return mockCars.find(car => car.id === id);
};

export const getCarsByCategory = (category: string): Car[] => {
  return mockCars.filter(car => car.category === category);
};

export const getCarsByBrand = (brand: string): Car[] => {
  return mockCars.filter(car => car.brand.toLowerCase() === brand.toLowerCase());
};

export const searchCars = (query: string): Car[] => {
  const lowerQuery = query.toLowerCase();
  return mockCars.filter(car => 
    car.brand.toLowerCase().includes(lowerQuery) ||
    car.model.toLowerCase().includes(lowerQuery) ||
    car.description.toLowerCase().includes(lowerQuery) ||
    car.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}; 
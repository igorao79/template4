export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  image: string;
  description: string;
  features: string[];
  specifications: {
    engine: string;
    horsepower: number;
    transmission: string;
    fuelType: string;
    drivetrain: string;
    seating: number;
    color: string;
    mileage: number;
  };
  model3d?: string; // путь к 3D модели
  isNew: boolean;
  isAvailable: boolean;
  category: 'sedan' | 'suv' | 'hatchback' | 'coupe' | 'convertible' | 'truck';
  tags: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  address?: string;
  isAuthenticated: boolean;
}

export interface CartItem {
  car: Car;
  quantity: number;
  options?: {
    color?: string;
    package?: string;
    accessories?: string[];
  };
}

export interface Cart {
  items: CartItem[];
  total: number;
  discount: number;
  tax: number;
  grandTotal: number;
}

export interface Review {
  id: string;
  carId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
  helpful: number;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: Date;
  carPurchased: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  carId?: string;
}

export interface FilterOptions {
  brand?: string[];
  priceRange?: [number, number];
  year?: [number, number];
  category?: string[];
  fuelType?: string[];
  isNew?: boolean;
  sortBy?: 'price' | 'year' | 'brand' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchFilters {
  query: string;
  filters: FilterOptions;
  page: number;
  limit: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
} 
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import PageLoader from '@/components/layout/PageLoader';

interface PageLoaderContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isPageReady: boolean;
}

const PageLoaderContext = createContext<PageLoaderContextType | undefined>(undefined);

export const usePageLoader = () => {
  const context = useContext(PageLoaderContext);
  if (!context) {
    // Возвращаем значения по умолчанию для статического экспорта
    return {
      isLoading: false,
      setIsLoading: () => {},
      isPageReady: true,
    };
  }
  return context;
};

interface PageLoaderProviderProps {
  children: React.ReactNode;
}

export const PageLoaderProvider: React.FC<PageLoaderProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPageReady, setIsPageReady] = useState(true); // Изменено на true для статического экспорта
  const pathname = usePathname();

  useEffect(() => {
    // Проверяем, выполняется ли код в браузере
    if (typeof window === 'undefined') {
      return;
    }
    
    // Показываем лоадер при смене маршрута
    setIsLoading(true);
    setIsPageReady(false);
    
    // Убираем лоадер через задержку
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Дополнительная задержка перед разрешением анимаций
      setTimeout(() => {
        setIsPageReady(true);
      }, 200);
    }, 300); // Уменьшено обратно до 300мс

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <PageLoaderContext.Provider value={{ isLoading, setIsLoading, isPageReady }}>
      <PageLoader isLoading={isLoading} />
      {children}
    </PageLoaderContext.Provider>
  );
}; 
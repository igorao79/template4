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
    throw new Error('usePageLoader must be used within a PageLoaderProvider');
  }
  return context;
};

interface PageLoaderProviderProps {
  children: React.ReactNode;
}

export const PageLoaderProvider: React.FC<PageLoaderProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPageReady, setIsPageReady] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Показываем лоадер при смене маршрута
    setIsLoading(true);
    setIsPageReady(false);
    
    // Убираем лоадер через увеличенную задержку
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Дополнительная задержка перед разрешением анимаций
      setTimeout(() => {
        setIsPageReady(true);
      }, 200);
    }, 800); // Увеличено с 300 до 800мс

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <PageLoaderContext.Provider value={{ isLoading, setIsLoading, isPageReady }}>
      <PageLoader isLoading={isLoading} />
      {children}
    </PageLoaderContext.Provider>
  );
}; 
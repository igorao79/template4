import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: { name: string; email: string; password: string }) => Promise<boolean>;
  logout: () => void;
}

// Простая симуляция базы данных пользователей
const usersDatabase: Array<{ id: string; name: string; email: string; password: string }> = [
  { id: '1', name: 'Иван Иванов', email: 'ivan@example.com', password: '123456' },
  { id: '2', name: 'Петр Петров', email: 'petr@example.com', password: '123456' },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Симуляция запроса к серверу
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = usersDatabase.find(u => u.email === email && u.password === password);
        
        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          set({ 
            user: userWithoutPassword, 
            isAuthenticated: true, 
            isLoading: false 
          });
          return true;
        } else {
          set({ isLoading: false });
          return false;
        }
      },
      
      register: async (userData: { name: string; email: string; password: string }) => {
        set({ isLoading: true });
        
        // Симуляция запроса к серверу
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Проверяем, не существует ли уже пользователь с таким email
        const existingUser = usersDatabase.find(u => u.email === userData.email);
        
        if (existingUser) {
          set({ isLoading: false });
          return false;
        }
        
        // Создаем нового пользователя
        const newUser = {
          id: Date.now().toString(),
          name: userData.name,
          email: userData.email,
          password: userData.password
        };
        
        usersDatabase.push(newUser);
        
        const { password: _, ...userWithoutPassword } = newUser;
        set({ 
          user: userWithoutPassword, 
          isAuthenticated: true, 
          isLoading: false 
        });
        
        return true;
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
); 
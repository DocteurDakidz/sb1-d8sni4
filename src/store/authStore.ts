import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Simuler une API - À remplacer par votre vraie API
        const mockUsers = {
          'user@example.com': {
            id: '1',
            email: 'user@example.com',
            name: 'John Doe',
            role: 'user' as UserRole,
            password: 'user123'
          },
          'admin@example.com': {
            id: '2',
            email: 'admin@example.com',
            name: 'Admin User',
            role: 'admin' as UserRole,
            password: 'admin123'
          }
        };

        const mockUser = mockUsers[email];
        
        if (!mockUser || mockUser.password !== password) {
          throw new Error('Identifiants invalides');
        }

        const { password: _, ...userWithoutPassword } = mockUser;
        
        set({
          user: userWithoutPassword,
          isAuthenticated: true
        });
      },
      logout: () => {
        set({
          user: null,
          isAuthenticated: false
        });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getMe } from '@/lib/api';



interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  sessionValidated: boolean; 
  login: (user: User) => void;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
  clearAuth: () => void;
}

const logError = (message: string, error?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(message, error);
  } else {
    console.warn('Authentication process encountered an issue');
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isInitialized: false,
      sessionValidated: false,

      logout: async () => {
        set({ isLoading: true });

        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            throw new Error(`Logout failed: ${response.status}`);
          }
        } catch (error) {
          logError('Logout API call failed', error);
        }

        get().clearAuth();
        set({ isLoading: false });
      },

      initializeAuth: async () => {
        const state = get();
        
        if (state.isInitialized) {
          return;
        }

        set({ isLoading: true });

        try {
        
          const response = await getMe();
          
          if (response && response.data && response.data.user) {
           
            set({
              user: response.data.user,
              isAuthenticated: true,
              isInitialized: true,
              sessionValidated: true,
              isLoading: false,
            });
          } else {
            throw new Error("Invalid session response");
          }
        } catch (error) {
          logError('Auth initialization failed', error);
          
          
          set({
            user: null,
            isAuthenticated: false,
            isInitialized: true,
            sessionValidated: false,
            isLoading: false,
          });
        }
      },

      login: (user) => {
        set({
          user: user,
          isAuthenticated: true,
          isInitialized: true,
          sessionValidated: true, // Mark as validated since we just logged in
        });
      },

      clearAuth: () => {
        set({
          user: null,
          isAuthenticated: false,
          isInitialized: true,
          sessionValidated: false,
          isLoading: false,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);


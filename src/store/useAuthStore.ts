import { create } from 'zustand';
import Cookies from 'js-cookie';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  initializeAuth: () => void;
  setUser: (user: User) => void;
  checkAuthStatus: () => void;
  clearAuthState: () => void; 
}

const COOKIE_OPTIONS = {
  expires: 7,
  path: '/',
  sameSite: 'lax' as const
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,

  login: (user) => {
    console.log('🔐 Login called with user:', user);
    
    // Clean user data (remove sensitive fields)
    const cleanUser = {
      id: user.id,
      name: user.name,
      email: user.email
    };
    
    // Store user data in accessible cookie (token is httpOnly)
    Cookies.set('user', JSON.stringify(cleanUser), COOKIE_OPTIONS);
    Cookies.set('isAuthenticated', 'true', COOKIE_OPTIONS);
    
    set({ user: cleanUser, isAuthenticated: true });
  },

  logout: async () => {
    console.log('🚪 Logout called');
    
    try {
      await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/auth/api/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout API call failed:', error);
    }
    
    // Clear state and cookies
    get().clearAuthState();
  },

  clearAuthState: () => {
   
    Cookies.remove('user', { path: '/' });
    Cookies.remove('token', { path: '/' });
    Cookies.remove('isAuthenticated', { path: '/' });
    
    // Clear state
    set({ user: null, isAuthenticated: false });
  },

  initializeAuth: () => {
    console.log('🔍 Initializing auth...');
    const userCookie = Cookies.get('user');
    const isAuthCookie = Cookies.get('isAuthenticated');
    
    console.log('🍪 User from cookie:', userCookie ? 'Present' : 'Missing');
    console.log('🍪 Auth status from cookie:', isAuthCookie);

    if (userCookie && isAuthCookie === 'true') {
      try {
        const user = JSON.parse(userCookie);
        console.log('✅ Restoring auth state from cookies');
        set({ user, isAuthenticated: true });
      } catch (err) {
        console.error('❌ Failed to parse user cookie:', err);
        get().clearAuthState();
      }
    } else {
      console.log('❌ No valid auth data found in cookies');
      set({ user: null, isAuthenticated: false });
    }
  },

  setUser: (user) => {
    const cleanUser = {
      id: user.id,
      name: user.name,
      email: user.email
    };
    
    // Update cookie and state
    Cookies.set('user', JSON.stringify(cleanUser), COOKIE_OPTIONS);
    set({ user: cleanUser });
  },

  checkAuthStatus: async () => {
    console.log('🔍 Checking auth status...');
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/auth/verify-token`, {
        method: 'GET',
        credentials: 'include'
      });
      
      if (!response.ok) {
        console.log('🔒 Token verification failed, status:', response.status);
        get().clearAuthState();
        return;
      }
      
      const data = await response.json();
      
      if (data.user) {
        console.log('✅ Token valid, updating user data');
        const cleanUser = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email
        };
        
        set({ user: cleanUser, isAuthenticated: true });
      } else {
        console.log('❌ No user data in verification response');
        get().clearAuthState();
      }
    } catch (error) {
      console.error('❌ Auth status check failed:', error);
      get().clearAuthState();
    }
  },
}));
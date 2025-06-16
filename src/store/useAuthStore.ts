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
}

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
    const cookieOptions = { 
      expires: 7,
      path: '/',
      sameSite: 'lax' as const
    };
    
    Cookies.set('user', JSON.stringify(cleanUser), cookieOptions);
    Cookies.set('isAuthenticated', 'true', cookieOptions);
    
    set({ user: cleanUser, isAuthenticated: true });
  },

  logout: async () => {
    console.log('🚪 Logout called');
    
    try {
      // Call backend logout to clear httpOnly cookie
      await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/auth/api/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout API call failed:', error);
    }
    
    // Clear accessible cookies
    Cookies.remove('user', { path: '/' });
    Cookies.remove('token');
    Cookies.remove('isAuthenticated', { path: '/' });
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
        get().logout();
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
    Cookies.set('user', JSON.stringify(cleanUser), { expires: 7, path: '/' });
    set({ user: cleanUser });
  },

  checkAuthStatus: async () => {
    // Verify with backend that the httpOnly token is still valid
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/verify-token`, {
        method: 'GET',
        credentials: 'include' // Include httpOnly cookies
      });
      
      if (!response.ok) {
        console.log('🔒 Token verification failed');
        get().logout();
        return;
      }
      
      const data = await response.json();
      if (data.user) {
        get().login(data.user);
      }
    } catch (error) {
      console.error('Auth status check failed:', error);
      get().logout();
    }
  },
}));
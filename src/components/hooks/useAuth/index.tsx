import { create } from 'zustand';
import Cookies from 'js-cookie';

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: (token) => {
    Cookies.set('token', token);
    set({ isAuthenticated: true });
  },
  logout: () => {
    Cookies.remove('token');
    set({ isAuthenticated: false, user: null });
  },
  setUser: (user) => set({ user: user }),
  setLoading: () => set({ isLoading: true }),
  stopLoading: () => set({ isLoading: false })
}));

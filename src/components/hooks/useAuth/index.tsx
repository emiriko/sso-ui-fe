import { create } from 'zustand';
import Cookies from 'js-cookie';

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: (accessToken, refreshToken, user) => {
    Cookies.set('accessToken', accessToken);
    Cookies.set('refreshToken', refreshToken);
    set({ isAuthenticated: true, user: user });
  },
  logout: () => {
    Cookies.remove('accessToken');
    set({ isAuthenticated: false, user: null });
  },
  setUser: (user) => set({ user: user }),
  setLoading: () => set({ isLoading: true }),
  stopLoading: () => set({ isLoading: false })
}));

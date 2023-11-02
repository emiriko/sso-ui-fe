interface LoginResponse {
  token: string;
}

interface User {
  email: string;
  full_name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setLoading: () => void;
  stopLoading: () => void;
}

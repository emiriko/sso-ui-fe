interface LoginResponse {
  token: string;
}

interface AuthState {
  user: UserProps | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessToken: string, refreshToken: string, user: UserProps) => void;
  logout: () => void;
  setUser: (user: UserProps | null) => void;
  setLoading: () => void;
  stopLoading: () => void;
}

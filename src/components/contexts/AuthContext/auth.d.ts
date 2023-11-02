interface UserProps {
  email: string;
  full_name: string;
  isAnggotaBem: boolean;
  is_staff: boolean;
  username: string;
}

interface LoginResponse {
  token: string;
  user: UserProps;
}

interface AuthContextProps {}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

interface UserProps {
  id: string;
  name: string;
  educational_program: string;
  faculty: string;
  npm: string;
  study_program: string;
  username: string;
}

interface LoginResponse {
  refreshToken: string;
  accessToken: string;
  user: UserProps;
}

interface AuthContextProps {}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

import React, { createContext, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/hooks';
import { api } from '@/components/utils';

const AuthContext = createContext({} as AuthContextProps); // TODO: Declare interface of contextValue

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children
}) => {
  // TODO: Write context's logic

  const contextValue = {};
  const { setLoading, setUser, stopLoading, isAuthenticated, logout, login } =
    useAuth();
  const router = useRouter();

  const checkAuth = React.useCallback(() => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');

    if (!accessToken && !refreshToken) {
      isAuthenticated && logout();
      stopLoading();
      return;
    }

    const loadUser = async () => {
      try {
        const res = await api.get<UserProps>('/auth/profile/');
        login(accessToken as string, refreshToken as string, res.data);
      } catch (err) {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        setUser(null);
      } finally {
        stopLoading();
      }
    };

    if (!isAuthenticated) {
      loadUser();
    }
  }, [isAuthenticated, login, logout, stopLoading]);

  const SSOLogin = async (ticket: string) => {
    try {
      setLoading();
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      const res = await api<LoginResponse>({
        method: 'POST',
        url: `/auth/login/`,
        data: { ticket }
      });
      console.log(res);
      const { accessToken, refreshToken, user } = res.data;
      setUser(user);
      Cookies.remove('ticket');
      Cookies.set('accessToken', accessToken);
      Cookies.set('refreshToken', refreshToken);
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 500) {
        Cookies.remove('ticket');
      }
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    if (router.asPath.includes('ticket')) {
      const ticket = router.asPath.split('?ticket=')[1];
      Cookies.remove('ticket');

      Cookies.set('ticket', ticket);
      router.push('/');
    } else if (Cookies.get('ticket')) {
      const ticket = Cookies.get('ticket') as string;
      SSOLogin(ticket);
    } else if (Cookies.get('accessToken')) {
      checkAuth();
    }
  }, [router.asPath]);

  return (
    <AuthContext.Provider value={contextValue}>
      {' '}
      {children}{' '}
    </AuthContext.Provider>
  );
};

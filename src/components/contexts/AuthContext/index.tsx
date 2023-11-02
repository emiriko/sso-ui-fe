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
  const { setLoading, setUser, stopLoading } = useAuth();
  const router = useRouter();

  const login = async (ticket: string) => {
    try {
      setLoading();
      const res = await api<LoginResponse>({
        method: 'POST',
        url: `/auth/login/`,
        data: { ticket }
      });
      console.log(res);
      const user = res.data.user;
      const token = res.data.token;
      setUser(user);
      Cookies.remove('ticket');
      Cookies.set('token', token, { expires: 1 });
    } catch (error: any) {
      console.log(error);
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
      login(ticket);
    }
  }, [router.asPath]);

  return (
    <AuthContext.Provider value={contextValue}>
      {' '}
      {children}{' '}
    </AuthContext.Provider>
  );
};

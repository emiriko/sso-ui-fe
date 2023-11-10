import axios, { InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { validateJwtExp } from '../validateAccessToken';

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const api = axios.create({
  withCredentials: false
});

const requestInterceptor = async (request: InternalAxiosRequestConfig<any>) => {
  let token;

  token = Cookies.get('accessToken');
  if (token) {
    const accessToken = validateJwtExp(token);

    if (accessToken.hasError) {
      throw new Error();
    }

    if (accessToken.isExpired) {
      const refreshToken = Cookies.get('refreshToken');

      try {
        const { data } = await axios<AccessTokenInterface>({
          method: 'POST',
          url: '/auth/refresh/',
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
          withCredentials: true
        });
        Cookies.set('accessToken', data.accessToken);
        token = data.accessToken;
      } catch (error) {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        console.error(error);
      }
    }

    request.headers['Authorization'] = `Bearer ${token}`;
  }
  request.headers['Content-Type'] = 'application/json';
  request.withCredentials = true;

  return request;
};

api.interceptors.request.use(
  (request) => requestInterceptor(request),
  (error) => {
    console.error(error.response);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error && error.response) {
      if (
        error.response.status === 403 ||
        error.response.data.message === 'Token is expired'
      ) {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        console.error(error);
      }
      return Promise.reject(error);
    } else {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

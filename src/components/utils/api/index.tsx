import axios, { InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const api = axios.create({
  withCredentials: false
});

const requestInterceptor = async (request: InternalAxiosRequestConfig<any>) => {
  const token = Cookies.get('token');
  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`;
  }
  request.headers['Content-Type'] = 'application/json';
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
        Cookies.remove('token');
        console.error(error);
      }
      return Promise.reject(error);
    } else {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

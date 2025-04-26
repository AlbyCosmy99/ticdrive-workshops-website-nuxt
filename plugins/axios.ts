import axios from 'axios';
import useAuthStore from '~/store/auth';
import type {AxiosInstance} from 'axios';

export default defineNuxtPlugin(nuxtApp => {
  const ticDriveAxios: AxiosInstance = axios.create({
    baseURL: 'https://ticdrivebackend.onrender.com/api/',
  });

  ticDriveAxios.interceptors.request.use(config => {
    const auth = useAuthStore();
    if (auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
  });

  ticDriveAxios.interceptors.response.use(
    response => {
      console.log('[TicDrive Response]', response.status, response.config.url);
      return response;
    },
    error => {
      console.error(
        '[TicDrive Response Error]',
        error.response?.status,
        error.response?.data,
      );
      return Promise.reject(error);
    },
  );

  nuxtApp.provide('ticDriveAxios', ticDriveAxios);
});

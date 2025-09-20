import axios from 'axios';
import useAuthStore from '~/store/auth';
import type {AxiosInstance} from 'axios';

export default defineNuxtPlugin(nuxtApp => {
  const ticDriveAxios: AxiosInstance = axios.create({
    baseURL: 'https://ticdrive-backend-net-core-8-production.up.railway.app/api/',
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
      const status = error.response?.status;

      if (status === 401 || status === 403) {
        const auth = useAuthStore();
        auth.token = null;
        localStorage.removeItem('token');

        navigateTo('/auth/login');
      }

      console.error('[TicDrive Response Error]', status, error.response?.data);
      return Promise.reject(error);
    },
  );

  nuxtApp.provide('ticDriveAxios', ticDriveAxios);
});

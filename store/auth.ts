import {defineStore} from 'pinia';
import useUserData from '~/composables/http/auth/getUserData';
import type {User} from '~/types/auth/User';

interface AuthState {
  user: User | null;
  token: string | null;
}

const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
  }),

  actions: {
    async login(email: string, password: string): Promise<void> {
      const $ticDriveAxios = useTicDriveAxios();
      const res = await $ticDriveAxios.post('auth/login', {
        email,
        password,
        userType: 2,
      });

      if (!res?.data) {
        throw new Error('No data received from login API');
      }

      localStorage.setItem('token', res.data.token);

      this.token = res.data.token;

      const data = await useUserData();
      this.user = data;
    },

    logout() {
      this.user = null;
      this.token = null;
    },
  },
});

export default useAuthStore;

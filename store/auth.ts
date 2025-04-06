import {defineStore} from 'pinia';

interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
}

const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as LoginResponse['user'] | null,
    token: null as string | null,
  }),
  actions: {
    async login(email: string, password: string) {
      const {data, error} = await useFetch<LoginResponse>(
        'https://ticdrive.azurewebsites.net/api/auth/login',
        {
          method: 'POST',
          body: {email, password},
        },
      );

      if (error.value) {
        throw new Error(error.value.message || 'Login failed');
      }

      if (data.value) {
        this.user = data.value.user;
        this.token = data.value.token;
      }
    },
  },
});

export default useAuthStore;

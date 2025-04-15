import axios from 'axios';
import {defineStore} from 'pinia';

interface User {
  id: number;
  name: string;
  email: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

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
      try {
        const res = await axios.post(
          'https://ticdrivebackend.onrender.com/api/auth/login',
          {
            email,
            password,
            userType: 2,
          },
        );
        localStorage.setItem('token', res.data.token);

        if (!res?.data) {
          throw new Error('No data received from login API');
        }

        this.user = res.data.user;
        this.token = res.data.token;
      } catch (err) {
        console.error('Login error:', err);
        throw err;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
    },
  },
});

export default useAuthStore;

import {defineStore} from 'pinia';

const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(user: any) {
      this.user = user;
    },
  },
  getters: {
    isAuthenticated: state => !!state.user,
  },
});

export default useAuthStore;

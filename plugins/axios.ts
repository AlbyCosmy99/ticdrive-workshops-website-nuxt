import axios from 'axios';

export default defineNuxtPlugin(() => {
  const instance = axios.create({
    baseURL: 'https://ticdrivebackend.onrender.com/',
  });

  return {
    provide: {
      axios: instance,
    },
  };
});

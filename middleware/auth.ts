export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.server) return;

  const token = localStorage.getItem('token');

  if (!token) {
    return navigateTo('/auth/login');
  }

  try {
    const {valid} = await $fetch('/valid-token', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!valid) {
      return navigateTo('/auth/login');
    }

    if (to.path === '/auth/login' || to.path === '/') {
      return navigateTo('/dashboard');
    }
  } catch (error) {
    return navigateTo('/auth/login');
  }
});

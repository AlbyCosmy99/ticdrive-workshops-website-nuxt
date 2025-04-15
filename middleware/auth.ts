export default defineNuxtRouteMiddleware(to => {
  if (import.meta.server) return;

  const token = localStorage.getItem('token');

  if (to.path === '/') {
    return token ? navigateTo('/dashboard') : navigateTo('/auth/login');
  }

  if (!token && to.path !== '/auth/login') {
    return navigateTo('/auth/login');
  }

  if (token && to.path === '/auth/login') {
    return navigateTo('/dashboard');
  }
});

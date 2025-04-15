export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return;

  const token = localStorage.getItem('token');

  if (!token) {
    return navigateTo('/auth/login');
  }

  // TODO: API call to verify token validity
  return navigateTo('/dashboard');
});

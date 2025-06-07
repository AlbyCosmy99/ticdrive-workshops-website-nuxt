<script setup lang="ts">
import Toast from 'primevue/toast';
import Footer from '~/components/Footer.vue';
import Navbar from '~/components/navbar/Navbar.vue';
import Sidebar from '~/components/sidebar/Sidebar.vue';
import useUserData from '~/composables/http/auth/useUserData';
import useAuthStore from '~/store/auth';

const loading = ref(true);

const authStore = useAuthStore();

//initial configurations on reserved area setup
onMounted(async () => {
  console.log(authStore.user);
  try {
    const token = localStorage.getItem('token');
    authStore.token = token;
    authStore.user = await useUserData();

    if (!authStore.user?.emailConfirmed) {
      navigateTo('/auth/confirm-email');
    }
  } catch (e) {
    localStorage.removeItem('token');
    navigateTo('/auth/login');
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div
    v-if="loading || authStore.loading"
    class="flex w-full min-h-screen justify-center items-center bg-white"
  >
    <UiSpinnersTicDriveSpinner />
  </div>

  <div v-else class="flex flex-col">
    <div class="flex min-h-screen bg-gray-50 relative">
      <Toast />
      <aside class="w-64 p-4 fixed h-screen">
        <Sidebar />
      </aside>
      <main class="flex-1 p-4 ml-64">
        <Navbar />
        <div class="mt-6">
          <NuxtPage />
        </div>
      </main>
    </div>
    <Footer />
  </div>
</template>

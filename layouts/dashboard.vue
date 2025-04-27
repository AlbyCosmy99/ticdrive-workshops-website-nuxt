<script setup lang="ts">
import Navbar from '~/components/navbar/Navbar.vue';
import Sidebar from '~/components/sidebar/Sidebar.vue';
import useUserData from '~/composables/http/auth/getUserData';
import useAuthStore from '~/store/auth';

const loading = ref(true);

const authStore = useAuthStore();

//initial configurations on reserved area setup
onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    authStore.token = token;
    authStore.user = await useUserData();

  } catch(e) {
    localStorage.removeItem('token')
    navigateTo('/auth/login')
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <UiSpinnersTicDriveSpinner v-if="loading" />
  <div v-else class="flex min-h-screen bg-gray-50">
    <aside class="w-64 p-4">
      <Sidebar />
    </aside>
    <main class="flex-1 p-4">
      <Navbar />
      <div class="mt-6">
        <NuxtPage />
      </div>
    </main>
  </div>
</template>

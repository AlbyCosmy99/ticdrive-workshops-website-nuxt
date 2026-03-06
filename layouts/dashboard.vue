<script setup lang="ts">
import Toast from 'primevue/toast';
import Footer from '~/components/Footer.vue';
import Navbar from '~/components/navbar/Navbar.vue';
import Sidebar from '~/components/sidebar/Sidebar.vue';
import useUserData from '~/composables/http/auth/useUserData';
import useAuthStore from '~/store/auth';

const loading = ref(true);
const isSidebarOpen = ref(false);

const authStore = useAuthStore();
const route = useRoute();

watch(
  () => route.fullPath,
  () => {
    isSidebarOpen.value = false;
  },
);

onMounted(async () => {
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

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};
</script>

<template>
  <div
    v-if="loading || authStore.loading"
    class="flex w-full min-h-screen justify-center items-center bg-white"
  >
    <UiSpinnersTicDriveSpinner />
  </div>

  <div v-else class="min-h-screen bg-gray-50">
    <Toast />
    <div class="lg:flex lg:min-h-screen">
      <div
        v-if="isSidebarOpen"
        class="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[1px] lg:hidden"
        @click="closeSidebar"
      ></div>

      <aside
        class="fixed inset-y-0 left-0 z-50 w-72 p-3 transition-transform duration-200 ease-out lg:translate-x-0"
        :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <Sidebar />
      </aside>

      <main class="flex min-h-screen flex-1 flex-col lg:pl-72">
        <div class="px-4 pt-4 sm:px-6 lg:px-8">
          <Navbar @toggle-sidebar="toggleSidebar" />
        </div>

        <div class="flex-1 px-4 pb-8 pt-6 sm:px-6 lg:px-8">
          <div class="mx-auto w-full max-w-7xl">
            <NuxtPage />
          </div>
        </div>

        <Footer />
      </main>
    </div>
  </div>
</template>

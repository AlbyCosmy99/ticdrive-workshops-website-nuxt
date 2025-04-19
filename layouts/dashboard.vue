<script setup lang="ts">
import Sidebar from '~/components/dashboard/sidebar/Sidebar.vue';
import Navbar from '~/components/dashboard/navbar/Navbar.vue';

</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <aside class="w-64 p-4">
      <Sidebar />
    </aside>
    <main class="flex-1 p-6">
      <Navbar />
      <div class="mt-6">
        <NuxtPage />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from '~/components/navbar/Navbar.vue';
import Sidebar from '~/components/sidebar/Sidebar.vue';
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
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

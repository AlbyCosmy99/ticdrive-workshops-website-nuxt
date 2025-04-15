<template>
  <div class="flex w-full min-h-screen justify-center items-center bg-white">
    <div class="flex items-center space-x-4">
      <div
        class="w-6 h-6 border-4 border-drive border-dashed rounded-full animate-spin"
      ></div>
      <p class="text-drive font-semibold text-lg">Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});
</script>

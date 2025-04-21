<template>
  <button
    class="relative w-[48px] h-[48px] rounded-full flex items-center justify-center transition-colors border-2 border-white shadow-md shadow-gray-500/40 hover:shadow-lg"
  >
    <img :src="image" :alt="alt" class="w-6 h-6" />
    <div
      class="w-[8px] h-[8px] bg-red-500 rounded-full absolute translate-x-[6px] -translate-y-[6px]"
    ></div>
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  image: string;
  alt: string;
}>();
</script>

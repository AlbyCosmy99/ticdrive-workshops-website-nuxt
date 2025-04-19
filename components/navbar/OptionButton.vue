<template>
  <button
    class="relative w-[48px] h-[48px] rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors border-2 border-white shadow-sm"
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

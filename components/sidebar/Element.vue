<template>
  <div class="relative">
    <div
      class="absolute top-1/2 -translate-y-1/2 -left-4 w-1 h-13 bg-drive transition-all rounded-r-md"
      :class="selected ? 'opacity-100' : 'opacity-0'"
    ></div>
    <button
      @click="$router.push(path)"
      :class="[
        'cursor-pointer font-medium text-base flex items-center w-full py-3 px-4 rounded-md text-black transition-colors group',
        selected && 'bg-drive text-white',
      ]"
    >
      <div class="w-8 mr-3 flex items-center justify-center">
        <slot name="icon" />
      </div>
      <span class="text-sm font-medium">{{ title }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  path: string;
  selected: boolean;
}>();
</script>

<template>
  <div class="relative">
    <div
      class="absolute inset-y-2 -left-3 w-1 rounded-r-md bg-drive transition-all"
      :class="selected ? 'opacity-100' : 'opacity-0'"
    ></div>
    <button
      @click="$router.push(path)"
      :class="[
        'group flex min-h-[52px] w-full cursor-pointer items-center rounded-xl px-4 py-3 text-left text-base font-medium text-gray-700 transition-all',
        selected
          ? 'bg-drive text-white shadow-sm'
          : 'hover:bg-gray-50 hover:text-gray-900',
      ]"
    >
      <div class="mr-3 flex w-8 items-center justify-center">
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

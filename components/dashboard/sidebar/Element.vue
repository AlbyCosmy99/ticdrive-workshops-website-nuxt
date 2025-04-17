<template>
  <div class="relative">
    <div
      class="absolute top-1/2 -translate-y-1/2 -left-4 w-1 h-13 bg-drive transition-all rounded-r-md"
      :class="currentRoute === path ? 'opacity-100' : 'opacity-0'"
    ></div>
    <button
      @click="$router.push(path)"
      :class="['cursor-pointer font-medium text-base flex items-center w-full py-3 px-4 rounded-md text-black transition-colors group', currentRoute === path && 'bg-drive text-white']"
    >
      <div class="w-6 h-6 mr-3 flex items-center justify-center text-green-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          :fill="currentRoute === path ? 'white' : driveColor"
        >
          <path
            d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      </div>
      <span class="text-sm font-medium">{{ title }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { driveColor } from '~/constants/colors';

defineProps<{
  title: string
  path: string
}>()

const route = useRoute()
const currentRoute = computed(() => route.path)
</script>

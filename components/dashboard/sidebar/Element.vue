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
      <div class="w-6 h-6 mr-3 flex items-center justify-center">
        <img
          :src="iconPath"
          alt="Menu icon"
          class="h-5 w-5"
          :class="currentRoute === path ? 'brightness-0 invert' : path === '/dashboard' && iconPath === '/images/Vector(1).png' ? 'filter-green' : ''"
        />
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
  iconPath?: string
}>()

const route = useRoute()
const currentRoute = computed(() => route.path)
</script>

<style scoped>
.filter-green {
  filter: invert(57%) sepia(78%) saturate(410%) hue-rotate(116deg) brightness(92%) contrast(88%);
}
</style>

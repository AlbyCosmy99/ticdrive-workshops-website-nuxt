<template>
  <button
    class="flex text-white bg-[#39b269] px-4 py-2 rounded-md flex gap-2 items-center justify-center"
    @click="emit('onClick')"
  >
    <h6>{{ text || 'Vedi tutto' }}</h6>
    <RightArrowIcon />
  </button>
</template>

<script lang="ts" setup>
import RightArrowIcon from '@/public/svg/directions/RightArrow.svg';

const emit = defineEmits(['onClick']);

const props = defineProps<{text: string}>()
</script>

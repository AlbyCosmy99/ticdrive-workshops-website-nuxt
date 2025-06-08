<template>
  <button
    class="flex text-white bg-[#39b269] px-4 py-2 rounded-md flex gap-2 items-center justify-center"
    @click="emit('onClick')"
  >
    <h6>{{ content }}</h6>
    <RightArrowIcon />
  </button>
</template>

<script lang="ts" setup>
import RightArrowIcon from '@/public/svg/directions/RightArrow.svg';

defineProps<{
  content: string;
}>();

const emit = defineEmits(['onClick']);
</script>

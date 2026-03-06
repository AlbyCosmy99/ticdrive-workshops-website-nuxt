<template>
  <button
    class="flex items-center justify-center gap-2 rounded-md bg-[#39b269] px-4 py-2 text-white transition hover:bg-[#2f9a59]"
    @click="emit('onClick')"
  >
    <h6>Vedi tutto</h6>
    <RightArrowIcon />
  </button>
</template>

<script lang="ts" setup>
import RightArrowIcon from '@/public/svg/directions/RightArrow.svg';

const emit = defineEmits(['onClick']);
</script>

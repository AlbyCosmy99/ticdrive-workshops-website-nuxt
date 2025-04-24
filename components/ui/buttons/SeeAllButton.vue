<template>
  <button class="flex gap-2 items-center justify-center" @click="emit('onClick')">
    <h6>Vedi tutto</h6>
    <RightArrowIcon />
  </button>
</template>

<script lang="ts" setup>
import RightArrowIcon from '@/public/svg/directions/RightArrow.svg'

const emit = defineEmits(['onClick'])
</script>

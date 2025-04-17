<template>
  <button
    :disabled="disable"
    :class="[
      'cursor-pointer rounded-full py-3 px-6 text-white text-center text-lg transition duration-200 ease-in-out hover:opacity-80 active:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed',
      colorClasses,
      customClass,
    ]"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import {computed} from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'standard',
  },
  size: {
    type: String,
    default: 'standard',
  },
  color: {
    type: String,
    default: 'green',
  },
  disable: {
    type: Boolean,
    default: false,
  },
  customClass: {
    type: String,
    default: '',
  },
});

const colorClasses = computed(() => {
  switch (props.color) {
    case 'gray':
      return 'bg-tic';
    case 'green':
    default:
      return 'bg-drive';
  }
});
</script>

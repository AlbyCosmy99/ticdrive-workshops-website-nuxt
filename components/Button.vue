<template>
  <div
    :class="[
      props.customClass,
      'rounded-full py-3 px-6 text-white text-center text-lg cursor-pointer hover:opacity-80 active:opacity-100',
      {'disable-button': props.disable},
      props.color === 'green'
        ? 'bg-green-500'
        : props.color === 'gray'
          ? 'bg-gray-500'
          : 'bg-green-500',
    ]"
  >
    {{ label }}
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

    const props = defineProps<{
        label: {
            type: string,
        },
        type: {
            type: string,
            default: "standard"
        },
        size: {
            type: string,
            default: "standard"
        },
        color: {
            type: string,
            default: "green"
        },
        disable: {
            type: boolean,
            default: false
        },
        customClass: {
            type: string,
            default: ""
        }
    }>();
</script>

<style scoped>
    .disable-button {
        opacity: 0.5 !important;
    }
    .disable-button:hover {
        cursor: not-allowed;
    }
    .gray-button {
        background-color: ;
    }
</style>

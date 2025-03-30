<template>
  <div
    :class="[
      customClass,
      'rounded-full py-3 px-6 text-white text-center text-lg cursor-pointer hover:opacity-80 active:opacity-100',
      {'disable-button': disable},
      color === 'green'
        ? 'bg-green-500'
        : color === 'gray'
          ? 'bg-gray-500'
          : 'bg-green-500',
    ]"
  >
    {{ label }}
  </div>
</template>

<script lang="ts">
import { Style } from '#components';
import { defineComponent } from 'vue';
    export default defineComponent({
        name: 'Button',
        props: {
            label: {
                type: String,
            },
            type: {
                type: String,
                default: "standard"
            },
            size: {
                type: String,
                default: "standard"
            },
            color: {
                type: String,
                default: "green"
            },
            disable: {
                type: Boolean,
                default: false
            },
            customClass: {
                type: String,
                default: ""
            }
        },
        setup() {}
    })
</script>

<style scoped>
.disable-button {
  opacity: 0.5 !important;
}
.disable-button:hover {
  cursor: not-allowed;
}
</style>

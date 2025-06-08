<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center"
  >
    <div
      class="absolute inset-0 bg-black bg-opacity-30"
      @click="emit('close')"
    ></div>

    <div
      class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative z-10"
      :class="containerClass"
    >
      <slot name="header">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold">{{ title }}</h3>
          <button
            @click="emit('close')"
            class="text-gray-500 hover:text-gray-700"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </slot>

      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
  title?: string;
  containerClass?: string;
}>();
const emit = defineEmits(['close']);
</script>

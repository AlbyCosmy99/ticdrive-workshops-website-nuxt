<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="absolute inset-0 bg-black opacity-50" @click="handleReject"></div>
    <div class="bg-white rounded-lg shadow-lg p-4 w-80 z-10 border border-green-200">
      <div class="mb-4 text-center">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">
          Conferma
        </h3>
        <p class="text-red-600 text-sm mb-4">
          Sei sicuro di voler impostare nessuna disponibilità?
        </p>
      </div>

      <div class="flex flex-col gap-2">
        <button @click="handleConfirm"
          class="w-full py-2 px-4 border border-red-500 text-white bg-red-500 rounded-md font-semibold text-sm text-center">
          Conferma
        </button>
        <button @click="handleReject"
          class="w-full py-2 px-4 border border-black text-black bg-white rounded-md font-semibold text-sm text-center">
          Rifiuta
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  month: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['confirm', 'reject']);

const handleConfirm = () => {
  emit('confirm', { month: props.month, year: props.year });
};

const handleReject = () => {
  emit('reject');
};
</script>
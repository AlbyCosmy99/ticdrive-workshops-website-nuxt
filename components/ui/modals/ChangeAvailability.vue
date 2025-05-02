<template>
    <div v-if="isOpen" class="relative">
      <!-- Modal content -->
      <div class="absolute z-50 bg-white rounded-lg shadow-md w-64 top-1 right-1 border border-green-200">
        <div class="flex flex-col gap-2 p-3">
          <!-- "Nessuna Disponibilità" (red) -->
          <button
            @click="handleNessunaDispo"
            class="w-full py-2 px-4 border border-red-500 text-red-600 bg-[#FFF5F5] rounded-md font-semibold text-sm text-center"
          >
            Nessuna Disponibilità
          </button>
  
          <!-- "Annulla" (black on white) -->
          <button
            @click="closeModal"
            class="w-full py-2 px-4 border border-black text-black bg-white rounded-md font-semibold text-sm text-center"
          >
            Annulla
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
    currentMonth: {
      type: Number,
      required: true
    },
    currentYear: {
      type: Number,
      required: true
    }
  });
  
  const emit = defineEmits(['close', 'nessunaDispo']);
  
  const closeModal = () => {
    emit('close');
  };
  
  const handleNessunaDispo = () => {
    emit('nessunaDispo', { month: props.currentMonth, year: props.currentYear });
    closeModal();
  };
  </script>
  
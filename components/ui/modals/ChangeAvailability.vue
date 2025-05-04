<template>
  <div v-if="isOpen" class="relative">

    <div class="absolute z-50 bg-white rounded-lg shadow-md w-64 top-1 right-1 border border-green-200">
      <div class="flex flex-col gap-2 p-3">

        <button @click="openConfirmationModal"
          class="w-full py-2 px-4 border border-red-500 text-red-600 bg-[#FFF5F5] rounded-md font-semibold text-sm text-center">
          Nessuna Disponibilità
        </button>

        <button @click="closeModal"
          class="w-full py-2 px-4 border border-black text-black bg-white rounded-md font-semibold text-sm text-center">
          Annulla
        </button>
      </div>
    </div>
  </div>


  <ConfirmationModal :isOpen="showConfirmationModal" :month="currentMonth" :year="currentYear"
    @confirm="handleConfirmNessunaDispo" @reject="cancelConfirmation" />
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue';
import ConfirmationModal from '@/components/ui/modals/ConfirmationAvailbility.vue';

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
const showConfirmationModal = ref(false);

const closeModal = () => {
  emit('close');
};

const openConfirmationModal = () => {
  showConfirmationModal.value = true;
};

const cancelConfirmation = () => {
  showConfirmationModal.value = false;
};

const handleConfirmNessunaDispo = ({ month, year }) => {
  emit('nessunaDispo', { month, year });
  showConfirmationModal.value = false;
  closeModal();
};
</script>
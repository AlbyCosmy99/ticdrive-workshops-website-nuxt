<!-- components/ui/BookingCard.vue -->
<template>
  <div class="bg-white rounded-lg shadow p-4 border border-gray-100">
    <div class="flex justify-between items-start mb-4">
      <div class="flex items-center">
        <div class="w-10 h-10 bg-gray-200 rounded-full mr-3 overflow-hidden">
          <img
            v-if="userImageSrc"
            :src="userImageSrc"
            :alt="`${name}'s avatar`"
            class="w-full h-full object-cover"
          />
        </div>
        <span class="font-medium">{{ name }}</span>
      </div>
      <div
        :class="[
          'flex items-center px-2 py-1 rounded text-sm',
          status === 'confirmed' 
            ? 'text-drive bg-green-light' 
            : 'text-orange-500 bg-orange-100'
        ]"
      >
        <svg v-if="status === 'pending'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <span>{{ status === 'confirmed' ? 'Confermata' : 'In attesa di accettazione' }}</span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2 mb-4">
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
        </svg>
        <span class="text-sm">Ora</span>
      </div>
      <div class="text-right text-sm">{{ time }}</div>

      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
        </svg>
        <span class="text-sm">Servizio</span>
      </div>
      <div class="text-right text-sm">{{ service }}</div>

      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H11a1 1 0 001-1v-1h3.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0017 5V4a1 1 0 00-1-1H3z" />
        </svg>
        <span class="text-sm">Veicolo</span>
      </div>
      <div class="text-right text-sm">{{ vehicle }}</div>

      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
        </svg>
        <span class="text-sm">Pagamento</span>
      </div>
      <div class="text-right text-sm font-medium">
        {{ price }}
        <span v-if="paymentStatus" class="text-gray-600 font-normal"
          >({{ paymentStatus }})</span
        >
      </div>
    </div>

    <div v-if="status === 'pending'" class="flex space-x-2">
      <button class="flex-1 py-2 border border-gray-300 rounded-md text-center hover:bg-gray-100">
        Rifiuta
      </button>
      <button
        class="flex-1 py-2 bg-drive text-white rounded-md text-center hover:bg-green-dark"
      >
        Accetta
      </button>
    </div>

    <div v-else-if="status === 'confirmed' || showCancelButton" class="flex gap-3 mb-2">
      <button class="w-full py-2 bg-red-500 text-white rounded-md text-center hover:bg-red-600">
        Annulla Prenotazione
      </button>
    </div>

    <div v-if="status === 'pending'" class="text-center mt-2 text-sm text-gray-500 hover:underline cursor-pointer">
      Vuoi suggerire un orario diverso?
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';

interface BookingCardProps {
  name: string;
  time: string;
  service: string;
  vehicle: string;
  price: string;
  paymentStatus?: string;
  userImageSrc?: string;
  status?: 'pending' | 'confirmed';
  showCancelButton?: boolean;
}

defineComponent({
  name: 'BookingCard',
});

const props = defineProps<BookingCardProps>();

// Set default status
const status = ref(props.status || 'pending');
</script>

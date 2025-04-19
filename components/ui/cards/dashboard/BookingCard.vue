<!-- components/ui/BookingCard.vue -->
<template>
    <div class="bg-white rounded-lg shadow p-4 border border-gray-100">
      <div class="flex justify-between items-start mb-4">
        <div class="flex items-center">
          <div class="w-10 h-10 bg-gray-200 rounded-full mr-3 overflow-hidden">
            <img v-if="userImageSrc" :src="userImageSrc" :alt="`${name}'s avatar`" class="w-full h-full object-cover" />
          </div>
          <span class="font-medium">{{ name }}</span>
        </div>
        <div class="flex items-center text-amber-500 bg-amber-50 px-2 py-1 rounded text-sm">
          <!-- specify the svg source for icon-->
          <span>In attesa di accettazione</span>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-2 mb-4">
        <div class="flex items-center">
          <!-- specify the svg source for icon-->
          <span class="text-sm">Ora</span>
        </div>
        <div class="text-right text-sm">{{ time }}</div>
        
        <div class="flex items-center">
          <!-- specify the svg source for icon-->
          <span class="text-sm">Servizio</span>
        </div>
        <div class="text-right text-sm">{{ service }}</div>
        
        <div class="flex items-center">
          <!-- specify the svg source for icon-->
          <span class="text-sm">Veicolo</span>
        </div>
        <div class="text-right text-sm">{{ vehicle }}</div>
        
        <div class="flex items-center">
        <!-- specify the svg source for icon  -->
         <!-- <img v-if="paymentIconSvg" :src="paymentIconSvg" alt="Payment" class="w-4 h-4 text-gray-500 mr-2" /> -->
          <span class="text-sm">Pagamento</span>
        </div>
        <div class="text-right text-sm font-medium">
          {{ price }} <span v-if="paymentStatus" class="text-gray-600 font-normal">({{ paymentStatus }})</span>
        </div>
      </div>
      
      <div class="flex space-x-2">
        <button class="flex-1 py-2 border border-gray-300 rounded-md text-center">Rifiuta</button>
        <button class="flex-1 py-2 bg-[#39b269] text-white rounded-md text-center">Accetta</button>
      </div>
      
      <div class="text-center mt-2 text-sm text-gray-500">
        Vuoi suggerire un orario diverso?
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineComponent } from 'vue';
  
  interface BookingCardProps {
    name: string;
    time: string;
    service: string;
    vehicle: string;
    price: string;
    paymentStatus?: string;
    userImageSrc?: string;
    statusIconSvg?: string;
    clockIconSvg?: string;
    toolsIconSvg?: string;
    carIconSvg?: string;
    paymentIconSvg?: string;
  }
  
  defineComponent({
    name: 'BookingCard'
  });
  
  defineProps<BookingCardProps>();
  </script>
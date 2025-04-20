<template>
    <div class="bg-[#39b269] text-white rounded-lg p-1.5 h-full flex flex-col shadow-sm">
      <div class="flex justify-between items-center">
        <span class="font-semibold text-xs">{{ carModel }}</span>
        <div class="w-4 h-4 bg-white rounded-full flex items-center justify-center">
          <!-- Use car initials instead of missing logos -->
          <span v-if="carLogo === 'nissan'" class="text-[0.65rem] font-bold text-[#39b269]">N</span>
          <span v-else-if="carLogo === 'peugeot'" class="text-[0.65rem] font-bold text-[#39b269]">P</span>
          <span v-else-if="carLogo === 'ford'" class="text-[0.65rem] font-bold text-[#39b269]">F</span>
          <span v-else-if="carLogo === 'fiat'" class="text-[0.65rem] font-bold text-[#39b269]">Fi</span>
          <span v-else class="text-[0.65rem] font-bold text-[#39b269]">A</span>
        </div>
      </div>
      <div class="text-xs mb-auto whitespace-nowrap overflow-hidden text-ellipsis">{{ serviceType }}</div>
      <div class="flex justify-between text-[0.65rem] opacity-90">
        <div>#{{ appointmentId }}</div>
        <div>{{ location }}</div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  defineProps({
    carModel: {
      type: String,
      required: true
    },
    serviceType: {
      type: String,
      required: true
    },
    appointmentId: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    carLogo: {
      type: String,
      default: ''
    }
  });
  </script>
<template>
    <div class="bg-[#39b269] text-white rounded-lg p-3 h-full flex flex-col shadow-sm">
      <div class="flex justify-between items-center mb-1">
        <span class="font-semibold text-sm">{{ carModel }}</span>
        <div class="w-6 h-6 bg-white rounded-full flex items-center justify-center p-0.5">
          <!-- Use car initials instead of missing logos -->
          <span v-if="carLogo === 'nissan'" class="text-xs font-bold text-[#39b269]">N</span>
          <span v-else-if="carLogo === 'peugeot'" class="text-xs font-bold text-[#39b269]">P</span>
        </div>
      </div>
      <div class="text-sm mb-auto">{{ serviceType }}</div>
      <div class="flex justify-between text-xs mt-2 opacity-90">
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
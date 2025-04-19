<template>
  <div>
    <!-- Day header showing current date -->
    <div class="flex justify-center items-center mb-4">
      <button 
        @click="prevDay"
        class="p-2 text-gray-500 hover:text-drive"
        aria-label="Previous day"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h2 class="text-xl font-semibold mx-4">{{ displayedDayName }}</h2>
      <button 
        @click="nextDay"
        class="p-2 text-gray-500 hover:text-drive"
        aria-label="Next day"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <div class="border border-gray-200 rounded-lg overflow-hidden flex">
      <!-- Time column -->
      <div class="w-20 border-r border-gray-200">
        <div v-for="time in timeSlots" 
             :key="time" 
             class="h-20 flex items-center justify-center border-b border-gray-200 text-gray-600 font-medium">
          {{ time }}
        </div>
      </div>
      
      <!-- Events grid -->
      <div class="flex-1 grid grid-cols-5">
        <!-- 08:00 row -->
        <div v-for="i in 5" :key="`slot-1-${i}`" class="h-20 border-b border-gray-200 border-r border-gray-200 p-1"></div>
        
        <!-- 09:00 row -->
        <div class="h-20 border-b border-gray-200 border-r border-gray-200 p-1"></div>
        <div class="h-20 border-b border-gray-200 border-r border-gray-200 p-1">
          <AppointmentCard 
            carModel="Nissan Micra" 
            serviceType="Tagliando" 
            appointmentId="A00001" 
            location="FB144MD"
            carLogo="nissan" />
        </div>
        <div v-for="i in 3" :key="`slot-2-${i}`" class="h-20 border-b border-gray-200 border-r border-gray-200 p-1"></div>
        
        <!-- 10:00 row -->
        <div class="h-20 border-b border-gray-200 border-r border-gray-200 p-1"></div>
        <div class="h-20 border-b border-gray-200 border-r border-gray-200 p-1">
          <AppointmentCard 
            carModel="Peugeot 208" 
            serviceType="Cambio Olio" 
            appointmentId="A00002" 
            location="FB144MD"
            carLogo="peugeot" />
        </div>
        <div class="h-20 border-b border-gray-200 border-r border-gray-200 p-1"></div>
        <div class="h-20 border-b border-gray-200 border-r border-gray-200 p-1">
          <AppointmentCard 
            carModel="Peugeot 2008" 
            serviceType="Cambio Pneumatici" 
            appointmentId="A00002" 
            location="FB144MD"
            carLogo="peugeot" />
        </div>
        <div class="h-20 border-b border-gray-200 p-1"></div>
        
        <!-- 11:00 row -->
        <div v-for="i in 5" :key="`slot-4-${i}`" class="h-20 border-b border-gray-200 border-r border-gray-200 p-1 last:border-r-0"></div>
        
        <!-- 12:00 row -->
        <div class="h-20 border-b border-gray-200 border-r border-gray-200 p-1"></div>
        <div class="h-20 border-b border-gray-200 border-r border-gray-200 p-1"></div>
        <div class="h-20 border-b border-gray-200 border-r border-gray-200 p-1">
          <AppointmentCard 
            carModel="Nissan Skyline" 
            serviceType="Cambio Pastiglie" 
            appointmentId="A00002" 
            location="FB144MD"
            carLogo="nissan" />
        </div>
        <div class="h-20 border-b border-gray-200 border-r border-gray-200 p-1">
          <AppointmentCard 
            carModel="Peugeot 2008" 
            serviceType="Cambio Pneumatici" 
            appointmentId="A00002" 
            location="FB144MD"
            carLogo="peugeot" />
        </div>
        <div class="h-20 border-b border-gray-200 p-1"></div>
        
        <!-- 13:00 row -->
        <div v-for="i in 5" :key="`slot-6-${i}`" class="h-20 border-b border-gray-200 border-r border-gray-200 p-1 last:border-r-0"></div>
        
        <!-- 14:00 row -->
        <div v-for="i in 5" :key="`slot-7-${i}`" class="h-20 border-r border-gray-200 p-1 last:border-r-0"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import AppointmentCard from './AppointmentCard.vue';

const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'];

// Month names in Italian
const monthNames = [
  'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
  'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
];

// Day names in Italian
const dayNames = [
  'Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'
];

// Current date info
const today = new Date();
const displayedDate = ref(new Date());

// Computed properties for display
const displayedDay = computed(() => displayedDate.value.getDate());
const displayedMonth = computed(() => displayedDate.value.getMonth());
const displayedYear = computed(() => displayedDate.value.getFullYear());
const displayedDayOfWeek = computed(() => displayedDate.value.getDay());
const displayedDayName = computed(() => dayNames[displayedDayOfWeek.value]);
const displayedMonthName = computed(() => monthNames[displayedMonth.value]);

// Navigation functions
const nextDay = () => {
  const newDate = new Date(displayedDate.value);
  newDate.setDate(newDate.getDate() + 1);
  displayedDate.value = newDate;
};

const prevDay = () => {
  const newDate = new Date(displayedDate.value);
  newDate.setDate(newDate.getDate() - 1);
  displayedDate.value = newDate;
};
</script>
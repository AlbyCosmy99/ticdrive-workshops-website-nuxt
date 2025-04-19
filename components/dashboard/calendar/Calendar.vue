<template>
  <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
    <h1 class="text-2xl font-semibold mb-6">Calendario Prenotazioni</h1>
    
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center space-x-2 cursor-pointer group" @click="goToToday">
        <div class="text-drive border border-gray-200 rounded-full p-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
        <span class="font-medium text-drive">{{ todayText }}</span>
      </div>
      
      <div class="flex border border-gray-200 rounded-full overflow-hidden">
        <button 
          @click="activeView = 'day'" 
          :class="[
            'px-4 py-2 font-medium transition-colors', 
            activeView === 'day' ? 'bg-drive text-white' : 'bg-white'
          ]">
          Giorno
        </button>
        <button 
          @click="activeView = 'week'" 
          :class="[
            'px-4 py-2 font-medium transition-colors', 
            activeView === 'week' ? 'bg-drive text-white' : 'bg-white'
          ]">
          Settimana
        </button>
        <button 
          @click="activeView = 'month'" 
          :class="[
            'px-4 py-2 font-medium transition-colors', 
            activeView === 'month' ? 'bg-drive text-white' : 'bg-white'
          ]">
          Mese
        </button>
      </div>
    </div>
    
    <DayView v-if="activeView === 'day'" />
    <WeekView v-else-if="activeView === 'week'" />
    <MonthView v-else-if="activeView === 'month'" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import DayView from './DayView.vue';
import WeekView from './WeekView.vue';
import MonthView from './MonthView.vue';

const activeView = ref('week'); // Default to week view

// Day names in Italian
const dayNames = [
  'Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'
];

// Month names in Italian
const monthNames = [
  'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
  'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
];

// Get current date
const today = new Date();

// Compute today text in the format "Oggi, Giovedì 7 Febbraio"
const todayText = computed(() => {
  const dayOfWeek = dayNames[today.getDay()];
  const dayOfMonth = today.getDate();
  const month = monthNames[today.getMonth()];
  const year = today.getFullYear();
  
  return `Oggi, ${dayOfWeek} ${dayOfMonth} ${month}`;
});

// Function to go to today's date (would reset date views)
const goToToday = () => {
  // Implementation would depend on your date handling in each view
  console.log('Go to today');
};
</script>
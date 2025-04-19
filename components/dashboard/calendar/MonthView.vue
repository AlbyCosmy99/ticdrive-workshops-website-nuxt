<template>
  <div>
    <!-- Month header showing current month/year -->
    <div class="flex justify-center items-center mb-4">
      <button 
        @click="prevMonth"
        class="p-2 text-gray-500 hover:text-drive"
        aria-label="Previous month"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h2 class="text-xl font-semibold mx-4">{{ currentMonthName }} {{ currentYear }}</h2>
      <button 
        @click="nextMonth"
        class="p-2 text-gray-500 hover:text-drive"
        aria-label="Next month"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
    
    <!-- Days of week headers -->
    <div class="grid grid-cols-7 border-b border-gray-200">
      <div v-for="day in weekDayNames" :key="day" class="py-4 text-center font-medium">
        {{ day }}
      </div>
    </div>
    
    <!-- Calendar grid -->
    <div class="border border-gray-200 rounded-lg overflow-hidden mt-4">
      <div class="grid grid-cols-7">
        <!-- For each day in month -->
        <div 
          v-for="(day, index) in daysInMonth" 
          :key="index"
          class="h-28 border border-gray-200 p-2 relative"
          :class="{
            'bg-gray-50': !isCurrentMonth(day),
            'border-drive': isToday(day)
          }"
        >
          <!-- Day number -->
          <div class="text-sm font-medium mb-1" :class="{ 'text-gray-400': !isCurrentMonth(day) }">
            {{ day.date }}
          </div>
          
          <!-- Appointments -->
          <div class="space-y-1">
            <template v-if="hasAppointmentsOnDay(day)">
              <div 
                v-for="appointment in getAppointmentsForDay(day)" 
                :key="appointment.appointmentId" 
                class="bg-drive text-white rounded p-1 text-xs font-medium cursor-pointer truncate"
                @click="showAppointmentDetails(appointment)"
              >
                {{ appointment.carModel }} - {{ appointment.serviceType }}
              </div>
            </template>
            
            <!-- Unavailable indicator -->
            <div v-if="isDayUnavailable(day)" class="bg-[#FFF5F5] bg-pattern-striped rounded p-1 text-xs text-red-500 font-medium text-center">
              Nessuna Disponibilità
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import AppointmentCard from './AppointmentCard.vue';

// Days of the week
const weekDayNames = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

// Month names in Italian
const monthNames = [
  'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
  'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
];

// Current date info
const today = new Date();
const displayedMonth = ref(today.getMonth());
const displayedYear = ref(today.getFullYear());

// Computed properties for display
const currentMonthName = computed(() => monthNames[displayedMonth.value]);
const currentYear = computed(() => displayedYear.value);

// Navigation functions
const nextMonth = () => {
  if (displayedMonth.value === 11) {
    displayedMonth.value = 0;
    displayedYear.value++;
  } else {
    displayedMonth.value++;
  }
};

const prevMonth = () => {
  if (displayedMonth.value === 0) {
    displayedMonth.value = 11;
    displayedYear.value--;
  } else {
    displayedMonth.value--;
  }
};

// Generate days for the month view
const daysInMonth = computed(() => {
  const result = [];
  const firstDayOfMonth = new Date(displayedYear.value, displayedMonth.value, 1);
  const lastDayOfMonth = new Date(displayedYear.value, displayedMonth.value + 1, 0);
  
  // Get the day of the week for the first day (0-6, 0 is Sunday)
  let firstDay = firstDayOfMonth.getDay();
  // Adjust for Monday as first day of week (0-6, 0 is Monday)
  firstDay = firstDay === 0 ? 6 : firstDay - 1;
  
  // Add days from previous month
  const daysFromPrevMonth = firstDay;
  const prevMonthLastDay = new Date(displayedYear.value, displayedMonth.value, 0).getDate();
  
  for (let i = prevMonthLastDay - daysFromPrevMonth + 1; i <= prevMonthLastDay; i++) {
    result.push({
      date: i,
      month: displayedMonth.value - 1,
      year: displayedMonth.value === 0 ? displayedYear.value - 1 : displayedYear.value,
      isCurrentMonth: false
    });
  }
  
  // Add days for current month
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    result.push({
      date: i,
      month: displayedMonth.value,
      year: displayedYear.value,
      isCurrentMonth: true
    });
  }
  
  // Add days from next month to complete grid (up to 42 days total for 6 weeks)
  const totalDaysToShow = Math.ceil((firstDay + lastDayOfMonth.getDate()) / 7) * 7;
  const daysFromNextMonth = totalDaysToShow - result.length;
  
  for (let i = 1; i <= daysFromNextMonth; i++) {
    result.push({
      date: i,
      month: displayedMonth.value + 1,
      year: displayedMonth.value === 11 ? displayedYear.value + 1 : displayedYear.value,
      isCurrentMonth: false
    });
  }
  
  return result;
});

// Sample appointments data
const appointments = computed(() => [
  { 
    date: 7, month: displayedMonth.value, year: displayedYear.value,
    carModel: 'Nissan Micra', 
    serviceType: 'Tagliando', 
    appointmentId: 'A00001', 
    location: 'FB144MD', 
    carLogo: 'nissan' 
  },
  { 
    date: 15, month: displayedMonth.value, year: displayedYear.value,
    carModel: 'Peugeot 208', 
    serviceType: 'Cambio Pneumatici', 
    appointmentId: 'A00003', 
    location: 'FB144MD', 
    carLogo: 'peugeot' 
  },
  { 
    date: 22, month: displayedMonth.value, year: displayedYear.value,
    carModel: 'Ford Fiesta', 
    serviceType: 'Revisione', 
    appointmentId: 'A00005', 
    location: 'FB144MD', 
    carLogo: 'ford' 
  }
]);

// Unavailable days
const unavailableDays = computed(() => [
  { date: 8, month: displayedMonth.value, year: displayedYear.value },
  { date: 9, month: displayedMonth.value, year: displayedYear.value },
  { date: 17, month: displayedMonth.value, year: displayedYear.value },
  { date: 26, month: displayedMonth.value, year: displayedYear.value },
]);

// Helper functions
const isCurrentMonth = (day) => day.isCurrentMonth;

const isToday = (day) => {
  return day.date === today.getDate() && 
         day.month === today.getMonth() && 
         day.year === today.getFullYear();
};

const hasAppointmentsOnDay = (day) => {
  return appointments.value.some(app => 
    app.date === day.date && 
    app.month === day.month && 
    app.year === day.year
  );
};

const getAppointmentsForDay = (day) => {
  return appointments.value.filter(app => 
    app.date === day.date && 
    app.month === day.month && 
    app.year === day.year
  );
};

const isDayUnavailable = (day) => {
  return unavailableDays.value.some(unavailable => 
    unavailable.date === day.date && 
    unavailable.month === day.month && 
    unavailable.year === day.year
  );
};

const showAppointmentDetails = (appointment) => {
  // This would show a modal or navigate to appointment details
  console.log('Appointment details:', appointment);
};
</script>

<style scoped>
.bg-pattern-striped {
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255, 235, 235, 0.5),
    rgba(255, 235, 235, 0.5) 10px,
    rgba(255, 245, 245, 0.7) 10px,
    rgba(255, 245, 245, 0.7) 20px
  );
}
</style>
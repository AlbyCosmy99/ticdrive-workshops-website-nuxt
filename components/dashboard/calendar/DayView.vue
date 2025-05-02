<template>
  <div class="flex flex-col h-full">

    <div class="flex justify-center items-center mb-4 relative">

      <button @click="prevDay" class="p-2 text-gray-500 hover:text-drive" aria-label="Previous day">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>


      <div class="relative mx-2 flex items-center rounded-md px-4 py-1 gap-2 text-black">
        <h2 class="text-xl font-semibold mx-2">
          {{ displayedDayName }} {{ displayedDay }} {{ displayedMonthName }}
        </h2>
        <button @click="toggleChangeModal" class="p-1 hover:text-gray-200" aria-label="Change disponibilità">
          <img src="/svg/directions/AvabilityIcon.svg" alt="Availability Icon" class="h-8 w-8" />
        </button>


        <ChangeDisponibilty v-if="showChangeModal" class="absolute inset-x-0 top-5" :isOpen="showChangeModal"
          :currentMonth="displayedMonth" :currentYear="displayedDate.getFullYear()" @close="closeChangeModal"
          @nessunaDispo="handleNessunaDispo" />
      </div>


      <button @click="nextDay" class="p-2 text-gray-500 hover:text-drive" aria-label="Next day">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>


    <div class="overflow-x-auto flex-grow">
      <div class="min-w-[800px] grid border border-gray-200 rounded-lg"
        :style="`grid-template-columns: 5rem repeat(5, 1fr);`">

        <div class="bg-white border-b border-gray-200"></div>
        <div v-for="i in 5" :key="i" class="text-center text-sm font-medium py-2 border-b border-gray-200 bg-white">
          Slot {{ i }}
        </div>


        <template v-for="(time, timeIndex) in timeSlots" :key="time">

          <div
            class="h-20 flex items-center justify-center border-t border-gray-200 text-gray-600 text-sm font-medium bg-white sticky left-0 z-10">
            {{ time }}
          </div>


          <template v-for="colIndex in 5" :key="`${time}-${colIndex}`">
            <div class="h-20 border-t border-l border-gray-200 p-1 relative bg-white">
              <AppointmentCard v-if="shouldRenderCard(time, colIndex)" v-bind="getCardProps(time, colIndex)" />
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import AppointmentCard from './AppointmentCard.vue';
import ChangeDisponibilty from '/home/riccardo/Scrivania/provaVueFine/tic-drive-workshops-site/components/ui/modals/ChangeAvailability.vue'; // Adjust path if needed

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00',
];

const today = new Date();
const displayedDate = ref(new Date(today));

// Labels in Italian
const monthNames = [
  'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
  'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre',
];
const dayNames = [
  'Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato',
];

const displayedDay = computed(() => displayedDate.value.getDate());
const displayedMonth = computed(() => displayedDate.value.getMonth());
const displayedDayOfWeek = computed(() => displayedDate.value.getDay());
const displayedDayName = computed(() => dayNames[displayedDayOfWeek.value]);
const displayedMonthName = computed(() => monthNames[displayedMonth.value]);

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

// Modal handling
const showChangeModal = ref(false);
const toggleChangeModal = () => {
  showChangeModal.value = !showChangeModal.value;
};
const closeChangeModal = () => {
  showChangeModal.value = false;
};
const handleNessunaDispo = () => {
  // Optional callback logic
};

// Mock data for appointments
const appointmentMap = {
  '09:00-2': {
    carModel: 'Nissan Micra',
    serviceType: 'Tagliando',
    appointmentId: 'A00001',
    location: 'FB144MD',
    carLogo: 'nissan',
  },
  '10:00-2': {
    carModel: 'Peugeot 208',
    serviceType: 'Cambio Olio',
    appointmentId: 'A00002',
    location: 'FB144MD',
    carLogo: 'peugeot',
  },
  '10:00-4': {
    carModel: 'Peugeot 2008',
    serviceType: 'Cambio Pneumatici',
    appointmentId: 'A00002',
    location: 'FB144MD',
    carLogo: 'peugeot',
  },
  '12:00-3': {
    carModel: 'Nissan Skyline',
    serviceType: 'Cambio Pastiglie',
    appointmentId: 'A00002',
    location: 'FB144MD',
    carLogo: 'nissan',
  },
  '12:00-4': {
    carModel: 'Peugeot 2008',
    serviceType: 'Cambio Pneumatici',
    appointmentId: 'A00002',
    location: 'FB144MD',
    carLogo: 'peugeot',
  },
  '16:00-2': {
    carModel: 'Ford Focus',
    serviceType: 'Manutenzione',
    appointmentId: 'A00004',
    location: 'FB144MD',
    carLogo: 'ford',
  },
};

const shouldRenderCard = (time: string, column: number) => {
  return appointmentMap.hasOwnProperty(`${time}-${column}`);
};

const getCardProps = (time: string, column: number) => {
  return appointmentMap[`${time}-${column}`];
};
</script>

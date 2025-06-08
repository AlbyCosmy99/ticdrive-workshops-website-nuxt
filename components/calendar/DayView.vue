<template>
  <div class="flex flex-col h-full">
    <!-- Day header -->
    <div class="flex justify-center items-center mb-4">
      <button
        @click="prevDay"
        class="p-2 text-gray-500 hover:text-drive"
        aria-label="Previous day"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h2 class="text-lg font-medium mx-4 text-gray-800">
        {{ displayedDayName }}, {{ displayedDay }} {{ displayedMonthName }}
      </h2>
      <button
        @click="nextDay"
        class="p-2 text-gray-500 hover:text-drive"
        aria-label="Next day"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <div class="overflow-x-auto flex-grow">
      <div
        class="min-w-[800px] grid border border-gray-200 rounded-lg"
        :style="`grid-template-columns: 4rem repeat(${numberOfSlots}, 1fr);`"
      >
        <div class="bg-gray-50 border-b border-gray-200"></div>
        <div
          v-for="i in Array.from({ length: numberOfSlots }, (_, idx) => idx + 1)"
          :key="i"
          class="text-center text-xs font-semibold py-2 border-b border-gray-200 bg-gray-50 text-gray-700"
        >
          Slot {{ i }}
        </div>

        <template v-for="time in timeSlots" :key="time">
          <div class="h-20 flex items-center justify-center border-t border-gray-100 text-gray-500 text-xs font-medium bg-white sticky left-0 z-10">
            {{ time }}
          </div>

          <template
            v-for="colIndex in Array.from({ length: numberOfSlots }, (_, idx) => idx + 1)"
            :key="`${time}-${colIndex}`"
          >
            <div class="h-20 border-t border-l border-gray-100 p-1 relative bg-white">
              <AppointmentCard
                v-if="shouldRenderCard(time, colIndex)"
                v-bind="getCardProps(time, colIndex)"
              />
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
import italianDayNames from '~/data/datetime/italianDayNames';
import italianMonthNames from '~/data/datetime/italianMonthNames';

const numberOfSlots = ref(1);

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00'
];

const today = new Date();
const displayedDate = ref(new Date(today));

const displayedDay = computed(() => displayedDate.value.getDate());
const displayedMonth = computed(() => displayedDate.value.getMonth());
const displayedDayOfWeek = computed(() => displayedDate.value.getDay());
const displayedDayName = computed(() => italianDayNames[displayedDayOfWeek.value]);
const displayedMonthName = computed(() => italianMonthNames[displayedMonth.value]);

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

const appointmentMap: Record<string, any> = {
  '09:00-2': { carModel: 'Nissan Micra', serviceType: 'Tagliando', appointmentId: 'A00001', location: 'FB144MD', carLogo: 'nissan' },
  '10:00-2': { carModel: 'Peugeot 208', serviceType: 'Cambio Olio', appointmentId: 'A00002', location: 'FB144MD', carLogo: 'peugeot' },
  '10:00-3': { carModel: 'Peugeot 2008', serviceType: 'Cambio Pneumatici', appointmentId: 'A00003', location: 'FB144MD', carLogo: 'peugeot' },
  '12:00-1': { carModel: 'Nissan Skyline', serviceType: 'Cambio Pastiglie', appointmentId: 'A00004', location: 'FB144MD', carLogo: 'nissan' },
  '16:00-2': { carModel: 'Ford Focus', serviceType: 'Manutenzione', appointmentId: 'A00006', location: 'FB144MD', carLogo: 'ford' },
};

const shouldRenderCard = (time: string, column: number) => {
  return appointmentMap.hasOwnProperty(`${time}-${column}`);
};

const getCardProps = (time: string, column: number) => {
  return appointmentMap[`${time}-${column}`];
};
</script>

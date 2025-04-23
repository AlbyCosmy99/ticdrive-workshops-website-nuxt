<template>
  <div class="h-full flex flex-col">
    <!-- Week header -->
    <div class="flex justify-center items-center mb-4">
      <h2 class="text-xl font-semibold">{{ weekRangeText }}</h2>
    </div>

    <!-- Calendar Grid -->
    <div class="overflow-x-auto">
      <div
        class="grid border border-gray-200 rounded-lg min-w-[900px]"
        :style="`grid-template-columns: 5rem repeat(${weekDays.length}, 1fr);`"
      >
        <!-- Header row -->
        <div class="bg-white border-b border-gray-200"></div>
        <div
          v-for="day in weekDays"
          :key="day.name"
          class="py-2 px-1 border-b border-gray-200 text-center font-medium text-sm text-gray-600 bg-white"
        >
          <div class="flex justify-center items-center space-x-2">
            <span>{{ day.name }}</span>
            <span class="text-base font-semibold">{{ day.number }}</span>
          </div>
        </div>

        <!-- Time and grid cells -->
        <template v-for="(time, timeIndex) in timeSlots" :key="time">
          <!-- Time label -->
          <div class="h-20 flex items-center justify-center border-t border-gray-200 text-gray-600 text-sm font-medium bg-white sticky left-0 z-10">
            {{ time }}
          </div>

          <!-- Each day column -->
          <template v-for="(day, dayIndex) in weekDays" :key="`${time}-${day.name}`">
            <div
              class="h-20 border-t border-l border-gray-200 p-1 relative bg-white"
              :class="{ 'border-l-0': dayIndex === 0 }"
            >
              <template v-if="hasAppointment(timeIndex, dayIndex)">
                <AppointmentCard v-bind="getAppointment(timeIndex, dayIndex)" />
              </template>

              <div
                v-else-if="isUnavailable(timeIndex, dayIndex)"
                class="h-full w-full bg-[#FFF5F5] bg-pattern-striped"
              >
                <div class="flex flex-col items-center justify-center h-full text-red-500 text-xs font-medium">
                  <span>Nessuna</span>
                  <span>Disponibilità</span>
                </div>
              </div>
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

const today = new Date();
const displayedWeekStart = ref(new Date(today));

// Adjust to Monday
const adjustToMonday = () => {
  const day = displayedWeekStart.value.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  displayedWeekStart.value.setDate(displayedWeekStart.value.getDate() + diff);
};
adjustToMonday();

// Generate week range
const weekDays = ref([]);
const monthNames = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

const generateWeekDays = () => {
  const dayNames = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
  const newWeekDays = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(displayedWeekStart.value);
    date.setDate(date.getDate() + i);
    newWeekDays.push({
      name: dayNames[i],
      number: date.getDate().toString(),
      fullDate: date,
    });
  }
  weekDays.value = newWeekDays;
};
generateWeekDays();

const weekRangeText = computed(() => {
  const start = weekDays.value[0].fullDate;
  const end = weekDays.value[6].fullDate;
  const sameMonth = start.getMonth() === end.getMonth();

  return sameMonth
    ? `${start.getDate()} - ${end.getDate()} ${monthNames[start.getMonth()]}`
    : `${start.getDate()} ${monthNames[start.getMonth()]} - ${end.getDate()} ${monthNames[end.getMonth()]}`;
});

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00', '19:00'
];

// Sample appointments
const appointments = [
  { timeIndex: 0, dayIndex: 0, carModel: 'Nissan Micra', serviceType: 'Tagliando', appointmentId: 'A00001', location: 'FB144MD', carLogo: 'nissan' },
  { timeIndex: 5, dayIndex: 3, carModel: 'Peugeot 208', serviceType: 'Cambio Pneumatici', appointmentId: 'A00003', location: 'FB144MD', carLogo: 'peugeot' },
  { timeIndex: 8, dayIndex: 1, carModel: 'Ford Focus', serviceType: 'Manutenzione', appointmentId: 'A00004', location: 'FB144MD', carLogo: 'ford' },
  { timeIndex: 10, dayIndex: 5, carModel: 'Fiat 500', serviceType: 'Revisione', appointmentId: 'A00005', location: 'FB144MD', carLogo: 'fiat' }
];

// Sample unavailable slots
const unavailableSlots = [
  { timeIndex: 0, dayIndex: 1 },
  { timeIndex: 1, dayIndex: 1 },
  { timeIndex: 2, dayIndex: 0 },
  { timeIndex: 2, dayIndex: 1 },
  { timeIndex: 3, dayIndex: 1 },
  { timeIndex: 4, dayIndex: 1 },
  { timeIndex: 5, dayIndex: 1 },
  { timeIndex: 6, dayIndex: 1 },
  { timeIndex: 6, dayIndex: 4 },
];

const hasAppointment = (timeIndex: number, dayIndex: number) =>
  appointments.some(a => a.timeIndex === timeIndex && a.dayIndex === dayIndex);

const getAppointment = (timeIndex: number, dayIndex: number) =>
  appointments.find(a => a.timeIndex === timeIndex && a.dayIndex === dayIndex)!;

const isUnavailable = (timeIndex: number, dayIndex: number) =>
  unavailableSlots.some(s => s.timeIndex === timeIndex && s.dayIndex === dayIndex);
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

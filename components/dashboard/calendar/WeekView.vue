<template>
  <div class="flex flex-col h-full">
    <!-- Week header -->
    <div class="flex justify-center items-center mb-4">
      <h2 class="text-xl font-semibold">{{ weekRangeText }}</h2>
    </div>

    <!-- Days of the week -->
    <div class="flex border-b border-gray-200">
      <div class="w-20"></div>
      <div v-for="day in weekDays" :key="day.name" class="flex-1 py-4 text-center">
        <div class="font-medium flex justify-center items-center space-x-2">
          <span class="text-sm text-gray-600">{{ day.name }}</span>
          <span class="text-base font-semibold">{{ day.number }}</span>
        </div>
      </div>
    </div>

    <!-- Grid -->
    <div class="border border-gray-200 rounded-lg overflow-hidden flex mt-4 flex-grow">
      <!-- Time column -->
      <div class="w-20 border-r border-gray-200">
        <div
          v-for="time in timeSlots"
          :key="time"
          class="h-20 flex items-center justify-center border-b border-gray-200 text-gray-600 font-medium"
        >
          {{ time }}
        </div>
      </div>

      <!-- Events grid -->
      <div class="flex-1 flex flex-col">
        <template v-for="(time, timeIndex) in timeSlots" :key="time">
          <div class="flex flex-grow">
            <template v-for="(day, dayIndex) in weekDays" :key="`${time}-${day.name}`">
              <div
                class="h-20 w-full border-b border-r border-gray-200 p-1 relative"
                :class="{
                  'border-b-0': timeIndex === timeSlots.length - 1,
                  'border-r-0': dayIndex === weekDays.length - 1,
                }"
              >
                <template v-if="hasAppointment(timeIndex, dayIndex)">
                  <AppointmentCard
                    v-bind="getAppointment(timeIndex, dayIndex)"
                  />
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
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import AppointmentCard from './AppointmentCard.vue';

const monthNames = [
  'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
  'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
];

const today = new Date();
const displayedWeekStart = ref(new Date(today));

// Adjust to the previous Monday
const adjustToMonday = () => {
  const day = displayedWeekStart.value.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  displayedWeekStart.value.setDate(displayedWeekStart.value.getDate() + diff);
};
adjustToMonday();

const weekDays = ref<{ name: string; number: string }[]>([]);

const generateWeekDays = () => {
  const names = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
  const result = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(displayedWeekStart.value);
    d.setDate(d.getDate() + i);
    result.push({
      name: names[d.getDay() - 1], // adjust index since week starts from Monday
      number: d.getDate().toString(),
    });
  }
  weekDays.value = result;
};
generateWeekDays();

const weekRangeText = computed(() => {
  const start = new Date(displayedWeekStart.value);
  const end = new Date(displayedWeekStart.value);
  end.setDate(end.getDate() + 4);

  return `${start.getDate()} ${monthNames[start.getMonth()]} - ${end.getDate()} ${monthNames[end.getMonth()]}`;
});

const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'];

const appointments = [
  {
    timeIndex: 0,
    dayIndex: 0,
    carModel: 'Nissan Micra',
    serviceType: 'Tagliando',
    appointmentId: 'A00001',
    location: 'FB144MD',
    carLogo: 'nissan',
  },
  {
    timeIndex: 5,
    dayIndex: 3,
    carModel: 'Peugeot 208',
    serviceType: 'Cambio Pneumatici',
    appointmentId: 'A00003',
    location: 'FB144MD',
    carLogo: 'peugeot',
  },
];

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

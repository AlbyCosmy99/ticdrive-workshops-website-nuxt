<template>
  <div class="h-full flex flex-col">
    <div class="flex justify-center items-center mb-4">
      <button @click="prevMonth" class="p-2 text-gray-500 hover:text-drive" aria-label="Mese precedente">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h2 class="text-xl font-semibold mx-4">{{ currentMonthName }} {{ currentYear }}</h2>
      <button @click="nextMonth" class="p-2 text-gray-500 hover:text-drive" aria-label="Mese successivo">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <div class="overflow-auto flex-grow h-full w-full">
      <div
        class="grid border border-gray-200 rounded-lg min-w-[900px] w-full"
        :style="`grid-template-columns: repeat(7, minmax(120px, 1fr));`"
      >
        <!-- Intestazioni giorni -->
        <div
          v-for="day in weekDayNames"
          :key="day"
          class="py-2 px-1 border-b border-gray-200 text-center font-medium text-sm text-gray-600 bg-white"
        >
          {{ day }}
        </div>

        <template v-for="(day, index) in daysInMonth" :key="index">
          <div
            class="border border-gray-200 p-2 bg-white min-h-[110px] relative"
            :class="{
              'bg-gray-50': !day.isCurrentMonth,
              'border-drive': isToday(day)
            }"
          >
            <div class="text-sm font-medium mb-1" :class="{ 'text-gray-400': !day.isCurrentMonth }">
              {{ day.date }}
            </div>

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

              <div
                v-if="isDayUnavailable(day)"
                class="bg-[#FFF5F5] bg-pattern-striped rounded p-1 text-xs text-red-500 font-medium text-center"
              >
                <span>Nessuna</span><br /><span>Disponibilità</span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

const weekDayNames = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
const monthNames = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

const today = new Date();
const displayedMonth = ref(today.getMonth());
const displayedYear = ref(today.getFullYear());

const currentMonthName = computed(() => monthNames[displayedMonth.value]);
const currentYear = computed(() => displayedYear.value);

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

const daysInMonth = computed(() => {
  const result = [];
  const year = displayedYear.value;
  const month = displayedMonth.value;

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  let startWeekDay = firstDayOfMonth.getDay(); // 0 = domenica
  startWeekDay = startWeekDay === 0 ? 6 : startWeekDay - 1;

  const daysFromPrevMonth = startWeekDay;
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;

  for (let i = prevMonthLastDay - daysFromPrevMonth + 1; i <= prevMonthLastDay; i++) {
    result.push({ date: i, month: prevMonth, year: prevYear, isCurrentMonth: false });
  }

  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    result.push({ date: i, month, year, isCurrentMonth: true });
  }

  const totalCells = Math.ceil(result.length / 7) * 7;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;

  for (let i = 1; i <= totalCells - result.length; i++) {
    result.push({ date: i, month: nextMonth, year: nextYear, isCurrentMonth: false });
  }

  return result;
});

const appointments = computed(() => [
  { date: 7, month: displayedMonth.value, year: displayedYear.value, carModel: 'Nissan Micra', serviceType: 'Tagliando', appointmentId: 'A1' },
  { date: 15, month: displayedMonth.value, year: displayedYear.value, carModel: 'Peugeot 208', serviceType: 'Cambio Gomme', appointmentId: 'A2' },
  { date: 22, month: displayedMonth.value, year: displayedYear.value, carModel: 'Ford Fiesta', serviceType: 'Revisione', appointmentId: 'A3' }
]);

const unavailableDays = computed(() => [
  { date: 9, month: displayedMonth.value, year: displayedYear.value },
  { date: 17, month: displayedMonth.value, year: displayedYear.value },
  { date: 26, month: displayedMonth.value, year: displayedYear.value }
]);

const isToday = (day: any) =>
  day.date === today.getDate() && day.month === today.getMonth() && day.year === today.getFullYear();

const hasAppointmentsOnDay = (day: any) =>
  appointments.value.some(app => app.date === day.date && app.month === day.month && app.year === day.year);

const getAppointmentsForDay = (day: any) =>
  appointments.value.filter(app => app.date === day.date && app.month === day.month && app.year === day.year);

const isDayUnavailable = (day: any) =>
  unavailableDays.value.some(d => d.date === day.date && d.month === day.month && d.year === day.year);

const showAppointmentDetails = (appointment: any) => {
  console.log('Dettagli appuntamento:', appointment);
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

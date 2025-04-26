<template>
  <div class="flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center">
    <h1 class="text-4xl font-semibold text-gray-500 mb-8">Orari</h1>

    <div v-for="day in days" :key="day.id" class="grid grid-cols-1 2xl:grid-cols-3">
      <TicDriveSlider
        :id="day.id"
        :name="day.label"
        :value="day"
        :isChecked="!!stepStore.stepFiveData.activeDays.find(d => d.id === day.id)"
        @update:check="handleCheckbox(day)"
      />

      <div v-if="!!stepStore.stepFiveData.activeDays.find(d => d.id === day.id)" class="col-span-2 px-2 grid grid-cols-8 mt-2 gap-1 sm:gap-0">
        <div class="col-span-6 sm:col-span-3 flex m-auto">
          <Calendar
            v-model="stepStore.stepFiveData.timeSlots[day.id][0].start"
            class="h-12 px-1 bg-gray-200 w-2/5"
            timeOnly
          />
          <h1 class="w-1/5 text-center leading-[48px]">–</h1>
          <Calendar
            v-model="stepStore.stepFiveData.timeSlots[day.id][0].end"
            class="h-12 px-1 bg-gray-200 w-2/5"
            timeOnly
            @blur="checkAndAdaptSecondSlot(day.id)"
          />
        </div>

        <div
          class="col-span-2 sm:col-span-1 text-center leading-[48px] hover:border hover:border-green-500 cursor-pointer"
          @click="plusHandle(day)"
        >
          +
        </div>

        <div
          v-if="stepStore.stepFiveData.timeSlots[day.id][1]?.start && stepStore.stepFiveData.timeSlots[day.id][1]?.end"
          class="col-span-6 sm:col-span-3 flex"
        >
          <Calendar
            v-model="stepStore.stepFiveData.timeSlots[day.id][1].start"
            class="w-2/5 h-12 px-1 bg-gray-200"
            timeOnly
          />
          <h1 class="w-1/5 text-center leading-[48px]">-</h1>
          <Calendar
            v-model="stepStore.stepFiveData.timeSlots[day.id][1].end"
            class="w-2/5 h-12 px-1 bg-gray-200"
            timeOnly
          />
        </div>

        <div
          v-if="stepStore.stepFiveData.timeSlots[day.id][1]?.start && stepStore.stepFiveData.timeSlots[day.id][1]?.end"
          class="col-span-2 sm:col-span-1 flex cursor-pointer"
          @click="removeHandle(day.id)"
        >
          <img class="h-6 w-6 m-auto" src="/images/delete.png" alt="delete" />
        </div>
      </div>
    </div>

    <PlusMinusField
      :label="'Numero massimo di veicoli gestibili al giorno:'"
      :numberValue="stepStore.stepFiveData.maxPerDay"
      :isMinusDisable="!stepStore.stepFiveData.maxPerDay"
      @update:number="updateMaxVehicle"
    />

    <div class="border-2 border-gray-500 p-4 flex flex-col sm:flex-row justify-between items-center mt-4 rounded-xl mb-10">
      <h1 class="text-lg text-gray-500 font-semibold">
        Servizi a domicilio disponibili?
      </h1>
      <div class="flex justify-between items-center gap-2">
        <div
          :class="[
            'w-20 h-12 leading-12 text-white font-semibold rounded text-xl text-center cursor-pointer',
            !stepStore.stepFiveData.homeService ? 'bg-green-500' : 'bg-gray-200',
          ]"
          @click="updateHomeService(false)"
        >
          No
        </div>
        <div
          :class="[
            'w-20 h-12 leading-12 text-white font-semibold rounded text-xl text-center cursor-pointer',
            stepStore.stepFiveData.homeService ? 'bg-green-500' : 'bg-gray-200',
          ]"
          @click="updateHomeService(true)"
        >
          Yes
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Calendar from 'primevue/calendar';
import TicDriveSlider from '~/components/ui/sliders/TicDriveSlider.vue';
import PlusMinusField from '~/components/PlusMinusField.vue';
import useStepStore from '~/store/step';
import type { Day } from '~/types/datetime/Day';

const stepStore = useStepStore();

// Static days
const days = [
  { id: 1, label: 'Lunedì' },
  { id: 2, label: 'Martedì' },
  { id: 3, label: 'Mercoledì' },
  { id: 4, label: 'Giovedì' },
  { id: 5, label: 'Venerdì' },
  { id: 6, label: 'Sabato' },
  { id: 7, label: 'Domenica' },
];

// Utilities
const stringToDate = (timeStr: string): Date | null => {
  const [hour, min] = timeStr.split(':').map(Number);
  if (isNaN(hour) || isNaN(min)) return null;
  const date = new Date();
  date.setHours(hour, min, 0, 0);
  return date;
};

// Handlers
const handleCheckbox = (day: Day) => {
  const index = stepStore.stepFiveData.activeDays.findIndex(d => d.id === day.id);
  if (index !== -1) {
    stepStore.stepFiveData.activeDays.splice(index, 1);
  } else {
    stepStore.stepFiveData.activeDays.push(day);
    stepStore.stepFiveData.timeSlots[day.id] = [
      {
        start: stringToDate('09:00'),
        end: stringToDate('13:00'),
      },
      {
        start: null,
        end: null,
      },
    ];
  }
};

const plusHandle = (day: Day) => {
  const firstSlotEnd = stepStore.stepFiveData.timeSlots[day.id][0]?.end;
  if (!firstSlotEnd) return;

  const newStart = new Date(firstSlotEnd.getTime() + 1 * 60 * 60 * 1000); // +1 hour
  stepStore.stepFiveData.timeSlots[day.id][1] = {
    start: newStart,
    end: new Date(newStart.getTime() + 3 * 60 * 60 * 1000), // +3h
  };
};

const checkAndAdaptSecondSlot = (dayId: number) => {
  const firstSlotEnd = stepStore.stepFiveData.timeSlots[dayId]?.[0]?.end;
  const secondSlotStart = stepStore.stepFiveData.timeSlots[dayId]?.[1]?.start;

  if (!firstSlotEnd || !secondSlotStart) return;

  if (secondSlotStart <= firstSlotEnd) {
    const newStart = new Date(firstSlotEnd.getTime() + 1 * 60 * 60 * 1000); // +1 hour
    stepStore.stepFiveData.timeSlots[dayId][1].start = newStart;
    stepStore.stepFiveData.timeSlots[dayId][1].end = new Date(newStart.getTime() + 3 * 60 * 60 * 1000); // +3h
  }
};

const removeHandle = (dayId: number) => {
  if (stepStore.stepFiveData.timeSlots[dayId][1]) {
    stepStore.stepFiveData.timeSlots[dayId][1] = { start: null, end: null };
  }
};

const updateMaxVehicle = (action: 'plus' | 'minus') => {
  if (action === 'plus') {
    stepStore.stepFiveData.maxPerDay++;
  } else if (action === 'minus' && stepStore.stepFiveData.maxPerDay > 0) {
    stepStore.stepFiveData.maxPerDay--;
  }
};

const updateHomeService = (isYes: boolean) => {
  stepStore.stepFiveData.homeService = isYes;
};
</script>

<style scoped>
.p-inputtext {
  text-align: center !important;
  padding: 10px 0px !important;
}

.p-inputtext:hover {
  cursor: pointer;
}

.p-datepicker-panel {
  z-index: 10 !important;
  background-color: #f3f3f3 !important;
}
</style>

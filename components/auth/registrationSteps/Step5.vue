<template>
  <div
    class="flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center"
  >
    <h1 class="text-4xl font-semibold text-gray-500 mb-8">Orari</h1>

    <div
      v-if="timeStore.loading"
      class="flex justify-center items-center overflow-auto h-80"
    >
      <UiSpinnersTicDriveSpinner />
    </div>
    <div
      v-else
      v-for="day in timeStore.days"
      :key="day.id"
      class="grid grid-cols-1 2xl:grid-cols-3"
    >
      <TicDriveSlider
        :id="day.id"
        :name="day.label"
        :value="day"
        :isChecked="
          !!stepStore.stepFiveData.activeDays.find(d => d.id === day.id)
        "
        @update:check="handleCheckbox(day)"
      />

      <div
        v-if="!!stepStore.stepFiveData.activeDays.find(d => d.id === day.id)"
        class="col-span-2 px-2 grid grid-cols-8 mt-2 gap-1 sm:gap-0 flex items-center"
      >
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
          @click="plusHandle(day)"
          class="col-span-2 sm:col-span-1 flex items-center justify-center h-10 w-10 mx-auto border border-gray-300 rounded-md text-gray-600 text-lg font-semibold cursor-pointer hover:bg-gray-100 hover:shadow-sm active:scale-95 transition-all duration-150"
          aria-label="Aggiungi orario"
        >
          +
        </div>

        <div
          v-if="
            stepStore.stepFiveData.timeSlots[day.id][1]?.start &&
            stepStore.stepFiveData.timeSlots[day.id][1]?.end
          "
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
          v-if="
            stepStore.stepFiveData.timeSlots[day.id][1]?.start &&
            stepStore.stepFiveData.timeSlots[day.id][1]?.end
          "
          @click="removeHandle(day.id)"
          class="col-span-2 sm:col-span-1 flex items-center justify-center h-10 w-10 mx-auto border border-gray-300 rounded-md text-gray-500 hover:text-red-500 hover:border-red-400 cursor-pointer transition-all duration-150"
          aria-label="Rimuovi orario"
        >
          <Trash class="w-5 h-5" />
        </div>
      </div>
    </div>

    <div
      class="border-2 border-gray-500 p-4 flex flex-col sm:flex-row justify-between items-center mt-4 rounded-xl mb-10"
    >
      <h1 class="text-lg text-gray-500 font-semibold">
        Servizi a domicilio disponibili?
      </h1>
      <div class="flex justify-between items-center gap-2">
        <div
          :class="[
            'w-20 h-12 leading-12 text-white font-semibold rounded text-xl text-center cursor-pointer flex justify-center items-center',
            !stepStore.stepFiveData.homeService
              ? 'bg-green-500'
              : 'bg-gray-200',
          ]"
          @click="updateHomeService(false)"
        >
          <p>No</p>
        </div>
        <div
          :class="[
            'w-20 h-12 leading-12 text-white font-semibold rounded text-xl text-center cursor-pointer flex justify-center items-center',
            stepStore.stepFiveData.homeService ? 'bg-green-500' : 'bg-gray-200',
          ]"
          @click="updateHomeService(true)"
        >
          <p>Si</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Calendar from 'primevue/calendar';
import TicDriveSlider from '~/components/ui/sliders/TicDriveSlider.vue';
import useStepStore from '~/store/step';
import type {Day} from '~/types/datetime/Day';
import useTimeStore from '~/store/time';
import {Trash} from 'lucide-vue-next';

const stepStore = useStepStore();
const timeStore = useTimeStore();

timeStore.getDays();

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
  const index = stepStore.stepFiveData.activeDays.findIndex(
    d => d.id === day.id,
  );
  if (index !== -1) {
    stepStore.stepFiveData.activeDays.splice(index, 1);
  } else {
    stepStore.stepFiveData.activeDays.push(day);
    stepStore.stepFiveData.timeSlots[day.id] = [
      {
        start: stringToDate('08:30'),
        end: stringToDate('12:30'),
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

  const newStart = new Date(firstSlotEnd.getTime() + 2 * 60 * 60 * 1000);
  stepStore.stepFiveData.timeSlots[day.id][1] = {
    start: newStart,
    end: new Date(newStart.getTime() + 4 * 60 * 60 * 1000),
  };
};

const checkAndAdaptSecondSlot = (dayId: number) => {
  const firstSlotEnd = stepStore.stepFiveData.timeSlots[dayId]?.[0]?.end;
  const secondSlotStart = stepStore.stepFiveData.timeSlots[dayId]?.[1]?.start;

  if (!firstSlotEnd || !secondSlotStart) return;

  if (secondSlotStart <= firstSlotEnd) {
    const newStart = new Date(firstSlotEnd.getTime() + 2 * 60 * 60 * 1000);
    stepStore.stepFiveData.timeSlots[dayId][1].start = newStart;
    stepStore.stepFiveData.timeSlots[dayId][1].end = new Date(
      newStart.getTime() + 4 * 60 * 60 * 1000,
    );
  }
};

const removeHandle = (dayId: number) => {
  if (stepStore.stepFiveData.timeSlots[dayId][1]) {
    stepStore.stepFiveData.timeSlots[dayId][1] = {start: null, end: null};
  }
};

const updateHomeService = (isYes: boolean) => {
  stepStore.stepFiveData.homeService = isYes;
};
</script>

<style scoped>
:deep(.p-inputtext) {
  text-align: center !important;
  padding: 0;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  background-color: #f9fafb;
  transition: all 0.2s ease-in-out;
  font-size: 1rem;
  color: #374151;
}

:deep(.p-inputtext:focus) {
  border-color: #10b981 !important; /* Tailwind: green-500 */
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2) !important;
  outline: none !important;
}

:deep(.p-inputwrapper.p-focus) {
  box-shadow: none !important;
}

:deep(.p-datepicker .p-datepicker-buttonbar button),
:deep(.p-datepicker .p-datepicker-prev),
:deep(.p-datepicker .p-datepicker-next),
:deep(.p-datepicker .p-datepicker-today),
:deep(.p-datepicker .p-datepicker-clear-button) {
  background-color: #10b981 !important;
  color: white !important;
  border: none !important;
  border-radius: 0.375rem !important;
  padding: 0.4rem 0.75rem;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

:deep(.p-datepicker .p-datepicker-prev:hover),
:deep(.p-datepicker .p-datepicker-next:hover),
:deep(.p-datepicker .p-datepicker-today:hover),
:deep(.p-datepicker .p-datepicker-clear-button:hover),
:deep(.p-datepicker .p-datepicker-buttonbar button:hover) {
  background-color: #059669 !important;
}

:deep(.p-datepicker td.p-datepicker-today > span.p-highlight) {
  background-color: #10b981 !important;
  color: white !important;
  border-radius: 9999px !important;
}

.p-inputwrapper {
  background-color: white;
  width: fit-content;
}
</style>

<template>
  <div
    class="mx-auto flex w-full max-w-3xl flex-col justify-center px-4 pb-2 pt-2 sm:px-6"
  >
    <div
      class="rounded-[28px] border border-gray-200 bg-white/90 p-5 shadow-sm sm:p-6"
    >
      <div
        class="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 sm:flex sm:items-start sm:justify-between sm:gap-4"
      >
        <div class="min-w-0">
          <h1 class="text-2xl font-semibold leading-tight text-gray-600 sm:text-3xl">
            Orari
          </h1>
          <p class="mt-2 max-w-xl text-sm leading-5 text-gray-500">
            Seleziona i giorni in cui l'officina e aperta e imposta una o due
            fasce orarie. La seconda fascia e utile se fai pausa pranzo o hai
            un'apertura pomeridiana separata.
          </p>
        </div>

        <div
          :class="[
            'mt-3 inline-flex rounded-full px-3 py-1.5 text-sm font-semibold sm:mt-0 sm:flex-shrink-0',
            activeDaysCount
              ? 'bg-green-50 text-drive'
              : 'bg-white text-gray-500',
          ]"
        >
          {{ activeDaysCount }}
          {{ activeDaysCount === 1 ? 'giorno attivo' : 'giorni attivi' }}
        </div>
      </div>

      <div
        v-if="timeStore.loading"
        class="flex h-80 items-center justify-center overflow-auto"
      >
        <UiSpinnersTicDriveSpinner />
      </div>

      <div v-else class="mt-6 space-y-3">
        <div class="mb-1">
          <h2 class="text-sm font-semibold uppercase tracking-[0.18em] text-gray-400">
            Giorni di apertura
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            Attiva i giorni e aggiungi la seconda fascia solo quando serve.
          </p>
        </div>

        <div
          v-if="!activeDaysCount"
          class="rounded-2xl border border-dashed border-gray-200 bg-gray-50/70 px-4 py-4 text-sm text-gray-500"
        >
          Seleziona almeno un giorno per configurare gli orari di apertura.
        </div>

        <div
          v-for="day in timeStore.days"
          :key="day.id"
          :class="[
            'overflow-hidden rounded-[24px] border transition-all duration-200',
            isDayActive(day.id)
              ? 'border-green-200 bg-green-50/50'
              : 'border-gray-200 bg-white',
          ]"
        >
          <TicDriveSlider
            :id="day.id"
            :name="day.label"
            :value="day"
            :isChecked="isDayActive(day.id)"
            @update:check="handleCheckbox(day)"
          />

          <div
            v-if="isDayActive(day.id)"
            class="border-t border-green-100 bg-white/85 px-3 py-3 sm:px-4"
          >
            <div class="space-y-2.5">
              <div class="rounded-[20px] border border-green-100 bg-green-50/40 p-2.5 sm:p-3">
                <div class="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p class="text-sm font-semibold text-gray-700">
                      Fascia principale
                    </p>
                    <p class="text-xs text-gray-400">
                      Orario base di apertura.
                    </p>
                  </div>

                  <div class="flex flex-wrap items-center gap-2">
                    <button
                      v-if="!hasSecondSlot(day.id)"
                      type="button"
                      class="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-3 py-1.5 text-sm font-semibold text-drive transition hover:bg-green-50"
                      @click="plusHandle(day)"
                    >
                      <Plus class="h-4 w-4" />
                      Aggiungi seconda fascia
                    </button>
                  </div>
                </div>

                <div
                  class="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-[108px_minmax(0,1fr)_24px_minmax(0,1fr)] sm:items-end"
                >
                  <div class="sm:pb-1">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                      Fascia 1
                    </p>
                    <p class="mt-1 text-xs text-gray-500">
                      Apertura principale.
                    </p>
                  </div>

                  <div>
                    <p class="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                      Dalle
                    </p>
                    <Calendar
                      v-model="stepStore.stepFiveData.timeSlots[day.id][0].start"
                      class="w-full"
                      timeOnly
                      hourFormat="24"
                      :stepMinute="30"
                      :manualInput="false"
                    />
                  </div>

                  <div
                    class="hidden h-11 items-center justify-center text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-300 sm:flex"
                  >
                    a
                  </div>

                  <div>
                    <p class="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                      Alle
                    </p>
                    <Calendar
                      v-model="stepStore.stepFiveData.timeSlots[day.id][0].end"
                      class="w-full"
                      timeOnly
                      hourFormat="24"
                      :stepMinute="30"
                      :manualInput="false"
                      @blur="checkAndAdaptSecondSlot(day.id)"
                    />
                  </div>
                </div>
              </div>

              <div
                v-if="hasSecondSlot(day.id)"
                class="rounded-[20px] border border-gray-200 bg-gray-50/80 p-2.5 sm:p-3"
              >
                <div class="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p class="text-sm font-semibold text-gray-700">
                      Seconda fascia
                    </p>
                    <p class="text-xs text-gray-400">
                      Solo se riapri nel pomeriggio.
                    </p>
                  </div>

                  <div class="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      class="inline-flex items-center gap-2 rounded-full border border-red-100 bg-white px-3 py-1.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                      @click="removeHandle(day.id)"
                    >
                      <Trash2 class="h-4 w-4" />
                      Rimuovi seconda fascia
                    </button>
                  </div>
                </div>

                <div
                  class="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-[108px_minmax(0,1fr)_24px_minmax(0,1fr)] sm:items-end"
                >
                  <div class="sm:pb-1">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                      Fascia 2
                    </p>
                    <p class="mt-1 text-xs text-gray-500">
                      Riapertura o pausa pranzo.
                    </p>
                  </div>

                  <div>
                    <p class="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                      Dalle
                    </p>
                    <Calendar
                      v-model="stepStore.stepFiveData.timeSlots[day.id][1].start"
                      class="w-full"
                      timeOnly
                      hourFormat="24"
                      :stepMinute="30"
                      :manualInput="false"
                    />
                  </div>

                  <div
                    class="hidden h-11 items-center justify-center text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-300 sm:flex"
                  >
                    a
                  </div>

                  <div>
                    <p class="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                      Alle
                    </p>
                    <Calendar
                      v-model="stepStore.stepFiveData.timeSlots[day.id][1].end"
                      class="w-full"
                      timeOnly
                      hourFormat="24"
                      :stepMinute="30"
                      :manualInput="false"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeDaysCount" class="pt-1">
          <div
            class="inline-flex rounded-full bg-green-50 px-3 py-1.5 text-sm font-semibold text-drive"
          >
            {{ activeDaysCount }}
            {{ activeDaysCount === 1 ? 'giorno configurato' : 'giorni configurati' }}
          </div>
        </div>
      </div>

      <div
        class="mt-6 rounded-[28px] border border-gray-200 bg-gray-50/80 p-4 sm:p-5"
      >
        <div class="sm:flex sm:items-center sm:justify-between sm:gap-4">
          <div>
            <h2 class="text-lg font-semibold text-gray-700">
              Servizi a domicilio
            </h2>
            <p class="mt-2 text-sm leading-6 text-gray-500">
              Indica se offri anche interventi fuori sede.
            </p>
          </div>

          <div class="mt-4 grid grid-cols-2 gap-3 sm:mt-0 sm:min-w-[220px]">
            <button
              type="button"
              :class="homeServiceButtonClass(false)"
              @click="updateHomeService(false)"
            >
              No
            </button>
            <button
              type="button"
              :class="homeServiceButtonClass(true)"
              @click="updateHomeService(true)"
            >
              Si
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Calendar from 'primevue/calendar';
import {computed, onMounted} from 'vue';
import TicDriveSlider from '~/components/ui/sliders/TicDriveSlider.vue';
import useStepStore from '~/store/step';
import type {Day} from '~/types/datetime/Day';
import useTimeStore from '~/store/time';
import {Plus, Trash2} from 'lucide-vue-next';

const stepStore = useStepStore();
const timeStore = useTimeStore();

onMounted(() => {
  if (!timeStore.days.length && !timeStore.loading) {
    timeStore.getDays();
  }

  normalizeAllTimeSlots();
});

const activeDaysCount = computed(() => stepStore.stepFiveData.activeDays.length);

// Utilities
const stringToDate = (timeStr: string): Date | null => {
  const [hour, min] = timeStr.split(':').map(Number);
  if (isNaN(hour) || isNaN(min)) return null;
  const date = new Date();
  date.setHours(hour, min, 0, 0);
  return date;
};

const normalizeDateValue = (value: unknown): Date | null => {
  if (!value) return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  if (typeof value === 'string') {
    const trimmedValue = value.trim();
    if (!trimmedValue) return null;

    if (/^\d{2}:\d{2}$/.test(trimmedValue)) {
      return stringToDate(trimmedValue);
    }

    const parsedDate = new Date(trimmedValue);
    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
  }

  return null;
};

const normalizeDaySlots = (dayId: number) => {
  const slots = stepStore.stepFiveData.timeSlots[dayId];
  if (!Array.isArray(slots)) return;

  stepStore.stepFiveData.timeSlots[dayId] = slots.map(slot => ({
    start: normalizeDateValue(slot?.start),
    end: normalizeDateValue(slot?.end),
  }));
};

const normalizeAllTimeSlots = () => {
  Object.keys(stepStore.stepFiveData.timeSlots).forEach(dayId => {
    normalizeDaySlots(Number(dayId));
  });
};

// Handlers
const handleCheckbox = (day: Day) => {
  const index = stepStore.stepFiveData.activeDays.findIndex(
    d => d.id === day.id,
  );
  if (index !== -1) {
    stepStore.stepFiveData.activeDays.splice(index, 1);
    delete stepStore.stepFiveData.timeSlots[day.id];
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

const isDayActive = (dayId: number) => {
  return stepStore.stepFiveData.activeDays.some(day => day.id === dayId);
};

const hasSecondSlot = (dayId: number) => {
  return Boolean(
    stepStore.stepFiveData.timeSlots[dayId]?.[1]?.start &&
      stepStore.stepFiveData.timeSlots[dayId]?.[1]?.end,
  );
};

const plusHandle = (day: Day) => {
  if (hasSecondSlot(day.id)) return;

  const firstSlotEnd = normalizeDateValue(
    stepStore.stepFiveData.timeSlots[day.id][0]?.end,
  );
  if (!firstSlotEnd) return;

  const newStart = new Date(firstSlotEnd.getTime() + 2 * 60 * 60 * 1000);
  stepStore.stepFiveData.timeSlots[day.id][1] = {
    start: newStart,
    end: new Date(newStart.getTime() + 4 * 60 * 60 * 1000),
  };
};

const checkAndAdaptSecondSlot = (dayId: number) => {
  const firstSlotEnd = normalizeDateValue(
    stepStore.stepFiveData.timeSlots[dayId]?.[0]?.end,
  );
  const secondSlotStart = normalizeDateValue(
    stepStore.stepFiveData.timeSlots[dayId]?.[1]?.start,
  );

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

const homeServiceButtonClass = (value: boolean) => {
  const isActive = stepStore.stepFiveData.homeService === value;

  return [
    'rounded-2xl px-4 py-3 text-base font-semibold transition-all duration-200',
    isActive
      ? 'bg-drive text-white shadow-sm'
      : 'bg-white text-gray-500 ring-1 ring-inset ring-gray-200 hover:bg-gray-100',
  ];
};
</script>

<style scoped>
:deep(.p-calendar) {
  width: 100%;
}

:deep(.p-inputtext) {
  width: 100%;
  min-height: 2.75rem;
  text-align: center !important;
  padding: 0 0.65rem;
  border-radius: 0.8rem;
  border: 1px solid #d1d5db;
  background-color: #f9fafb;
  transition: all 0.2s ease-in-out;
  font-size: 0.9rem;
  color: #374151;
  font-weight: 600;
}

:deep(.p-inputtext:focus) {
  border-color: #10b981 !important;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2) !important;
  outline: none !important;
}

:deep(.p-inputwrapper) {
  width: 100%;
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
</style>

<template>
  <div
    class="step-4 flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center"
  >
    <h1 class="text-4xl font-semibold text-gray-500 mb-8">Orari</h1>

    <div
      v-for="(day, index) in serviceDays"
      :key="index"
      class="grid grid-cols-1 2xl:grid-cols-3"
    >
      <CheckBox
        :label="day.label"
        :value="day.value"
        :isCheck="
          stepValues.currentServiceDays.some(d => d.value === day.value)
        "
        @update:isCheck="handleCheckbox"
      />
      <div
        class="col-span-2 px-2 grid grid-cols-8 mt-2 gap-1 sm:gap-0"
        v-if="stepValues.currentServiceDays.some(d => d.value === day.value)"
      >
        <div class="col-span-6 sm:col-span-3 flex m-auto">
          <DatePicker
            v-model="timeSlots[day.value][0].start"
            class="h-12 px-1 bg-gray-200 w-2/5"
            timeOnly
            fluid
            @blur="updateTime(day.value)"
          />
          <h1 class="w-1/5 text-center leading-[48px]">–</h1>
          <DatePicker
            v-model="timeSlots[day.value][0].end"
            class="h-12 px-1 bg-gray-200 w-2/5"
            timeOnly
            fluid
            @blur="updateTime(day.value)"
          />
        </div>

        <div
          class="col-span-2 sm:col-span-1 text-center leading-[48px] hover:border hover:border-green-500 cursor-pointer"
          @click="plusHandle(day.value)"
        >
          +
        </div>

        <div
          v-if="timeSlots[day.value][1].start && timeSlots[day.value][1].end"
          class="col-span-6 sm:col-span-3 flex"
        >
          <DatePicker
            v-model="timeSlots[day.value][1].start"
            class="w-2/5 h-12 px-1 bg-gray-200"
            timeOnly
            fluid
            @blur="updateTime(day.value)"
          />
          <h1 class="w-1/5 text-center leading-[48px]">-</h1>
          <DatePicker
            v-model="timeSlots[day.value][1].end"
            class="w-2/5 h-12 px-1 bg-gray-200"
            timeOnly
            fluid
            @blur="updateTime(day.value)"
          />
        </div>

        <div
          v-if="timeSlots[day.value][1].start && timeSlots[day.value][1].end"
          class="col-span-2 sm:col-span-1 flex cursor-pointer"
          @click="removeHandle(day.value)"
        >
          <img class="h-6 w-6 m-auto" src="/images/delete.png" alt="delete" />
        </div>
      </div>
    </div>

    <PlusMinusField
      :label="'Numero massimo di veicoli gestibili contemporaneamente:'"
      :numberValue="stepValues.maxVehicleNumber"
      :isMinusDisable="!stepValues.maxVehicleNumber"
      @update:number="updateMaxVehicle"
    />

    <div
      class="border-2 border-gray-500 p-4 flex flex-col sm:flex-row justify-between items-center mt-4 rounded-xl mb-10"
    >
      <h1 class="text-lg text-gray-500 font-semibold">
        Servizi a domicilio disponibili?
      </h1>
      <div class="flex justify-between items-center gap-2">
        <div
          :class="[
            'w-20 h-12 leading-12 text-white font-semibold rounded text-xl text-center cursor-pointer',
            homeService ? 'bg-gray-200' : 'bg-gray-500',
          ]"
          @click="updateHomeService(false)"
        >
          No
        </div>
        <div
          :class="[
            'w-20 h-12 leading-12 text-white font-semibold rounded text-xl text-center cursor-pointer',
            homeService ? 'bg-green-500' : 'bg-green-200',
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
import {defineProps, defineEmits, ref, computed} from 'vue';
import DatePicker from 'primevue/datepicker';
import useStepStore from '~/store/step';

interface ServiceTime {
  start: string;
  end: string;
}
interface ServiceDay {
  value: number;
  serviceTime1: ServiceTime;
  serviceTime2: ServiceTime;
}
interface StepFiveData {
  currentServiceDays: ServiceDay[];
  maxVehicleNumber: number;
  homeService: boolean;
}

const serviceDays = [
  {value: 1, label: 'Lunedì'},
  {value: 2, label: 'Martedì'},
  {value: 3, label: 'Mercoledì'},
  {value: 4, label: 'Giovedì'},
  {value: 5, label: 'Venerdì'},
  {value: 6, label: 'Sabato'},
  {value: 7, label: 'Domenica'},
];

const props = defineProps<{
  stepValues: StepFiveData;
}>();

const emit = defineEmits<{
  (e: 'update:isCheck', value: number): void;
  (e: 'update:plus', value: number): void;
  (e: 'update:remove', value: number): void;
}>();

const useStore = useStepStore();
const homeService = ref(props.stepValues.homeService);

const stringToDate = (timeStr: string): Date | null => {
  const [hour, min] = timeStr.split(':').map(Number);
  if (isNaN(hour) || isNaN(min)) return null;
  const date = new Date();
  date.setHours(hour, min, 0, 0);
  return date;
};

const dateToString = (timeDate: Date | null): string => {
  if (!timeDate) return '';
  const hours = timeDate.getHours().toString().padStart(2, '0');
  const min = timeDate.getMinutes().toString().padStart(2, '0');
  return `${hours}:${min}`;
};

const timeSlots = computed(() => {
  const slots: Record<number, {start: Date | null; end: Date | null}[]> = {};
  serviceDays.forEach(day => {
    const service = props.stepValues.currentServiceDays.find(
      d => d.value === day.value,
    );
    if (service) {
      slots[day.value] = [
        {
          start: stringToDate(service.serviceTime1.start),
          end: stringToDate(service.serviceTime1.end),
        },
        {
          start: stringToDate(service.serviceTime2.start),
          end: stringToDate(service.serviceTime2.end),
        },
      ];
    } else {
      slots[day.value] = [
        {start: stringToDate('09:00'), end: stringToDate('12:00')},
        {start: null, end: null},
      ];
    }
  });
  return slots;
});

const handleCheckbox = (value: number) => {
  emit('update:isCheck', value);
};

const plusHandle = (value: number) => {
  emit('update:plus', value);
};

const removeHandle = (value: number) => {
  emit('update:remove', value);
};

const updateTime = (dayValue: number) => {
  const index = props.stepValues.currentServiceDays.findIndex(
    d => d.value === dayValue,
  );
  if (index !== -1) {
    const slot = timeSlots.value[dayValue];
    const item = props.stepValues.currentServiceDays[index];
    item.serviceTime1.start = dateToString(slot[0].start);
    item.serviceTime1.end = dateToString(slot[0].end);
    item.serviceTime2.start = dateToString(slot[1].start);
    item.serviceTime2.end = dateToString(slot[1].end);
  }
};

const updateMaxVehicle = (action: 'plus' | 'minus') => {
  const value = useStore.stepFiveData.maxVehicleNumber;
  if (action === 'plus') {
    useStore.stepFiveData.maxVehicleNumber = value + 1;
  } else if (action === 'minus' && value > 0) {
    useStore.stepFiveData.maxVehicleNumber = value - 1;
  }
};

const updateHomeService = (isYes: boolean) => {
  homeService.value = isYes;
  useStore.stepFiveData.homeService = isYes;
};
</script>

<style>
.p-inputtext {
  text-align: center !important;
}
.p-inputtext:hover {
  cursor: pointer;
}
.p-datepicker-panel {
  z-index: 10 !important;
  background-color: #f3f3f3 !important;
}
.p-inputtext {
  padding: 10px 0px !important;
}
</style>

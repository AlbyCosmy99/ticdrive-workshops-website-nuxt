<template>
    <div class="step-4 flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center">
        <h1 class="text-4xl font-semibold text-gray-500 mb-8">Orari</h1>
        <div 
            v-for="(value, index) in serviceDays" 
            :key="index"
            class="grid grid-cols-1 lg:grid-cols-3"
        >
            <CheckBox         
                :label="value.label"
                :value="value.value"
                :isCheck="props.stepValues.currentServiceDays.some(day => day.value === value.value)"
                @update:isCheck="handleCheckbox"
            />
            <div 
                class="col-span-2 px-2 grid grid-cols-8 mt-2"
                v-if="props.stepValues.currentServiceDays.some(day => day.value === value.value)"
            >
                <div class="col-span-3 flex m-auto">
                    <DatePicker
                        v-model="timeSlots[value.value][0]['start']"
                        class="h-12 px-1 bg-gray-200 w-2/5"
                        timeOnly 
                        fluid
                    />
                    <h1 class="w-1/5 text-center leading-[48px]">–</h1>
                    <DatePicker
                        v-model="timeSlots[value.value][0]['end']"
                        class="h-12 px-1 bg-gray-200 w-2/5"
                        timeOnly 
                        fluid 
                    />
                </div>
                <div 
                    class="col-span-1 text-center leading-[48px] hover:border hover:border-green-500 cursor-pointer"
                    @click="plusHandle(value.value)"
                >
                    +                    
                </div>
                <div 
                    v-if="timeSlots[value.value][1]['start'] && timeSlots[value.value][1]['end']"
                    class="col-span-3 flex"
                >
                    <DatePicker
                        v-model="timeSlots[value.value][1]['start']"
                        class="w-2/5 h-12 px-1 bg-gray-200"
                        timeOnly 
                        fluid 
                    />
                    <h1 class="w-1/5 text-center leading-[48px]">-</h1>
                    <DatePicker
                        v-model="timeSlots[value.value][1]['end']"
                        class="w-2/5 h-12 px-1 bg-gray-200"
                        timeOnly 
                        fluid 
                    />
                </div>
                <div 
                    v-if="timeSlots[value.value][1]['start'] && timeSlots[value.value][1]['end']" 
                    class="col-span-1 flex cursor-pointer"
                >
                    <img class="h-6 w-6 m-auto" src="/images/delete.png" alt="delete" />          
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { defineProps, defineEmits } from 'vue';
    import PrimeVue from 'primevue/config';
    import DatePicker from 'primevue/datepicker';

    const app = getCurrentInstance();
    if(app) {
        app.appContext.app.use(PrimeVue);
    }


    const serviceDays = [
        { value: 1, label: 'Lunedì' },
        { value: 2, label: 'Martedì' },
        { value: 3, label: 'Mercoledì' },
        { value: 4, label: 'Giovedì' },
        { value: 5, label: 'Venerdì' },
        { value: 6, label: 'Sabato' },
        { value: 7, label: 'Domenica' },
    ]

    const emit = defineEmits(['update:isCheck', 'update:plus']);
    const props = defineProps<{
        stepValues: any
    }>();
    
    const stringToDate = (timeStr: string) => {
        const [hour, min] = timeStr.split(':').map(Number);
        const date = new Date();
        date.setHours(hour, min, 0, 0);
        return date;
    }
    const dateToString = (timeDate: Date) => {
        const hours = timeDate.getHours().toString().padStart(2, '0');
        const min = timeDate.getMinutes().toString().padStart(2, '0');
        return `${hours}:${min}`;
    }

    const timeSlots = computed(() => {
        const slots: { [key: number]: { start: Date | null, end: Date | null }[] } = {};

        serviceDays.forEach(day => {
            const dayServiceTimes = props.stepValues.currentServiceDays.find((d: any) => d.value === day.value);
            
            if (dayServiceTimes) {
                slots[day.value] = [
                    { start: stringToDate(dayServiceTimes.serviceTime1.start), end: stringToDate(dayServiceTimes.serviceTime1.end) },
                    { start: stringToDate(dayServiceTimes.serviceTime2.start), end: stringToDate(dayServiceTimes.serviceTime2.end) }
                ];
            } else {
                slots[day.value] = [
                    { start: stringToDate('09:00'), end: stringToDate('12:00') },
                    { start: null, end: null }
                ];
            }
        });

        return slots;
    });

    const handleCheckbox = (value: any) => {
        emit('update:isCheck', value);
    }
    const plusHandle = (value: any) => {
        emit('update:plus', value);
    }
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
        background-color: #F3F3F3 !important;
    }
</style>
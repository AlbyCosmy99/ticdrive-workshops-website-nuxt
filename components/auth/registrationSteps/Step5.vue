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
                        @blur="updateTime(value.value)"
                    />
                    <h1 class="w-1/5 text-center leading-[48px]">–</h1>
                    <DatePicker
                        v-model="timeSlots[value.value][0]['end']"
                        class="h-12 px-1 bg-gray-200 w-2/5"
                        timeOnly 
                        fluid 
                        @blur="updateTime(value.value)"
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
                        @blur="updateTime(value.value)"
                    />
                    <h1 class="w-1/5 text-center leading-[48px]">-</h1>
                    <DatePicker
                        v-model="timeSlots[value.value][1]['end']"
                        class="w-2/5 h-12 px-1 bg-gray-200"
                        timeOnly 
                        fluid 
                        @blur="updateTime(value.value)"
                    />
                </div>
                <div 
                    v-if="timeSlots[value.value][1]['start'] && timeSlots[value.value][1]['end']" 
                    class="col-span-1 flex cursor-pointer"
                    @click="removeHandle(value.value)"
                >
                    <img class="h-6 w-6 m-auto" src="/images/delete.png" alt="delete" />          
                </div>
            </div>
        </div>
        <PlusMinusField 
            :label="'Numero massimo di veicoli gestibili contemporaneamente:'"
            :numberValue="useStore.step_four_value.maxVehicleNumber"
            :isMinusDisable="!useStore.step_four_value.maxVehicleNumber"
            @update:number="updateMaxVehicle($event)"
        />
        <div class="border-2 border-gray-500 p-4 flex flex-col sm:flex-row justify-between items-center mt-4 rounded-xl mb-10">
            <h1 class="text-lg text-gray-500 font-semibold">Servizi a domicilio disponibili?</h1>
            <div class="flex justify-between items-center gap-2">
                <div 
                    :class="[
                        'w-20 h-12 leading-12 text-white font-semibold rounded text-xl text-center cursor-pointer',
                        homeService ? 'bg-gray-200' : 'bg-gray-500'
                    ]"
                    @click="updateHomeService('no')"
                >
                    No
                </div>
                <div 
                    :class="[
                        'w-20 h-12 leading-12 text-white font-semibold rounded text-xl text-center cursor-pointer',
                        homeService ? 'bg-green-500' : 'bg-green-200'
                    ]"
                    @click="updateHomeService('yes')"
                >
                    Yes
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { defineProps, defineEmits, ref } from 'vue';
    import PrimeVue from 'primevue/config';
    import DatePicker from 'primevue/datepicker';
    import useStepStore from '~/store/step';

    const app = getCurrentInstance();
    if(app) {
        app.appContext.app.use(PrimeVue);
    }

    const useStore = useStepStore();

    const homeService = ref(useStore.step_four_value.homeService);
    const serviceDays = [
        { value: 1, label: 'Lunedì' },
        { value: 2, label: 'Martedì' },
        { value: 3, label: 'Mercoledì' },
        { value: 4, label: 'Giovedì' },
        { value: 5, label: 'Venerdì' },
        { value: 6, label: 'Sabato' },
        { value: 7, label: 'Domenica' },
    ]

    const emit = defineEmits(['update:isCheck', 'update:plus', 'update:remove']);
    const props = defineProps<{
        stepValues: any
    }>();
    
    const stringToDate = (timeStr: string) => {
        const [hour, min] = timeStr.split(':').map(Number);
        if (isNaN(hour) || isNaN(min)) return null; // Handle invalid input

        const date = new Date();
        date.setHours(hour, min, 0, 0);
        return date;
    }
    const dateToString = (timeDate: Date) => {
        if(timeDate) {
            const hours = timeDate.getHours().toString().padStart(2, '0');
            const min = timeDate.getMinutes().toString().padStart(2, '0');
            console.log(`${hours}:${min}`);
            return `${hours}:${min}`;
        } else {
            return '';
        }
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
    const removeHandle = (value: any) => {
        emit('update:remove', value);
    }
    const updateTime = (dayValue: number) => {
        const index = props.stepValues.currentServiceDays.findIndex((d:any) => d.value === dayValue );
        useStore.step_four_value.currentServiceDays[index].serviceTime1.start = dateToString(timeSlots.value[dayValue][0]['start']);
        useStore.step_four_value.currentServiceDays[index].serviceTime1.end = dateToString(timeSlots.value[dayValue][0]['end']);
        useStore.step_four_value.currentServiceDays[index].serviceTime2.start = dateToString(timeSlots.value[dayValue][1]['start']);
        useStore.step_four_value.currentServiceDays[index].serviceTime2.end = dateToString(timeSlots.value[dayValue][1]['end']);
    }
    const updateMaxVehicle = (value) => {
        if(value === 'minus') {
            if(!useStore.step_four_value.maxVehicleNumber) {
                return ;
            }
            console.log(value);
            useStore.step_four_value.maxVehicleNumber = useStore.step_four_value.maxVehicleNumber-1;
        } else {
            useStore.step_four_value.maxVehicleNumber = useStore.step_four_value.maxVehicleNumber+1;
        }
    }
    const updateHomeService = (value: string) => {
        homeService.value = value === 'yes' ? true : false;
        useStore.step_four_value.homeService = value === 'yes' ? true : false;
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
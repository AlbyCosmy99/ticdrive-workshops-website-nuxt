<template>
    <div class="px-3 w-full">
        <Step1 
            v-if="currentStep === 0" 
            ref="stepZeroRef"
            v-model:stepValues="useStore.step_zero_value"
            @updateStepValues="checkToggle"
        />
        <Step2 
            v-if="currentStep === 1"
            ref="stepOneRef"
            v-model:stepValues="useStore.step_one_value"
        />
        <Step3 
            v-if="currentStep === 2"
            ref="stepTwoRef"
            v-model:stepValues="useStore.step_two_value"
            @update:isCheck="toggleMultiSelect('workShopSpec', $event)"
        />
        <Step4 
            v-if="currentStep === 3"
            ref="stepThreeRef"
            v-model:stepValues="useStore.step_three_value"
            @update:isCheck="toggleMultiSelect('serviceType', $event)"
        />
        <Step5 
            v-if="currentStep === 4"
            ref="stepFourRef"
            v-model:stepValues="useStore.step_four_value"
            @update:isCheck="toggleMultiSelect('serviceDay', $event)"
            @update:plus="plusServiceTime($event)"
            @update:remove="removeServiceTime($event)"
        />
        <Step6 
            v-if="currentStep === 5"
            ref="stepFiveRef"
        />
        <Step7 
            v-if="currentStep === 6"
            ref="stepSixRef"
            v-model:stepValues="useStore.step_six_value"
        />
        <Step8 
            v-if="currentStep === 7"
            ref="stepSevenRef"
            v-model:stepValues="useStore.step_seven_value"
        />
        <div class="flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Button 
                    label="Indietro"
                    customClass="mt-4 bg-gray-500"
                    color="gray"
                    :disable="!currentStep"
                    @click="prevStep(currentStep)"
                />
                <Button 
                    label="Avanti"
                    customClass="mt-4"
                    :disable="buttonDisableStatus"
                    @click="nextStep(currentStep)"
                />
            </div>
            <div
                v-if="!currentStep" 
                class="flex text-center mt-3 justify-center"
            >
                <h1 class="text-black text-md">Sono già partner?</h1>
                <h1 
                    class="text-green-500 text-md ms-2 hover:underline hover:text-green-600 cursor-pointer"
                    @click="navigateTo('/auth/login')"
                >
                    Accedi!
                </h1>
            </div>
        </div>
    </div>  
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    import { useStepStore } from '~/store/step';
    import Step1 from '~/components/Auth/registrationSteps/Step1.vue';
    import Step2 from '~/components/Auth/registrationSteps/Step2.vue';
    import Step3 from '~/components/Auth/registrationSteps/Step3.vue';
    import Step4 from '~/components/Auth/registrationSteps/Step4.vue';
    import Step5 from '~/components/Auth/registrationSteps/Step5.vue';
    import Step6 from '~/components/Auth/registrationSteps/Step6.vue';
    import Step7 from '~/components/Auth/registrationSteps/Step7.vue';
    import Step8 from '~/components/Auth/registrationSteps/Step8.vue';
    
    const useStore = useStepStore();
    const currentStep = ref(useStore.getCurrentStep);
    const nuxtApp = useNuxtApp();
    
    const stepZeroRef = ref();
    const stepOneRef = ref();
    const stepTwoRef = ref();
    const stepThreeRef = ref();
    const stepFourRef = ref();
    const stepFiveRef = ref();
    const stepSixRef = ref();
    const stepSevenRef = ref();
    const buttonDisableStatus = computed(() => !useStore.step_zero_value.accept2);

    const checkToggle = (key: String, value: Boolean) => {
        useStore.step_zero_value[key] = value;
    }
    const updateCurrentStep = (step: number) => {
        useStore.setStep(step);
        currentStep.value = useStore.getCurrentStep;
    }
    
    const stepValidation = async(step: number) => {
        if(step === 0) {
            return await stepZeroRef.value?.validate();
        } else if (step === 1) {
            return await stepOneRef.value?.validate();
        } else if(step === 2) {
            if(useStore.step_two_value.currentWorkShopSpec.length) {
                return true;
            } else {
                nuxtApp.$toastMessage('info', 'Missing Workshop', 'You must select at least one workshop!');
                return false;
            }
        } else if(step === 3) {
            if(useStore.step_three_value.currentServiceType.length) {
                return true;
            } else {
                nuxtApp.$toastMessage('info', 'Missing Type Of Service', 'You must select at least one type of service offered!');
                return false;
            }
        } else if(step === 4) {
            if(!useStore.step_four_value.currentServiceDays.length) {
                nuxtApp.$toastMessage('info', 'Missing Opening Hours', 'You must select at least one opening hour!');
                return false
            } else if(useStore.step_four_value.maxVehicleNumber === 0) {
                nuxtApp.$toastMessage('info', 'Invalid Maximum Number', 'Maximum number of vehicles should be larger than zero!');
                false;
            } else {
                return true
            }
        } else if(step === 5) {
            if(!useStore.step_five_value.images[4]) {
                nuxtApp.$toastMessage('info', 'Main Image Needed', 'Please upload main image!');
                return false;
            } else {
                return true;
            }
        } else if(step === 6) {
            return await stepSixRef.value.validate();
        } else if(step === 7) {
            const digitalRlt = await stepSevenRef.value.validate();
            const allChecked = useStore.step_seven_value.currentConformities.length === 5;
            if(digitalRlt && allChecked) {
                return true;
            } else if(digitalRlt) {
                nuxtApp.$toastMessage('info', 'All-Check Needed', 'select all conformities!');
                return false;
            } else {
                return false;
            }
        }
    }
    const nextStep = async (step: number) => {
        if(buttonDisableStatus.value) {
            return ;
        }
        const isValid = await stepValidation(step);
        console.log(step, isValid);
        if(!isValid) {
            return;
        }
        updateCurrentStep(step+1);
    }
    const prevStep = async (step: number) => {
        if(!currentStep.value) {
            return ;
        }
        updateCurrentStep(step-1);
    }
    const plusServiceTime = (value: number) => {
        const existingObject = useStore.step_four_value.currentServiceDays.find(item => item.value === value);
        if(existingObject) {
            existingObject.serviceTime2 = {
                start: '15:00',
                end: '19:00'
            }
        }
    }
    const removeServiceTime = (value: number) => {
        const existingObject = useStore.step_four_value.currentServiceDays.find(item => item.value === value);
        if(existingObject) {
            existingObject.serviceTime2 = {
                start: '',
                end: ''
            }
        }
    }
    const toggleMultiSelect = (type: string, value: number) => {
        if(type === 'workShopSpec') {
            const index = useStore.step_two_value.currentWorkShopSpec.indexOf(value);
            if(index !== -1) {
                useStore.step_two_value.currentWorkShopSpec.splice(index, 1);
            } else {
                useStore.step_two_value.currentWorkShopSpec.push(value);
            }
        } else if(type === 'serviceType') {
            const index = useStore.step_three_value.currentServiceType.indexOf(value);
            if(index !== -1) {
                useStore.step_three_value.currentServiceType.splice(index, 1);
            } else {
                useStore.step_three_value.currentServiceType.push(value);
            }
        } else if(type === 'serviceDay') {
            const index = useStore.step_four_value.currentServiceDays.findIndex(day => day.value === value);
            if(index !== -1) {
                useStore.step_four_value.currentServiceDays.splice(index, 1);
            } else {
                useStore.step_four_value.currentServiceDays.push({
                    value,
                    serviceTime1: {
                        start: '09:00',
                        end: '12:00'
                    },
                    serviceTime2: {
                        start: '',
                        end: ''
                    }
                });
            }
        }
    }
</script>
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
<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import { useStepStore } from '~/store/step';
    import { useVuelidate } from '@vuelidate/core';
    import { required, email, minLength, maxLength, numeric, helpers } from '@vuelidate/validators';
    import Step1 from './Auth/registrationSteps/Step1.vue';
    import Step2 from './Auth/registrationSteps/Step2.vue';
    import Step3 from './Auth/registrationSteps/Step3.vue';
    import Step4 from './Auth/registrationSteps/Step4.vue';
    import Step5 from './Auth/registrationSteps/Step5.vue';

    export default defineComponent({
        name: 'RegisterForm',
        components: {
            Step1,
            Step2,
            Step3,
            Step4,
            Step5,
        },
        setup() {
            const useStore = useStepStore();
            const currentStep = ref(useStore.getCurrentStep);
            
            //step0
            const stepZeroRef = ref();
            const stepOneRef = ref();
            const stepTwoRef = ref();
            const stepThreeRef = ref();
            const stepFourRef = ref();
            const stepFiveRef = ref();
            const stepSixRef = ref();
            const stepSevenRef = ref();
            const buttonDisableStatus = computed(() => !useStore.step_zero_value.accept2);
            
            //step4

            const checkToggle = (key: String, value: Boolean) => {
                useStore.step_zero_value[key] = value;
            }
            const updateCurrentStep = (step: number) => {
                useStore.setStep(step);
                currentStep.value = useStore.getCurrentStep;
            }
            // const updateStepValues = async (step: number) => {
            //     if(step === 0) {
            //         useStore.setStepZeroValue({
            //             name: name.value,
            //             surname: surname.value,
            //             tel: tel.value,
            //             email: email.value,
            //             workSpace: workSpace.value,
            //             postalCode: postalCode.value,
            //             accept1: accept1.value,
            //             accept2: accept2.value,
            //             buttonDisable: buttonDisable.value
            //         })
            //     } else if(step === 1) {
            //         useStore.setStepOneValue({
            //             fullAddress: {
            //                 add1: fullAddress.value.add1,
            //                 add2: fullAddress.value.add2,
            //                 add3: fullAddress.value.add3,
            //                 add4: fullAddress.value.add4,
            //             },
            //             companyContact: {
            //                 contact1: companyContact.value.contact1,
            //                 contact2: companyContact.value.contact2,
            //             },
            //             referContact: {
            //                 contact1: referContact.value.contact1,
            //                 contact2: referContact.value.contact2,
            //                 contact3: referContact.value.contact3
            //             }
            //         })
            //     } else if(step === 2) {
            //         useStore.setStepTwoValue({
            //             currentWorkShopSpec: currentWorkShopSpec.value
            //         })
            //     } else if(step === 3) {
            //         useStore.setStepThreeValue({
            //             currentServiceType: currentServiceType.value
            //         })
            //     }
            // }
            const stepValidation = async(step: number) => {
                if(step === 0) {
                    return await stepZeroRef.value?.validate();
                } else if (step === 1) {
                    return await stepOneRef.value?.validate();
                } else if(step === 2) {
                    if(useStore.step_two_value.currentWorkShopSpec.length) {
                        return true;
                    } else {
                        alert('please select one');
                        return false;
                    }
                } else if(step === 3) {
                    if(useStore.step_three_value.currentServiceType.length) {
                        return true;
                    } else {
                        alert('please select one');
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
                // updateStepValues(step);
                updateCurrentStep(step+1);
            }
            const prevStep = async (step: number) => {
                if(!currentStep.value) {
                    return ;
                }
                // updateStepValues(step);
                updateCurrentStep(step-1);
            }
            const plusServiceTime = (value: any) => {
                console.log(value);
                const existingObject = useStore.step_four_value.currentServiceDays.find(item => item.value === value);
                if(existingObject) {
                    existingObject.serviceTime2 = {
                        start: '15:00',
                        end: '19:00'
                    }
                }
            }
            const toggleMultiSelect = (type: any, value: any) => {
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

            return {
                useStore,
                stepZeroRef,
                stepOneRef,
                stepTwoRef,
                stepThreeRef,
                stepFourRef,
                stepFiveRef,
                stepSixRef,
                stepSevenRef,
                buttonDisableStatus,
                currentStep,
                checkToggle,
                nextStep,
                prevStep,
                toggleMultiSelect,
                plusServiceTime
            }
        }
    })
</script>
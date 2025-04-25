<template>
  <div class="px-3 w-full mt-2 mb-4 overflow-auto">
    <Step1
      v-if="stepStore.currentStep === 1"
      ref="stepOneRef"
      :stepValues="stepStore.stepOneData"
      @updateStepValues="checkToggle"
    />
    <Step2
      v-if="stepStore.currentStep === 2"
      ref="stepTwoRef"
      v-model:stepValues="stepStore.stepTwoData"
    />
    <Step3
      v-if="stepStore.currentStep === 3"
      ref="stepThreeRef"
      v-model:stepValues="stepStore.stepThreeData"
      @update:isCheck="toggleMultiSelect('workShopSpec', $event)"
    />
    <Step4
      v-if="stepStore.currentStep === 4"
      ref="stepFourRef"
      v-model:stepValues="stepStore.stepFourData"
      @update:isCheck="toggleMultiSelect('serviceType', $event)"
    />
    <Step5
      v-if="stepStore.currentStep === 5"
      ref="stepFiveRef"
      v-model:stepValues="stepStore.stepFiveData"
      @update:isCheck="toggleMultiSelect('serviceDay', $event)"
      @update:plus="plusServiceTime($event)"
      @update:remove="removeServiceTime($event)"
    />
    <Step6 v-if="stepStore.currentStep === 6" ref="stepSixRef" />
    <Step7
      v-if="stepStore.currentStep === 7"
      ref="stepSevenRef"
      v-model:stepValues="stepStore.stepSevenData"
    />
    <Step8
      v-if="stepStore.currentStep === 8"
      ref="stepEightRef"
      v-model:stepValues="stepStore.stepEightData"
    />
    <div
      class="flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <TicDrivebutton
          label="Indietro"
          customClass="mt-4 bg-gray-500"
          color="gray"
          :disable="!stepStore.currentStep"
          @click="prevStep()"
        />
        <TicDrivebutton
          label="Avanti"
          customClass="mt-4"
          :disable="buttonDisableStatus"
          @click="nextStep()"
        />
      </div>
      <div
        v-if="!stepStore.currentStep"
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
import {ref, computed} from 'vue';
import useStepStore from '~/store/step';

import Step1 from './auth/registrationSteps/Step1.vue';
import Step2 from './auth/registrationSteps/Step2.vue';
import Step3 from './auth/registrationSteps/Step3.vue';
import Step4 from './auth/registrationSteps/Step4.vue';
import Step5 from './auth/registrationSteps/Step5.vue';
import Step6 from './auth/registrationSteps/Step6.vue';
import Step7 from './auth/registrationSteps/Step7.vue';
import Step8 from './auth/registrationSteps/Step8.vue';
import TicDrivebutton from './ui/buttons/TicDrivebutton.vue';
import useToast from '@/composables/useToast';
import type {Specialization} from '~/types/auth/steps/StepThreeData';

const stepStore = useStepStore();

const stepOneRef = ref<InstanceType<typeof Step1> | null>(null);
const stepTwoRef = ref<InstanceType<typeof Step2> | null>(null);
const stepThreeRef = ref<InstanceType<typeof Step3> | null>(null);
const stepFourRef = ref<InstanceType<typeof Step4> | null>(null);
const stepFiveRef = ref<InstanceType<typeof Step5> | null>(null);
const stepSixRef = ref<InstanceType<typeof Step6> | null>(null);
const stepSevenRef = ref<InstanceType<typeof Step7> | null>(null);
const stepEightRef = ref<InstanceType<typeof Step8> | null>(null);

const buttonDisableStatus = computed(
  () => !stepStore.stepOneData.acceptUpdates,
);

const showToast = useToast();

const checkToggle = (
  key: keyof typeof stepStore.stepOneData,
  value: boolean,
): void => {
  stepStore.stepOneData[key] = value;
};

const stepValidation = async (step: number): Promise<boolean> => {
  switch (step) {
    case 1:
      return await stepOneRef.value?.validate();
    case 2:
      return await stepTwoRef.value?.validate();
    case 3:
      if (!stepStore.stepThreeData.specializations.length) {
        showToast(
          'info',
          'Missing Workshop',
          'You must select at least one workshop!',
        );
        return false;
      }
      return true;
    case 4:
      if (!stepStore.stepFourData.currentServiceType.length) {
        showToast(
          'info',
          'Missing Type Of Service',
          'You must select at least one type of service offered!',
        );
        return false;
      }
      return true;
    case 5:
      if (!stepStore.stepFiveData.currentServiceDays.length) {
        showToast(
          'info',
          'Missing Opening Hours',
          'You must select at least one opening hour!',
        );
        return false;
      }
      if (stepStore.stepFiveData.maxVehicleNumber === 0) {
        showToast(
          'info',
          'Invalid Maximum Number',
          'Maximum number of vehicles should be larger than zero!',
        );
        return false;
      }
      return true;
    case 6:
      if (!stepStore.stepSixData.images[4]) {
        showToast('info', 'Main Image Needed', 'Please upload main image!');
        return false;
      }
      return true;
    case 7:
      return await stepSevenRef.value?.validate();
    case 8:
      const valid = await stepEightRef.value?.validate();
      const allChecked =
        stepStore.stepEightData.currentConformities.length === 5;
      if (!valid) return false;
      if (!allChecked) {
        showToast('info', 'All-Check Needed', 'Select all conformities!');
        return false;
      }
      return true;
    default:
      return false;
  }
};

const nextStep = async (): Promise<void> => {
  if (buttonDisableStatus.value) return;
  const isValid = await stepValidation(stepStore.currentStep);
  if (isValid) stepStore.currentStep++;
  console.log(stepStore.stepThreeData);
};

const prevStep = (): void => {
  if (!stepStore.currentStep) return;
  stepStore.currentStep--;
  if (stepStore.currentStep === 0) navigateTo('/auth/login');
};

const plusServiceTime = (value: number): void => {
  const existing = stepStore.stepFiveData.currentServiceDays.find(
    item => item.value === value,
  );
  if (existing) {
    existing.serviceTime2 = {start: '15:00', end: '19:00'};
  }
};

const removeServiceTime = (value: number): void => {
  const existing = stepStore.stepFiveData.currentServiceDays.find(
    item => item.value === value,
  );
  if (existing) {
    existing.serviceTime2 = {start: '', end: ''};
  }
};

const toggleMultiSelect = (
  type: 'workShopSpec' | 'serviceType' | 'serviceDay',
  value: Specialization,
): void => {
  if (type === 'workShopSpec') {
    const index = stepStore.stepThreeData.specializations.indexOf(value);
    index !== -1
      ? stepStore.stepThreeData.specializations.splice(index, 1)
      : stepStore.stepThreeData.specializations.push(value);
  } else if (type === 'serviceType') {
    const index = stepStore.stepFourData.currentServiceType.indexOf(value);
    index !== -1
      ? stepStore.stepFourData.currentServiceType.splice(index, 1)
      : stepStore.stepFourData.currentServiceType.push(value);
  } else if (type === 'serviceDay') {
    const index = stepStore.stepFiveData.currentServiceDays.findIndex(
      day => day.value === value,
    );
    index !== -1
      ? stepStore.stepFiveData.currentServiceDays.splice(index, 1)
      : stepStore.stepFiveData.currentServiceDays.push({
          value,
          serviceTime1: {start: '09:00', end: '12:00'},
          serviceTime2: {start: '', end: ''},
        });
  }
};
</script>

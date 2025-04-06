<template>
  <div class="px-3 w-full my-4">
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
        <Button
          label="Indietro"
          customClass="mt-4 bg-gray-500"
          color="gray"
          :disable="!stepStore.currentStep"
          @click="prevStep()"
        />
        <Button
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
import {ref} from 'vue';
import useStepStore from '~/store/step';
import Step1 from './auth/registrationSteps/Step1.vue';
import Step2 from './auth/registrationSteps/Step2.vue';
import Step3 from './auth/registrationSteps/Step3.vue';
import Step4 from './auth/registrationSteps/Step4.vue';
import Step5 from './auth/registrationSteps/Step5.vue';
import Step6 from './auth/registrationSteps/Step6.vue';
import Step7 from './auth/registrationSteps/Step7.vue';
import Step8 from './auth/registrationSteps/Step8.vue';

const stepStore = useStepStore();
const nuxtApp = useNuxtApp();

const stepOneRef = ref();
const stepTwoRef = ref();
const stepThreeRef = ref();
const stepFourRef = ref();
const stepFiveRef = ref();
const stepSixRef = ref();
const stepSevenRef = ref();
const stepEightRef = ref();
const buttonDisableStatus = computed(() => !stepStore.stepOneData.accept2);

const checkToggle = (key: String, value: Boolean) => {
  stepStore.stepOneData[key] = value;
};

const stepValidation = async (step: number) => {
  if (step === 1) {
    return await stepOneRef.value?.validate();
  } else if (step === 2) {
    return await stepTwoRef.value?.validate();
  } else if (step === 3) {
    if (stepStore.stepThreeData.currentWorkShopSpec.length) {
      return true;
    } else {
      nuxtApp.$toastMessage(
        'info',
        'Missing Workshop',
        'You must select at least one workshop!',
      );
      return false;
    }
  } else if (step === 4) {
    if (stepStore.stepFourData.currentServiceType.length) {
      return true;
    } else {
      nuxtApp.$toastMessage(
        'info',
        'Missing Type Of Service',
        'You must select at least one type of service offered!',
      );
      return false;
    }
  } else if (step === 5) {
    if (!stepStore.stepFiveData.currentServiceDays.length) {
      nuxtApp.$toastMessage(
        'info',
        'Missing Opening Hours',
        'You must select at least one opening hour!',
      );
      return false;
    } else if (stepStore.stepFiveData.maxVehicleNumber === 0) {
      nuxtApp.$toastMessage(
        'info',
        'Invalid Maximum Number',
        'Maximum number of vehicles should be larger than zero!',
      );
      false;
    } else {
      return true;
    }
  } else if (step === 6) {
    if (!stepStore.stepSixData.images[4]) {
      nuxtApp.$toastMessage(
        'info',
        'Main Image Needed',
        'Please upload main image!',
      );
      return false;
    } else {
      return true;
    }
  } else if (step === 7) {
    return await stepSevenRef.value.validate();
  } else if (step === 8) {
    const digitalRlt = await stepEightRef.value.validate();
    const allChecked = stepStore.stepEightData.currentConformities.length === 5;
    if (digitalRlt && allChecked) {
      return true;
    } else if (digitalRlt) {
      nuxtApp.$toastMessage(
        'info',
        'All-Check Needed',
        'select all conformities!',
      );
      return false;
    } else {
      return false;
    }
  }
};
const nextStep = async () => {
  if (buttonDisableStatus.value) {
    return;
  }
  const isValid = await stepValidation(stepStore.currentStep);
  if (!isValid) {
    return;
  }
  stepStore.currentStep++;
};
const prevStep = async () => {
  if (!stepStore.currentStep) {
    return;
  }
  stepStore.currentStep--;
  if (stepStore.currentStep === 0) {
    navigateTo('/auth/login');
  }
};
const plusServiceTime = (value: number) => {
  const existingObject = stepStore.stepFiveData.currentServiceDays.find(
    item => item.value === value,
  );
  if (existingObject) {
    existingObject.serviceTime2 = {
      start: '15:00',
      end: '19:00',
    };
  }
};
const removeServiceTime = (value: number) => {
  const existingObject = stepStore.stepFiveData.currentServiceDays.find(
    item => item.value === value,
  );
  if (existingObject) {
    existingObject.serviceTime2 = {
      start: '',
      end: '',
    };
  }
};
const toggleMultiSelect = (type: string, value: number) => {
  if (type === 'workShopSpec') {
    const index = stepStore.stepThreeData.currentWorkShopSpec.indexOf(value);
    if (index !== -1) {
      stepStore.stepThreeData.currentWorkShopSpec.splice(index, 1);
    } else {
      stepStore.stepThreeData.currentWorkShopSpec.push(value);
    }
  } else if (type === 'serviceType') {
    const index = stepStore.stepFourData.currentServiceType.indexOf(value);
    if (index !== -1) {
      stepStore.stepFourData.currentServiceType.splice(index, 1);
    } else {
      stepStore.stepFourData.currentServiceType.push(value);
    }
  } else if (type === 'serviceDay') {
    const index = stepStore.stepFiveData.currentServiceDays.findIndex(
      day => day.value === value,
    );
    if (index !== -1) {
      stepStore.stepFiveData.currentServiceDays.splice(index, 1);
    } else {
      stepStore.stepFiveData.currentServiceDays.push({
        value,
        serviceTime1: {
          start: '09:00',
          end: '12:00',
        },
        serviceTime2: {
          start: '',
          end: '',
        },
      });
    }
  }
};
</script>

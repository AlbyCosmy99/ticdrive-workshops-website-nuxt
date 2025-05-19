<template>
  <div
    v-if="authStore.loading"
    class="flex justify-center items-center overflow-auto h-80"
  >
    <UiSpinnersTicDriveSpinner text="Registrazione in corso..." />
  </div>
  <div v-else class="px-3 w-full mt-2 mb-4 overflow-auto">
    <Step1 v-if="stepStore.currentStep === 1" ref="stepOneRef" />
    <Step2 v-if="stepStore.currentStep === 2" ref="stepTwoRef" />
    <Step3 v-if="stepStore.currentStep === 3" ref="stepThreeRef" />
    <Step4 v-if="stepStore.currentStep === 4" ref="stepFourRef" />
    <Step5 v-if="stepStore.currentStep === 5" ref="stepFiveRef" />
    <Step6 v-if="stepStore.currentStep === 6" ref="stepSixRef" />
    <Step7 v-if="stepStore.currentStep === 7" ref="stepSevenRef" />
    <Step8 v-if="stepStore.currentStep === 8" ref="stepEightRef" />
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
import useAuthStore from '~/store/auth';

const stepStore = useStepStore();
const authStore = useAuthStore();
console.log(stepStore.currentStep);

const stepOneRef = ref<InstanceType<typeof Step1> | null>(null);
const stepTwoRef = ref<InstanceType<typeof Step2> | null>(null);
const stepThreeRef = ref<InstanceType<typeof Step3> | null>(null);
const stepFourRef = ref<InstanceType<typeof Step4> | null>(null);
const stepFiveRef = ref<InstanceType<typeof Step5> | null>(null);
const stepSixRef = ref<InstanceType<typeof Step6> | null>(null);
const stepSevenRef = ref<InstanceType<typeof Step7> | null>(null);
const stepEightRef = ref<InstanceType<typeof Step8> | null>(null);

const buttonDisableStatus = computed(
  () => !stepStore.stepOneData.acceptPrivacyPolicy,
);

const showToast = useToast();

const stepValidation = async (step: number): Promise<boolean | undefined> => {
  switch (step) {
    case 1:
      return await stepOneRef.value?.validate();
    case 2:
      return await stepTwoRef.value?.validate();
    case 3:
      if (!stepStore.stepThreeData.specializations.length) {
        showToast(
          'info',
          'Specializzazione mancante.',
          'Devi selezionare almeno una specializzazione!',
        );
        return false;
      }
      return true;
    case 4:
      if (!stepStore.stepFourData.services.length) {
        showToast(
          'info',
          'Servizio offerto mancante.',
          'Devi selezionare almeno un servizio!',
        );
        return false;
      }
      return true;
    case 5:
      if (!stepStore.stepFiveData.activeDays.length) {
        showToast(
          'info',
          'Orario di apertura mancante.',
          'Devi selezionare almeno un giorno e un orario di apertura!',
        );
        return false;
      }
      return true;
    case 6:
      if (!stepStore.stepSixData.images[4]) {
        showToast(
          'warn',
          'Lingua non selezionata.',
          'Per favore seleziona almeno una lingua!',
        );
        return false;
      }
      return true;
    case 7:
      if (stepStore.stepSevenData.languages.length === 0) {
        showToast(
          'info',
          'Tutte le caselle devono essere selezionate.',
          'Seleziona tutte le caselle!',
        );
        return false;
      }
      return true;
    case 8:
      const valid = await stepEightRef.value?.validate();
      const allChecked =
        stepStore.stepEightData.conformities.length ===
        stepStore.declarationsOfConformity.length;
      if (!valid) return false;
      if (!allChecked) {
        showToast(
          'info',
          'Tutte le caselle devono essere selezionate.',
          'Seleziona tutte le caselle!',
        );
        return false;
      }
      if (stepStore.completedSteps.length !== 7) {
        showToast(
          'warn',
          'Tutti i passaggi devono essere completati.',
          'Completa tutti i passaggi della fase di registrazione!',
        );
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

  if (isValid) {
    if (stepStore.currentStep === 8) {
      await register();
    } else {
      if (!stepStore.completedSteps.includes(stepStore.currentStep)) {
        stepStore.completedSteps.push(stepStore.currentStep);
      }
      stepStore.currentStep++;
    }
  }
};

const prevStep = (): void => {
  if (!stepStore.currentStep) return;
  stepStore.currentStep--;
  if (stepStore.currentStep === 0) navigateTo('/auth/login');
};

const register = async() => {
  let isValid = true
  for(let i = 1; i <= 7; i++) {
      const stepValid = await stepValidation(i);
      if(!stepValid) {
        isValid = false
        break
      }
  } 
  if(isValid) {
    authStore.register();
  } else {
    showToast('warn', "Completa tutti gli step", "Controlla di aver completato bene tutti gli step.")
  }
};
</script>

<template>
  <div
    v-if="authStore.loading"
    class="flex justify-center items-center overflow-auto h-80"
  >
    <UiSpinnersTicDriveSpinner text="Registrazione in corso..." />
  </div>
  <div v-else class="w-full">
    <div class="w-full rounded-[28px] bg-white px-1 pb-2 pt-2 sm:px-3">
      <Step1 v-show="stepStore.currentStep === 1" ref="stepOneRef" />
      <Step2 v-show="stepStore.currentStep === 2" ref="stepTwoRef" />
      <Step3 v-show="stepStore.currentStep === 3" ref="stepThreeRef" />
      <Step4 v-show="stepStore.currentStep === 4" ref="stepFourRef" />
      <Step5 v-show="stepStore.currentStep === 5" ref="stepFiveRef" />
      <Step6 v-show="stepStore.currentStep === 6" ref="stepSixRef" />
      <Step7 v-show="stepStore.currentStep === 7" ref="stepSevenRef" />
      <Step8 v-show="stepStore.currentStep === 8" ref="stepEightRef" />
    </div>

    <div
      class="sticky bottom-0 z-10 mx-auto mt-6 w-full max-w-3xl border-t border-gray-200 bg-white/95 px-0 pb-[calc(env(safe-area-inset-bottom,0px)+0.5rem)] pt-4 backdrop-blur-sm sm:static sm:border-t-0 sm:bg-transparent sm:px-0 sm:pb-0 sm:pt-6"
    >
      <div class="grid grid-cols-2 gap-3">
        <TicDrivebutton
          label="Indietro"
          customClass="w-full bg-gray-500 text-base sm:text-lg"
          color="gray"
          :disable="!stepStore.currentStep"
          @click="prevStep()"
        />
        <TicDrivebutton
          label="Avanti"
          customClass="w-full text-base sm:text-lg"
          :disable="buttonDisableStatus"
          @click="nextStep()"
        />
      </div>
      <div
        v-if="!stepStore.currentStep"
        class="mt-3 flex justify-center text-center"
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
import {ref, computed, onMounted} from 'vue';
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

onMounted(() => {
  if (!stepStore.currentStep) {
    stepStore.currentStep = 1;
  }
});

const stepOneRef = ref<InstanceType<typeof Step1> | null>(null);
const stepTwoRef = ref<InstanceType<typeof Step2> | null>(null);
const stepThreeRef = ref<InstanceType<typeof Step3> | null>(null);
const stepFourRef = ref<InstanceType<typeof Step4> | null>(null);
const stepFiveRef = ref<InstanceType<typeof Step5> | null>(null);
const stepSixRef = ref<InstanceType<typeof Step6> | null>(null);
const stepSevenRef = ref<InstanceType<typeof Step7> | null>(null);
const stepEightRef = ref<InstanceType<typeof Step8> | null>(null);

const buttonDisableStatus = computed(() => {
  return stepStore.currentStep === 1 && !stepStore.stepOneData.acceptPrivacyPolicy;
});

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

const register = async () => {
  let isValid = true;
  for (let i = 1; i <= 8; i++) {
    const stepValid = await stepValidation(i);
    if (!stepValid) {
      isValid = false;
      break;
    }
  }
  if (isValid) {
    authStore.register();
  } else {
    showToast(
      'warn',
      'Completa tutti gli step',
      'Controlla di aver completato bene tutti gli step.',
    );
  }
};
</script>

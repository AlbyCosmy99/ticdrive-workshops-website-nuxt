<template>
  <div class="px-3 w-full">
    <Step1 v-if="stepStore.currentStep === 1" />
    <Step2 v-if="stepStore.currentStep === 2" />
    <Step3 v-if="stepStore.currentStep === 3" />
    <Step4 v-if="stepStore.currentStep === 4" />

    <!-- back and next buttons -->
    <div
      class="flex flex-col w-full mx-auto max-w-lg max-md:mt-10 max-md:max-w-full justify-center"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Button
          label="Indietro"
          customClass="mt-4 bg-gray-500"
          color="gray"
          :disable="stepStore.currentStep === 0"
          @click="onBack()"
        />
        <Button
          label="Avanti"
          customClass="mt-4"
          @click="stepStore.currentStep++"
        />
      </div>
      <div
        v-if="stepStore.currentStep === 1"
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

<script setup lang="ts">
import Button from './Button.vue';
import useStepStore from '~/store/step';
import Step1 from './auth/registrationSteps/Step1.vue';
import Step2 from './auth/registrationSteps/Step2.vue';
import Step3 from './auth/registrationSteps/Step3.vue';
import Step4 from './auth/registrationSteps/Step4.vue';

const stepStore = useStepStore();

const onBack = () => {
  stepStore.currentStep--;
  if (stepStore.currentStep === 0) {
    navigateTo('/auth/login');
  }
};

//what is this for exactly? pay attention how you use it. Break it in multiple functions in each Step component
// const updateStepValues = (step: number) => {
//   if (step === 0) {
//     useStore.setStepZeroValue({
//       name: name.value,
//       surname: surname.value,
//       tel: tel.value,
//       email: email.value,
//       workSpace: workSpace.value,
//       postalCode: postalCode.value,
//       accept1: accept1.value,
//       accept2: accept2.value,
//       buttonDisable: buttonDisable.value,
//     });
//   } else if (step === 1) {
//     useStore.setStepOneValue({
//       fullAddress: {...fullAddress.value},
//       companyContact: {...companyContact.value},
//       referContact: {...referContact.value},
//     });
//   } else if (step === 2) {
//     useStore.setStepTwoValue({
//       currentWorkShopSpec: currentWorkShopSpec.value,
//     });
//   } else if (step === 3) {
//     useStore.setStepThreeValue({
//       currentServiceType: currentServiceType.value,
//     });
//   }
// };

//what is this for exactly? pay attention how you use it. Break it in multiple functions in each Step component
// const stepValidation = async (step: number) => {
//   if (step === 0) return await v0$.value.$validate();
//   if (step === 1) return await v1$.value.$validate();
//   if (step === 2)
//     return !!currentWorkShopSpec.value || alert('please select one');
//   if (step === 3)
//     return !!currentServiceType.value || alert('please select one');
//   return true;
// };
</script>

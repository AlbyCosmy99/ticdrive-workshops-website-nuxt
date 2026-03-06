<template>
  <div
    class="mx-auto flex w-full max-w-3xl flex-col justify-center px-4 pb-2 pt-2 sm:px-6"
  >
    <h1 class="text-3xl font-semibold text-gray-600 sm:text-4xl">
      Informazioni sull'attività
    </h1>

    <div class="mt-8 flex flex-col rounded-2xl border border-gray-200 bg-gray-50/60 p-4 sm:mt-10 sm:p-5">
      <h4 class="text-xl font-semibold text-gray-600 sm:text-2xl">
        Indirizzo completo*
      </h4>

      <TicDriveInput
        placeholder="Via e Numero Civico:"
        v-model="stepStore.stepTwoData.fullAddress.streetAddress"
        size="small"
        :error-message="v$.fullAddress.streetAddress.$errors[0]?.$message || ''"
      />
      <TicDriveInput
        placeholder="Città:"
        v-model="stepStore.stepTwoData.fullAddress.city"
        size="small"
        :error-message="v$.fullAddress.city.$errors[0]?.$message || ''"
      />
      <TicDriveInput
        placeholder="Provincia:"
        v-model="stepStore.stepTwoData.fullAddress.province"
        size="small"
        :error-message="v$.fullAddress.province.$errors[0]?.$message || ''"
      />
      <TicDriveInput
        placeholder="CAP:"
        v-model="stepStore.stepTwoData.fullAddress.postalCode"
        size="small"
        :error-message="v$.fullAddress.postalCode.$errors[0]?.$message || ''"
      />
    </div>

    <div class="mt-4 rounded-2xl border border-gray-200 bg-gray-50/60 p-4 sm:p-5">
      <h4 class="text-xl font-semibold text-gray-600 sm:text-2xl">
        Contatti di Riferimento
      </h4>
      <TicDriveInput
        placeholder="Telefono diretto:"
        v-model="stepStore.stepTwoData.referContact.phone"
        size="small"
      />
      <TicDriveInput
        placeholder="Email di contatto diretto:"
        v-model="stepStore.stepTwoData.referContact.email"
        size="small"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import useVuelidate from '@vuelidate/core';
import {helpers, required} from '@vuelidate/validators';
import {defineExpose, computed} from 'vue';
import useStepStore from '~/store/step';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput.vue';

defineExpose({
  validate: async () => {
    const result = await v$.value.$validate();
    return result;
  },
});

const stepStore = useStepStore();

const rules = computed(() => ({
  fullAddress: {
    streetAddress: {
      required: helpers.withMessage('Indirizzo obbligatorio', required),
    },
    city: {
      required: helpers.withMessage('Città obbligatoria', required),
    },
    province: {
      required: helpers.withMessage('Provincia obbligatoria', required),
    },
    postalCode: {
      required: helpers.withMessage('CAP obbligatorio', required),
    },
  },
}));

const v$ = useVuelidate(rules, stepStore.stepTwoData);
</script>

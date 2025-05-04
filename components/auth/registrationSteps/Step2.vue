<template>
  <div
    class="flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center px-20"
  >
    <h1 class="text-4xl text-gray-500 font-semibold">
      Informazioni sull'attività
    </h1>

    <div class="flex flex-col mt-10">
      <h4 class="text-2xl text-gray-500 font-semibold">Indirizzo completo:</h4>

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

    <div class="mt-4">
      <h4 class="text-2xl text-gray-500 font-semibold">
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

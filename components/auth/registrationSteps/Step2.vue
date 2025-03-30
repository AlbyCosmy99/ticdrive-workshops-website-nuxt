<template>
  <div
    class="step-1 flex flex-col w-full mx-auto max-w-lg max-md:mt-10 max-md:max-w-full justify-center"
  >
    <h1 class="text-4xl text-gray-500 font-semibold">
      Informazioni sull'attività
    </h1>
    <div class="flex flex-col mt-10">
      <h1 class="text-2xl text-gray-500 font-semibold">Indirizzo completo:</h1>
      <FormInput
        placeholder="Via e Numero Civico:"
        v-model="stepStore.stepTwoData.fullAddress.add1"
        size="small"
        :error-message="
          v1$.fullAddress.add1.$errors.length
            ? v1$.fullAddress.add1.$errors[0].$message
            : ''
        "
      />
      <FormInput
        placeholder="Città:"
        v-model="stepStore.stepTwoData.fullAddress.add2"
        size="small"
      />
      <FormInput
        placeholder="Provincia:"
        v-model="stepStore.stepTwoData.fullAddress.add3"
        size="small"
      />
      <FormInput
        placeholder="CAP:"
        v-model="stepStore.stepTwoData.fullAddress.add4"
        size="small"
      />
    </div>
    <div class="mt-4">
      <h1 class="text-2xl text-gray-500 font-semibold">Contatti Aziendali</h1>
      <div class="flex flex-col">
        <FormInput
          placeholder="Numero di telefono aziendale (fisso o cellulare):"
          v-model="stepStore.stepTwoData.companyContact.contact1"
          size="small"
        />
        <FormInput
          placeholder="Indirizzo email aziendale"
          v-model="stepStore.stepTwoData.companyContact.contact2"
          size="small"
        />
      </div>
    </div>
    <div class="mt-4">
      <h1 class="text-2xl text-gray-500 font-semibold">
        Contatti di Riferimento
      </h1>
      <FormInput
        placeholder="Nome e Cognome del Referente:"
        v-model="stepStore.stepTwoData.referContact.contact1"
        size="small"
      />
      <FormInput
        placeholder="Telefono diretto:"
        v-model="stepStore.stepTwoData.referContact.contact2"
        size="small"
      />
      <FormInput
        placeholder="Email di contatto operativo:"
        v-model="stepStore.stepTwoData.referContact.contact3"
        size="small"
      />
    </div>
    <h1 class="mt-3 mb-4 text-gray-500 text-md">
      (Per ricevere notifiche di prenotazioni o comunicazioni importanti)
    </h1>
  </div>
</template>

<script lang="ts" setup>
import useVuelidate from '@vuelidate/core';
import {helpers, required} from '@vuelidate/validators';
import useStepStore from '~/store/step';

const stepStore = useStepStore();

const rules1 = computed(() => ({
  fullAddress: {
    add1: {
      required: helpers.withMessage('Address line 1 is required', required),
    },
    add2: {
      required: helpers.withMessage('Address line 2 is required', required),
    },
    add3: {
      required: helpers.withMessage('Address line 3 is required', required),
    },
    add4: {
      required: helpers.withMessage('Address line 4 is required', required),
    },
  },
  companyContact: {
    contact1: {
      required: helpers.withMessage('Contact 1 is required', required),
    },
    contact2: {
      required: helpers.withMessage('Contact 2 is required', required),
    },
  },
  referContact: {
    contact1: {
      required: helpers.withMessage('Contact 1 is required', required),
    },
    contact2: {
      required: helpers.withMessage('Contact 2 is required', required),
    },
    contact3: {
      required: helpers.withMessage('Contact 3 is required', required),
    },
  },
}));

const v1$ = useVuelidate(rules1, {
  fullAddress: stepStore.stepTwoData.fullAddress,
  companyContact: stepStore.stepTwoData.companyContact,
  referContact: stepStore.stepTwoData.referContact,
});
</script>

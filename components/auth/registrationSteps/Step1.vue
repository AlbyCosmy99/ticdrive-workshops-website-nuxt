<template>
  <div
    class="flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center px-20"
  >
    <h1 class="text-4xl text-tic text-center font-semibold">Benvenuto!</h1>
    <h4 class="my-3 text-xl text-drive font-semibold text-center">
      Inserisci i tuoi dati per saperne di più.
    </h4>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
      <FormInput
        id="name"
        label="Name"
        placeholder="es. Mario"
        v-model="stepValues.name"
        :error-message="v$.name.$errors[0]?.$message || ''"
      />
      <FormInput
        id="surname"
        label="Cognome"
        placeholder="es. Rossi"
        v-model="stepValues.surname"
        :error-message="v$.surname.$errors[0]?.$message || ''"
      />
    </div>

    <FormInput
      id="tel"
      label="Telefono"
      placeholder="+39 *** *******"
      v-model="stepValues.phoneNumber"
      type="tel"
      :error-message="v$.phoneNumber.$errors[0]?.$message || ''"
    />
    <FormInput
      id="email"
      label="Email"
      placeholder="es. nome@gmail.com/tuo.nome@azienda.com"
      v-model="stepValues.email"
      :error-message="v$.email.$errors[0]?.$message || ''"
    />
    <FormInput
      id="workshop"
      label="Nome dell’officina"
      placeholder="es. Autofficina rossi"
      v-model="stepValues.workshopName"
      :error-message="v$.workshopName.$errors[0]?.$message || ''"
    />
    <FormInput
      id="postalCode"
      label="Codice postale"
      placeholder="es. 20100"
      v-model="stepValues.postalCode"
      :error-message="v$.postalCode.$errors[0]?.$message || ''"
    />

    <div class="my-1 mt-6">
      <CheckboxField
        id="accept-updates"
        v-model="stepStore.stepOneData.acceptPrivacyPolicy"
        label="Accetto di ricevere aggiornamenti da TicDrive tramite WhatsApp o
        piattaforme simili!"
      />
    </div>
    <div class="my-1">
      <CheckboxField
        id="accept-updates"
        v-model="stepStore.stepOneData.acceptUpdates"
        label="Accetto Privacy Policy Cookie Policy Terms and Conditions"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import useVuelidate from '@vuelidate/core';
import {required, email, numeric, helpers} from '@vuelidate/validators';
import {defineProps, defineEmits, defineExpose, computed} from 'vue';
import useStepStore from '~/store/step';
import type { StepOneData } from '~/types/auth/steps/StepOneData';

const props = defineProps<{
  stepValues: StepOneData;
}>();

const emit = defineEmits<{
  (e: 'updateStepValues', key: keyof StepOneData, value: boolean): void;
}>();

defineExpose({
  validate: async () => {
    const result = await v$.value.$validate();
    return result;
  },
});

const stepStore = useStepStore();

const rules = computed(() => ({
  name: {
    required: helpers.withMessage('Name is required', required),
  },
  surname: {
    required: helpers.withMessage('Surname is required', required),
  },
  phoneNumber: {
    required: helpers.withMessage('Phone number is required', required),
    numeric: helpers.withMessage('Phone number must be numeric', numeric),
  },
  email: {
    required: helpers.withMessage('Email is required', required),
    email: helpers.withMessage('Invalid email format', email),
  },
  workshopName: {
    required: helpers.withMessage('Workshop name is required', required),
  },
  postalCode: {
    required: helpers.withMessage('Postal code is required', required),
    numeric: helpers.withMessage('Postal code must be numeric', numeric),
  },
}));

const v$ = useVuelidate(rules, props.stepValues);

const checkToggle = (key: 'acceptPrivacyPolicy' | 'acceptUpdates') => {
  emit('updateStepValues', key, !props.stepValues[key]);
};
</script>

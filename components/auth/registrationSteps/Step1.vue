<template>
  <div
    class="step-0 flex flex-col w-full mx-auto max-w-lg max-md:mt-10 max-md:max-w-full justify-center"
  >
    <h1 class="text-4xl text-zinc-600 text-center font-semibold">Benvenuto!</h1>
    <h1 class="my-3 text-xl text-green-600 font-semibold text-center">
      Inserisci i tuoi dati per saperne di più.
    </h1>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
      <FormInput
        id="name"
        label="Name"
        placeholder="es. Mario"
        v-model="stepStore.stepOneData.name"
        :error-message="
          v0$.name.$errors.length ? v0$.name.$errors[0].$message : ''
        "
      />
      <FormInput
        id="surname"
        label="Cognome"
        placeholder="es. Rossi"
        v-model="stepStore.stepOneData.surname"
        :error-message="
          v0$.surname.$errors.length ? v0$.surname.$errors[0].$message : ''
        "
      />
    </div>
    <FormInput
      id="tel"
      label="Telefono"
      placeholder="+39 *** *******"
      v-model="stepStore.stepOneData.tel"
      type="tel"
      :error-message="v0$.tel.$errors.length ? v0$.tel.$errors[0].$message : ''"
    />
    <FormInput
      id="email"
      label="Email"
      placeholder="es. nome@gmail.com/tuo.nome@azienda.com"
      v-model="stepStore.stepOneData.email"
      :error-message="
        v0$.email.$errors.length ? v0$.email.$errors[0].$message : ''
      "
    />
    <FormInput
      id="workSpace"
      label="Nome dell’officina"
      placeholder="es. Autofficina rossi"
      v-model="stepStore.stepOneData.workSpace"
      :error-message="
        v0$.workSpace.$errors.length ? v0$.workSpace.$errors[0].$message : ''
      "
    />
    <FormInput
      id="postalCode"
      label="Codice postale"
      placeholder="es. 20100"
      v-model="stepStore.stepOneData.postalCode"
      :error-message="
        v0$.postalCode.$errors.length ? v0$.postalCode.$errors[0].$message : ''
      "
    />
    <div class="flex gap-1 mt-4 items-center">
      <div
        :class="[
          'w-4 h-4 border rounded',
          stepStore.stepOneData.updatesAccepted
            ? 'border-green-600'
            : 'border-gray-600',
        ]"
        @click="
          stepStore.stepOneData.updatesAccepted =
            !stepStore.stepOneData.updatesAccepted
        "
      >
        <img
          v-if="stepStore.stepOneData.updatesAccepted"
          src="/images/vector.svg"
          alt="check"
        />
      </div>
      <h1 class="text-sm">
        Accetto di ricevere aggiornamenti da TicDrive tramite WhatsApp o
        piattaforme simili!
      </h1>
    </div>
    <div class="flex gap-1 mt-2 items-center">
      <div
        :class="[
          'w-4 h-4 border rounded',
          stepStore.stepOneData.conditionsAccepted
            ? 'border-green-600'
            : 'border-gray-600',
        ]"
        @click="
          stepStore.stepOneData.conditionsAccepted =
            !stepStore.stepOneData.conditionsAccepted
        "
      >
        <img
          v-if="stepStore.stepOneData.conditionsAccepted"
          src="/images/vector.svg"
          alt="check"
        />
      </div>
      <h1 class="text-sm">
        Accetto
        <a href="" class="underline hover:text-green-600"
          >Privacy PolicyCookie PolicyTerms and Conditions</a
        >
      </h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useVuelidate from '@vuelidate/core';
import {email, helpers, numeric, required} from '@vuelidate/validators';
import useStepStore from '~/store/step';

const stepStore = useStepStore();

// VALIDATIONS
const rules = computed(() => ({
  name: {required: helpers.withMessage('Name is required', required)},
  surname: {required: helpers.withMessage('Surname is required', required)},
  tel: {
    required: helpers.withMessage('Phone number is required', required),
    numeric: helpers.withMessage('Phone number must be numeric', numeric),
  },
  email: {
    required: helpers.withMessage('Email is required', required),
    email: helpers.withMessage('Invalid email format', email),
  },
  workSpace: {
    required: helpers.withMessage('Workspace name is required', required),
  },
  postalCode: {
    required: helpers.withMessage('Postal code is required', required),
    numeric: helpers.withMessage('Postal code must be numeric', numeric),
  },
}));

const v0$ = useVuelidate(rules, {
  name: stepStore.stepOneData.name,
  surname: stepStore.stepOneData.surname,
  tel: stepStore.stepOneData.tel,
  email: stepStore.stepOneData.email,
  workSpace: stepStore.stepOneData.workSpace,
  postalCode: stepStore.stepOneData.postalCode,
});
</script>

<template>
  <div
    class="mx-auto flex w-full max-w-3xl flex-col justify-center px-4 pb-2 pt-2 sm:px-6"
  >
    <h1 class="text-center text-3xl font-semibold text-tic sm:text-4xl">
      Benvenuto!
    </h1>
    <h4 class="my-3 text-center text-base font-semibold text-drive sm:text-xl">
      Inserisci i tuoi dati per saperne di più.
    </h4>

    <div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
      <TicDriveInput
        id="name"
        label="Nome*"
        placeholder="es. Mario"
        v-model="stepStore.stepOneData.name"
        :error-message="v$.name.$errors[0]?.$message || ''"
      />
      <TicDriveInput
        id="surname"
        label="Cognome"
        placeholder="es. Rossi"
        v-model="stepStore.stepOneData.surname"
      />
    </div>

    <TicDriveInput
      id="tel"
      label="Telefono Aziendale*"
      placeholder="+39 *** *******"
      v-model="stepStore.stepOneData.phoneNumber"
      type="tel"
      :error-message="v$.phoneNumber.$errors[0]?.$message || ''"
    />

    <TicDriveInput
      id="email"
      label="Email Aziendale*"
      placeholder="es. nome@gmail.com"
      v-model="stepStore.stepOneData.email"
      :error-message="v$.email.$errors[0]?.$message || ''"
    />

    <TicDriveInput
      id="confirmEmail"
      label="Conferma Email Aziendale*"
      placeholder="es. nome@gmail.com"
      v-model="stepStore.stepOneData.confirmEmail"
      :error-message="v$.confirmEmail.$errors[0]?.$message || ''"
    />

    <TicDriveInput
      id="workshop"
      label="Nome dell’officina*"
      placeholder="es. Autofficina rossi"
      v-model="stepStore.stepOneData.workshopName"
      :error-message="v$.workshopName.$errors[0]?.$message || ''"
    />

    <TicDriveInput
      id="password"
      label="Password*"
      placeholder="Inserisci password"
      type="password"
      v-model="stepStore.stepOneData.password"
      :error-message="v$.password.$errors[0]?.$message || ''"
      autocomplete="new-password"
    />

    <TicDriveInput
      id="repeated-password"
      label="Ripeti password*"
      placeholder="Inserisci password ripetuta"
      type="password"
      v-model="stepStore.stepOneData.repeatedPassword"
      :error-message="v$.repeatedPassword.$errors[0]?.$message || ''"
      autocomplete="new-password"
    />
    <div v-if="stepStore.loading" class="mt-4 flex items-center justify-center">
      <UiSpinnersTicDriveSpinner />
    </div>
    <div v-else class="mt-6 space-y-3">
      <div
        v-if="stepStore.socialUpdatesConsent"
        class="rounded-2xl border border-gray-200 bg-gray-50/80 px-4 py-3"
      >
        <CheckboxField
          id="accept-updates"
          v-model="stepStore.stepOneData.acceptUpdates"
          :label="stepStore.socialUpdatesConsent?.content"
        />
      </div>
      <div
        v-if="stepStore.privacyPolicy"
        class="rounded-2xl border border-gray-200 bg-gray-50/80 px-4 py-3"
      >
        <CheckboxField
          id="accept-privacy-policy"
          v-model="stepStore.stepOneData.acceptPrivacyPolicy"
          :label="stepStore.privacyPolicy?.content"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useVuelidate from '@vuelidate/core';
import {required, email, numeric, helpers} from '@vuelidate/validators';
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

onMounted(() => {
  stepStore.getSocialUpdatesConsent();
  stepStore.getPrivacyPolicy();
});

const passwordRule = helpers.withMessage(
  'La password deve contenere almeno 8 caratteri, una lettera maiuscola, una minuscola e un numero.',
  (value: string) => {
    if (!value) return false;

    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    return regex.test(value);
  },
);

const rules = computed(() => ({
  name: {
    required: helpers.withMessage('Il nome è richiesto.', required),
  },
  phoneNumber: {
    required: helpers.withMessage(
      'Il numero di telefono è richiesto.',
      required,
    ),
    numeric: helpers.withMessage(
      'Il numero di telefono deve essere in formato numerico.',
      numeric,
    ),
  },
  email: {
    required: helpers.withMessage('La email è richiesta.', required),
    email: helpers.withMessage('Il formato della email non è valido.', email),
  },
  confirmEmail: {
    required: helpers.withMessage('La conferma email è richiesta.', required),
    email: helpers.withMessage('Il formato della email non è valido.', email),
    sameAsEmail: helpers.withMessage(
      'Le email non coincidono.',
      (value: string) => value === stepStore.stepOneData.email,
    ),
  },
  password: {
    required: helpers.withMessage('La password è richiesta.', required),
    strong: passwordRule,
  },
  repeatedPassword: {
    required: helpers.withMessage('Ripeti la password.', required),
    sameAsPassword: helpers.withMessage(
      'Le password non coincidono.',
      (value: string) => value === stepStore.stepOneData.password,
    ),
  },
  workshopName: {
    required: helpers.withMessage(
      "Il nome dell'officina è richiesto.",
      required,
    ),
  },
  acceptPrivacyPolicy: {
    required: helpers.withMessage(
      'Devi accettare la Privacy Policy.',
      required,
    ),
  },
}));

const v$ = useVuelidate(rules, stepStore.stepOneData);
</script>

<template>
  <div
    class="flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center px-20"
  >
    <h1 class="text-4xl text-tic text-center font-semibold">Benvenuto!</h1>
    <h4 class="my-3 text-xl text-drive font-semibold text-center">
      Inserisci i tuoi dati per saperne di più.
    </h4>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
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
      placeholder="es. 333 *******"
      v-model="stepStore.stepOneData.phoneNumber"
      type="tel"
      :error-message="v$.phoneNumber.$errors[0]?.$message || ''"
    />
    <TicDriveInput
      id="email"
      label="Email Aziendale*"
      placeholder="es. nome@gmail.com/tuo.nome@azienda.com"
      v-model="stepStore.stepOneData.email"
      :error-message="v$.email.$errors[0]?.$message || ''"
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
    <div v-if="stepStore.loading" class="mt-4 flex justify-center items-center">
      <UiSpinnersTicDriveSpinner />
    </div>
    <div v-else>
      <div v-if="stepStore.socialUpdatesConsent" class="my-1 mt-6">
        <CheckboxField
          id="accept-updates"
          v-model="stepStore.stepOneData.acceptUpdates"
          :label="stepStore.socialUpdatesConsent?.content"
        />
      </div>
      <div v-if="stepStore.privacyPolicy" class="my-1">
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
  'La password deve contenere almeno 8 caratteri, una lettera maiuscola, una minuscola, un numero e un carattere speciale.',
  (value: string) => {
    if (!value) return false

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/
    return regex.test(value)
  }
)

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

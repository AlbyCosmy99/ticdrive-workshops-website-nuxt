<template>
  <div
    class="step-0 flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center"
  >
    <h1 class="text-4xl text-zinc-600 text-center font-semibold">Benvenuto!</h1>
    <h1 class="my-3 text-xl text-drive font-semibold text-center">
      Inserisci i tuoi dati per saperne di più.
    </h1>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
      <FormInput
        id="name"
        label="Name"
        placeholder="es. Mario"
        v-model="props.stepValues.name"
        :error-message="
          v$.name.$errors.length ? v$.name.$errors[0].$message : ''
        "
      />
      <FormInput
        id="surname"
        label="Cognome"
        placeholder="es. Rossi"
        v-model="props.stepValues.surname"
        :error-message="
          v$.surname.$errors.length ? v$.surname.$errors[0].$message : ''
        "
      />
    </div>
    <FormInput
      id="tel"
      label="Telefono"
      placeholder="+39 *** *******"
      v-model="props.stepValues.tel"
      type="tel"
      :error-message="v$.tel.$errors.length ? v$.tel.$errors[0].$message : ''"
    />
    <FormInput
      id="email"
      label="Email"
      placeholder="es. nome@gmail.com/tuo.nome@azienda.com"
      v-model="props.stepValues.email"
      :error-message="
        v$.email.$errors.length ? v$.email.$errors[0].$message : ''
      "
    />
    <FormInput
      id="workSpace"
      label="Nome dell’officina"
      placeholder="es. Autofficina rossi"
      v-model="props.stepValues.workSpace"
      :error-message="
        v$.workSpace.$errors.length ? v$.workSpace.$errors[0].$message : ''
      "
    />
    <FormInput
      id="postalCode"
      label="Codice postale"
      placeholder="es. 20100"
      v-model="props.stepValues.postalCode"
      :error-message="
        v$.postalCode.$errors.length ? v$.postalCode.$errors[0].$message : ''
      "
    />
    <div class="flex gap-1 mt-4 items-center">
      <div
        :class="[
          'w-4 h-4 border rounded',
          props.stepValues.accept1 ? 'border-green-600' : 'border-gray-600',
        ]"
        @click="checkToggle(1)"
      >
        <img
          v-if="props.stepValues.accept1"
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
          props.stepValues.accept2 ? 'border-green-600' : 'border-gray-600',
        ]"
        @click="checkToggle(2)"
      >
        <img
          v-if="props.stepValues.accept2"
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
import {defineProps, defineEmits, defineExpose} from 'vue';

const props = defineProps<{
  stepValues: object;
}>();

const emit = defineEmits(['updateStepValues']);

defineExpose({
  validate: async () => {
    const result = await v$.value.$validate();
    return result;
  },
});

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage('Name is required', required),
    },
    surname: {
      required: helpers.withMessage('Surname is required', required),
    },
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
  };
});
const v$ = useVuelidate(rules, props.stepValues);

const checkToggle = (check: number) => {
  if (check === 1) {
    emit('updateStepValues', 'accept1', !props.stepValues.accept1);
  } else if (check === 2) {
    emit('updateStepValues', 'accept2', !props.stepValues.accept2);
  }
};
</script>

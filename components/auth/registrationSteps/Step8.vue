<template>
  <div
    class="flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center"
  >
    <h1 class="text-gray-500 text-4xl font-semibold">Firma e Accettazione</h1>

    <h1 class="text-gray-500 text-2xl font-semibold mt-10">
      Garanzia e responsabilità
    </h1>
    <div class="bg-white rounded-lg shadow p-4 border border-gray-300 mt-3">
      <div class="flex flex-col">
        <div class="flex items-center gap-2 mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-drive"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <p class="font-medium text-tic text-lg">Garanzia sulla manodopera</p>
        </div>

        <div
          class="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
        >
          <span class="text-gray-600">Durata in mesi:</span>
          <div class="flex items-center gap-3">
            <div
              :class="[
                'select-none w-8 h-8 rounded-full flex items-center justify-center',
                !stepStore.stepEightData.warranty
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-drive text-white cursor-pointer hover:bg-green-600',
              ]"
              @click="
                stepStore.stepEightData.warranty > 0
                  ? stepStore.stepEightData.warranty--
                  : null
              "
            >
              <span class="text-lg font-bold">-</span>
            </div>

            <span
              class="w-10 h-10 bg-white border border-gray-200 rounded-md flex items-center justify-center font-bold"
            >
              {{ stepStore.stepEightData.warranty }}
            </span>

            <div
              class="select-none w-8 h-8 rounded-full bg-drive text-white flex items-center justify-center cursor-pointer hover:bg-green-600"
              @click="stepStore.stepEightData.warranty++"
            >
              <span class="text-lg font-bold">+</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h1 class="text-gray-500 text-2xl font-semibold mt-8">Firma digitale</h1>
    <div class="bg-white rounded-lg shadow p-4 border border-gray-300 mt-3">
      <div class="flex flex-col">
        <div class="flex items-center gap-2 mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-drive"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
            />
            <path
              fill-rule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clip-rule="evenodd"
            />
          </svg>
          <p class="font-medium text-tic text-lg">Firma con nome e cognome</p>
        </div>

        <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-4">
          <div class="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-drive"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-gray-600">Data di oggi:</span>
          </div>
          <span class="font-medium">{{
            new Date().toLocaleDateString('it-IT')
          }}</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">Nome</label>
            <input
              v-model="stepStore.stepEightData.signature.name"
              name="name"
              placeholder="Inserisci nome"
              :class="[
                'p-3 outline-none rounded-lg border border-gray-300 focus:border-green-500 w-full',
                {'border-red-500': v$.signature.name.$errors.length},
              ]"
            />
            <span
              v-if="v$.signature.name.$errors.length"
              class="text-red-500 text-sm mt-1"
            >
              {{ v$.signature.name.$errors[0]?.$message || '' }}
            </span>
          </div>

          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">Cognome</label>
            <input
              v-model="stepStore.stepEightData.signature.surname"
              name="surname"
              placeholder="Inserisci cognome"
              :class="[
                'p-3 outline-none rounded-lg border border-gray-300 focus:border-green-500 w-full',
                {'border-red-500': v$.signature.surname.$errors.length},
              ]"
            />
            <span
              v-if="v$.signature.surname.$errors.length"
              class="text-red-500 text-sm mt-1"
            >
              {{ v$.signature.surname.$errors[0]?.$message || '' }}
            </span>
          </div>
        </div>

        <p class="text-gray-500 text-sm mt-3">
          La firma digitale ha lo stesso valore legale di una firma autografa.
          Inserendo nome e cognome confermi di accettare i termini e le
          condizioni del servizio.
        </p>
      </div>
    </div>

    <!-- Conformità -->
    <h1
      v-if="stepStore.declarationsOfConformity.length"
      class="text-gray-500 text-2xl font-semibold mt-8 mb-1"
    >
      Autodichiarazione di conformità
    </h1>
    <div
      v-if="stepStore.loading"
      class="flex justify-center overflow-auto h-40"
    >
      <UiSpinnersTicDriveSpinner />
    </div>
    <TicDriveRadio
      v-else
      v-for="conformity in stepStore.declarationsOfConformity"
      :key="conformity.id"
      :id="conformity.id"
      class="mt-2"
      :name="conformity.content"
      :value="conformity"
      :url="conformity.url"
      :isChecked="
        !!stepStore.stepEightData.conformities.find(c => c.id === conformity.id)
      "
      @update:check="checkConformity"
    />
  </div>
</template>

<script lang="ts" setup>
import {defineExpose, computed} from 'vue';
import {required, helpers} from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import useStepStore from '~/store/step';
import Calendar from 'primevue/calendar';
import TicDriveRadio from '~/components/ui/radios/TicDriveRadio.vue';
import type {Conformity} from '~/types/auth/Conformity';
import {UiSpinnersTicDriveSpinner} from '#components';

const stepStore = useStepStore();
stepStore.getDeclarationsOfConformity();

// Set current date automatically
stepStore.stepEightData.signature.date = new Date();

defineExpose({
  validate: async () => await v$.value.$validate(),
});

const rules = computed(() => ({
  signature: {
    name: {
      required: helpers.withMessage('Nome obbligatorio', required),
    },
    surname: {
      required: helpers.withMessage('Cognome obbligatorio', required),
    },
  },
}));

const v$ = useVuelidate(rules, stepStore.stepEightData);

const updateWarranty = (action: 'plus' | 'minus') => {
  const current = stepStore.stepEightData.warranty;
  if (action === 'minus' && current > 0) {
    stepStore.stepEightData.warranty = current - 1;
  } else if (action === 'plus') {
    stepStore.stepEightData.warranty = current + 1;
  }
};

const checkConformity = (conformity: Conformity) => {
  const index = stepStore.stepEightData.conformities.findIndex(
    c => c.id === conformity.id,
  );
  if (index === -1) {
    stepStore.stepEightData.conformities.push(conformity);
  } else {
    stepStore.stepEightData.conformities.splice(index, 1);
  }
};
</script>

<style scoped>
.invalid-feedback {
  color: rgb(211, 49, 49);
  font-size: 14px;
  margin-top: 5px;
}
.input-error {
  border: 1px solid rgb(211, 49, 49) !important;
}
.date-picker-wrapper {
  border-radius: 6px !important;
}
</style>

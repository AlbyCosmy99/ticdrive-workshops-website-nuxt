<template>
  <div
    class="mx-auto flex w-full max-w-3xl flex-col justify-center px-4 pb-2 pt-2 sm:px-6"
  >
    <div>
      <h1 class="text-3xl font-semibold text-gray-600 sm:text-4xl">
        Firma e Accettazione
      </h1>
      <p class="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
        Completa gli ultimi dati legali e conferma le dichiarazioni richieste
        per pubblicare l'officina in modo corretto.
      </p>
    </div>

    <section class="mt-8 rounded-[28px] border border-gray-200 bg-white/90 p-5 shadow-sm sm:p-6">
      <div class="flex items-center gap-3">
        <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-drive">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <div>
          <h2 class="text-2xl font-semibold text-gray-600">
            Garanzia e responsabilità
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-500">
            Definisci la durata della garanzia sulla manodopera.
          </p>
        </div>
      </div>

      <div class="mt-5 rounded-2xl border border-gray-200 bg-gray-50/80 p-4">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-sm font-semibold text-gray-700">
              Garanzia sulla manodopera
            </p>
            <p class="mt-1 text-sm text-gray-500">
              Indica il numero di mesi che vuoi offrire ai clienti.
            </p>
          </div>

          <div class="flex items-center gap-3 self-start sm:self-auto">
            <button
              type="button"
              :class="[
                'flex h-10 w-10 items-center justify-center rounded-full transition',
                stepStore.stepEightData.warranty > 0
                  ? 'bg-drive text-white hover:bg-green-600'
                  : 'cursor-not-allowed bg-gray-200 text-gray-400',
              ]"
              @click="updateWarranty('minus')"
            >
              <span class="text-lg font-bold">-</span>
            </button>

            <span
              class="flex h-11 min-w-12 items-center justify-center rounded-xl border border-gray-200 bg-white px-3 text-base font-semibold text-gray-700"
            >
              {{ stepStore.stepEightData.warranty }}
            </span>

            <button
              type="button"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-drive text-white transition hover:bg-green-600"
              @click="updateWarranty('plus')"
            >
              <span class="text-lg font-bold">+</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="mt-6 rounded-[28px] border border-gray-200 bg-white/90 p-5 shadow-sm sm:p-6">
      <div class="flex items-center gap-3">
        <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-drive">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
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
        </div>

        <div>
          <h2 class="text-2xl font-semibold text-gray-600">
            Firma digitale
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-500">
            Inserisci i dati della firma per confermare i termini del servizio.
          </p>
        </div>
      </div>

      <div class="mt-5 rounded-2xl border border-gray-200 bg-gray-50/80 p-4">
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap items-center gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-inset ring-gray-200">
            <div class="flex items-center gap-2 text-gray-600">
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
              <span class="text-sm font-medium">Data di oggi</span>
            </div>

            <span class="text-base font-semibold text-gray-800">
              {{ new Date().toLocaleDateString('it-IT') }}
            </span>
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="flex flex-col">
              <label class="mb-1.5 text-sm font-medium text-gray-600">Nome</label>
              <input
                v-model="stepStore.stepEightData.signature.name"
                name="name"
                placeholder="Inserisci nome"
                :class="[
                  'w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-500',
                  {'border-red-500': v$.signature.name.$errors.length},
                ]"
              />
              <span
                v-if="v$.signature.name.$errors.length"
                class="mt-1 text-sm text-red-500"
              >
                {{ v$.signature.name.$errors[0]?.$message || '' }}
              </span>
            </div>

            <div class="flex flex-col">
              <label class="mb-1.5 text-sm font-medium text-gray-600">Cognome</label>
              <input
                v-model="stepStore.stepEightData.signature.surname"
                name="surname"
                placeholder="Inserisci cognome"
                :class="[
                  'w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-500',
                  {'border-red-500': v$.signature.surname.$errors.length},
                ]"
              />
              <span
                v-if="v$.signature.surname.$errors.length"
                class="mt-1 text-sm text-red-500"
              >
                {{ v$.signature.surname.$errors[0]?.$message || '' }}
              </span>
            </div>
          </div>

          <p class="text-sm leading-7 text-gray-500">
            La firma digitale ha lo stesso valore legale di una firma autografa.
            Inserendo nome e cognome confermi di accettare i termini e le
            condizioni del servizio.
          </p>
        </div>
      </div>
    </section>

    <section
      v-if="stepStore.declarationsOfConformity.length || stepStore.loading"
      class="mt-6 rounded-[28px] border border-gray-200 bg-white/90 p-5 shadow-sm sm:p-6"
    >
      <div>
        <h2 class="text-2xl font-semibold text-gray-600">
          Autodichiarazione di conformità
        </h2>
        <p class="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
          Seleziona le dichiarazioni che confermi. I testi lunghi e i link ora
          restano all'interno del contenitore e si leggono correttamente anche
          su schermi più stretti.
        </p>
      </div>

      <div
        v-if="stepStore.loading"
        class="flex h-40 items-center justify-center overflow-auto"
      >
        <UiSpinnersTicDriveSpinner />
      </div>

      <div v-else class="mt-5 space-y-3">
        <TicDriveRadio
          v-for="conformity in stepStore.declarationsOfConformity"
          :key="conformity.id"
          :id="conformity.id"
          class="w-full"
          :name="conformity.content"
          :value="conformity"
          :url="conformity.url"
          :multiline="true"
          :isChecked="
            !!stepStore.stepEightData.conformities.find(c => c.id === conformity.id)
          "
          @update:check="checkConformity"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import {defineExpose, computed} from 'vue';
import {required, helpers} from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import useStepStore from '~/store/step';
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

<template>
  <div
    class="flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center"
  >
    <h1 class="text-gray-500 text-4xl font-semibold">Firma e Accettazione</h1>

    <!-- Garanzia -->
    <h1 class="text-gray-500 text-2xl font-semibold mt-10">
      Garanzia e responsabilità
    </h1>
    <PlusMinusField
      :isMinusDisable="!stepStore.stepEightData.warranty"
      v-model:numberValue="stepStore.stepEightData.warranty"
      label="Garanzia sulla manodopera (durata in mesi):"
      @update:number="updateWarranty"
    />

    <!-- Firma digitale -->
    <h1 class="text-gray-500 text-2xl font-semibold mt-8">Firma digitale</h1>
    <div
      class="p-1 mt-2 border border-gray-500 rounded-xl w-full flex flex-col sm:flex-row gap-3 justify-between relative"
    >
      <div class="grid grid-cols-2 gap-3 w-full sm:w-2/3">
        <div class="flex flex-col">
          <input
            v-model="stepStore.stepEightData.signature.name"
            name="name"
            placeholder="Nome"
            :class="[
              'p-3 outline-none rounded-xl border border-gray-500 focus:border-green-500 w-full max-h-10',
              {'input-error': v$.signature.name.$errors.length},
            ]"
          />
          <span
            v-if="v$.signature.name.$errors.length"
            class="invalid-feedback"
          >
            {{ v$.signature.name.$errors[0]?.$message || '' }}
          </span>
        </div>
        <div class="flex flex-col">
          <input
            v-model="stepStore.stepEightData.signature.surname"
            name="surname"
            placeholder="Cognome"
            :class="[
              'p-3 outline-none rounded-xl border border-gray-500 focus:border-green-500 w-full max-h-10',
              {'input-error': v$.signature.surname.$errors.length},
            ]"
          />
          <span
            v-if="v$.signature.surname.$errors.length"
            class="invalid-feedback"
          >
            {{ v$.signature.surname.$errors[0]?.$message || '' }}
          </span>
        </div>
      </div>
      <div class="flex flex-col w-full sm:w-1/3">
        <Calendar
          v-model="stepStore.stepEightData.signature.date"
          readonly
          placeholder="(giorno/mese/anno)"
          :class="[
            'outline-none date-picker-wrapper text-center bg-gray-100 px-5 py-2 max-h-10',
            {'input-error': v$.signature.date.$errors.length},
          ]"
        />
        <span v-if="v$.signature.date.$errors.length" class="invalid-feedback">
          {{ v$.signature.date.$errors[0]?.$message || '' }}
        </span>
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
      class="flex justify-center  overflow-auto h-40"
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
import { UiSpinnersTicDriveSpinner } from '#components';

const stepStore = useStepStore();
stepStore.getDeclarationsOfConformity();

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
    date: {
      required: helpers.withMessage('Data obbligatoria', required),
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

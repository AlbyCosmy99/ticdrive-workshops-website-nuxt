<template>
  <div
    class="mx-auto flex w-full max-w-3xl flex-col justify-center px-4 pb-2 pt-2 sm:px-6"
  >
    <h1 class="text-3xl font-semibold text-gray-600 sm:text-4xl">
      Officina specializzata in:
    </h1>
    <p class="mt-3 text-base font-semibold text-gray-500 sm:text-lg">
      (Selezionare più di una casella se necessario)
    </p>
    <div
      v-if="loading"
      class="flex justify-center items-center overflow-auto h-80"
    >
      <UiSpinnersTicDriveSpinner />
    </div>
    <div
      v-else
      class="mt-8 grid max-h-80 grid-cols-1 gap-2 overflow-auto rounded-2xl border border-gray-200 bg-gray-50/60 p-4 md:grid-cols-2"
    >
      <TicDriveRadio
        v-for="specialization in specializations"
        :key="specialization.id"
        :id="specialization.id"
        :name="specialization.name"
        :value="specialization"
        :isChecked="
          !!stepStore.stepThreeData.specializations.find(
            s => s.id === specialization.id,
          )
        "
        @update:check="handleRadioSelection"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineEmits} from 'vue';
import TicDriveRadio from '~/components/ui/radios/TicDriveRadio.vue';
import useSpecializations from '~/composables/http/useSpecializations';
import useStepStore from '~/store/step';
import type {Specialization} from '~/types/auth/steps/StepThreeData';

const stepStore = useStepStore();

const emit = defineEmits<{
  (e: 'update:isCheck', value: number): void;
}>();

const handleRadioSelection = (specialization: Specialization) => {
  const index = stepStore.stepThreeData.specializations.findIndex(
    s => s.id === specialization.id,
  );
  if (index === -1) {
    stepStore.stepThreeData.specializations.push(specialization);
  } else {
    stepStore.stepThreeData.specializations.splice(index, 1);
  }
};

const {specializations, loading, fetchSpecializations} = useSpecializations();
fetchSpecializations();
</script>

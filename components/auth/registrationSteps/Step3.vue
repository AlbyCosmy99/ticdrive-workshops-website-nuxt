<template>
  <div
    class="flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center"
  >
    <h1 class="text-4xl text-gray-500 font-semibold">
      Officina specializzata in:
    </h1>
    <p class="text-lg text-gray-500 font-semibold mt-3">
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
      class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8 mt-8 h-80 overflow-auto py-0"
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

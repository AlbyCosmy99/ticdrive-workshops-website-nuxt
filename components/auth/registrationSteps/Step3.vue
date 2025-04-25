<template>
  <div
    class="flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center"
  >
    <h1 class="text-4xl text-gray-500 font-semibold">
      Officina specializzata in:
    </h1>
    <h1 class="text-lg text-gray-500 font-semibold mt-3">
      (Selezionare più di una casella se necessario)
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8 mt-8">
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
import {defineProps, defineEmits} from 'vue';
import TicDriveRadio from '~/components/ui/radios/TicDriveRadio.vue';
import useStepStore from '~/store/step';
import type {
  Specialization,
  StepThreeData,
} from '~/types/auth/steps/StepThreeData';

const props = defineProps<{
  stepValues: StepThreeData;
}>();

const stepStore = useStepStore();

const emit = defineEmits<{
  (e: 'update:isCheck', value: number): void;
}>();

//mock
const specializations: Specialization[] = [
  {id: 1, name: 'Meccanica generale'},
  {id: 2, name: 'Flotte Aziendali e Noleggio'},
  {id: 3, name: 'Elettrauto'},
  {id: 4, name: 'Veicoli Elettrici e Ibridi'},
  {id: 5, name: 'Gommista'},
  {id: 6, name: 'Cristalli e Parabrezza'},
  {id: 7, name: 'Carrozzeria'},
  {id: 8, name: 'Veicoli Elettrici e Ibridi'},
  {id: 9, name: 'Centro revisioni'},
  {id: 10, name: 'Impianti GPL/Metano'},
];

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
</script>

<template>
  <div
    class="step-2 flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center"
  >
    <h1 class="text-4xl text-gray-500 font-semibold">
      Officina specializzata in:
    </h1>
    <h1 class="text-lg text-gray-500 font-semibold mt-3">
      (Selezionare piu di una casella se necessario)
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8 mt-8">
      <RadioOption
        v-for="(value, index) in workShopSpecs"
        :key="index"
        :label="value.label"
        :value="value.value"
        :isCheck="props.stepValues.currentWorkShopSpec.includes(value.value)"
        @update:isCheck="handleRadioSelection"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, defineEmits} from 'vue';

const workShopSpecs = [
  {value: 1, label: 'Meccanica generale'},
  {value: 2, label: 'Flotte Aziendali e Noleggio'},
  {value: 3, label: 'Elettrauto'},
  {value: 4, label: 'Veicoli Elettrici e Ibridi'},
  {value: 5, label: 'Gommista'},
  {value: 6, label: 'Cristalli e Parabrezza'},
  {value: 7, label: 'Carrozzeria'},
  {value: 8, label: 'Veicoli Elettrici e Ibridi'},
  {value: 9, label: 'Centro revisioni'},
  {value: 10, label: 'Impianti GPL/Metano'},
];

const props = defineProps<{
  stepValues: object;
}>();

const emit = defineEmits(['update:isCheck']);

const handleRadioSelection = (value: any) => {
  emit('update:isCheck', value);
};
</script>

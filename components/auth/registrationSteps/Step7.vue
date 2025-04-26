<template>
  <div
    class="flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center"
  >
    <h1 class="text-gray-500 text-4xl font-semibold">
      Descrizione dell’officina
    </h1>

    <h1 class="text-gray-500 text-2xl font-semibold mt-10">
      Storia dell’officina
    </h1>
    <textarea
      v-model="stepValues.history"
      :class="[
        'border-2 border-gray-500 rounded-xl h-30 px-2 py-2 w-full mt-5 resize-none outline-none focus:border-green-500',
        {'input-error': v$.history.$errors.length},
      ]"
      placeholder="(breve descrizione della tua attività, valori e punti di forza – max 500 caratteri)"
    ></textarea>
    <span v-if="v$.history.$errors.length" class="invalid-feedback">
      {{ v$.history.$errors[0]?.$message || '' }}
    </span>

    <h1 class="text-gray-500 text-2xl font-semibold mt-5">Lingue Parlate:</h1>
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 mb-10">
      <TicDriveRadio
        v-for="lang in langs"
        :key="lang.value"
        :label="lang.label"
        :value="lang.value"
        :isCheck="lang.value === stepValues.lang"
        @update:isCheck="langHandle"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, defineExpose, computed} from 'vue';
import {helpers, required, minLength} from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import useStepStore from '~/store/step';
import TicDriveRadio from '~/components/ui/radios/TicDriveRadio.vue';

interface StepSevenData {
  history: string;
  lang: number;
}

const props = defineProps<{
  stepValues: StepSevenData;
}>();

defineExpose({
  validate: async () => await v$.value.$validate(),
});

const languages = [
  {value: 1, label: 'Italiano'},
  {value: 2, label: 'Tedesco'},
  {value: 3, label: 'Inglese'},
  {value: 4, label: 'Francese'},
  {value: 5, label: 'Spagnolo'},
  {value: 6, label: 'Altro'},
];

const rules = computed(() => ({
  history: {
    required: helpers.withMessage('La descrizione è obbligatoria', required),
    minLength: helpers.withMessage('Minimo 100 caratteri', minLength(100)),
  },
}));

const v$ = useVuelidate(rules, props.stepValues);

const stepStore = useStepStore();
const stepValues = props.stepValues;

const langHandle = (value: number) => {
  stepValues.lang = value;
  stepStore.stepSevenData.lang = value;
};
</script>

<style scoped>
.invalid-feedback {
  color: rgb(211, 49, 49);
  font-size: 14px;
  margin-top: 5px;
}
.input-error {
  border-color: rgb(211, 49, 49) !important;
}
</style>

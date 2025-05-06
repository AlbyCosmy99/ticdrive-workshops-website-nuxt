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
      v-model="stepStore.stepSevenData.description"
      :class="[
        'border-2 border-gray-500 rounded-xl h-30 px-2 py-2 w-full mt-5 resize-none outline-none focus:border-green-500'
      ]"
      placeholder="(breve descrizione della tua attività, valori e punti di forza – max 500 caratteri)"
    ></textarea>

    <h1 class="text-gray-500 text-2xl font-semibold mt-5">Lingue Parlate:</h1>
    <div
      v-if="languageStore.loading"
      class="flex justify-center items-center overflow-auto h-40"
    >
      <UiSpinnersTicDriveSpinner />
    </div>
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 mb-10">
      <TicDriveRadio
        v-for="language in languageStore.languages"
        :key="language.id"
        :id="language.id"
        :name="language.label"
        :value="language"
        :isChecked="
          !!stepStore.stepSevenData.languages.find(
            lang => lang.id === language.id,
          )
        "
        @update:check="checkLanguage"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import useStepStore from '~/store/step';
import TicDriveRadio from '~/components/ui/radios/TicDriveRadio.vue';
import type {Language} from '~/types/Language';
import useLanguageStore from '~/store/language';


const stepStore = useStepStore();
const languageStore = useLanguageStore();
languageStore.getLanguages();

const checkLanguage = (language: Language) => {
  const index = stepStore.stepSevenData.languages.findIndex(
    l => l.id === language.id,
  );
  if (index === -1) {
    stepStore.stepSevenData.languages.push(language);
  } else {
    stepStore.stepSevenData.languages.splice(index, 1);
  }
};
</script>

<style scoped>
.invalid-feedback {
  color: rgb(211, 49, 49);
  font-size: 14px;
  margin-top: 5px;
}
</style>

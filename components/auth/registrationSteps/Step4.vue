<template>
  <div
    class="mx-auto flex w-full max-w-3xl flex-col justify-center px-4 pb-2 pt-2 sm:px-6"
  >
    <h1 class="text-3xl font-semibold text-gray-600 sm:text-4xl">
      Tipologia di servizi offerti
    </h1>
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
        v-for="service in services"
        :key="service.id"
        :id="service.id"
        :name="service.title"
        :value="service"
        :isChecked="
          !!stepStore.stepFourData.services.find(s => s.id === service.id)
        "
        @update:check="handleRadioSelection"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import TicDriveRadio from '~/components/ui/radios/TicDriveRadio.vue';
import useServices from '~/composables/http/useServices';
import useStepStore from '~/store/step';
import type {Service} from '~/types/Service';

const stepStore = useStepStore();

const handleRadioSelection = (service: Service) => {
  const index = stepStore.stepFourData.services.findIndex(
    s => s.id === service.id,
  );
  if (index === -1) {
    stepStore.stepFourData.services.push(service);
  } else {
    stepStore.stepFourData.services.splice(index, 1);
  }
};

const {services, loading, fetchServices} = useServices();
fetchServices();
</script>

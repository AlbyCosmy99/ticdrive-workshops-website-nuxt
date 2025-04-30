<template>
  <div
    class="flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center"
  >
    <h1 class="text-4xl text-gray-500 font-semibold">
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
      class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8 mt-8 h-80 overflow-auto py-4"
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

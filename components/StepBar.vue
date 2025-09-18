<template>
  <div class="p-4 w-full max-w-lg lg:max-w-full mx-auto">
    <NuxtImg
      v-if="isRegisterRoute"
      src="https://raw.githubusercontent.com/AlbyCosmy99/ticdrive-workshops-website-nuxt/7604878af149bec51368ddc4ae7686902fd92ad6/public/svg/TicDriveLogo.svg"
      alt="logo"
      class="mx-auto lg:absolute right-6 top-[-1]"
      width="100"
      height="100"
    />

    <div
      v-if="stepStore.currentStep >= 0 && isRegisterRoute && !hideBar"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-8 gap-1 w-8/9 ps-6"
    >
      <div
        v-for="(step, index) in stepStore.steps"
        :key="index"
        class="mt-2 cursor-pointer"
        @click="stepStore.currentStep = step.step"
      >
        <div
          :class="[
            'h-[5px]',
            stepStore.completedSteps.includes(step.step)
              ? 'bg-green-500'
              : 'bg-gray-200',
          ]"
        ></div>

        <div class="flex justify-start items-center mt-2">
          <NuxtImg
            v-if="stepStore.completedSteps.includes(step.step)"
            class="me-1"
            src="/images/step-vector.svg"
            alt="step-check"
            width="16"
            height="16"
            aria-hidden="true"
          />

          <div
            v-else
            :class="['rounded-full border w-4 h-4 me-1 border-gray-500']"
            role="presentation"
          ></div>

          <h1 class="text-sm text-gray-500">{{ step.value }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import useStepStore from '~/store/step';
import {useRoute} from 'vue-router';

const stepStore = useStepStore();
const route = useRoute();

const isRegisterRoute = computed(() => route.path.startsWith('/auth/register'));

const props = defineProps({
  hideBar: {
    type: Boolean,
    default: false,
  },
});
</script>

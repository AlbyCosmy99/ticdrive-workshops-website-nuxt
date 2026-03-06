<template>
  <div class="mx-auto w-full max-w-5xl px-4 pb-2 pt-3 sm:px-6 lg:max-w-full lg:p-4">
    <NuxtImg
      v-if="isRegisterRoute"
      src="https://raw.githubusercontent.com/AlbyCosmy99/ticdrive-workshops-website-nuxt/7604878af149bec51368ddc4ae7686902fd92ad6/public/svg/TicDriveLogo.svg"
      alt="logo"
      class="mx-auto h-auto w-20 lg:absolute lg:right-6 lg:top-[-1]"
      width="100"
      height="100"
    />

    <div
      v-if="stepStore.currentStep >= 0 && isRegisterRoute && !hideBar"
      class="rounded-2xl border border-gray-200 bg-white/90 p-4 shadow-sm backdrop-blur-sm lg:hidden"
    >
      <div class="mb-3 flex items-center justify-between gap-3">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
            Registrazione
          </p>
          <p class="text-base font-semibold text-gray-700">
            Step {{ currentStepIndex }} di {{ totalSteps }}
          </p>
        </div>
        <span
          class="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-drive"
        >
          {{ currentStepLabel }}
        </span>
      </div>

      <div class="h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          class="h-full rounded-full bg-drive transition-all duration-300"
          :style="{width: `${progressPercentage}%`}"
        ></div>
      </div>
    </div>

    <div
      v-if="stepStore.currentStep >= 0 && isRegisterRoute && !hideBar"
      class="hidden gap-1 ps-6 lg:grid lg:grid-cols-5 xl:grid-cols-7"
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
const totalSteps = computed(() => stepStore.steps.length + 1);
const currentStepIndex = computed(() => Math.max(stepStore.currentStep, 1));
const currentStepLabel = computed(() => {
  if (stepStore.currentStep <= 1) {
    return 'Benvenuto';
  }

  return (
    stepStore.steps.find(step => step.step === stepStore.currentStep)?.value ||
    'Registrazione'
  );
});
const progressPercentage = computed(
  () => (currentStepIndex.value / totalSteps.value) * 100,
);

const props = defineProps({
  hideBar: {
    type: Boolean,
    default: false,
  },
});
</script>

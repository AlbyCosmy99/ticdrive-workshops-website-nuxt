<template>
  <LayoutAuthRegistration
    :main-image="`@/public/images/reg${stepStore.currentStep}.jpg`"
  >
    <template #rightContent>
      <RegisterForm />
    </template>
  </LayoutAuthRegistration>
</template>

<script lang="ts" setup>
import useStepStore from '~/store/step';

const stepStore = useStepStore();
</script>

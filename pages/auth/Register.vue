<template>
  <LayoutAuthRegistration
    :main-image="`/images/reg${stepStore.currentStep}.jpg`"
  >
    <template #rightContent>
      <RegisterForm />
    </template>
  </LayoutAuthRegistration>
</template>

<script lang="ts" setup>
import useStepStore from '~/store/step';

definePageMeta({
  middleware: 'auth',
});

const stepStore = useStepStore();
</script>

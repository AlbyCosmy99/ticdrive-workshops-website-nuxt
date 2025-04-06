<template>
  <AuthRegistrationLayout
    :main-image="`/images/reg${stepStore.currentStep}.jpg`"
  >
    <template #rightContent>
      <RegisterForm />
    </template>
  </AuthRegistrationLayout>
</template>

<script lang="ts" setup>
import useStepStore from '~/store/step';

const stepStore = useStepStore();
</script>

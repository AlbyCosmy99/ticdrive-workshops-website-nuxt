<template>
  <AuthRegistrationLayout main-image="/images/reg1.jpg">
    <template #rightContent>
      <RegisterForm />
    </template>
  </AuthRegistrationLayout>
</template>

<script setup lang="ts">
import useStepStore from '~/store/step';

const stepStore = useStepStore();
onMounted(() => {
  stepStore.currentStep++;
});
</script>

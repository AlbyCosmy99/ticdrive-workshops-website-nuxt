<template>
  <LayoutAuthRegistration main-image="/images/reg0.jpg">
    <template #rightContent>
      <LoginForm />
    </template>
  </LayoutAuthRegistration>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});
</script>

<script setup lang="ts">
import DeleteAccount from '~/components/settings/DeleteAccount.vue';

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});
</script>

<template>
  <DeleteAccount />
</template>
<template>
  <p>main</p>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';
import {onMounted, ref} from 'vue';
const router = useRouter();
const name = ref('Andrei')


onMounted(() => {
  router.push('/auth/login');
});
</script>

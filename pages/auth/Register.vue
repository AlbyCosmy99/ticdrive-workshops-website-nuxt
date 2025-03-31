<template>
    <AuthRegistrationLayout
        :main-image="`/images/reg${currentStep}.jpg`"
    >
        <template #rightContent>
            <RegisterForm />
        </template>
    </AuthRegistrationLayout>
</template>

<script lang="ts" setup>
    import { useStepStore } from '~/store/step';

    const useStore = useStepStore();
    const currentStep = computed(() => useStore.getCurrentStep);

</script>
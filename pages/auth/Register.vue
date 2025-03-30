<template>
    <AuthRegistrationLayout
        :main-image="`/images/reg${currentStep}.jpg`"
    >
        <template #rightContent>
            <RegisterForm />
        </template>
    </AuthRegistrationLayout>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import { useStepStore } from '~/store/auth';

    export default defineComponent({
        setup() {
            const useStore = useStepStore();
            const currentStep = computed(() => useStore.getCurrentStep);

            return {
                currentStep
            }
        }
    })
</script>
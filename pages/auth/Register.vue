<template>
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> fafb1a952f231c198146f3789fc53014d904c100
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
<<<<<<< HEAD
>>>>>>> fafb1a952f231c198146f3789fc53014d904c100
=======
>>>>>>> fafb1a952f231c198146f3789fc53014d904c100

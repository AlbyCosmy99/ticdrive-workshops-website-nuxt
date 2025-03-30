<template>
    <div class="flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center">
        <h1 class="text-gray-500 text-4xl font-semibold">Firma e Accettazione</h1>
        <h1 class="text-gray-500 text-2xl font-semibold mt-10">Garanzia e responsabilità</h1>
        <PlusMinusField 
            :isMinusDisable="!props.stepValues.warranty"
            :numberValue="props.stepValues.warranty"
            label="Garanzia sulla manodopera (durata in mesi):"
            @update:number="updateWarranty($event)"
        />
    </div>
</template>

<script lang="ts" setup>
    import { defineProps } from 'vue';
    import useStepStore from '~/store/step';

    const useStore = useStepStore();
    const props = defineProps<{
        stepValues: any
    }>();

    const updateWarranty = (value: string) => {
        console.log(value);
        if(value === 'minus') {
            if(!useStore.step_seven_value.warranty) {
                return ;
            }
            useStore.step_seven_value.warranty = useStore.step_seven_value.warranty-1;
        } else {
            useStore.step_seven_value.warranty = useStore.step_seven_value.warranty + 1; 
        }
    }
</script>
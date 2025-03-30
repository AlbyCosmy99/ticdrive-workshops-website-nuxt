<template>
    <div class="flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center">
        <h1 class="text-gray-500 text-4xl font-semibold">
            Descrizione dell’officina
        </h1>
        <h1 class="text-gray-500 text-2xl text-semibold mt-10">
            Storia dell’officina
        </h1>
        <textarea 
            :class="[
                'border-2 border-gray-500 rounded-xl overflow-y-auto h-30 px-10 py-8 w-full mt-5 outline-none focus:border-green-500',
                {'input-error': v$.history.$errors.length}
            ]"
            v-model="props.stepValues.history"
            placeholder="(breve descrizione della tua attività, valori e punti di forza – max 500 caratteri)"
        ></textarea>
        <span v-if="v$.history.$errors.length" class="invalid-feedback">
            {{ v$.history.$errors[0].$message }}
        </span>

        <h1 class="text-gray-500 text-2xl font-semibold mt-5">Lingue Parlate:</h1>
        <div
            class="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 mb-10"
        >
            <RadioOption 
                v-for="(value, index) in langs"
                :key="index"
                :isCheck="value.value === props.stepValues.lang"
                :label="value.label"
                :value="value.value"
                @update:isCheck="langHandle"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { defineProps, defineEmits, defineExpose, ref } from 'vue';
    import { helpers, required, minLength } from '@vuelidate/validators';
    import useVuelidate from '@vuelidate/core';
    import useStepStore from '~/store/step';

    const useStore = useStepStore();

    const langs = [
        { value: 1, label: 'Italiano' },
        { value: 2, label: 'Tedesco' },
        { value: 3, label: 'Inglese' },
        { value: 4, label: 'Francese' },
        { value: 5, label: 'Spagnolo' },
        { value: 6, label: 'Altro' },
    ]

    const props = defineProps<{
        stepValues: any
    }>();
    defineExpose({
        validate: async () => await v$.value.$validate()
    })
    
    const rule = computed(() => ({
        history: {
            required: helpers.withMessage('History text is required', required),
            minLength: helpers.withMessage('History text must be at least 100 characters', minLength(100))
        }
    }))
    const v$ = useVuelidate(rule, props.stepValues)

    const langHandle = (value) => {
        useStore.step_six_value.lang = value;
    }
</script>

<style scoped>
    .invalid-feedback {
        color: rgb(211, 49, 49);
        font-size: 14px;
        margin-top: 5px;
    }
    .input-error {
        border-color: rgb(211, 49, 49) !important;
    }
</style>
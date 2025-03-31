<template>
    <div class="flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center">
        <h1 class="text-gray-500 text-4xl font-semibold">Firma e Accettazione</h1>
        <h1 class="text-gray-500 text-2xl font-semibold mt-10">Garanzia e responsabilità</h1>
        <PlusMinusField 
            :isMinusDisable="!props.stepValues.warranty"
            v-model:numberValue="props.stepValues.warranty"
            label="Garanzia sulla manodopera (durata in mesi):"
            @update:number="updateWarranty($event)"
        />
        <h1 class="text-gray-500 text-2xl font-semibold mt-8">Firma digitale</h1>
        <div class="p-1 mt-2 outline-none border border-gray-500 rounded-xl w-full flex flex-col sm:flex-row gap-3 justify-between relative">
            <div class="grid grid-cols-2 gap-3">
                <div class="flex flex-col">
                    <input 
                        :class="[
                            'p-3 outline-none rounded-xl border border-gray-500 focus:border-green-500 w-full max-h-10',
                            {'input-error': v$.digital.name.$errors.length}
                        ]"
                        v-model="props.stepValues.digital.name"
                        placeholder="Nome"
                    />
                    <span v-if="v$.digital.name.$errors.length" class="invalid-feedback">
                        {{ v$.digital.name.$errors[0].$message }}
                    </span>
                </div>
                <div class="flex flex-col">
                    <input 
                        :class="[
                            'p-3 outline-none rounded-xl border border-gray-500 focus:border-green-500 w-full max-h-10',
                            {'input-error': v$.digital.surname.$errors.length}
                        ]"
                        v-model="props.stepValues.digital.surname"
                        placeholder="Cognome"
                    />
                    <span v-if="v$.digital.surname.$errors.length" class="invalid-feedback">
                        {{ v$.digital.surname.$errors[0].$message }}
                    </span>
                </div>
            </div>
            <div class="flex flex-col">
                <DatePicker
                    :class="[
                        'outline-none date-picker-wrapper text-center bg-gray-100 px-5 py-2 max-h-10',
                        {'input-error': v$.digital.date.$errors.length}
                    ]"
                    placeholder="(giorno/mese/anno)"
                    v-model="date"
                    @update:model-value="storeDate"
                />
                <span v-if="v$.digital.date.$errors.length" class="invalid-feedback">
                    {{ v$.digital.date.$errors[0].$message }}
                </span>
            </div>
        </div>
        <h1 class="text-gray-500 text-2xl font-semibold mt-8 mb-1">Autodichiarazione di conformità</h1>
        <RadioOption 
            class="mt-2"
            v-for="(value, index) in conformities"
            :key="index"
            :label="value.label"
            :value="value.value"
            :isCheck="props.stepValues.currentConformities.includes(value.value)"
            @update:isCheck="checkHandle($event)"
        />
    </div>
</template>

<script lang="ts" setup>
    import { defineProps, defineExpose } from 'vue';
    import { helpers, required } from '@vuelidate/validators';
    import DatePicker from 'primevue/datepicker';
    import useVuelidate from '@vuelidate/core';
    import useStepStore from '~/store/step';

    const useStore = useStepStore();
    const conformities = [
        { value: 1, label: 'Dichiaro che l’autofficina è regolarmente registrata e in possesso di tutti i documenti richiesti dalla normativa italiana per operare legalmente.' },
        { value: 2, label: 'Accetto la trattenuta della commissione da parte della piattaforma e la modalità di accredito selezionata..' },
        { value: 3, label: "Accetto le condizioni di utilizzo della piattaforma e l'informativa sulla privacy (GDPR)." },
        { value: 4, label: "Dichiaro di aderire alla piattaforma." },
        { value: 5, label: "Dichiaro di aver letto e accettato i Termini e Condizioni della piattaforma." },
    ]
    const props = defineProps<{
        stepValues: object
    }>();
    defineExpose({
        validate: async () => await v$.value.$validate()
    })

    const rule = computed(() => ({
        digital: {
            name: {
                required: helpers.withMessage('Name is required', required)
            },
            surname: {
                required: helpers.withMessage('Surname is required', required)
            },
            date: {
                required: helpers.withMessage('Date is required', required)
            }
        }
    }))
    const v$ = useVuelidate(rule, props.stepValues);
    const date = ref(useStore.step_seven_value.digital.date);

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

    const checkHandle = (value: number) => {
        const index = useStore.step_seven_value.currentConformities.indexOf(value);
        console.log(index);
        if(index !== -1) {
            useStore.step_seven_value.currentConformities.splice(index, 1);
        } else {
            useStore.step_seven_value.currentConformities.push(value);
        }
    }

    const storeDate = () => {
        useStore.step_seven_value.digital.date = date.value;
    }
</script>

<style scoped>
    .invalid-feedback {
        color: rgb(211, 49, 49);
        font-size: 14px;
        margin-top: 5px;
    }
    .input-error {
        border: 1px solid rgb(211, 49, 49) !important;
    }
    .p-datepicker {
        padding: 0 !important;
    }
    .p-inputtext {
        background-color: oklch(0.967 0.003 264.542) !important;  
    }
    .date-picker-wrapper {
        border-radius: 6px !important;
    }
</style>
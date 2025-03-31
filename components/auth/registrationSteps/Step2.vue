<template>
  <div class="step-1 flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center">
    <h1 class="text-4xl text-gray-500 font-semibold">Informazioni sull'attività</h1>
    <div class="flex flex-col mt-10">
        <h1 class="text-2xl text-gray-500 font-semibold">Indirizzo completo:</h1>
        <FormInput 
            placeholder="Via e Numero Civico:"
            v-model="props.stepValues.fullAddress.add1"
            size="small"
            :error-message="v$.fullAddress.add1.$errors.length ? v$.fullAddress.add1.$errors[0].$message : ''"
        />
        <FormInput 
            placeholder="Città:"
            v-model="props.stepValues.fullAddress.add2"
            size="small"
            :error-message="v$.fullAddress.add2.$errors.length ? v$.fullAddress.add2.$errors[0].$message : ''"
        />
        <FormInput 
            placeholder="Provincia:"
            v-model="props.stepValues.fullAddress.add3"
            size="small"
            :error-message="v$.fullAddress.add3.$errors.length ? v$.fullAddress.add3.$errors[0].$message : ''"
        />
        <FormInput 
            placeholder="CAP:"
            v-model="props.stepValues.fullAddress.add4"
            size="small"
            :error-message="v$.fullAddress.add4.$errors.length ? v$.fullAddress.add4.$errors[0].$message : ''"
        />
    </div>
    <div class="mt-4 ">
        <h1 class="text-2xl text-gray-500 font-semibold">Contatti Aziendali</h1>
        <div class="flex flex-col">
            <FormInput 
                placeholder="Numero di telefono aziendale (fisso o cellulare):"
                v-model="props.stepValues.companyContact.contact1"
                size="small"
            />
            <FormInput 
                placeholder="Indirizzo email aziendale"
                v-model="props.stepValues.companyContact.contact2"
                size="small"
            />
        </div>
    </div>
    <div class="mt-4">
        <h1 class="text-2xl text-gray-500 font-semibold">Contatti di Riferimento</h1>
        <FormInput 
            placeholder="Nome e Cognome del Referente:"
            v-model="props.stepValues.referContact.contact1"
            size="small"
        />
        <FormInput 
            placeholder="Telefono diretto:"
            v-model="props.stepValues.referContact.contact2"
            size="small"
        />
        <FormInput 
            placeholder="Email di contatto operativo:"
            v-model="props.stepValues.referContact.contact3"
            size="small"
        />
    </div>
    <h1 class="mt-3 mb-4 text-gray-500 text-md">(Per ricevere notifiche di prenotazioni o comunicazioni importanti)</h1>
  </div>
</template>

<script lang="ts" setup>
  import useVuelidate from '@vuelidate/core';
  import {helpers, required} from '@vuelidate/validators';
  import { defineProps, defineExpose } from 'vue';

  const props = defineProps<{
    stepValues: object
  }>();

  defineExpose({
    validate: async () => {
      const result = await v$.value.$validate();
      return result;
    }
  })

  const rules = computed(() => ({
    fullAddress: {
      add1: {
        required: helpers.withMessage('Address line 1 is required', required),
      },
      add2: {
        required: helpers.withMessage('Address line 2 is required', required),
      },
      add3: {
        required: helpers.withMessage('Address line 3 is required', required),
      },
      add4: {
        required: helpers.withMessage('Address line 4 is required', required),
      },
    }
  }));

  const v$ = useVuelidate(rules, props.stepValues);

</script>

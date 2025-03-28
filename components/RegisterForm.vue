<template>
    <div class="px-3 w-full">
        <div v-if="currentStep === 0" class="step-0 flex flex-col w-full mx-auto max-w-lg max-md:mt-10 max-md:max-w-full justify-center">
            <h1 class="text-4xl text-zinc-600 text-center font-semibold">Benvenuto!</h1>
            <h1 class="my-3 text-xl text-green-600 font-semibold">Inserisci i tuoi dati per saperne di più.</h1>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <FormInput 
                    id="name"
                    label="Name"
                    placeholder="es. Mario"
                    v-model="name"
                    :error-message="v0$.name.$errors.length ? v0$.name.$errors[0].$message : ''"
                />
                <FormInput 
                    id="surname"
                    label="Cognome"
                    placeholder="es. Rossi"
                    v-model="surname"
                    :error-message="v0$.surname.$errors.length ? v0$.surname.$errors[0].$message : ''"
                />
            </div>
            <FormInput 
                id="tel"
                label="Telefono"
                placeholder="+39 *** *******"
                v-model="tel"
                type="tel"
                :error-message="v0$.tel.$errors.length ? v0$.tel.$errors[0].$message : ''"
            />
            <FormInput 
                id="email"
                label="Email"
                placeholder="es. nome@gmail.com/tuo.nome@azienda.com"
                v-model="email"
                :error-message="v0$.email.$errors.length ? v0$.email.$errors[0].$message : ''"
            />
            <FormInput 
                id="workSpace"
                label="Nome dell’officina"
                placeholder="es. Autofficina rossi"
                v-model="workSpace"
                :error-message="v0$.workSpace.$errors.length ? v0$.workSpace.$errors[0].$message : ''"
            />
            <FormInput 
                id="postalCode"
                label="Codice postale"
                placeholder="es. 20100"
                v-model="postalCode"
                :error-message="v0$.postalCode.$errors.length ? v0$.postalCode.$errors[0].$message : ''"
            />
            <div class="flex gap-1 mt-4 items-center">
                <div 
                    :class="['w-4 h-4 border rounded',  accept1 ? 'border-green-600' : 'border-gray-600' ]"
                    @click="checkToggle(1)"
                >
                    <img v-if="accept1" src="/images/vector.svg" alt="check">
                </div>
                <h1 class="text-sm">Accetto di ricevere aggiornamenti da TicDrive tramite WhatsApp o piattaforme simili!</h1>
            </div>
            <div class="flex gap-1 mt-2 items-center">
                <div 
                    :class="['w-4 h-4 border rounded',  accept2 ? 'border-green-600' : 'border-gray-600' ]"
                    @click="checkToggle(2)"
                >
                    <img v-if="accept2" src="/images/vector.svg" alt="check">
                </div>
                <h1 class="text-sm">Accetto <a href="" class="underline hover:text-green-600">Privacy PolicyCookie PolicyTerms and Conditions</a></h1>
            </div>
        </div>
        <div v-if="currentStep === 1" class="step-1 flex flex-col w-full mx-auto max-w-lg max-md:mt-10 max-md:max-w-full justify-center">
            <h1 class="text-4xl text-gray-500 font-semibold">Informazioni sull'attività</h1>
            <div class="flex flex-col mt-10">
                <h1 class="text-2xl text-gray-500 font-semibold">Indirizzo completo:</h1>
                <FormInput 
                    placeholder="Via e Numero Civico:"
                    v-model="fullAddress.add1"
                    size="small"
                />
                <FormInput 
                    placeholder="Città:"
                    v-model="fullAddress.add2"
                    size="small"
                />
                <FormInput 
                    placeholder="Provincia:"
                    v-model="fullAddress.add3"
                    size="small"
                />
                <FormInput 
                    placeholder="CAP:"
                    v-model="fullAddress.add4"
                    size="small"
                />
            </div>
            <div class="mt-4 ">
                <h1 class="text-2xl text-gray-500 font-semibold">Contatti Aziendali</h1>
                <div class="flex flex-col">
                    <FormInput 
                        placeholder="Numero di telefono aziendale (fisso o cellulare):"
                        v-model="companyContact.contact1"
                        size="small"
                    />
                    <FormInput 
                        placeholder="Indirizzo email aziendale"
                        v-model="companyContact.contact2"
                        size="small"
                    />
                </div>
            </div>
            <div class="mt-4">
                <h1 class="text-2xl text-gray-500 font-semibold">Contatti di Riferimento</h1>
                <FormInput 
                    placeholder="Nome e Cognome del Referente:"
                    v-model="referContact.contact1"
                    size="small"
                />
                <FormInput 
                    placeholder="Telefono diretto:"
                    v-model="referContact.contact2"
                    size="small"
                />
                <FormInput 
                    placeholder="Email di contatto operativo:"
                    v-model="referContact.contact3"
                    size="small"
                />
            </div>
            <h1 class="mt-3 mb-4 text-gray-500 text-md">(Per ricevere notifiche di prenotazioni o comunicazioni importanti)</h1>
        </div>
        <div class="flex flex-col w-full mx-auto max-w-lg max-md:mt-10 max-md:max-w-full justify-center">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Button 
                    label="Indietro"
                    customClass="mt-4 bg-gray-500"
                    color="gray"
                    :disable="!currentStep"
                    @click="prevStep(currentStep)"
                />
                <Button 
                    label="Avanti"
                    customClass="mt-4"
                    :disable="buttonDisable"
                    @click="nextStep(currentStep)"
                />
            </div>
            <div
                v-if="!currentStep" 
                class="flex text-center mt-3 justify-center"
            >
                <h1 class="text-black text-md">Sono già partner?</h1>
                <h1 
                    class="text-green-500 text-md ms-2 hover:underline hover:text-green-600 cursor-pointer"
                    @click="navigateTo('/auth/login')"
                >
                    Accedi!
                </h1>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import { useStepStore } from '~/store/auth';
    import { useVuelidate } from '@vuelidate/core';
    import { required, email, minLength, maxLength, numeric, helpers } from '@vuelidate/validators';
    import FormInput from './FormInput.vue';
    import Button from './Button.vue';

    export default defineComponent({
        name: 'RegisterForm',
        components: {
            FormInput,
            Button
        },
        setup() {
            const useStore = useStepStore();
            const currentStep = ref(useStore.getCurrentStep);
            const buttonDisable = ref(useStore.getStepZeroValue.buttonDisable);
            const name = ref(useStore.getStepZeroValue.name);
            const surname = ref(useStore.getStepZeroValue.surname);
            const tel = ref(useStore.getStepZeroValue.tel);
            const email = ref(useStore.getStepZeroValue.email);
            const workSpace = ref(useStore.getStepZeroValue.workSpace);
            const postalCode = ref(useStore.getStepZeroValue.postalCode);
            const accept1 = ref(useStore.getStepZeroValue.accept1);
            const accept2 = ref(useStore.getStepZeroValue.accept2);
            const fullAddress = ref(useStore.getStepOneValue.fullAddress);
            const companyContact = ref(useStore.getStepOneValue.companyContact);
            const referContact = ref(useStore.getStepOneValue.referContact);

            const rules = computed(() => {
                return {
                    name: { 
                        required: helpers.withMessage('Name is required', required) 
                    },
                    surname: { 
                        required: helpers.withMessage('Surname is required', required) 
                    },
                    tel: { 
                        required: helpers.withMessage('Phone number is required', required),
                        numeric: helpers.withMessage('Phone number must be numeric', numeric)
                    },
                    email: { 
                        required: helpers.withMessage('Email is required', required),
                        email: helpers.withMessage('Invalid email format', email)
                    },
                    workSpace: { 
                        required: helpers.withMessage('Workspace name is required', required) 
                    },
                    postalCode: { 
                        required: helpers.withMessage('Postal code is required', required),
                        numeric: helpers.withMessage('Postal code must be numeric', numeric) 
                    },
                    
                }
            });

            const v0$ = useVuelidate(rules, { name, surname, tel, email, workSpace, postalCode });


            const checkToggle = (check: number) => {
                if(check === 1) {
                    accept1.value = !accept1.value;
                } else if(check === 2) {
                    accept2.value = !accept2.value;
                }
            }
            const updateCurrentStep = (step: number) => {
                useStore.setStep(step + 1);
                currentStep.value = useStore.getCurrentStep;
            }
            const saveCurrentStepData = (step: number) => {
                if(step === 0) {
                    useStore.setStepZeroValue({
                        name,
                        surname,
                        tel,
                        email,
                        workSpace,
                        postalCode,
                        accept1,
                        accept2,
                        buttonDisable
                    });
                }
            }
            const stepValidation = async(step: number) => {
                if(step === 0) {
                    return await v0$.value.$validate();
                } else if (step === 1) {

                }
            }
            const nextStep = async (step: number) => {
                if(buttonDisable.value) {
                    return ;
                }
                const isValid = await stepValidation(step);
                if(!isValid) {
                    return;
                }
                saveCurrentStepData(step);
                updateCurrentStep(step);
            }
            const prevStep = async (step: number) => {
                useStore.setStep(step - 1);
                currentStep.value = useStore.getCurrentStep;
                console.log(currentStep.value);
                
            }
            watch([accept1, accept2, currentStep], ([newAccept1, newAccept2, newCurrentStep]) => {
                console.log("called");
                if(!newAccept1 || !newAccept2) {
                    buttonDisable.value = true;
                } else {
                    buttonDisable.value = false;
                }
            })

            return {
                buttonDisable,
                name,
                surname,
                tel,
                email,
                workSpace,
                postalCode,
                accept1,
                accept2,
                fullAddress,
                companyContact,
                referContact,
                v0$,
                currentStep,
                checkToggle,
                nextStep,
                prevStep
            }
        }
    })
</script>
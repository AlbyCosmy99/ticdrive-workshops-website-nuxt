<template>
    <div class="px-3 w-full">
        <div v-if="currentStep === 0" class="step-0 flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center">
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
        <div v-if="currentStep === 1" class="step-1 flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center">
            <h1 class="text-4xl text-gray-500 font-semibold">Informazioni sull'attività</h1>
            <div class="flex flex-col mt-10">
                <h1 class="text-2xl text-gray-500 font-semibold">Indirizzo completo:</h1>
                <FormInput 
                    placeholder="Via e Numero Civico:"
                    v-model="fullAddress.add1"
                    size="small"
                    :error-message="v1$.fullAddress.add1.$errors.length ? v1$.fullAddress.add1.$errors[0].$message : ''"
                />
                <FormInput 
                    placeholder="Città:"
                    v-model="fullAddress.add2"
                    size="small"
                    :error-message="v1$.fullAddress.add2.$errors.length ? v1$.fullAddress.add2.$errors[0].$message : ''"
                />
                <FormInput 
                    placeholder="Provincia:"
                    v-model="fullAddress.add3"
                    size="small"
                    :error-message="v1$.fullAddress.add3.$errors.length ? v1$.fullAddress.add3.$errors[0].$message : ''"
                />
                <FormInput 
                    placeholder="CAP:"
                    v-model="fullAddress.add4"
                    size="small"
                    :error-message="v1$.fullAddress.add4.$errors.length ? v1$.fullAddress.add4.$errors[0].$message : ''"
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
        <div v-if="currentStep === 2" class="step-2 flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center">
            <h1 class="text-4xl text-gray-500 font-semibold">Officina specializzata in:</h1>
            <h1 class="text-lg text-gray-500 font-semibold mt-3">(Selezionare piu di una casella se necessario)</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8 mt-8">
                <RadioOption 
                    v-for="(value, index) in workShopSpecs"
                    :key="index"
                    :label="value.label"
                    :value="value.value"
                    :isCheck="currentWorkShopSpec.includes(value.value)"
                    @update:isCheck="toggleMultiSelect('workShopSpec', $event)"
                />
            </div>
        </div>
        <div v-if="currentStep === 3" class="step-3 flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center">
            <h1 class="text-4xl text-gray-500 font-semibold">Tipologia di servizi offerti</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8 mt-8">
                <RadioOption
                    v-for="(value, index) in serviceTypes"
                    :key="index"
                    :label="value.label"
                    :value="value.value"
                    :isCheck="currentServiceType.includes(value.value)"
                    @update:isCheck="toggleMultiSelect('serviceType', $event)"
                />
            </div>
        </div>  
        <div v-if="currentStep === 4" class="step-4 flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center">
            <h1 class="text-4xl font-semibold text-gray-500 mb-8">Orari</h1>
            <div 
                v-for="(value, index) in serviceDays" 
                :key="index"
                class="grid grid-cols-1 lg:grid-cols-3"
            >
                <CheckBox         
                    :label="value.label"
                    :value="value.value"
                    :isCheck="currentServiceDays.some(day => day.value === value.value)"
                    @update:isCheck="toggleMultiSelect('serviceDay', $event)"
                />
                <div 
                    class="col-span-2"
                    v-if="currentServiceDays.some(day => day.value === value.value)"
                >
                

                </div>
            </div>
        </div>
        <div class="flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center">
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
        <DatePicker id="datepicker-timeonly" />

  <div class="px-3 w-full">
    <Step1 v-if="stepStore.currentStep === 1" />
    <Step2 v-if="stepStore.currentStep === 2" />
    <Step3 v-if="stepStore.currentStep === 3" />
    <Step4 v-if="stepStore.currentStep === 4" />

    <!-- back and next buttons -->
    <div
      class="flex flex-col w-full mx-auto max-w-lg max-md:mt-10 max-md:max-w-full justify-center"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Button
          label="Indietro"
          customClass="mt-4 bg-gray-500"
          color="gray"
          :disable="stepStore.currentStep === 0"
          @click="onBack()"
        />
        <Button
          label="Avanti"
          customClass="mt-4"
          @click="stepStore.currentStep++"
        />
      </div>
      <div
        v-if="stepStore.currentStep === 1"
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
<<<<<<< HEAD
>>>>>>> fafb1a952f231c198146f3789fc53014d904c100
=======
>>>>>>> fafb1a952f231c198146f3789fc53014d904c100
    </div>
  </div>
</template>

<<<<<<< HEAD
<<<<<<< HEAD
<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import { useStepStore } from '~/store/auth';
    import { useVuelidate } from '@vuelidate/core';
    import { required, email, minLength, maxLength, numeric, helpers } from '@vuelidate/validators';
    import DatePicker from 'vue3-datepicker';
    import FormInput from './FormInput.vue';
    import Button from './Button.vue';
    import RadioOption from './RadioOption.vue'
    import CheckBox from './CheckBox.vue';

    export default defineComponent({
        name: 'RegisterForm',
        components: {
            FormInput,
            Button,
            RadioOption,
            CheckBox,
            DatePicker: DatePicker
        },
        setup() {
            const useStore = useStepStore();
            const currentStep = ref(useStore.getCurrentStep);
            
            //step0
            const buttonDisable = ref(useStore.getStepZeroValue.buttonDisable);
            const name = ref(useStore.getStepZeroValue.name);
            const surname = ref(useStore.getStepZeroValue.surname);
            const tel = ref(useStore.getStepZeroValue.tel);
            const email = ref(useStore.getStepZeroValue.email);
            const workSpace = ref(useStore.getStepZeroValue.workSpace);
            const postalCode = ref(useStore.getStepZeroValue.postalCode);
            const accept1 = ref(useStore.getStepZeroValue.accept1);
            const accept2 = ref(useStore.getStepZeroValue.accept2);
            
            // step1
            const fullAddress = ref(useStore.getStepOneValue.fullAddress);
            const companyContact = ref(useStore.getStepOneValue.companyContact);
            const referContact = ref(useStore.getStepOneValue.referContact);
            
            //step2
            const currentWorkShopSpec = ref(useStore.getStepTwoValue.currentWorkShopSpec);
            const workShopSpecs = [
                { value: 1, label: 'Meccanica generale' },  
                { value: 2, label: 'Flotte Aziendali e Noleggio' },  
                { value: 3, label: 'Elettrauto' },  
                { value: 4, label: 'Veicoli Elettrici e Ibridi' },  
                { value: 5, label: 'Gommista' },  
                { value: 6, label: 'Cristalli e Parabrezza' },  
                { value: 7, label: 'Carrozzeria' },  
                { value: 8, label: 'Veicoli Elettrici e Ibridi' },  
                { value: 9, label: 'Centro revisioni' },  
                { value: 10, label: 'Impianti GPL/Metano' },  
            ]
=======
<script setup lang="ts">
import Button from './Button.vue';
import useStepStore from '~/store/step';
import Step1 from './auth/registrationSteps/Step1.vue';
import Step2 from './auth/registrationSteps/Step2.vue';
import Step3 from './auth/registrationSteps/Step3.vue';
import Step4 from './auth/registrationSteps/Step4.vue';

const stepStore = useStepStore();

=======
<script setup lang="ts">
import Button from './Button.vue';
import useStepStore from '~/store/step';
import Step1 from './auth/registrationSteps/Step1.vue';
import Step2 from './auth/registrationSteps/Step2.vue';
import Step3 from './auth/registrationSteps/Step3.vue';
import Step4 from './auth/registrationSteps/Step4.vue';

const stepStore = useStepStore();

>>>>>>> fafb1a952f231c198146f3789fc53014d904c100
const onBack = () => {
  stepStore.currentStep--;
  if (stepStore.currentStep === 0) {
    navigateTo('/auth/login');
  }
};

<<<<<<< HEAD
<<<<<<< HEAD
            //step4
            const serviceDays = [
                { value: 1, label: 'Lunedì' },
                { value: 2, label: 'Martedì' },
                { value: 3, label: 'Mercoledì' },
                { value: 4, label: 'Giovedì' },
                { value: 5, label: 'Venerdì' },
                { value: 6, label: 'Sabato' },
                { value: 7, label: 'Domenica' },
            ]
            const currentServiceDays = ref(useStore.getStepFourValue.currentServiceDays);
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
                    }
                }
            });

            const rules1 = computed(() => {
                return {
                    
                    fullAddress: {
                        add1: { 
                            required: helpers.withMessage('Address field is required', required) 
                        },
                        add2: { 
                            required: helpers.withMessage('Address field is required', required) 
                        },
                        add3: { 
                            required: helpers.withMessage('Address field is required', required) 
                        },
                        add4: { 
                            required: helpers.withMessage('Address field is required', required) 
                        }
                    }
                }
            });
            const v0$ = useVuelidate(rules, { name, surname, tel, email, workSpace, postalCode });
            const v1$ = useVuelidate(rules1, { fullAddress });
            // const v2$ = useVuelidate(rules2, {  })

            const checkToggle = (check: number) => {
                if(check === 1) {
                    accept1.value = !accept1.value;
                } else if(check === 2) {
                    accept2.value = !accept2.value;
                }
            }
            const updateCurrentStep = (step: number) => {
                useStore.setStep(step);
                currentStep.value = useStore.getCurrentStep;
            }
            const updateStepValues = async (step: number) => {
                if(step === 0) {
                    useStore.setStepZeroValue({
                        name: name.value,
                        surname: surname.value,
                        tel: tel.value,
                        email: email.value,
                        workSpace: workSpace.value,
                        postalCode: postalCode.value,
                        accept1: accept1.value,
                        accept2: accept2.value,
                        buttonDisable: buttonDisable.value
                    })
                } else if(step === 1) {
                    useStore.setStepOneValue({
                        fullAddress: {
                            add1: fullAddress.value.add1,
                            add2: fullAddress.value.add2,
                            add3: fullAddress.value.add3,
                            add4: fullAddress.value.add4,
                        },
                        companyContact: {
                            contact1: companyContact.value.contact1,
                            contact2: companyContact.value.contact2,
                        },
                        referContact: {
                            contact1: referContact.value.contact1,
                            contact2: referContact.value.contact2,
                            contact3: referContact.value.contact3
                        }
                    })
                } else if(step === 2) {
                    useStore.setStepTwoValue({
                        currentWorkShopSpec: currentWorkShopSpec.value
                    })
                } else if(step === 3) {
                    useStore.setStepThreeValue({
                        currentServiceType: currentServiceType.value
                    })
                }
            }
            const stepValidation = async(step: number) => {
                if(step === 0) {
                    return await v0$.value.$validate();
                } else if (step === 1) {
                    return await v1$.value.$validate();
                } else if(step === 2) {
                    if(currentWorkShopSpec.value.length) {
                        return true;
                    } else {
                        alert('please select one');
                        return false;
                    }
                } else if(step === 3) {
                    if(currentServiceType.value.length) {
                        return true;
                    } else {
                        alert('please select one');
                        return false;
                    }
                }
            }
            const nextStep = async (step: number) => {
                if(buttonDisable.value) {
                    return ;
                }
                const isValid = await stepValidation(step);
                console.log(step, isValid);
                if(!isValid) {
                    return;
                }
                updateStepValues(step);
                updateCurrentStep(step+1);
            }
            const prevStep = async (step: number) => {
                if(!currentStep.value) {
                    return ;
                }
                updateStepValues(step);
                updateCurrentStep(step-1);
            }
            const toggleMultiSelect = (type: any, value: any) => {
                if(type === 'workShopSpec') {
                    const index = currentWorkShopSpec.value.indexOf(value);
                    if(index !== -1) {
                        currentWorkShopSpec.value.splice(index, 1);
                    } else {
                        currentWorkShopSpec.value.push(value);
                    }
                } else if(type === 'serviceType') {
                    const index = currentServiceType.value.indexOf(value);
                    if(index !== -1) {
                        currentServiceType.value.splice(index, 1);
                    } else {
                        currentServiceType.value.push(value);
                    }
                } else if(type === 'serviceDay') {
                    const index = currentServiceDays.value.findIndex(day => day.value === value);
                    if(index !== -1) {
                        currentServiceDays.value.splice(index, 1);
                    } else {
                        currentServiceDays.value.push({
                            value,
                            serviceTime1: {
                                start: '',
                                end: ''
                            },
                            serviceTime2: {
                                start: '',
                                end: ''
                            }
                        });
                    }
                }
            }
            watch([accept1, accept2, currentStep], ([newAccept1, newAccept2, newCurrentStep]) => {
                console.log("called");
                if(!newAccept2) {
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
                currentWorkShopSpec,
                workShopSpecs,
                currentServiceType,
                serviceTypes,
                currentServiceDays,
                serviceDays,
                v0$,
                v1$,
                currentStep,
                checkToggle,
                nextStep,
                prevStep,
                toggleMultiSelect
            }
        }
    })
</script>
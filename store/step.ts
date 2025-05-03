import {defineStore} from 'pinia';
import type {Signature} from '~/types/auth/Signature';
import type {StepEightData} from '~/types/auth/steps/StepEightData';
import type {StepFiveData} from '~/types/auth/steps/StepFiveData';
import type {StepFourData} from '~/types/auth/steps/StepFourData';
import type {StepOneData} from '~/types/auth/steps/StepOneData';
import type {StepSevenData} from '~/types/auth/steps/StepSevenData';
import type {StepSixData} from '~/types/auth/steps/StepSixData';
import type {StepThreeData} from '~/types/auth/steps/StepThreeData';
import type {StepTwoData} from '~/types/auth/steps/StepTwoData';

interface StepLabel {
  step: number;
  value: string;
}

interface StepState {
  currentStep: number;
  steps: StepLabel[];
  stepOneData: StepOneData;
  stepTwoData: StepTwoData;
  stepThreeData: StepThreeData;
  stepFourData: StepFourData;
  stepFiveData: StepFiveData;
  stepSixData: StepSixData;
  stepSevenData: StepSevenData;
  stepEightData: StepEightData;
}

const useStepStore = defineStore('step', {
  state: (): StepState => ({
    currentStep: 0,
    steps: [
      // {step: 1, value: 'Benvenuto'},
      {step: 2, value: 'Informazioni e contatti'},
      {step: 3, value: 'Tipologia d’officina'},
      {step: 4, value: 'Servizi offerti'},
      {step: 5, value: 'Orari di apertura'},
      {step: 6, value: 'Dati di profilo'},
      {step: 7, value: 'Descrizione officina'},
      {step: 8, value: 'Firma e accettazione'},
    ],
    stepOneData: {
      name: '',
      surname: '',
      phoneNumber: '',
      email: '',
      password: '',
      repeatedPassword: '',
      workshopName: '',
      acceptPrivacyPolicy: false,
      acceptUpdates: false,
    },
    stepTwoData: {
      fullAddress: {
        streetAddress: '',
        city: '',
        province: '',
        postalCode: '',
      },
      referContact: {
        phone: '',
        email: '',
      },
    },
    stepThreeData: {
      specializations: [],
    },
    stepFourData: {
      services: [],
    },
    stepFiveData: {
      activeDays: [],
      maxPerDay: 0,
      homeService: false,
      timeSlots: [],
    },
    stepSixData: {
      images: [],
    },
    stepSevenData: {
      description: '',
      languages: [],
    },
    stepEightData: {
      warranty: 0,
      signature: {
        name: '',
        surname: '',
        date: new Date(),
      },
      conformities: [],
    },
  }),
  actions: {
    resetStore() {
      this.$reset();
    },
    setStep(step: number) {
      this.currentStep = step;
    },
  },
});

export default useStepStore;

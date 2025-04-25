import {defineStore} from 'pinia';
import type { StepFourData } from '~/types/auth/steps/StepFourData';
import type {StepOneData} from '~/types/auth/steps/StepOneData';
import type {StepThreeData} from '~/types/auth/steps/StepThreeData';
import type {StepTwoData} from '~/types/auth/steps/StepTwoData';

interface ServiceTime {
  start: string;
  end: string;
}

interface ServiceDay {
  value: number;
  serviceTime1: ServiceTime;
  serviceTime2: ServiceTime;
}

interface StepFiveData {
  currentServiceDays: ServiceDay[];
  maxVehicleNumber: number;
  homeService: boolean;
}

interface StepSixData {
  images: string[];
}

interface StepSevenData {
  history: string;
  lang: number;
}

interface DigitalSignature {
  name: string;
  surname: string;
  date: string | null;
}

interface StepEightData {
  warranty: number;
  digital: DigitalSignature;
  currentConformities: number[];
}

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
      workshopName: '',
      postalCode: '',
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
      companyContact: {
        phone: '',
        email: '',
      },
      referContact: {
        fullName: '',
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
      currentServiceDays: [],
      maxVehicleNumber: 0,
      homeService: false,
    },
    stepSixData: {
      images: [],
    },
    stepSevenData: {
      history: '',
      lang: 1,
    },
    stepEightData: {
      warranty: 0,
      digital: {
        name: '',
        surname: '',
        date: null,
      },
      currentConformities: [],
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

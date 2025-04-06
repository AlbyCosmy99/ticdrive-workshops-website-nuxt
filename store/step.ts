import {defineStore} from 'pinia';

interface StepOneData {
  name: string;
  surname: string;
  tel: string;
  email: string;
  workSpace: string;
  postalCode: string;
  accept1: boolean;
  accept2: boolean;
}

interface StepTwoData {
  fullAddress: {
    add1: string;
    add2: string;
    add3: string;
    add4: string;
  };
  companyContact: {
    contact1: string;
    contact2: string;
  };
  referContact: {
    contact1: string;
    contact2: string;
    contact3: string;
  };
}

interface StepThreeData {
  currentWorkShopSpec: number[];
}

interface StepFourData {
  currentServiceType: number[];
}

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
      tel: '',
      email: '',
      workSpace: '',
      postalCode: '',
      accept1: false,
      accept2: false,
    },
    stepTwoData: {
      fullAddress: {
        add1: '',
        add2: '',
        add3: '',
        add4: '',
      },
      companyContact: {
        contact1: '',
        contact2: '',
      },
      referContact: {
        contact1: '',
        contact2: '',
        contact3: '',
      },
    },
    stepThreeData: {
      currentWorkShopSpec: [],
    },
    stepFourData: {
      currentServiceType: [],
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

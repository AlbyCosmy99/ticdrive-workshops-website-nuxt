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
import type { legalDeclaration } from '~/types/consents/legalDeclaration';


interface StepLabel {
  step: number;
  value: string;
}

interface StepState {
  currentStep: number;
  loading: boolean;
  steps: StepLabel[];
  socialUpdatesConsent: legalDeclaration | undefined;
  privacyPolicy: legalDeclaration | undefined,
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
    loading: false,
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
    socialUpdatesConsent: undefined,
    privacyPolicy: undefined,
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
    async getSocialUpdatesConsent() {
      try {
        this.loading = true
        const $ticDriveAxios = useTicDriveAxios();
        const data = await $ticDriveAxios.get('legalDeclarations?contexts=SaaS&contexts=AllEcosystem&type=SocialUpdates')
        this.socialUpdatesConsent = data.data
      } catch(err: any) {
        const showToast = useToast()
        showToast('error','Error', 'Error while loading social updates consent')
      } finally {
        this.loading = false
      }
    },
    async getPrivacyPolicy() {
      try {
        this.loading = true
        const $ticDriveAxios = useTicDriveAxios();
        const data = await $ticDriveAxios.get('legalDeclarations?contexts=SaaS&contexts=AllEcosystem&type=PrivacyPolicy')
        this.privacyPolicy = data.data
      } catch(err: any) {
        const showToast = useToast()
        showToast('error','Error', 'Error while loading privacy policy')
      } finally {
        this.loading = false
      }
    },
    resetStore() {
      this.$reset();
    },
    setStep(step: number) {
      this.currentStep = step;
    },
  },
});

export default useStepStore;

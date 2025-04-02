import {defineStore} from 'pinia';

export const useStepStore = defineStore('step', {
  state: () => ({
    currentStep: 0,
    steps: [
      {step: 1, value: 'Informazioni e contatti'},
      {step: 2, value: 'Tipologia d’officina'},
      {step: 3, value: 'Servizi offerti'},
      {step: 4, value: 'Orari di apertura'},
      {step: 5, value: 'Dati di profilo'},
      {step: 6, value: 'Descrizione officina'},
      {step: 7, value: 'Firma e accettazione'},
    ],
    step_zero_value: {
      name: '',
      surname: '',
      tel: '',
      email: '',
      workSpace: '',
      postalCode: '',
      accept1: false,
      accept2: false,
    },
    step_one_value: {
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
    step_two_value: {
      currentWorkShopSpec: [],
    },
    step_three_value: {
      currentServiceType: [],
    },
    step_four_value: {
      currentServiceDays: [],
      maxVehicleNumber: 0,
      homeService: false,
    },
    step_five_value: {
      images: [],
    },
    step_six_value: {
      history: '',
      lang: 1,
    },
    step_seven_value: {
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
      this.step = step;
    },
  },
});

export default useStepStore;

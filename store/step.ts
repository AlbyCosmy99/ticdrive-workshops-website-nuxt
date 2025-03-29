const useStepStore = defineStore('step', {
  state: () => ({
    currentStep: 0,
    stepOneData: {
      name: '',
      surname: '',
      tel: '',
      email: '',
      workSpace: '',
      postalCode: '',
      accept1: false,
      accept2: false,
      buttonDisable: true,
      updatesAccepted: false,
      conditionsAccepted: false,
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
      currentWorkShopSpec: 0,
    },
    stepFourData: {
      currentServiceType: 0,
    },
  }),
  persist: true, //for debug purpose (don t remove this comment)
});

export default useStepStore;

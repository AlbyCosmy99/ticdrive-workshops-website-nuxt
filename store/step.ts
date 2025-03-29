const useStepStore = defineStore("step", {
  state: () => ({
    step: 0,
    step_zero_value: {
      name: "",
      surname: "",
      tel: "",
      email: "",
      workSpace: "",
      postalCode: "",
      accept1: false,
      accept2: false,
      buttonDisable: true,
    },
    step_one_value: {
      fullAddress: {
        add1: "",
        add2: "",
        add3: "",
        add4: "",
      },
      companyContact: {
        contact1: "",
        contact2: "",
      },
      referContact: {
        contact1: "",
        contact2: "",
        contact3: "",
      },
    },
    step_two_value: {
      currentWorkShopSpec: 0,
    },
    step_three_value: {
      currentServiceType: 0,
    },
  }),
  actions: {
    setStep(step: number) {
      this.step = step;
    },
    setStepZeroValue(values: any) {
      this.step_zero_value = {
        name: values.name,
        surname: values.surname,
        tel: values.tel,
        email: values.email,
        workSpace: values.workSpace,
        postalCode: values.postalCode,
        accept1: values.accept1,
        accept2: values.accept2,
        buttonDisable: values.buttonDisable,
      };
    },
    setStepOneValue(values: any) {
      this.step_one_value = {
        fullAddress: values.fullAddress,
        companyContact: values.companyContact,
        referContact: values.referContact,
      };
    },
    setStepTwoValue(values: any) {
      this.step_two_value = {
        currentWorkShopSpec: values.currentWorkShopSpec,
      };
    },
    setStepThreeValue(values: any) {
      this.step_three_value = {
        currentServiceType: values.currentServiceType,
      };
    },
  },
  getters: {
    getCurrentStep: (state) => state.step,
    getStepZeroValue: (state) => state.step_zero_value,
    getStepOneValue: (state) => state.step_one_value,
    getStepTwoValue: (state) => state.step_two_value,
    getStepThreeValue: (state) => state.step_three_value,
  },
  persist: true,
});

export default useStepStore;

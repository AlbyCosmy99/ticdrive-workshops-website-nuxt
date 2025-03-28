import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
    }),
    actions: {
        setUser(user: any) {
            this.user = user
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.user
    }
})

export const useStepStore = defineStore('step', {
    state: () => ({
        step: 0,
        step_zero_value: {
            name: '',
            surname: '',
            tel: '',
            email: '',
            workSpace: '',
            postalCode: '',
            accept1: false,
            accept2: false,
            buttonDisable: true
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
                contact2: ''
            },
            referContact: {
                contact1: '',
                contact2: '',
                contact3: ''
            }
        }
    }),
    actions: {
        setStep(step: number) {
            this.step = step
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
                buttonDisable: values.buttonDisable
            }
        },
        setStepOneValue(value: any) {

        }
    },
    getters: {
        getCurrentStep: (state) => state.step,
        getStepZeroValue: (state) => state.step_zero_value,
        getStepOneValue: (state) => state.step_one_value
    },
    persist: true
})
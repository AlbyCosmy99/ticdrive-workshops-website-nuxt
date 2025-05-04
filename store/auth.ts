import {defineStore} from 'pinia';
import useUserData from '~/composables/http/auth/useUserData';
import type {User} from '~/types/auth/User';
import useStepStore from './step';
import getCoordinates from '~/services/location/getCoordinatesFromGoogleApi';

interface AuthState {
  user: User | null;
  token: string | null;
}

const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
  }),

  actions: {
    async login(email: string, password: string): Promise<void> {
      const $ticDriveAxios = useTicDriveAxios();
      const res = await $ticDriveAxios.post('auth/login', {
        email,
        password,
        userType: 2,
      });

      if (!res?.data) {
        throw new Error('No data received from login API');
      }

      localStorage.setItem('token', res.data.token);

      this.token = res.data.token;

      const data = await useUserData();
      this.user = data;
    },

    async register(): Promise<void> {
      const $ticDriveAxios = useTicDriveAxios();
      const stepStore = useStepStore();
    
      const {
        stepOneData,
        stepTwoData,
        stepThreeData,
        stepFourData,
        stepFiveData,
        stepSixData,
        stepSevenData,
        stepEightData
      } = stepStore;
    
      const fullAddress = stepTwoData.fullAddress;
      const address = `${fullAddress.streetAddress}, ${fullAddress.postalCode} ${fullAddress.city}, ${fullAddress.province}, Italy`;
    
      let coordinates = { lat: null, lng: null };
      try {
        const location = await getCoordinates(address);
        if (location) coordinates = location;
      } catch (err) {
        console.warn('Could not fetch coordinates:', err);
      }
    
      const payload = {
        name: stepOneData.name,
        surname: stepOneData.surname,
        email: stepOneData.email,
        phoneNumber: stepOneData.phoneNumber,
        workshopName: stepOneData.workshopName,
        password: stepOneData.password,
        confirmPassword: stepOneData.repeatedPassword,
        userType: 2,
        address,
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        personalPhoneNumber: stepTwoData.referContact.phone,
        personalEmail: stepTwoData.referContact.email,
        specializations: stepThreeData.specializations.map(s => s.id),
        services: stepFourData.services.map(s => s.id),
        maxDailyVehicles: stepFiveData.maxPerDay,
        offersHomeServices: stepFiveData.homeService,
        description: stepSevenData.description,
        laborWarrantyMonths: stepEightData.warranty,
        signatureName: stepEightData.signature.name,
        signatureSurname: stepEightData.signature.surname
      };
    
      try {
        const res = await $ticDriveAxios.post('auth/register', payload);
    
        if (!res?.data?.token) {
          throw new Error('No token received from registration API');
        }
    
        localStorage.setItem('token', res.data.token);
        this.token = res.data.token;
    
        const data = await useUserData();
        this.user = data;
    
      } catch (error: any) {
        console.error('Registration failed:', error?.response?.data || error.message);
        throw new Error(error?.response?.data?.message || 'Registration failed');
      }
    },
    

    logout() {
      this.user = null;
      this.token = null;
    },
  },
});

export default useAuthStore;

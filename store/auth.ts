import {defineStore} from 'pinia';
import useUserData from '~/composables/http/auth/useUserData';
import type {User} from '~/types/auth/User';
import useStepStore from './step';
import getCoordinates from '~/services/location/getCoordinatesFromGoogleApi';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    loading: false,
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
      this.loading = true;
      const $ticDriveAxios = useTicDriveAxios();
      const stepStore = useStepStore();
      const showToast = useToast();

      const {
        stepOneData,
        stepTwoData,
        stepThreeData,
        stepFourData,
        stepFiveData,
        stepSixData,
        stepSevenData,
        stepEightData,
      } = stepStore;

      const fullAddress = stepTwoData.fullAddress;
      const address = `${fullAddress.streetAddress}, ${fullAddress.postalCode} ${fullAddress.city}, ${fullAddress.province}, Italy`;

      let coordinates = {lat: null, lng: null};
      try {
        const location = await getCoordinates(address);
        if (location) coordinates = location;
      } catch (err: any) {
        showToast(
          'error',
          'Non è stato possibile ottenere le coordinate geografiche!',
          err.message,
        );
      }

      const schedule: Record<number, {
        morningStartTime?: string;
        morningEndTime?: string;
        afternoonStartTime?: string;
        afternoonEndTime?: string;
      }> = {};
      
      for (const dayId of Object.keys(stepStore.stepFiveData.timeSlots).map(Number)) {
        const slots = stepStore.stepFiveData.timeSlots[dayId];
      
        const formatTime = (date: Date | null) => {
          if (!date) return undefined;
          return date.toLocaleTimeString('it-IT', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          });
        };
      
        schedule[dayId] = {
          morningStartTime: formatTime(slots[0].start),
          morningEndTime: formatTime(slots[0].end),
          afternoonStartTime: formatTime(slots[1]?.start ?? null),
          afternoonEndTime: formatTime(slots[1]?.end ?? null),
        };
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
        signatureSurname: stepEightData.signature.surname,
        schedule
      };

      try {
        const res = await $ticDriveAxios.post('auth/register', payload);

        if (!res?.data?.token) {
          showToast(
            'error',
            'Registrazione fallita!',
            "Qualcosa e' andato storto. Riprova o contatta il supporto di TicDrive per assistenza.",
          );
          return;
        }

        localStorage.setItem('token', res.data.token);
        this.token = res.data.token;

        const data = await useUserData();
        this.user = data;

        if (this.user?.id && stepSixData.images?.length > 0) {
          const validImages = stepSixData.images.filter(image => image?.file);

          if (validImages.length === 0) {
            showToast(
              'info',
              'Registrazione completata',
              'Nessuna immagine è stata caricata. Puoi aggiungerle in seguito dal tuo profilo.',
            );
          } else {
            const formData = new FormData();
            for (const image of validImages) {
              formData.append('files', image.file!);
            }

            formData.append('mainImageIndex', '4');

            try {
              await $ticDriveAxios.post(
                `/images/${this.user.id}/multiple`,
                formData,
                {
                  headers: {
                    Authorization: `Bearer ${this.token}`,
                  },
                },
              );
            } catch (uploadError) {
              showToast(
                'error',
                'Errore nel caricamento delle immagini',
                'Le immagini non sono state caricate. Puoi riprovare più tardi dal tuo profilo.',
              );
            }
          }
        }

        navigateTo('/dashboard');
      } catch (error: any) {
        showToast(
          'error',
          'Registrazione fallita!',
          "Qualcosa e' andato storto. Riprova o contatta il supporto di TicDrive per assistenza.",
        );
      } finally {
        this.loading = false;
      }
    },

    logout() {
      const router = useRouter();
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
      router.replace('/auth/login');
    },
  },
});

export default useAuthStore;

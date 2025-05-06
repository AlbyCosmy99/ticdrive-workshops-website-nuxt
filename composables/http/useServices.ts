import {ref} from 'vue';
import useTicDriveAxios from '@/composables/useTicDriveAxios';
import type {Service} from '~/types/Service';

const useServices = () => {
  const loading = ref(false);
  const services = ref<Service[] | null>(null);

  const $ticDriveAxios = useTicDriveAxios();
  const showToast = useToast();

  const fetchServices = async () => {
    loading.value = true;

    try {
      const response = await $ticDriveAxios.get('services?languageCode=it');
      services.value = response.data;
    } catch (e: any) {
      showToast('error', 'Errore', 'Errore nel recupero dei servizi!');
    } finally {
      loading.value = false;
    }
  };

  return {
    services,
    loading,
    fetchServices,
  };
};

export default useServices;

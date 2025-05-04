import {ref} from 'vue';
import useTicDriveAxios from '@/composables/useTicDriveAxios';
import type { Specialization } from '~/types/Specialization';

const useSpecializations = () => {
  const loading = ref(false);
  const specializations = ref<Specialization[] | null>(null);

  const $ticDriveAxios = useTicDriveAxios();
  const showToast = useToast();

  const fetchSpecializations = async () => {
    loading.value = true;

    try {
      const response = await $ticDriveAxios.get('workshops/specializations');
      specializations.value = response.data;
    } catch (e: any) {
      showToast('error', 'Errore', 'Errore nel recupero delle specializzazioni!');
    } finally {
      loading.value = false;
    }
  };

  return {
    specializations,
    loading,
    fetchSpecializations,
  };
};

export default useSpecializations;

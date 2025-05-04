import {defineStore} from 'pinia';
import type {Language} from '~/types/Language';

interface LanguageState {
  languages: Language[];
  loading: boolean;
}

const useLanguageStore = defineStore('language', {
  state: (): LanguageState => ({
    languages: [],
    loading: false,
  }),

  actions: {
    async getLanguages(): Promise<void> {
      const $ticDriveAxios = useTicDriveAxios();
      const showToast = useToast();

      this.loading = true;

      try {
        const response = await $ticDriveAxios.get('languages');

        if (Array.isArray(response.data)) {
          this.languages = response.data.map(day => ({
            id: day.id,
            label: day.name,
            code: day.code,
          }));
        } else {
          showToast('error', 'Error', 'Unexpected response format');
        }
      } catch (err: any) {
        console.error('Error loading days:', err);
        showToast('error', 'Error', 'Unable to load days');
      } finally {
        this.loading = false;
      }
    },
  },
});

export default useLanguageStore;

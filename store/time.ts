import {defineStore} from 'pinia';
import type {Day} from '~/types/datetime/Day';

interface TimeState {
  days: Day[];
  loading: boolean;
}

const useTimeStore = defineStore('time', {
  state: (): TimeState => ({
    days: [],
    loading: false,
  }),

  actions: {
    async getDays(): Promise<void> {
      const $ticDriveAxios = useTicDriveAxios();
      const showToast = useToast();

      this.loading = true;

      try {
        const response = await $ticDriveAxios.get('datetime/days');

        if (Array.isArray(response.data)) {
          this.days = response.data.map(day => ({
            id: day.id,
            label: day.name,
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

export default useTimeStore;

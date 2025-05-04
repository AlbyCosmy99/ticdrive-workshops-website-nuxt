import { defineStore } from 'pinia';
import type { Day } from '~/types/datetime/Day';

interface TimeState {
    days: Day[],
    loading: boolean;
}

const useTimeStore = defineStore('time', {
  state: (): TimeState => ({
    days: [],
    loading: false
  }),

  actions: {
    async getDays() {
        try {
          this.loading = true
          const $ticDriveAxios = useTicDriveAxios();
          const data = await $ticDriveAxios.get('datetime/days')
          this.days = data.data.map(day => ({id: day.id, label: day.name}))
        } catch(err: any) {
          const showToast = useToast()
          showToast('error','Error', 'Error while loading privacy policy')
        } finally {
          this.loading = false
        }
      },
  },
});

export default useTimeStore;

import type {ToastSeverity} from '@/types/toast/ToastSeverity';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide(
    'toastMessage',
    (
      severity: ToastSeverity,
      summary: string,
      detail: string,
      life: number = 3000,
    ) => {
      nuxtApp.vueApp.config.globalProperties.$toast.add({
        severity,
        summary,
        detail,
        life,
      });
    },
  );
});

import {useToast} from 'primevue/usetoast';

export default defineNuxtPlugin(nuxtApp => {
  const toast = useToast();

  nuxtApp.provide(
    'toastMessage',
    (severity: string, summary: string, detail: string) => {
      toast.add({
        severity: severity,
        summary: summary,
        detail: detail,
        life: 3000,
      });
    },
  );
});

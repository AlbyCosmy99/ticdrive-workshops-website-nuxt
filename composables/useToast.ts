import type {ToastSeverity} from '~/types/toast/ToastSeverity';

const useToast = () => {
  const nuxtApp = useNuxtApp();

  const showToast = (
    severity: ToastSeverity,
    summary: string,
    detail: string,
    life: number = 3000,
  ): void => {
    nuxtApp.$toastMessage(severity, summary, detail, life);
  };

  return showToast;
};

export default useToast;

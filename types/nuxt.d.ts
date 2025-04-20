// types/nuxt.d.ts
import type {ToastSeverity} from '~/types/toast/ToastSeverity';

declare module '#app' {
  interface NuxtApp {
    $toastMessage: (
      severity: ToastSeverity,
      summary: string,
      detail: string,
      life?: number,
    ) => void;
  }
}

export {};

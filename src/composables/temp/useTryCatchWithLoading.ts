import { useQuasar } from 'quasar';

export default function useTryCatchWithLoading() {
  const $q = useQuasar();
  return {
    async tryCatchWithLoading<T>(
      func: () => Promise<T>,
      onFail?: (err: any) => void
    ) {
      try {
        $q.loading.show();
        await func();
        $q.loading.hide();
      } catch (err: any) {
        $q.loading.hide();
        onFail?.(err);
      }
    },
  };
}

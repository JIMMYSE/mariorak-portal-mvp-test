/**
 * 알림 관리
 */

export const useNotificationStore = defineStore(
  'notification',
  () => {
    // 최종 알림 확인일시
    const lastCheckDate = ref<string | undefined>(undefined);

    const isNew = ref(false);

    function getLastCheckDate() {
      return lastCheckDate.value ? new Date(lastCheckDate.value!) : undefined;
    }

    function setLastCheckDate(date: Date) {
      lastCheckDate.value = date.toISOString();
    }

    function getIsNew() {
      return isNew.value;
    }

    function setIsNew(value: boolean) {
      isNew.value = value;
    }

    return {
      lastCheckDate,
      getLastCheckDate,
      setLastCheckDate,
      isNew,
      getIsNew,
      setIsNew,
    };
  },
  { persist: true }
);

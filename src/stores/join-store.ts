/**
 * 회원가입 관련 store
 */

import { SocialRegistration } from 'src/types/auth/signin-model';

export const useJoinStore = defineStore(
  'join',
  () => {
    const joinData = ref<SocialRegistration | undefined>(undefined);

    const $init = () => {
      joinData.value = undefined;
    };

    const $reset = () => {
      joinData.value = undefined;
    };

    return {
      joinData,
      $init,
      $reset,
    };
  },
  {
    persist: true,
  }
);

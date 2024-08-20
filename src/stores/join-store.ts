/**
 * 회원가입 관련 store
 */

import { SocialRegistration } from 'src/types/auth/signin-model';

export const useJoinStore = defineStore(
  'join',
  () => {
    const joinData = ref<SocialRegistration | undefined>(undefined);

    const $init = () => {
      joinData.value = {
        access_token: null,
        social_type: null,
        policies: [],
        avatar_id: null,
        nickname: null,
        agent: null,
      };
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

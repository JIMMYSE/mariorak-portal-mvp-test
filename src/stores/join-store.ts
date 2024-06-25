/**
 * 회원가입 관련 store
 */

export interface EmailRegistration {
  email: string | null;
  password: string | null;
  terms_agreements: {
    terms_id: number;
    is_agreed: boolean;
  }[];
  nickname: string | null;
  avatar_id: number | null;
  signup_type_cd: string | null;
}

export const useJoinStore = defineStore(
  'join',
  () => {
    const joinData = ref<EmailRegistration | undefined>(undefined);

    const $init = () => {
      joinData.value = {
        email: null,
        password: null,
        terms_agreements: [],
        nickname: null,
        avatar_id: null,
        signup_type_cd: 'L',
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

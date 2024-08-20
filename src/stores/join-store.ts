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
export interface SocialRegistration {
  access_token: string | null;
  social_type: string | null;
  policies: number[];
  avatar_id: number | null;
  nickname: string | null;
  agent: {
    fcm_token: string | null;
    platform: {
      os: string | null;
      device_id: string | null;
      app_version: string | null;
      device_model: string | null;
    };
    os: string | null;
    sdk_version: string | null;
  } | null;
}

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

import { defineStore } from 'pinia';
import { useJoinService, useLogin } from 'src/composables/auth/auth';
import { useCryptoJS } from 'src/composables/common/crypto';
import { useAlertDialog } from 'src/composables/common/dialog';
import {
  EmailRegistrationReq,
  REG_TYPE,
  SocialLoginType,
  SocialRegistrationReq,
} from 'src/services/auth/model';
import { reactive } from 'vue';

const initialAccountState = {
  // ==========================
  // emai registration only
  eml_addr: '',
  password: '',

  // ==========================
  // social registration only
  social_token: '',

  // ==========================
  // library registration only
  lib_acnt_nm: '',
  lib_key_no: '',

  // ==========================
  // common
  mbl_telno: '',
  agent: {
    // TODO: replace below with real data
    fcm_token:
      'cM3p7bDJ3Tdvn7g_8K3NnW:APA91bGNApcgzqWuk3O_10Xoqjuf_eb_gflIX0tvbv4cr_PFGj-zfR2PyjHUpFV04tAUh80NYrbKZSsY9WOn85Nv2Lv9OR89gEjLMHkjS1LGegQZQ6tNfHXx1gzVFrOwR2ahEha9qWLM',
    platform: {
      os: 'A',
      device_id: '7b2d63906c1165d6',
      app_version: '0.7.3-dev',
      device_model: 'Pixel 3',
    },
    os: 'A',
    sdk_version: '12',
  },

  reg_type_cd: 'L',
  mobile_verified_token: '',
  policy_agreements: [] as { plcy_id: number; agre_yn: boolean }[],
  nckn_nm: '',
};

export const useJoinStore = defineStore('join', () => {
  const { encodeByAES256 } = useCryptoJS();
  const state = reactive({ account: initialAccountState });
  const { joinWithEmail, joinWithSocial } = useJoinService();
  const { saveLoginUser } = useLogin();

  return {
    state,
    getEmail() {
      return state.account.eml_addr;
    },
    // emai registration only
    setEmail(email: string) {
      state.account.eml_addr = email;
    },
    setPassword(password: string) {
      state.account.password = encodeByAES256(password);
    },
    // social registration only
    setSocialAccessToken(token: string, provider: SocialLoginType) {
      state.account.social_token = token;

      const k = provider.toUpperCase() as keyof typeof REG_TYPE;
      const reg_type_cd: string = REG_TYPE[k];
      state.account.reg_type_cd = reg_type_cd;
    },
    // library registration only
    setLibraryInfo(accountName: string, keyNumber: string) {
      state.account.lib_acnt_nm = accountName;
      state.account.lib_key_no = keyNumber;
    },
    // common
    setMobile(mobileNum: string, token: string) {
      state.account.mbl_telno = mobileNum.replace(/\D/g, '');
      state.account.mobile_verified_token = token;
    },
    setNickname(nickname: string) {
      state.account.nckn_nm = nickname;
    },
    setRegistrationType(type: 'L' | 'K' | 'N' | 'G' | 'A') {
      state.account.reg_type_cd = type;
    },
    setPolicyAgreements(
      agreedTermIds: { plcy_id: number; agre_yn: boolean }[]
    ) {
      state.account.policy_agreements = agreedTermIds;
    },
    reset() {
      state.account = initialAccountState;
    },
    hasAccountInfo() {
      switch (state.account.reg_type_cd) {
        case 'L':
          return state.account.eml_addr && state.account.password;
        case 'I':
        case 'J':
          return state.account.lib_acnt_nm && state.account.lib_key_no;
        default:
          return state.account.social_token;
      }
    },
    hasMobileVerified() {
      return !!state.account.mbl_telno && !!state.account.mobile_verified_token;
    },
    hasTermsAggree() {
      return state.account.policy_agreements.some((x) => x.agre_yn === true);
    },
    async joinWithAccount() {
      switch (state.account.reg_type_cd) {
        // 이메일
        case 'L': {
          const form = await EmailRegistrationReq.validate(state.account, {
            stripUnknown: true,
          });
          const { data, error } = await joinWithEmail(form);
          if (!error.value && data.value?.data) {
            await saveLoginUser(data.value.data);
          }
          break;
        }
        // 카카오/네이버/구글
        case 'K':
        case 'N':
        case 'G': {
          const form = await SocialRegistrationReq.validate(state.account, {
            stripUnknown: true,
          });
          const { data, error } = await joinWithSocial(form);
          if (!error.value && data.value?.data) {
            await saveLoginUser(data.value.data);
          }
          break;
        }
        default:
          useAlertDialog({ text: '지원되지 않는 인증방식입니다.' });
          break;
      }
    },
  };
});

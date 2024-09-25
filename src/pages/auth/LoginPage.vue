<!-- 로그인 화면 -->

<script setup lang="ts">
import de from 'app/dist/spa/assets/JoinTerms.f83cbc3c';
import { join } from 'path';
import { is } from 'quasar';
import { DeviceEvent } from 'src/composables/useBridge';
import { SocialType } from 'src/types/util/code';
import { GoogleLogin } from 'vue3-google-login';
const joinStore = useJoinStore();
const { joinData } = storeToRefs(joinStore);

const isLocal = process.env.IS_LOCAL;
const isDev = process.env.IS_DEV;

onMounted(() => {
  joinStore.$reset();
});

const { loginSocial, addEventListener, deviceType } = useBridge();

const route = useRoute();
const handleSocialLogin = (socialType: SocialType) => {
  console.log('socialLogin', socialType);
  // 1. Call Bridge API first
  loginSocial(socialType);
  // 2. On succeed, call API Server from the event listener
};

// add event listener for login_social event
const { socialLogin } = useLogin();
const removeEventListener = addEventListener('login_social', (data: DeviceEvent) => {
  const { access_token, provider } = data.detail ?? {};

  console.log('>>>>네이티브로부터 받은값:', access_token, provider);
  if (access_token) socialLoginAPI(access_token, provider);
  else useLoginFailedDialog();
});
// remove event listener when component is unmounted
onBeforeUnmount(() => removeEventListener());

//임시 웹용 구글 로그인
const googleCallback = (response: any) => {
  socialLoginAPI(response.credential, 'google');
};

const socialLoginAPI = async (accessToken: string, provider: SocialType) => {
  console.log('>>>>SocialLoginAPI', accessToken, provider);
  const { isLogined, hasToJoined } = await socialLogin(accessToken, provider);
  console.log('>>>LoginPage isLogined hasToJoined', isLogined.value, hasToJoined.value);

  if (hasToJoined.value) {
    // 회원가입이 필요한 경우
    joinStore.$init();
    if (!joinData.value) return;
    joinData.value.access_token = accessToken;
    joinData.value.social_type = provider;

    goToName('join-terms');
  } else if (!isLogined.value) {
    // 회원탈퇴한 경우
    useAlertDialog({
      text: 'auth.withdrawal.text',
    });
  } else {
    // 로그인 성공
    console.log('>>> 로그인 성공');
    goToName('home-main');
  }
};
</script>

<template>
  <q-page class="column justify-top items-center px-2 py-[10vh]">
    <q-header class="flex flex-center pl-1 pt-[var(--statusbar-h)] bg-white">
      <q-toolbar class="flex justify-between items-center h-[var(--main-header-h)] pr-1">
        <q-img src="/images/main-logo.png" alt="" class="w-14" />
      </q-toolbar>
    </q-header>
    <q-card class="w-full mt-12 bg-transparent" :flat="true">
      <!-- EMAIL LOGIN -->
      <q-card-section class="title-section">
        <div class="text-[32px] font-semibold">
          Content Created<br />
          with Fans
        </div>
        <div class="text-[#b4b4b4] mt-1 font-light">팬과 함께 만들어가는 게임 개발 커뮤니티</div>
      </q-card-section>
      <q-card-section class="q-gutter-md">
        <GoogleLogin :callback="googleCallback" v-if="isLocal || isDev" />
        <q-card
          class="rounded-full flex py-4 px-5 items-center border-[#DBDBDB] border"
          flat
          @click="handleSocialLogin('google')"
        >
          <q-icon :name="`img:icons/icon_google.svg`" size="16px" />
          <div class="text-center flex-1 text-sm font-medium">구글로 로그인하기</div>
        </q-card>
        <q-card class="rounded-full flex py-4 px-5 items-center bg-[#03c75a]" flat @click="handleSocialLogin('naver')">
          <q-icon :name="`img:icons/icon_naver.svg`" size="16px" />
          <div class="text-center flex-1 text-sm font-medium text-white">네이버로 로그인하기</div>
        </q-card>
        <q-card class="rounded-full flex py-4 px-5 items-center bg-[#fae300]" flat @click="handleSocialLogin('kakao')">
          <q-icon :name="`img:icons/icon_kakao.svg`" size="16px" />
          <div class="text-center flex-1 text-sm font-medium text-[#3c1e1e]">카카오로 로그인하기</div>
        </q-card>
        <q-card
          v-if="deviceType === 'iOS'"
          class="rounded-full flex py-4 px-5 items-center bg-grey-5"
          flat
          @click="handleSocialLogin('apple')"
        >
          <q-icon :name="`img:icons/icon_apple.svg`" size="16px" />
          <div class="text-center flex-1 text-sm font-medium text-white">Apple로 로그인하기</div>
        </q-card>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped lang="scss">
.bar {
  padding: 0 24px;
  flex: 1;
  height: 0px;
  /* UI Properties */
  border: 1px solid $grey-2;
  border: 1px solid #e6e6e6;
  opacity: 1;
}

.q-field--outlined .q-field__control {
  height: 55px;
}
:deep(.q-btn--round) {
  min-width: 35px;
  min-height: 35px;
}
.title-section {
  line-height: 1.2;
}
</style>

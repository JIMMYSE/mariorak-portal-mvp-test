<!-- 로그인 화면 -->

<script setup lang="ts">
import { SocialType } from 'src/types/util/code';
import { GoogleLogin } from 'vue3-google-login';

function handleLoginResult({
  isWithdrawing,
  isSuccess,
}: {
  isWithdrawing: boolean;
  isSuccess: boolean;
}) {
  if (isWithdrawing) {
    useAlertDialog({
      text: 'auth.withdrawal.text',
    });
  } else if (isSuccess) {
    goToName('main');
  }
}

const { loginSocial, addEventListener } = useBridge();

const handleSocialLogin = (socialType: SocialType) => {
  console.log('socialLogin', socialType);
  // 1. Call Bridge API first
  loginSocial(socialType);
  // 2. On succeed, call API Server from the event listener
};

// add event listener for login_social event
const removeEventListener = addEventListener('login_social', (data) => {
  const { access_token, provider } = data.detail ?? {};
  console.log(
    '**login_social result**\n',
    '- access_token',
    access_token,
    '- provider:',
    provider
  );

  if (access_token) {
    console.log('* succeed to loginSocial with BridgeAPI', {
      access_token,
      provider,
    });

    let type = 'login';
    if (type === 'login') {
      // socialLogin(access_token, provider)
      //   .then((data) => {
      //     console.log('** succeed to login with API');
      //     emit('login', data);
      //   })
      //   .catch((err) => {
      //     console.log('** failed to socialLogin with API', err);
      //     emit('error', err);
      //   });
    } else if (type === 'join') {
      // emit('join', { accessToken: access_token, provider });
    }
  } else {
    console.log('* failed to loginSocial with BridgeAPI');
  }
});
// remove event listener when component is unmounted
onBeforeUnmount(() => removeEventListener());

//임시 웹용 구글 로그인
const googleCallback = (response: any) => {
  console.log('googleCallback', response.credential);
};
</script>

<template>
  <q-page class="column justify-top items-center px-2 py-40 bg-grey-3">
    <!-- <q-img src="/images/.png" width="173px" height="45" /> -->
    <q-card class="w-full mt-12 bg-transparent" :flat="true">
      <!-- EMAIL LOGIN -->
      <q-card-section class="title-section">
        <div class="text-white text-[32px] font-semibold">
          혁신적인<br />인디게임 플랫폼 CCF
        </div>
        <div class="text-[#b4b4b4] mt-1 font-light">
          인디게임, CCF와 함께 즐겨보세요
        </div>
      </q-card-section>
      <q-card-section class="q-gutter-md">
        <GoogleLogin :callback="googleCallback" />
        <q-card
          class="rounded-full flex py-4 px-5 items-center"
          flat
          @click="handleSocialLogin('google')"
        >
          <q-icon :name="`img:icons/icon_google.svg`" size="16px" />
          <div class="text-center flex-1 text-sm font-medium">
            구글로 로그인하기
          </div>
        </q-card>
        <q-card
          class="rounded-full flex py-4 px-5 items-center bg-[#03c75a]"
          flat
          @click="handleSocialLogin('naver')"
        >
          <q-icon :name="`img:icons/icon_naver.svg`" size="16px" />
          <div class="text-center flex-1 text-sm font-medium text-white">
            네이버로 로그인하기
          </div>
        </q-card>
        <q-card
          class="rounded-full flex py-4 px-5 items-center bg-[#fae300]"
          flat
          @click="handleSocialLogin('kakao')"
        >
          <q-icon :name="`img:icons/icon_kakao.svg`" size="16px" />
          <div class="text-center flex-1 text-sm font-medium text-[#3c1e1e]">
            카카오로 로그인하기
          </div>
        </q-card>
        <q-card
          class="rounded-full flex py-4 px-5 items-center bg-grey-5"
          flat
          @click="handleSocialLogin('apple')"
        >
          <q-icon :name="`img:icons/icon_apple.svg`" size="16px" />
          <div class="text-center flex-1 text-sm font-medium text-white">
            Apple로 로그인하기
          </div>
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

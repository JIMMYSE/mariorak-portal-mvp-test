<!-- 계정찾기 -->

<script setup lang="ts">
import MobileAuth, {
  MobileAuthInstance,
} from 'src/components/auth/MobileAuth.vue';
import { goToName } from 'src/composables/common/app';
import {
  useAlertDialog,
  useMyConfirmDialog,
} from 'src/composables/common/dialog';
import { ref } from 'vue';

const mobileAuthRef = ref<MobileAuthInstance | null>(null);
/**
 * =========================================================================
 * 인증번호 검증결과
 */

function onSuccess(payload: {
  eml_addr: string;
  id: number;
  mobile_verified_token: string;
}) {
  if (!payload.mobile_verified_token) {
    return useAlertDialog({
      text: 'mobile_verified_token 이 유효하지 않습니다.',
    });
  }

  const id = payload.id.toString();
  const token = payload.mobile_verified_token;

  useMyConfirmDialog({
    title: '계정 아이디 찾기 결과',
    htmlText: `
<div class="column items-start">
  <p class="text-h3 text-grey-5 font-medium leading-6">
    사용자님의 아이디는<br>
    <span class="text-primary">${payload.eml_addr}<span> 입니다.
  </p>
  <p class="mt-4 text-body2">
  사용자님의 아이디 입니다. <br/>
  비밀번호를 분실하신 경우 하단의<br/>
  '비밀번호 재설정' 버튼을 눌러주세요.
  </p>
</div>`,
    okLabel: '로그인',
    cancelLabel: '비밀번호 재설정',
  })
    .onOk(() => goToName('login'))
    .onCancel(() => {
      console.log('onCancel:', { id, token });
      goToName('reset-password', {
        id,
        token,
      });
    });
}

function onFail({
  code,
  reason,
}: {
  code?: string | undefined;
  reason: string;
}) {
  console.warn('FindUser:: onFail', reason);
  useAlertDialog({ text: reason }).onDismiss(() => {
    // 이미 가입된 계정이 있는 경우
    if (code === '5002') {
      goToName('login');
    }
  });
}
</script>

<template>
  <q-page class="column px-4">
    <div class="px-2 pt-[40px] text-h3">
      <p>계정 아이디를 찾기 위해</p>
      <p><span class="text-primary">휴대폰 인증</span>을 받아주세요</p>
    </div>
    <mobile-auth
      ref="mobileAuthRef"
      type="A"
      @success="onSuccess"
      @fail="onFail"
    />
    <div class="col row items-end py-[15px]">
      <a-btn
        v-if="!mobileAuthRef?.didSendCode"
        class="w-full h-[55px]"
        label="인증번호 발송"
        :disable="!mobileAuthRef?.valid.mobile"
        @click="mobileAuthRef?.sendValidationCode"
      ></a-btn>
      <a-btn
        v-else
        class="w-full h-[55px]"
        label="확인"
        :disable="!mobileAuthRef?.valid.code || mobileAuthRef?.codeExpired"
        @click="mobileAuthRef?.onSubmit"
      ></a-btn>
    </div>
  </q-page>
</template>

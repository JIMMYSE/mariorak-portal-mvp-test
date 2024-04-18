<!-- 회원가입-휴대폰번호 인증 -->

<script setup lang="ts">
import { goBack, goToName } from 'src/composables/common/app';
import { useAlertDialog } from 'src/composables/common/dialog';
import { ref } from 'vue';
import MobileAuth, {
  type MobileAuthInstance,
} from 'src/components/auth/MobileAuth.vue';
import { useJoinStore } from 'src/stores/join-store';

const store = useJoinStore();
if (!store.hasAccountInfo()) {
  goBack();
}

const mobileAuthRef = ref<MobileAuthInstance | null>(null);

/**
 * =========================================================================
 * 인증번호 검증결과
 */

function onSuccess({ mobile, token }: { mobile: string; token: string }) {
  console.warn('JoinMobile:: onSuccess', { mobile, token });
  store.setMobile(mobile, token);
  goToName('join-policy');
}

function onFail({
  code,
  reason,
}: {
  code?: string | undefined;
  reason: string;
}) {
  console.warn('JoinMobile:: onFail', reason);
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
      <p>서로버스 회원가입을 위한</p>
      <p><span class="text-primary">휴대폰 인증</span>을 진행해주세요</p>
    </div>
    <mobile-auth
      ref="mobileAuthRef"
      type="R"
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

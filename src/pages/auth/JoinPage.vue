<!-- 회원가입 인트로 -->

<script setup lang="ts">
import { goToName } from 'src/composables/common/app';
import SocialLoginGroup from 'src/components/auth/SocialLoginGroup.vue';
import { useJoinStore } from 'src/stores/join-store';
import { SocialLoginType, useJoinService } from 'src/composables/auth/auth';
import { useExistingUserDialog } from 'src/composables/auth/useExistingUserDialog';

const { setSocialAccessToken } = useJoinStore();
const { checkExistingSocialAccount } = useJoinService();

async function onSocialJoin({
  accessToken,
  provider,
}: {
  accessToken: string;
  provider: SocialLoginType;
}) {
  const { exists, email } = await checkExistingSocialAccount(
    accessToken,
    provider
  );

  if (exists) {
    console.log(
      `Existing user with email ${email} found with social type ${provider}`
    );
    useExistingUserDialog(email, provider);
    return;
  }

  // Save access_token and provider to store
  setSocialAccessToken(accessToken, provider);
  goToName('join-mobile');
}

function onSocialJoinError(error: any) {
  console.log('onSocialJoinError', error);
}
</script>

<template>
  <QPage class="column flex-center px-4">
    <section class="column flex-center px-[42px] mt-[60px]">
      <QIcon size="41px" name="img:icons/favicon-60x66.png" />
      <div class="text-h1 mt-[23px]">글로 만들어가는 세상</div>
      <div class="text-h3 font-light mt-[5px]">
        서로버스에 오신 것을 환영합니다!
      </div>
      <div class="text-caption text-center text-grey-3 mt-4">
        서로버스는 사용자님이 자주 사용하는 이메일 주소나 기존 SNS 계정 혹은
        전주/익산 도서관 계정으로 간편하게 가입하실 수 있습니다.
      </div>
    </section>
    <div class="flex-1 min-h-20"></div>
    <section class="w-full">
      <QBtn
        class="full-width text-body2 h-[50px]"
        rounded
        color="primary"
        @click="goToName('join-email')"
        unelevated
      >
        <div class="w-full text-start px-[4px]">
          <QIcon name="img:/images/icons/icon_email.svg" size="24px"></QIcon>

          <span class="absolute-center"> 이메일로 회원가입</span>
        </div>
      </QBtn>
    </section>

    <!-- OTHER LOGIN -->
    <QCardSection class="w-full mb-[37px]">
      <div class="row justify-between items-center mb-[25px] mt-[14px]">
        <div class="bar"></div>
        <span class="px-[28px] text-caption font-medium text-grey-3">
          소셜가입
        </span>
        <div class="bar"></div>
      </div>
      <social-login-group
        type="join"
        @join="onSocialJoin"
        @error="onSocialJoinError"
      />
    </QCardSection>
  </QPage>
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
:deep(.q-btn--round) {
  min-width: 35px;
  min-height: 35px;
}
</style>

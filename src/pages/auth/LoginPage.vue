<!-- 로그인 화면 -->

<script setup lang="ts">
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

// }
</script>

<template>
  <q-page class="column justify-top items-center px-2 py-40 bg-grey-1">
    <q-img src="/images/main-logo-blue.png" width="173px" height="45" />
    <q-card class="w-full mt-12 bg-transparent" :flat="true">
      <!-- EMAIL LOGIN -->
      <q-card-section class="title-section">
        <div class="text-white text-[32px]">
          혁신적인<br />인디게임 플랫폼 CCF
        </div>
        <div class="text-[#b4b4b4] mt-2 font-light">
          인디게임, CCF와 함께 즐겨보세요
        </div>
      </q-card-section>
      <q-card-section>
        <q-card
          class="w-[312px] h-[50px] pl-6 pr-[107px] pt-3.5 pb-[15px] bg-white rounded-[30px] border border-[#dbdbdb] justify-start items-end gap-[66px] inline-flex"
        >
          <div class="w-[17px] h-[17px] relative"></div>
          <div
            class="text-center text-[#191919] text-sm font-medium font-['Pretendard'] leading-[21px]"
          >
            구글로 로그인하기
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

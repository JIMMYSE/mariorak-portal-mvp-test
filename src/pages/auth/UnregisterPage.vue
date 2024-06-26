<!-- 회원탈퇴 -->

<script lang="ts" setup>
const { unregister } = useAuthUnregister();

const onSubmit = async () => {
  await unregister(() =>
    useAlertDialog({
      text: '탈퇴 처리가 완료되었습니다.',
    }).onOk(() => goTo('/login'))
  );
};
</script>

<template>
  <q-page class="flex flex-col relative">
    <h1 class="text-h1 px-6 pt-[30px]">회원탈퇴 안내</h1>
    <p class="px-6 mt-[11px] font-pretendard text-sm text-secondary leading-5">
      회원탈퇴 시 개인정보 및 모든 이용정보는 개인정보처리<br />
      방침에 따라 별도보관 또는 즉시 삭제되며,<br />
      복구할 수 없습니다.
    </p>
    <q-card flat square class="bg-grey p-6 mt-5 font-pretendard leading-5">
      <h4 class="text-sm text-secondary font-semibold">- 보관 정보 및 기간</h4>
      <p class="text-sm text-grey-3">개인정보 처리방침에 따라 처리됩니다.</p>
      <h4 class="mt-5 text-sm text-secondary font-semibold">
        - 재가입 및 복구
      </h4>
      <p class="text-sm text-grey-3">
        회원탈퇴 후에는 7일 간 동일한 계정으로 재가입할 수 없으며, 복구는 어떠한
        경우에도 불가능합니다.
      </p>
      <h4 class="mt-5 text-sm text-secondary font-semibold">
        - 콘텐츠 및 게시물
      </h4>
      <p class="text-sm text-grey-3">
        회원탈퇴를 진행하더라도 회원이 등록, 게시, 공유한 콘텐츠는 유지됩니다.
      </p>
    </q-card>
    <p class="mt-5 px-6 text-sm text-secondary font-medium font-pretendard">
      위 내용을 모두 확인하였으며, 탈퇴처리 진행을 원하는 경우<br />
      아래 <span class="text-negative">회원탈퇴 버튼</span>을 선택해 주세요.
    </p>
    <div class="flex-1 mb-16"></div>
    <div class="flex justify-center mb-[80px]">
      <q-btn
        color="negative"
        outline
        unelevated
        size="md"
        class="w-[165px] h-[50px] !text-[15px]"
        @click="onSubmit"
      >
        회원탈퇴
      </q-btn>
    </div>
  </q-page>
</template>

<style lang="css" scoped></style>

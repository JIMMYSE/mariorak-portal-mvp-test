<script lang="ts" setup>
import { goTo } from 'src/composables/common/app';
import { useAlertDialog } from 'src/composables/common/dialog';
import { useUnregister } from 'src/composables/auth/auth';
import { ref } from 'vue';

const { unregister } = useUnregister();
const checked = ref(false);

async function onSubmit() {
  await unregister(() =>
    useAlertDialog({
      text: '회원탈퇴 신청이 반영되어 사용자님의 계정이 삭제되었습니다.',
    }).onOk(() => goTo('/login'))
  );
}
</script>

<template>
  <q-page class="px-6 pt-10">
    <h3>
      <span class="text-primary text-lg font-medium">회원탈퇴</span
      ><span class="text-lg font-medium">를 진행하시겠습니까?</span>
    </h3>
    <p class="text-base font-light leading-[25px] mt-[10px]">
      서로버스와 이별하기 전<br />
      회원탈퇴 유의사항을 꼭 확인해주세요!
    </p>
    <q-card flat square class="bg-grey-1 h-[350px] mt-5 p-5">
      <h3 class="text-base font-medium text-grey-4">회원탈퇴 유의사항</h3>
      <p class="text-xs font-light text-grey-4 mt-5 leading-5">
        -회원탈퇴 유의사항입니다.회원탈퇴 유의사항입니다.회원탈퇴
        유의사항입니다.회원탈퇴 유의사항입니다.회원탈퇴 유의사항입니다.
      </p>
      <p class="text-xs font-light text-grey-4 mt-5 leading-5">
        -회원탈퇴 유의사항입니다.회원탈퇴 유의사항입니다.회원탈퇴
        유의사항입니다.회원탈퇴 유의사항입니다.
      </p>
      <p class="text-xs font-light text-grey-4 mt-5 leading-5">
        -회원탈퇴 유의사항입니다.회원탈퇴 유의사항입니다.회원탈퇴
        유의사항입니다.회원탈퇴 유의사항입니다.회원탈퇴 유의사항입니다.
      </p>
      <p class="text-xs font-light text-grey-4 mt-5 leading-5">
        -회원탈퇴 유의사항입니다.회원탈퇴 유의사항입니다.회원탈퇴
        유의사항입니다.회원탈퇴 유의사항입니다.
      </p>
    </q-card>
    <div class="mt-5 flex items-top">
      <a-checkbox
        v-model="checked"
        class="text-[13px] leading-5 font-light"
        label="
        유의사항을 모두 확인하였으며, 회원탈퇴 시 진행되는 모든 정보 소멸에
        대하여 동의합니다.
        "
      />
      <!-- <q-icon -->
      <!--   name="img:/images/icons/btn_checkbox_b.svg" -->
      <!--   class="mr-[7px] top-[2px]" -->
      <!-- ></q-icon> -->
      <!-- <p class="col text-[13px] leading-5 font-light"> -->
      <!--   유의사항을 모두 확인하였으며, 회원탈퇴 시 진행되는 모든 정보 소멸에 -->
      <!--   대하여 동의합니다. -->
      <!-- </p> -->
    </div>

    <div class="w-screen -ml-6 p-4 fixed bottom-0 bg-white">
      <a-btn
        class="w-full h-[55px]"
        label="회원탈퇴 신청하기"
        @click="onSubmit"
        :disable="!checked"
      />
    </div>
  </q-page>
</template>

<style lang="css" scoped></style>

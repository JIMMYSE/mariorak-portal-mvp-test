<script lang="ts" setup>
import { ref } from 'vue';

interface RecruitUser {
  role: string;
  headCount: string | number;
}

const recuritUsers = ref<RecruitUser[]>([
  {
    role: '3D Designer',
    headCount: 10,
  },
  {
    role: 'Animator',
    headCount: 3,
  },
]);

const goToApplyPage = () => {
  goTo('/game-pack/member-list');
};
</script>

<template>
  <div class="flex flex-col">
    <div
      v-for="user in recuritUsers"
      :key="user.role"
      class="flex items-center bg-[#f8f8f8] mb-[10px] rounded-[20px] h-[80px] p-[12px]"
    >
      <div class="rounded-full bg-[#ffffff] p-[15px]">
        <q-icon
          name="img:/icons/icon_member_recruit.svg"
          :alt="user.role"
          size="28px"
          class="left-[3px]"
        />
      </div>
      <div class="flex flex-col ml-[12px]">
        <div class="text-[#222222] text-base font-medium leading-snug">
          {{ user.role }}
        </div>
        <div class="text-[#056bf1] text-xs font-semibold leading-none">
          {{ user.headCount }}명 모집중
        </div>
      </div>
    </div>
    <div class="text-center mt-[50px]">
      <c-btn
        @click="goToApplyPage()"
        class="enter_btn rounded-[30px] text-[#056bf1] font-semibold text-sm py-3 pl-10 pr-[30px]"
        outline
        >프로젝트 지원하기
        <c-icon
          name="icon_enter_arrow"
          size="14px"
          :color="'#056BF1'"
          :fill="false"
        />
      </c-btn>
    </div>
  </div>
</template>

<style scoped></style>

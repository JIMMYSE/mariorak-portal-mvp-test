<script lang="ts" setup>
import ProjectInfoPanel from './panel/ProjectInfoPanel.vue';
import ProjectBoardPanel from './panel/ProjectBoardPanel.vue';

const like = ref(false);
const tab = ref('INFO');

const onLikeProject = () => {
  like.value = !like.value;
};

const gameInfo = {
  badge: ['어드벤쳐', 'Mobile', 'RPG'],
  title: '[새롭게 돌아온] KINGDOM the blood 킹덤 더 블러드',
  description:
    'game의 새로운 시작을 소개합니다 game의 새로운 신작을 소개합니다',
};
</script>
<template>
  <q-page>
    <section>
      <div class="h-[210px] w-full">
        <q-icon
          name="img:/icons/icon_in_progress.svg"
          size="50px"
          class="absolute z-10 ml-[13px]"
        />
        <div
          @click="onLikeProject"
          class="absolute z-10 mr-[13px] right-0 top-2"
        >
          <c-icon
            name="icon_heart_btn"
            size="30px"
            :active="like"
            active-color="#EA2E2E"
          />
        </div>
        <q-img src="/images/dummy/game_detail_dummy.svg" width="100%" />
      </div>
    </section>
    <section class="px-6">
      <div>
        <div class="text-caption q-mb-xs mt-[16px]">
          <span
            class="badge text-[10px] font-medium"
            v-for="badge in gameInfo.badge"
            :key="badge"
            >{{ badge }}</span
          >
        </div>
        <p class="text-[#222222] text-xl font-semibold leading-7 mt-[8px]">
          {{ gameInfo.title }}
        </p>
        <div class="flex items-center mt-2">
          <q-icon name="img:/icons/icon_heart_red.svg" size="15px" />
          <span class="text-[#222222] text-xs font-medium leading-none ml-[4px]"
            >264명</span
          >
        </div>
        <div class="space-y-2 mt-[20px]">
          <div class="flex justify-start items-center">
            <span
              class="text-[#b5b5b5] text-xs font-semibold leading-none w-[95px]"
              >프로젝트 매니저</span
            >
            <span class="text-[#222222] text-sm font-normal leading-tight]"
              >가나다라마바사</span
            >
          </div>
          <div class="flex justify-start items-center">
            <span
              class="text-[#b5b5b5] text-xs font-semibold leading-none w-[95px]"
              >프로젝트 시작일</span
            >
            <span class="text-[#222222] text-sm font-normal leading-tight"
              >2024.02.02</span
            >
          </div>
          <div class="flex justify-start items-center">
            <span
              class="text-[#b5b5b5] text-xs font-semibold leading-none w-[95px]"
              >마지막 업데이트</span
            >
            <span class="text-[#222222] text-sm font-normal leading-tight"
              >2024.02.02</span
            >
          </div>
          <div class="flex justify-start items-center">
            <span
              class="text-[#b5b5b5] text-xs font-semibold leading-none w-[95px]"
              >목표일</span
            >
            <span class="text-[#222222] text-sm font-normal leading-tight"
              >2024.02.02</span
            >
          </div>
        </div>
        <!-- progress bar 추후 컴포넌트화 -->
        <div class="w-full mt-[20px]">
          <div class="flex justify-between items-center mb-1">
            <span class="text-base font-medium leading-tight text-[#222222]"
              >프로젝트 진행률</span
            >
            <span class="text-[#056bf1] text-2xl font-semibold">80%</span>
          </div>
          <!-- 응답값에 따라 style width 값 조절 -->
          <div class="w-full bg-[#DBDBDB] rounded-full h-0.5">
            <div
              class="bg-[#056BF1] h-0.5 rounded-full"
              style="width: 80%"
            ></div>
          </div>
        </div>
        <div>
          <c-btn
            class="w-full rounded-[30px] text-[#056bf1] font-semibold text-sm py-4 pl-10 pr-[30px] mt-[23px]"
            outline
            >프로젝트 후원하기
          </c-btn>
          <c-btn
            class="w-full rounded-[30px] text-[#056bf1] font-semibold text-sm py-4 pl-10 pr-[30px] mt-[8px]"
            >메타버스 사무실 방문하기
          </c-btn>
        </div>
      </div>
    </section>
    <hr class="h-2.5 bg-[#f7f7f7] mt-6" />
    <!-- 탭 영역 -->
    <section class="mt-[35px]">
      <c-tabs
        v-model="tab"
        :tabs="[
          { label: '정보', name: 'INFO' },
          { label: '게시판', name: 'BOARD' },
        ]"
      />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel class="px-6" name="INFO">
          <project-info-panel />
        </q-tab-panel>
        <q-tab-panel class="px-6" name="BOARD">
          <project-board-panel />
        </q-tab-panel>
      </q-tab-panels>
    </section>
  </q-page>
</template>
<style lang="scss" scoped></style>

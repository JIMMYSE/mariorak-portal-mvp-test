<script lang="ts" setup>
import GameInfoPanel from './panel/GameInfoPanel.vue';
import GameBoardPanel from './panel/GameBoardPanel.vue';
import GameReviewPanel from './panel/GameReviewPanel.vue';

const like = ref(false);
const tab = ref('INFO');

// const onLikeProject = () => {
//   like.value = !like.value;
// };

const gameInfo = {
  badge: ['어드벤쳐', 'Mobile', 'RPG'],
  title: '[새롭게 돌아온] KINGDOM the blood 킹덤 더 블러드',
  description:
    'game의 새로운 시작을 소개합니다 game의 새로운 신작을 소개합니다',
};
</script>
<template>
  <q-page
    ><section>
      <div class="w-full">
        <!-- <div
          @click="onLikeProject"
          class="absolute z-10 mr-[13px] right-0 top-2"
        >
          <c-icon
            name="icon_heart_btn"
            size="30px"
            :active="like"
            active-color="#EA2E2E"
          />
        </div> -->
        <q-img
          src="/images/dummy/game_detail_dummy.svg"
          width="100%"
          height="100%"
        />
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
        <!-- <div class="flex items-center mt-2">
          <q-icon name="img:/icons/icon_heart_red.svg" size="15px" />
          <span class="text-[#222222] text-xs font-medium leading-none ml-[4px]"
            >264명</span
          >
        </div> -->
        <div class="space-y-2 mt-[20px]">
          <div class="flex justify-start items-center">
            <span
              class="text-[#b5b5b5] text-xs font-semibold leading-none w-[95px]"
              >프로젝트 이름</span
            >
            <span class="text-[#222222] text-sm font-normal leading-tight]"
              >가나다라마바사</span
            >
          </div>
          <div class="flex justify-start items-center">
            <span
              class="text-[#b5b5b5] text-xs font-semibold leading-none w-[95px]"
              >프로젝트 매니저</span
            >
            <span class="text-[#222222] text-sm font-normal leading-tight"
              >가나다라마바사</span
            >
          </div>
          <div class="flex justify-start items-center">
            <span
              class="text-[#b5b5b5] text-xs font-semibold leading-none w-[95px]"
              >출시일</span
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
        </div>
        <!-- progress bar 추후 컴포넌트화 -->

        <div>
          <c-btn
            class="w-full rounded-[30px] text-[#056bf1] font-semibold text-sm py-4 pl-10 pr-[30px] mt-[23px]"
            outline
            >게임 스토어로 이동하기
          </c-btn>
          <c-btn
            class="w-full rounded-[30px] text-[#056bf1] font-semibold text-sm py-4 pl-10 pr-[30px] mt-[8px]"
            >메타버스 사무실 방문하기
          </c-btn>
        </div>
      </div>
    </section>
    <hr class="h-2.5 bg-[#f7f7f7] mt-6" />
    <section class="mt-[35px]">
      <c-tabs
        v-model="tab"
        :tabs="[
          { label: '정보', name: 'INFO' },
          // { label: '게시판', name: 'BOARD' }, TODO 앱 심사 히든 처리
          // { label: '리뷰', name: 'REVIEW' },
        ]"
      />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel class="px-6" name="INFO">
          <game-info-panel />
        </q-tab-panel>
        <q-tab-panel class="px-6" name="BOARD">
          <game-board-panel />
        </q-tab-panel>
        <q-tab-panel class="px-6" name="REVIEW">
          <game-review-panel />
        </q-tab-panel>
      </q-tab-panels>
    </section>
  </q-page>
</template>

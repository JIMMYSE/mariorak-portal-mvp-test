<script lang="ts" setup>
import GameInfoPanel from './panel/GameInfoPanel.vue';
import GameBoardPanel from './panel/GameBoardPanel.vue';
import GameReviewPanel from './panel/GameReviewPanel.vue';
import GameNewsPanel from './panel/GameNewsPanel.vue';
import { toInteger } from 'lodash';

const route = useRoute();
const gameId = route.params.id.toString();
const { data: gameDetail, refetch, isFetching } = useGameDetail(gameId);

const like = ref(false);
const tab = ref('INFO');

const { mutateAsync: onUnlike } = useUnLike('projectOrgame', 'game-detail');

const onLikeProject = async () => {
  like.value = !like.value;
  like.value ? useLike('projectOrgame', gameDetail.value.prj_id, 'game-detail') : onUnlike(gameDetail?.value.prj_id);
};
const { data: similarGameData } = useSimilarGameList(gameId);
watch(gameDetail, () => {
  like.value = gameDetail?.value?.is_liked ?? false;
});
const { enterRoom } = useBridge();

const managerName = computed(
  () => gameDetail.value.mkr_list.filter((mkr: any) => mkr.mngr_yn)[0]?.mem_nickname ?? null
);

const { maker } = useAuthStore();
const isManager = computed(
  () => (gameDetail.value.mkr_list.filter((mkr: any) => mkr.mngr_yn)[0]?.mem_id ?? null) == maker.mem_id
);

const openStore = () => {
  window.open(gameDetail?.value.stre_url, '_blank');
};

onMounted(() => {
  createPageView('GAMD', toInteger(gameId));
});
</script>
<template>
  <q-page v-if="!isFetching">
    <section>
      <div class="w-full">
        <div @click="onLikeProject" class="absolute z-10 mr-[13px] right-0 top-2">
          <c-icon name="icon_heart_btn" size="30px" :active="like" active-color="#EA2E2E" />
        </div>
        <q-img :src="gameDetail?.thmn_file.convert_addr" width="100%" height="100%" />
      </div>
    </section>
    <section class="px-6">
      <div>
        <div class="text-caption q-mb-xs mt-[16px]">
          <span class="badge text-[10px] font-medium" v-for="badge in gameDetail?.tag_list" :key="badge">{{
            badge
          }}</span>
        </div>
        <p class="text-[#222222] text-xl font-semibold leading-7 mt-[8px]">
          {{ gameDetail.title }}
        </p>
        <div class="flex items-center mt-2">
          <q-icon name="img:/icons/icon_heart_red.svg" size="15px" />
          <span class="text-[#222222] text-xs font-medium leading-none ml-[4px]">{{ gameDetail.like_cnt }}명</span>
        </div>
        <div class="space-y-2 mt-[20px]">
          <div class="flex justify-start items-center">
            <span class="text-[#b5b5b5] text-xs font-semibold leading-none w-[95px]">프로젝트 이름</span>
            <span class="text-[#222222] text-sm font-normal leading-tight]">{{ gameDetail.title }}</span>
          </div>
          <div class="flex justify-start items-center">
            <span class="text-[#b5b5b5] text-xs font-semibold leading-none w-[95px]">프로젝트 매니저</span>
            <span class="text-[#222222] text-sm font-normal leading-tight">{{ managerName }}</span>
          </div>
          <div class="flex justify-start items-center">
            <span class="text-[#b5b5b5] text-xs font-semibold leading-none w-[95px]">출시일</span>
            <span class="text-[#222222] text-sm font-normal leading-tight">{{
              formatDate(gameDetail.created_at)
            }}</span>
          </div>
          <div class="flex justify-start items-center">
            <span class="text-[#b5b5b5] text-xs font-semibold leading-none w-[95px]">마지막 업데이트</span>
            <span class="text-[#222222] text-sm font-normal leading-tight">{{
              formatDate(gameDetail.office_updated_at)
            }}</span>
          </div>
        </div>
        <!-- progress bar 추후 컴포넌트화 -->

        <div class="mt-4">
          <c-btn
            class="w-full rounded-[30px] text-[#056bf1] font-semibold text-sm py-4 pl-10 pr-[30px]"
            outline
            @click="openStore"
            >게임 스토어로 이동하기
          </c-btn>
          <c-btn
            class="w-full rounded-[30px] text-[#056bf1] font-semibold text-sm py-4 pl-10 pr-[30px] mt-[8px]"
            @click="enterRoom(gameDetail?.office_id ?? null, 1)"
            >가상 오피스 방문하기
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
          { label: '게시판', name: 'BOARD' },
          { label: '리뷰', name: 'REVIEW' },
          { label: '뉴스', name: 'NEWS' },
        ]"
      />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel class="px-6" name="INFO">
          <game-info-panel :detail="gameDetail" :similar-project-list="similarGameData?.rows" />
        </q-tab-panel>
        <q-tab-panel class="px-6" name="BOARD">
          <game-board-panel :game-id="gameId" :prj-id="gameDetail.prj_id" />
        </q-tab-panel>
        <q-tab-panel class="px-6" name="REVIEW">
          <game-review-panel :game-id="gameId" :prj-id="gameDetail.prj_id" />
        </q-tab-panel>
        <q-tab-panel class="px-6" name="NEWS">
          <game-news-panel :prj-id="gameDetail.prj_id" :mngr-yn="isManager" />
        </q-tab-panel>
      </q-tab-panels>
    </section>
  </q-page>
</template>

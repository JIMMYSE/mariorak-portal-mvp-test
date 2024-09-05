<script lang="ts" setup>
import RecruitProjectInfoPanel from '../recruit/panel/RecruitProjectInfoPanel.vue';
import ProjectBoardPanel from '../game-pack/project/panel/ProjectBoardPanel.vue';

const route = useRoute();
const projectId = route.params.id.toString();
const { data: projectDetail, refetch } = useProjectDetail(projectId);

const like = ref(false);
const tab = ref('INFO');
const { mutateAsync: onLike } = useLike('project', projectId, 'project-detail');
const { mutateAsync: onUnlike } = useUnLike('project', 'project-detail');

const onLikeProject = async () => {
  like.value = !like.value;
  like.value ? onLike({}) : onUnlike(projectId);
  await refetch();
};
const { data: similarProjectData } = useSimilarProjectList(projectId);
watch(projectDetail, () => {
  like.value = projectDetail?.value?.is_liked ?? false;
});
const { enterRoom } = useBridge();
</script>
<template>
  <q-page>
    <section>
      <div class="h-[210px] w-full">
        <div class="absolute z-10 ml-[13px] left-0 top-2">
          <g-pbadge :cd="projectDetail?.prj_stt_cd" section-cd="PRJ_STT" />
        </div>
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
        <q-img
          :src="projectDetail?.thmn_file.convert_addr"
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
            v-for="badge in projectDetail?.tag_list"
            :key="badge"
            >{{ badge }}</span
          >
        </div>
        <p class="text-[#222222] text-xl font-semibold leading-7 mt-[8px]">
          {{ projectDetail?.title }}
        </p>
        <div class="flex items-center mt-2">
          <q-icon name="img:/icons/icon_heart_red.svg" size="15px" />
          <span class="text-[#222222] text-xs font-medium leading-none ml-[4px]"
            >{{ projectDetail?.like_cnt }}명</span
          >
        </div>
        <div class="space-y-2 mt-[20px]">
          <div class="flex justify-start items-center">
            <span
              class="text-[#b5b5b5] text-xs font-semibold leading-none w-[95px]"
              >프로젝트 매니저</span
            >
            <span class="text-[#222222] text-sm font-normal leading-tight]">{{
              projectDetail?.mngr_mem_nickname
            }}</span>
          </div>
          <div class="flex justify-start items-center">
            <span
              class="text-[#b5b5b5] text-xs font-semibold leading-none w-[95px]"
              >프로젝트 시작일</span
            >
            <span class="text-[#222222] text-sm font-normal leading-tight">{{
              formatDate(projectDetail?.created_at)
            }}</span>
          </div>
          <div class="flex justify-start items-center">
            <span
              class="text-[#b5b5b5] text-xs font-semibold leading-none w-[95px]"
              >마지막 업데이트</span
            >
            <span class="text-[#222222] text-sm font-normal leading-tight">{{
              formatDate(projectDetail?.office_updated_at)
            }}</span>
          </div>
          <div class="flex justify-start items-center">
            <span
              class="text-[#b5b5b5] text-xs font-semibold leading-none w-[95px]"
              >목표일</span
            >
            <span class="text-[#222222] text-sm font-normal leading-tight">{{
              formatDate(projectDetail?.end_dttm)
            }}</span>
          </div>
        </div>
        <!-- progress bar 추후 컴포넌트화 -->
        <div class="w-full mt-[20px]">
          <div class="flex justify-between items-center mb-1">
            <span class="text-base font-medium leading-tight text-[#222222]"
              >프로젝트 진행률</span
            >
            <span class="text-[#056bf1] text-2xl font-semibold"
              >{{ projectDetail?.progress_percent }}%</span
            >
          </div>
          <!-- 응답값에 따라 style width 값 조절 -->
          <div class="w-full bg-[#DBDBDB] rounded-full h-0.5">
            <div
              class="bg-[#056BF1] h-0.5 rounded-full"
              :style="`width: ${projectDetail?.progress_percent}%`"
            ></div>
          </div>
        </div>
        <div class="mt-4">
          <!-- TODO 앱 심사 히든 처리 -->
          <!-- <c-btn
            class="w-full rounded-[30px] text-[#056bf1] font-semibold text-sm py-4 pl-10 pr-[30px]"
            outline
            >프로젝트 후원하기
          </c-btn> -->
          <c-btn
            outline
            class="w-full rounded-[30px] text-[#056bf1] font-semibold text-sm py-4 pl-10 pr-[30px] mt-[8px]"
            @click="goTo(`/game-pack/project/${projectId}`)"
            >프로젝트 페이지로 이동하기
          </c-btn>
        </div>
      </div>
    </section>
    <hr class="h-2.5 bg-[#f7f7f7] mt-6" />
    <!-- 탭 영역 -->
    <section class="mt-[35px]">
      <c-tabs
        v-model="tab"
        align="justify"
        :tabs="[
          { label: '정보', name: 'INFO' },
          // { label: '게시판', name: 'BOARD' }, TODO 앱 심사 히든 처리
        ]"
      />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel class="px-6" name="INFO">
          <recruit-project-info-panel
            :detail="projectDetail"
            :similar-project-list="similarProjectData?.rows"
          />
        </q-tab-panel>
        <q-tab-panel class="px-6" name="BOARD">
          <project-board-panel :pj-id="projectId" />
        </q-tab-panel>
      </q-tab-panels>
    </section>
  </q-page>
</template>
<style lang="scss" scoped></style>
1

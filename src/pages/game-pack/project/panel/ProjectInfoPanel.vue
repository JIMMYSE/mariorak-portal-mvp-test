<script lang="ts" setup>
import { ProjectDetail, SimilarProjectListType } from 'src/types/gamepack/project-model';

type Props = {
  detail?: ProjectDetail;
  similarProjectList?: SimilarProjectListType;
};
const props = defineProps<Props>();

const emits = defineEmits<{
  /**
   * 프로젝트 지원
   */
  'project-applied': [];
}>();
</script>
<template>
  <div class="w-full">
    <section class="mt-6">
      <h2 class="text-[20px] font-semibold">게임 소개</h2>
      <div class="mt-4">
        <introduce-text :intro="detail?.cont" />
      </div>
    </section>
    <section class="mt-[60px]">
      <h2 class="text-[20px] font-semibold">In Game Shot</h2>
      <div class="mt-4" v-if="detail?.detail_file_list">
        <game-shot-movie :detail-file-list="detail?.detail_file_list" />
      </div>
      <div v-else></div>
    </section>
    <section class="mt-[40px]">
      <h2 class="text-[20px] font-semibold">프로젝트 참여 멤버</h2>
      <div class="mt-4">
        <g-p-member-list :maker-list="detail?.mkr_list" />
      </div>
    </section>
    <section class="mt-[40px]" v-if="detail?.rcrt">
      <h2 class="text-[20px] font-semibold">프로젝트 참가자 모집 소식({{ detail?.rcrt.rcrt_mkr_num }}명)</h2>
      <div class="mt-4">
        <g-p-project-member-recruit
          class="mt-[30px]"
          :recruit-list="detail?.rcrt"
          :has-profile="detail?.hasProfile as boolean"
          @project-applied="emits('project-applied')"
        />
      </div>
    </section>
    <section class="mt-[40px] pb-[30px]">
      <h2 class="text-[20px] font-semibold">유사한 프로젝트</h2>
      <div class="mt-4">
        <normal-project-list :p-list="similarProjectList" type="project" />
      </div>
    </section>
  </div>
</template>

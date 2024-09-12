<script lang="ts" setup>
import { RecruitProjectDetailType } from 'src/types/gamepack/recruit-model';

const emits = defineEmits<{
  /**
   * 프로젝트 지원
   */
  'project-applied': [];
}>();

type Props = {
  detail?: RecruitProjectDetailType['data'];
};
const props = defineProps<Props>();
</script>
<template>
  <div class="w-full">
    <section class="mt-[40px]">
      <h2 class="text-[20px] font-semibold">프로젝트 참가자 모집 소식</h2>
      <div class="mt-4">
        <g-p-project-member-recruit
          class="mt-[30px]"
          :recruit-list="detail?.rcrt"
          :has-profile="detail?.hasProfile as boolean"
          @project-applied="emits('project-applied')"
        />
      </div>
    </section>
    <!-- TODO 앱심사 히든처리 -->
    <!-- <section class="mt-[60px]" v-if="false">
      <h2 class="text-[20px] font-semibold">In Game Shot</h2>
      <div class="mt-4" v-if="detail?.detail_file_list">
        <game-shot-movie :detail-file-list="detail?.detail_file_list" />
      </div>
      <div v-else></div>
    </section> -->
    <section class="mt-12">
      <h2 class="text-[20px] font-semibold">게임 설명</h2>
      <div class="mt-4">
        <introduce-text :intro="detail?.cont" />
      </div>
    </section>
    <section class="mt-12">
      <h2 class="text-[20px] font-semibold">프로젝트 참여 멤버</h2>
      <div class="mt-4">
        <g-p-member-list :maker-list="detail?.mkr_list" />
      </div>
    </section>
    <section class="mt-12">
      <h2 class="text-[20px] font-semibold">모집 중인 유사한 프로젝트</h2>
      <div class="mt-4">
        <!-- @vue-expect-error -->
        <normal-project-list :p-list="detail?.relative_projects" type="project" />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { GameDetail } from 'src/types/gamepack/game-model';
import { ProjectDetail, SimilarProjectListType } from 'src/types/gamepack/project-model';

type Props = {
  detail?: GameDetail;
  similarProjectList?: SimilarProjectListType;
};
const props = defineProps<Props>();
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
      <div class="mt-4">
        <game-shot-movie />
      </div>
    </section>
    <section class="mt-[40px]">
      <h2 class="text-[20px] font-semibold">프로젝트 참여 멤버</h2>
      <div class="mt-4">
        <g-p-member-list :maker-list="detail?.mkr_list" />
      </div>
    </section>
    <section class="mt-[40px]">
      <h2 class="text-[20px] font-semibold">요구 사항</h2>
      <div class="mt-4">
        <p>{{ detail?.sys_nec_desc ?? '없음' }}</p>
      </div>
    </section>

    <section class="my-[40px]">
      <h2 class="text-[20px] font-semibold">유사한 게임</h2>
      <div class="mt-4">
        <normal-project-list :p-list="similarProjectList" type="game" />
      </div>
    </section>
  </div>
</template>

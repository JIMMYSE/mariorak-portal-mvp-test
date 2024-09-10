<script lang="ts" setup>
import { RecommendedProjectListType } from 'src/types/gamepack/project-model';
import GPbadge from '../GPbadge.vue';

type Props = {
  toList?: string;
  gpList: RecommendedProjectListType[] | undefined;
};
const props = defineProps<Props>();

const barStyle = {
  // 스크롤바 안보이게
  opacity: 1,
};

const thumbStyle = {
  // 스크롤바 색상
  backgroundColor: 'transparent',
};
</script>
<template>
  <div>
    <div class="pl-6">
      <q-scroll-area
        style="height: 350px"
        :bar-style="barStyle"
        :thumb-style="thumbStyle"
      >
        <div class="row no-wrap">
          <div
            class="game-card q-mr-md relative cursor-pointer"
            v-for="p in gpList"
            :key="p.prj_id"
            @click="goTo(`/game-pack/project/${p.prj_id}`)"
          >
            <!-- INFO :: 상태 값에 따라서 q-icon 의 name 을 동적으로 지정하기 -->
            <div class="absolute z-10 w-[50px] text-sm top-2 left-2">
              <GPbadge :cd="p.prj_stt_cd" section-cd="PRJ_STT" />
            </div>
            <c-img
              :src="p.thmn_file.convert_addr"
              class="rounded-xl h-[138px] w-[246px]"
            />
            <div class="absolute top-2 right-2">
              <c-icon :name="'icon_heart'" size="18px" />
            </div>
            <div class="game-info q-mt-sm">
              <div class="text-caption q-mb-xs mt-[16px]">
                <span
                  class="badge font-medium"
                  v-for="badge in p.tag_list"
                  :key="badge"
                  >{{ badge }}</span
                >
              </div>
              <card-info :height="'84px'" :desc="p.desc" :title="p.title" />
            </div>
            <div class="w-full mt-[20px]">
              <div class="flex justify-between items-center mb-1">
                <span class="text-base font-medium leading-tight text-[#222222]"
                  >프로젝트 진행률</span
                >
                <span class="text-[#056bf1] text-2xl font-semibold"
                  >{{ p.progress_percent }}%</span
                >
              </div>
              <!-- 응답값에 따라 style width 값 조절 -->
              <div class="w-full bg-[#DBDBDB] rounded-full h-0.5">
                <div
                  class="bg-[#056BF1] h-0.5 rounded-full"
                  :style="`width: ${p.progress_percent}%`"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </q-scroll-area>
    </div>
    <div class="text-center"></div>
  </div>
</template>
<style scoped>
.game-card {
  width: 246px;
  overflow: hidden;
}

.game-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.game-info {
  color: white;
}

.badge {
  background-color: #f0f0f0;
  padding: 2px 6px;
  border-radius: 4px;
  margin-right: 5px;
  color: #222;
}
</style>

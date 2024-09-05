<script lang="ts" setup>
import {
  RecentProjectListType,
  SimilarProjectListType,
} from 'src/types/gamepack/project-model';

type Props = {
  pList: RecentProjectListType[] | SimilarProjectListType | undefined;
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
    <q-scroll-area
      v-if="pList && pList?.length > 0"
      style="height: 170px"
      :bar-style="barStyle"
      :thumb-style="thumbStyle"
    >
      <div class="row no-wrap">
        <div class="game-card q-mr-md" v-for="p in pList" :key="p.prj_id">
          <c-img
            :src="p.thmn_file.convert_addr"
            width="100%"
            class="rounded-xl game-image"
          />

          <div class="game-info q-mt-sm">
            <p
              class="text-[#222222] text-[16px] font-semibold leading-snug mt-[8px]"
            >
              {{ p.title }}
            </p>
            <p class="text-[#696969] text-xs font-normal leading-none">
              {{ formatDate(p?.created_at) }}
            </p>
          </div>
        </div>
      </div>
    </q-scroll-area>
    <div class="text-center text-[#767676] text-base font-normal" v-else>
      아직 확인한 프로젝트가 없습니다.
      <br />
      추천 프로젝트를 확인해보세요.
    </div>
  </div>
</template>
<style scoped>
.game-card {
  width: 185px;
  overflow: hidden;
}

.game-image {
  width: 100%;
  height: 120px;
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

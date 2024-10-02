<script lang="ts" setup>
import { RecentProjectListType, SimilarProjectListType } from 'src/types/gamepack/project-model';
import { barStyle, thumbStyle } from 'src/utils/style-variable';
type Props = {
  pList: RecentProjectListType[] | SimilarProjectListType | undefined;
  type: 'game' | 'project';
};
const props = defineProps<Props>();

const goToDetailPage = (gp: any) => {
  const id = gp?.prdc_id ?? gp.prj_id;
  if (props.type === 'game') {
    goTo(`/game-pack/game/${id}`);
  } else {
    goTo(`/game-pack/project/${id}`);
  }
};
</script>
<template>
  <div>
    <div v-if="pList && pList?.length > 0">
      <q-scroll-area style="height: 200px" :bar-style="barStyle" :thumb-style="thumbStyle">
        <div class="row no-wrap pl-6">
          <div class="game-card q-mr-md" v-for="p in pList" :key="p.prj_id" @click="goToDetailPage(p)">
            <c-img :src="p.thmn_file.convert_addr" width="100%" class="rounded-xl game-image" />

            <div class="game-info q-mt-sm">
              <p class="h-[50px] text-[#222222] text-[16px] font-semibold leading-snug mt-[8px]">
                {{ p.title }}
              </p>
              <p class="text-[#696969] text-xs font-normal leading-none">
                {{ formatDate(p?.created_at) }}
              </p>
            </div>
          </div>
        </div>
      </q-scroll-area>
    </div>
    <div class="text-center text-[#767676] text-base font-normal mt-[10px]" v-else>
      아직 확인한 프로젝트가 없어요.
      <br />
      추천 프로젝트를 확인해 볼까요?
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

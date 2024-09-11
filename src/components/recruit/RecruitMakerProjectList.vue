<script lang="ts" setup>
const props = defineProps<{
  pList: {
    prj_id: number;
    thmn_url: string;
    title: string;
    end_dttm: string;
    prj_stt_cd: string;
  }[];
}>();

const goToDetailPage = (gp: any) => {
  if (gp.prj_stt_cd !== '50') {
    goTo(`/game-pack/project/${gp.prj_id}`);
  } else {
    goTo(`/game-pack/game/${gp.prj_id}`);
  }
};
</script>
<template>
  <div>
    <div v-if="pList && pList?.length > 0">
      <q-scroll-area
        style="height: 170px"
        :bar-style="{
          // 스크롤바 안보이게
          opacity: 1,
        }"
        :thumb-style="{
          // 스크롤바 색상
          backgroundColor: 'transparent',
        }"
      >
        <div class="row no-wrap">
          <div class="game-card q-mr-md" v-for="p in pList" :key="p.prj_id" @click="goToDetailPage(p)">
            <c-img :src="p.thmn_url" width="100%" class="rounded-xl game-image" />

            <div class="game-info q-mt-sm">
              <p class="text-[#222222] text-[16px] font-semibold leading-snug mt-[8px]">
                {{ p.title }}
              </p>
              <p class="text-[#696969] text-xs font-normal leading-none">
                {{ formatDate(p?.end_dttm) }}
              </p>
            </div>
          </div>
        </div>
      </q-scroll-area>
    </div>
    <div class="text-center text-[#767676] text-base font-normal mt-[10px]" v-else>
      아직 참여한 프로젝트가 없어요.
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

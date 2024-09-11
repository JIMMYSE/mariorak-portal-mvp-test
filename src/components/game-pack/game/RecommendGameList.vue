<script lang="ts" setup>
import { RecommendedGameListType } from 'src/types/gamepack/game-model';

type Props = {
  toList?: string;
  gList: RecommendedGameListType[] | undefined;
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

const gameInfo = {
  badge: ['어드벤쳐', 'Mobile', 'RPG'],
  title: '[새롭게 돌아온] KINGDOM the blood 킹덤 더 블러드',
  description:
    'game의 새로운 시작을 소개합니다 game의 새로운 신작을 소개합니다',
};
</script>
<template>
  <div>
    <div class="pl-6">
      <q-scroll-area
        style="height: 260px"
        :bar-style="barStyle"
        :thumb-style="thumbStyle"
      >
        <div class="row no-wrap">
          <div
            class="game-card q-mr-md"
            v-for="g in gList"
            :key="g.game_id"
            @click="goTo(`/game-pack/game/${g.game_id}`)"
          >
            <c-img
              :src="g.thmn_file.convert_addr"
              class="rounded-xl h-[138px]"
            />
            <div class="game-info q-mt-sm">
              <div class="text-caption q-mb-xs mt-[16px]">
                <span
                  class="badge font-medium"
                  v-for="badge in g.tag_list"
                  :key="badge"
                  >{{ badge }}</span
                >
              </div>
              <card-info :height="'84px'" :desc="g.desc" :title="g.title" />
            </div>
          </div>
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>
<style scoped>
.game-card {
  width: 234px;
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

<script lang="ts" setup>
// type Props = {
//
// };
// const props = defineProps<Props>();

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
    <q-scroll-area
      style="height: 320px"
      :bar-style="barStyle"
      :thumb-style="thumbStyle"
    >
      <div class="row no-wrap">
        <div
          class="game-card q-mr-md"
          v-for="n in 5"
          :key="n"
          @click="goTo('/game-pack/game/1')"
        >
          <q-img src="/images/dummy/game_dummy.svg" width="100%" />
          <div class="game-info q-mt-sm">
            <div class="text-caption q-mb-xs mt-[16px]">
              <span
                class="badge font-medium"
                v-for="badge in gameInfo.badge"
                :key="badge"
                >{{ badge }}</span
              >
            </div>
            <p
              class="text-[#222222] text-[16px] font-semibold leading-snug mt-[8px]"
            >
              {{ gameInfo.title }}
            </p>
            <p class="text-[#696969] text-xs font-normal leading-4 mt-[6px]">
              {{ gameInfo.description }}
            </p>
          </div>
        </div>
      </div>
    </q-scroll-area>
    <div class="text-center"></div>
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

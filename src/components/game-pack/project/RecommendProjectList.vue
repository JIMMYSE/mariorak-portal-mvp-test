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
        <div class="game-card q-mr-md" v-for="n in 5" :key="n">
          <!-- INFO :: 상태 값에 따라서 q-icon 의 name 을 동적으로 지정하기 -->
          <q-icon
            name="img:/icons/icon_in_progress.svg"
            size="50px"
            class="absolute z-10 ml-[13px]"
          />
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
          <div class="w-full mt-[20px]">
            <div class="flex justify-between items-center mb-1">
              <span class="text-base font-medium leading-tight text-[#222222]"
                >프로젝트 진행률</span
              >
              <span class="text-[#056bf1] text-2xl font-semibold">80%</span>
            </div>
            <!-- 응답값에 따라 style width 값 조절 -->
            <div class="w-full bg-[#DBDBDB] rounded-full h-0.5">
              <div
                class="bg-[#056BF1] h-0.5 rounded-full"
                style="width: 80%"
              ></div>
            </div>
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

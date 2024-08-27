<script lang="ts" setup>
const like = ref(false);

// const onLikeProject = () => {
//   like.value = !like.value;
// };

const gameInfo = {
  badge: ['어드벤쳐', 'Mobile', 'RPG'],
  title: '[새롭게 돌아온] KINGDOM the blood 킹덤 더 블러드',
  description:
    'game의 새로운 시작을 소개합니다 game의 새로운 신작을 소개합니다',
};
</script>
<template>
  <q-page>
    <section>
      <div class="h-[210px] w-full">
        <q-icon
          name="img:/icons/icon_in_progress.svg"
          size="50px"
          class="absolute z-10 ml-[13px]"
        />
        <!-- <c-icon
          name="icon_heart_btn"
          size="20px"
          :active="like"
          active-color="#EA2E2E"
          class="absolute z-10 mr-[13px]"
        /> -->
        <q-img src="/images/dummy/game_detail_dummy.svg" width="100%" />
      </div>
    </section>
    <section class="px-6">
      <div>
        <div class="text-caption q-mb-xs mt-[16px]">
          <span
            class="badge text-[10px] font-medium"
            v-for="badge in gameInfo.badge"
            :key="badge"
            >{{ badge }}</span
          >
        </div>
        <p class="text-[#222222] text-xl font-semibold leading-7 mt-[8px]">
          {{ gameInfo.title }}
        </p>
        <div class="flex items-center mt-2">
          <q-icon name="img:/icons/icon_heart_red.svg" size="15px" />
          <span class="text-[#222222] text-xs font-medium leading-none ml-[4px]"
            >264명</span
          >
        </div>
        <div class="space-y-2 mt-[20px]">
          <div class="flex justify-between">
            <span class="text-[#b5b5b5] text-xs font-semibold leading-none"
              >프로젝트 매니저</span
            >
            <span class="text-[#222222] text-sm font-normal leading-tight"
              >가나다라마바사</span
            >
          </div>
          <div class="flex justify-between">
            <span class="text-[#b5b5b5] text-xs font-semibold leading-none"
              >프로젝트 시작일</span
            >
            <span class="text-[#222222] text-sm font-normal leading-tight"
              >2024.02.02</span
            >
          </div>
          <div class="flex justify-between">
            <span class="text-[#b5b5b5] text-xs font-semibold leading-none"
              >마지막 업데이트</span
            >
            <span class="text-[#222222] text-sm font-normal leading-tight"
              >2024.02.02</span
            >
          </div>
          <div class="flex justify-between">
            <span class="text-[#b5b5b5] text-xs font-semibold leading-none"
              >등록일</span
            >
            <span class="text-[#222222] text-sm font-normal leading-tight"
              >2024.02.02</span
            >
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>
<style lang="scss" scoped></style>

<script lang="ts" setup>
const searchTab = ref(1);

const searchTabList = [
  {
    label: '전체',
    id: 1,
  },
  {
    label: '롤플레잉',
    id: 2,
  },
  {
    label: '전략',
    id: 3,
  },
  {
    label: '협동',
    id: 4,
  },
  {
    label: '오픈월드',
    id: 5,
  },
  {
    label: '액션',
    id: 6,
  },
  {
    label: '어드벤쳐',
    id: 7,
  },
  {
    label: '시뮬레이션',
    id: 8,
  },
  {
    label: '스포츠',
    id: 9,
  },
  {
    label: '레이싱',
    id: 10,
  },
  {
    label: '퍼즐',
    id: 11,
  },
  {
    label: '호러',
    id: 12,
  },
  {
    label: '샌드박스',
    id: 13,
  },
  {
    label: '슈팅',
    id: 14,
  },
  {
    label: 'FPS',
    id: 15,
  },
];
const searchSort = ref('latest');
const options = [
  {
    label: '최신순',
    value: 'latest',
  },
  {
    label: '인기순',
    value: 'popular',
  },
];

const info = {
  badge: ['슈', '슈', 'ㅁㄴ', 'ㅁㄴㅇㄹ', 'ㅁㄴㅇㄹ'],
  title: '[새롭게 돌아온] KINGDOM the blood 킹덤 더 블러드',
  description:
    'game의 새로운 시작을 소개합니다 game의 새로운 신작을 소개합니다',
  status: 13,
  like: 29,
};
</script>
<template>
  <q-tabs v-model="searchTab" dense class="pl-6">
    <q-tab
      v-for="tab in searchTabList"
      :key="tab.id"
      :name="tab.id"
      :label="tab.label"
    />
  </q-tabs>
  <div class="px-6">
    <div class="grid gap-1.5 mt-1">
      <c-search-input name="keyword" />
    </div>
    <c-select
      v-model="searchSort"
      :options="options"
      map-options
      borderless
      class="w-[80px]"
      dense
    />
  </div>
  <div class="px-6">
    <search-g-p-item
      :badge="info.badge"
      :title="info.title"
      :description="info.description"
      :status="info.status"
      :like="info.like"
    />
  </div>
  <div class="flex justify-center">
    <c-btn
      class="enter_btn rounded-[30px] text-primary font-semibold text-sm py-3 pl-10 pr-[30px] mt-[23px]"
      outline
      >더보기
      <c-icon name="down_arrow" size="18px" :color="'#056BF1'" :fill="false" />
    </c-btn>
  </div>
</template>

<style lang="scss">
.q-tab .q-tab__label {
  font-size: 16px;
  color: #767676;
  font-weight: 500;
}
.q-tab {
  padding: 0;
  margin-right: 16px;
}
</style>

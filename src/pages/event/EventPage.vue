<!-- 메인 > 이벤트 -->

<script lang="ts" setup>
const { data: shortcutData } = useShortcutListByAreaCd({
  shortcutAreaCd: 'C',
});
</script>
<template>
  <q-page class="px-6 pt-[23px] bg-grey">
    <!-- title -->
    <p class="font-medium text-[13px] text-secondary">
      메타버스 공간에서 체험하는 병영생활
    </p>

    <router-link
      v-for="item in shortcutData?.rows"
      :key="item.id"
      :to="{ name: 'shortcut-detail', params: { id: item.id } }"
    >
      <q-card flat class="mt-4 px-[15px] pt-[17px] h-[100px] relative">
        <h3 class="font-medium text-[15px] text-primary">
          {{ item.title }}
        </h3>
        <p class="text-sm text-grey-4 font-pretendard whitespace-pre-wrap">
          {{ iconList.find((o) => o.title === item.title)?.content ?? '' }}
        </p>
        <q-icon
          class="absolute right-0 bottom-0"
          :name="`img:/icons/${
            iconList.find((o) => o.title === item.title)?.icon ?? ''
          }`"
          size="85px"
        />
      </q-card>
    </router-link>
  </q-page>
</template>

<script lang="ts">
const iconList = ref([
  {
    title: '입영 상담실',
    content: '공군에서 운영중인 상담실을\n체험해 보세요.',
    icon: 'event_02.svg',
    // to: 'counseling-room',
  },
  {
    title: '모병 설명회',
    content: '공군에서 진행하는 모병설명회에\n참여해 보세요.',
    icon: 'event_01.svg',
  },
  {
    title: '입소식 체험',
    content: '공군 입소 상황을 메타버스 공간\n에서 체험해 보세요.',
    icon: 'event_03.svg',
  },
  {
    title: '점호 체험',
    content: '공군에서의 점호 상황을 체험해\n보세요.',
    icon: 'event_04.svg',
  },
  {
    title: '배식 체험',
    content: '공군에서의 배식 상황을 체험해\n보세요.',
    icon: 'event_05.svg',
  },
]);
</script>

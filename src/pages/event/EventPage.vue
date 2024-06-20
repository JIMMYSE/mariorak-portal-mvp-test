<script lang="ts" setup>
import { ref } from 'vue';
const counseling = ref({
  id: 100,
  title: '입영 상담실',
  content: '공군에서 운영중인 상담실을<br/>체험해 보세요.',
  icon: 'event_01.svg',
  to: 'counseling-room',
});
const data = ref([
  {
    id: 4,
    title: '모병 설명회',
    content: '공군에서 진행하는 모병설명회에<br/>참여해 보세요.',
    icon: 'event_02.svg',
  },
  {
    id: 5,
    title: '입소식 체험',
    content: '공군 입소 상황을 메타버스 공간<br/>에서 체험해 보세요.',
    icon: 'event_03.svg',
  },
  {
    id: 6,
    title: '점호 체험',
    content: '공군에서의 점호 상황을 체험해<br/>보세요.',
    icon: 'event_04.svg',
  },
  {
    id: 7,
    title: '배식 체험',
    content: '공군에서의 배식 상황을 체험해<br/>보세요.',
    icon: 'event_05.svg',
  },
]);
</script>
<template>
  <q-page class="px-6 pt-[23px] bg-grey">
    <!-- title -->
    <p class="font-medium text-[13px] text-secondary">
      메타버스 공간에서 체험하는 병영생활
    </p>
    <!-- contents -->
    <!-- 입영 상담실 -->
    <router-link :to="{ name: counseling.to }">
      <q-card flat class="mt-4 px-[15px] pt-[17px] h-[100px] relative">
        <h3 class="font-medium text-[15px] text-primary">
          {{ counseling.title }}
        </h3>
        <p
          class="text-sm text-grey-4 font-pretendard"
          v-html="counseling.content"
        ></p>
        <q-icon
          :name="`img:/src/assets/icons/${counseling.icon}`"
          size="85px"
          class="absolute right-0 bottom-0"
        ></q-icon>
      </q-card>
    </router-link>
    <!-- 나머지 -->
    <router-link
      v-for="item in data"
      :key="item.id"
      :to="{ name: 'metaverse-detail', params: { id: item.id } }"
    >
      <q-card flat class="mt-4 px-[15px] pt-[17px] h-[100px] relative">
        <h3 class="font-medium text-[15px] text-primary">
          {{ item.title }}
        </h3>
        <p
          class="text-sm text-grey-4 font-pretendard"
          v-html="item.content"
        ></p>
        <q-icon
          :name="`img:/src/assets/icons/${item.icon}`"
          size="85px"
          class="absolute right-0 bottom-0"
        ></q-icon>
      </q-card>
    </router-link>
  </q-page>
</template>

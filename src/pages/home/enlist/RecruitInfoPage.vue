<script lang="ts" setup>
import { ref } from 'vue';
type Menu = {
  id: number;
  title: string;
  content: string;
  mandatoryItems: string;
  optionalItems: string;
  prohibitedItems: string;
};

const menu = ref<Menu[]>([
  {
    id: 1,
    title: '장교',
    content: '장교 내용',
    mandatoryItems: `
        지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능
        품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목
        입니다.`,
    optionalItems: `
      지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능
      품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목
      입니다.`,
    prohibitedItems: `
      지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능
      품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목
      입니다.`,
  },
  {
    id: 2,
    title: '부사관',
    content: '부사관 내용',
    mandatoryItems: `
        지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능
        품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목
        입니다.`,
    optionalItems: `
      지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능
      품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목
      입니다.`,
    prohibitedItems: `
      지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능
      품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목
      입니다.`,
  },
  {
    id: 3,
    title: '병사',
    content: '병사 내용',
    mandatoryItems: `
        지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능
        품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목
        입니다.`,
    optionalItems: `
      지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능
      품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목
      입니다.`,
    prohibitedItems: `
      지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능
      품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목
      입니다.`,
  },
  {
    id: 4,
    title: '예비역 재임용/항공통제 준사관',
    content: '병사 내용',
    mandatoryItems: `
        지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능
        품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목
        입니다.`,
    optionalItems: `
      지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능
      품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목
      입니다.`,
    prohibitedItems: `
      지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능
      품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목
      입니다.`,
  },
]);

const selectedItem = ref<Menu>(menu.value[0]);
</script>

<template>
  <q-page class="">
    <q-scroll-area class="max-w-screen h-[70px]" :visible="false">
      <div class="w-full px-2 mt-[15px] flex flex-nowrap gap-[6px]">
        <q-btn
          v-for="item in menu"
          :key="item.id"
          rounded
          :visible="false"
          :outline="selectedItem !== item"
          :color="selectedItem === item ? 'primary' : 'grey-1'"
          unelevated
          no-wrap
          size="md"
          class="h-10 min-w-[78px]"
          :text-color="selectedItem === item ? 'white' : 'black'"
          @click="selectedItem = item"
        >
          {{ item.title }}
        </q-btn>
      </div>
    </q-scroll-area>

    <section class="mt-[25px]">
      <div class="px-4">
        <a-subtitle>✋ 장교소개</a-subtitle>
        <a-body-text> 공군의 장교 과정에 대해서 알려드립니다. </a-body-text>
      </div>
      <q-img src="~assets/images/recruitment_guide_1.png" class="mt-[25px]" />
    </section>

    <section class="mt-4">
      <div class="px-4 mb-3">
        <a-subtitle>공군사관학교</a-subtitle>
        <a-body-text>
          공군 장교의 정규 양성기관인 공군사관학교에서 4년간 군사교육 후
          장기복무 장교로 임관하는 제도
        </a-body-text>
      </div>
      <q-img src="~assets/images/recruitment_guide_2.png" class="mt-[25px]" />
    </section>
  </q-page>
</template>

<style lang="scss" scoped>
.level-btn:hover {
  background-color: #196af5;
  color: #fff;
  border: none;
}
</style>

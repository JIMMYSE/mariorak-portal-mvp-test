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
]);

const selectedItem = ref<Menu | null>(null);
const boxClass =
  'rounded-[5px] border border-grey-1 mt-[10px] p-[15px]' +
  ' text-base font-pretendard text-grey-3 leading-5 h-[142px]';
</script>

<template>
  <q-page class="px-2 flex flex-col">
    <div class="btn-group px-2 mt-[15px] flex gap-[6px]">
      <q-btn
        v-for="item in menu"
        :key="item.id"
        rounded
        :outline="selectedItem !== item"
        :color="selectedItem === item ? 'primary' : 'grey-1'"
        unelevated
        size="md"
        class="q-btn--outline-grey h-10 flex-1"
        :text-color="selectedItem === item ? 'white' : 'black'"
        @click="selectedItem = item"
      >
        {{ item.title }}
      </q-btn>
      <q-btn
        rounded
        :outline="selectedItem != null"
        :color="!selectedItem ? 'primary' : 'grey-1'"
        unelevated
        size="md"
        no-wrap
        class="h-10 flex-1"
        :text-color="!selectedItem ? 'white' : 'black'"
        @click="selectedItem = null"
        >유의사항</q-btn
      >
    </div>

    <div v-if="selectedItem != null" class="px-4">
      <section class="mt-10">
        <a-subtitle> 🚨 필수 지참 목록 </a-subtitle>
        <div :class="boxClass">
          {{ selectedItem.mandatoryItems }}
        </div>
      </section>

      <section class="mt-5">
        <a-subtitle> 😃 지참 가능 품목 </a-subtitle>
        <div :class="boxClass">
          {{ selectedItem.optionalItems }}
        </div>
      </section>

      <section class="mt-5">
        <a-subtitle> ⛔ 지참 불가 항목 </a-subtitle>
        <div :class="boxClass">
          {{ selectedItem.prohibitedItems }}
        </div>
      </section>
    </div>

    <div
      v-else
      class="flex-1 flex justify-center items-center rounded-[5px] border border-grey-1 mt-10 text-center text-grey-3 mb-8"
    >
      유의사항 이미지 영역
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.level-btn:hover {
  background-color: #196af5;
  color: #fff;
  border: none;
}
</style>

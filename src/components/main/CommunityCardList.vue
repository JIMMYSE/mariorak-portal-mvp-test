<script setup lang="ts">
import { title } from 'process';

const dummyData = [
  {
    title: '[게임공지] 게임 관련 안내사항',
    date: '2024.02.04',
    nickname: '김민지',
    cmt_cnt: 25,
  },
];
</script>
<template>
  <ul class="custom-list">
    <li v-for="data in dummyData" :key="data.title">
      <div class="text-[#222222] text-base font-medium font-['Pretendard'] leading-snug">
        {{ data.title }}
      </div>

      <div class="flex justify-between">
        <div class="text-[#767676] text-sm font-normal font-['Pretendard'] leading-tight">
          {{ data.date }}{{ data.cmt_cnt }}
        </div>
        <div class="flex items-center">
          <q-icon :name="`img:/icons/icon_comment.svg`" size="20px" class="mr-1" />
          <div class="text-[#767676] text-sm font-normal font-['Pretendard'] leading-tight pt-[1px]">
            {{ data.cmt_cnt }}
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
<style lang="scss" scoped>
.custom-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.custom-list li {
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.custom-list li:not(:last-child) {
  border-bottom: 1px solid #f0f0f0;
}

.custom-list li:last-child {
  border-bottom: none;
}
</style>

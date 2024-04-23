<script lang="ts" setup>
import { enterCounseling } from 'src/assets/data/dummyData';
import { ref } from 'vue';

const data = ref([...enterCounseling]);
const arrow =
  "after:absolute after:content-[''] after:size-[30px] after:bg-[url('/src/assets/icons/icon_arrow_event.svg')] after:bg-cover after:bg-no-repeat after:right-2 after:top-[35%]";
</script>

<template>
  <q-page class="px-6 pt-[30px] pb-[35px] bg-grey">
    <h1 class="text-[18px] font-medium">입영 상담실 선택</h1>
    <p class="mt-2 font-pretendard text-base leading-5 text-grey-4">
      상담실 운영에 대한 안내사항, 참여 방법에 대한 안내사항이 표시됩니다.
      상담실을 선택해 주세요.
    </p>

    <div class="mt-6">
      <q-card
        v-for="item in data"
        :key="item.id"
        flat
        class="mt-[10px] relative w-full h-[100px] pt-[22px] pl-[15px]"
        :class="item.active ? 'bg-white ' + arrow : 'bg-grey-1'"
      >
        <h2
          class="font-medium text-primary"
          :class="item.active ? 'font-medium text-primary' : 'text-grey-4'"
        >
          {{ item.title }}
        </h2>
        <p
          v-html="item.content"
          class="text-sm font-pretendard text-grey-3 leading-[18px]"
        ></p>
      </q-card>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>

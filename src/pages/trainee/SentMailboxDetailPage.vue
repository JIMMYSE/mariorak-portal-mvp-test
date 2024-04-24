<!-- 보낸 편지함 상세 -->

<script lang="ts" setup>
import { sendLetterList } from 'src/assets/data/dummyData';
// import { Id } from 'src/services/common/api-model';
import { formatDate } from 'src/utils/date-util';
import { filterHtml } from 'src/utils/html-filter';
import { ref } from 'vue';

const data = ref([...sendLetterList]);

// 해결안된 부분

// const props = defineProps<{
//   id: Id;
// }>();
// const detailId = Number(props.id);
// const data = ref(sendLetterList.find((item) => item.id === detailId));
</script>

<template>
  <q-page class="flex flex-col px-6 pt-5">
    <!-- Title -->
    <h4 class="text-base font-medium">{{ data[0].letter_nm }}</h4>
    <div
      class="mt-[10px] text-sm text-grey-3 font-pretendard flex items-center"
    >
      <span> {{ formatDate(data[0].crt_dt) }}</span>
      ㅣ
      <span :class="data[0].delivered ? 'visible' : 'hidden'">전달완료</span>
    </div>
    <!-- line -->
    <div class="mt-2 inset-x-6 h-[1px] border-b-[1px] border-b-[#E6E6E6]"></div>
    <!-- Content -->
    <div
      class="mt-5 text-pretendard text-sm text-grey-5"
      v-html="filterHtml(data[0].letter_cn)"
    ></div>
    <div class="flex-1"></div>
    <!-- Button -->
    <router-link
      :to="{ name: 'sent-mailbox' }"
      class="flex justify-center mb-[80px]"
    >
      <q-btn
        color="primary"
        outline
        unelevated
        size="md"
        class="w-[165px] h-[50px] !text-[15px]"
      >
        목록으로
      </q-btn>
    </router-link>
  </q-page>
</template>

<style lang="scss" scoped></style>

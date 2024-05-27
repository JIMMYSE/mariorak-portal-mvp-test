<!-- 공지사항 > 상세 -->

<script setup lang="ts">
import { Id } from 'src/services/common/api-model';
import { formatDate } from 'src/utils/date-util';
import { filterHtml } from 'src/utils/html-filter';

const props = defineProps<{
  id: Id;
}>();

// 상세 조회
const { data } = useNoticeDetail(props.id);
</script>

<template>
  <q-page class="flex flex-col">
    <q-card flat square class="px-2 min-h-full">
      <q-card-section class="py-5 pb-[10px]">
        <h3 class="text-body font-medium">{{ data?.ntc_nm }}</h3>
        <div
          class="mt-[10px] h-4 text-body2 leading-4 text-info font-pretendard flex items-center gap-2"
        >
          <span>교육훈련처</span>
          |
          <span> {{ formatDate(data?.crt_dt) }}</span>
        </div>
        <!-- line -->
        <div
          class="absolute inset-x-4 bottom-0 h-[1px] border-b-[1px] border-b-[#E6E6E6]"
        />
      </q-card-section>
      <q-card-section v-if="data?.file" class="text-primary">
        <a
          href="https://naver.com"
          target="_blank"
          class="flex items-center gap-2 font-pretendard text-body2 underline"
        >
          <a-svg name="file" class="w-[9px] h-3" />
          <span>{{ data?.file }} [다운로드]</span>
        </a>
        <!-- line -->
        <div
          class="absolute inset-x-4 bottom-0 h-[1px] border-b-[1px] border-b-[#E6E6E6]"
        />
      </q-card-section>
      <q-card-section class="mt-[14px] flex-1 grow">
        <div
          class="text-black font-pretendard text-body2"
          v-html="filterHtml(data?.ntc_cn)"
        ></div>
      </q-card-section>
    </q-card>
    <div class="flex-1"></div>
    <div class="flex justify-center mt-10 mb-20">
      <q-btn
        outline
        color="primary"
        class="w-[165px] h-[50px]"
        @click="$router.go(-1)"
        >목록으로</q-btn
      >
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>

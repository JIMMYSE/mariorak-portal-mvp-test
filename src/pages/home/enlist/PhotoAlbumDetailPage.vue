<!-- 사진보기 상세 -->

<script setup lang="ts">
import { photoAlbumList } from 'src/assets/data/dummyData';
import { Id } from 'src/services/common/api-model';
import { formatDate } from 'src/utils/date-util';
import { filterHtml } from 'src/utils/html-filter';
import { ref } from 'vue';

const props = defineProps<{
  id: Id;
}>();

const detailId = Number(props.id);

const data = ref(photoAlbumList.find((item) => item.id === detailId));
</script>

<template>
  <q-card flat square class="px-2 min-h-full">
    <q-card-section class="py-5 pb-[10px]">
      <h3 class="text-body font-medium">{{ data?.ntc_nm }}</h3>
      <div
        class="mt-[10px] h-4 text-body2 leading-4 text-info font-pretendard flex items-center gap-2"
      >
        <span>교육훈련처</span>
        |
        <span> {{ formatDate(data.crt_dt) }}</span>
      </div>
      <!-- line -->
      <div
        class="absolute inset-x-4 bottom-0 h-[1px] border-b-[1px] border-b-[#E6E6E6]"
      ></div>
    </q-card-section>
    <q-card-section v-if="data.file" class="text-primary">
      <a
        href="https://naver.com"
        target="_blank"
        class="flex items-center gap-2 font-pretendard text-body2 underline"
      >
        <a-svg name="file" class="w-[9px] h-3" />
        <span>{{ data.file }} [다운로드]</span>
      </a>
      <!-- line -->
      <div
        class="absolute inset-x-4 bottom-0 h-[1px] border-b-[1px] border-b-[#E6E6E6]"
      ></div>
    </q-card-section>
    <q-card-section class="mt-[14px] flex-1 grow">
      <div
        class="text-black font-pretendard text-body2"
        v-html="filterHtml(data?.ntc_cn)"
      ></div>
    </q-card-section>
  </q-card>
  <div class="mb-20 flex justify-center absolute bottom-0 w-full">
    <q-btn
      outline
      color="primary"
      class="w-[165px] h-[50px]"
      @click="$router.go(-1)"
      >목록으로</q-btn
    >
  </div>
</template>

<style lang="scss" scoped></style>

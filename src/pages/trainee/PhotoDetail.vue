<!-- 사진보기 상세 -->

<script setup lang="ts">
import { formatDate } from 'src/utils/date-util';
import { filterHtml } from 'src/utils/html-filter';

const props = defineProps<{
  id: Id;
}>();

// 상세 조회
const { data } = usePhotoDetail(props.id);
</script>

<template>
  <q-card flat square class="px-2 min-h-full">
    <q-card-section class="py-5 pb-[10px]">
      <h3 class="text-body font-medium">{{ data?.title }}</h3>
      <div
        class="mt-[10px] h-4 text-body2 leading-4 text-info font-pretendard flex items-center gap-2"
      >
        <span>교육훈련처</span>
        |
        <span> {{ formatDate(data?.created_at) }}</span>
      </div>
      <!-- line -->
      <div
        class="absolute inset-x-4 bottom-0 h-[1px] border-b-[1px] border-b-[#E6E6E6]"
      ></div>
    </q-card-section>
    <q-card-section
      v-if="data?.files && data?.files.length"
      class="flex flex-col gap-2 font-pretendard text-primary"
    >
      <div v-for="file in data.files" :key="file.id">
        <a
          class="text-body2 underline"
          :href="file.origin_addr"
          :download="file.file_name"
        >
          <a-svg name="file" class="w-[9px] h-3 inline-block mr-1" />
          <span>{{ file.file_name }} [다운로드]</span>
        </a>
      </div>
      <!-- line -->
      <div
        class="absolute inset-x-4 bottom-0 h-[1px] border-b-[1px] border-b-[#E6E6E6]"
      ></div>
    </q-card-section>
    <q-card-section class="mt-[14px] flex-1 grow">
      <div class="text-black font-pretendard text-body2 whitespace-pre-wrap">
        {{ data?.description }}
      </div>
    </q-card-section>
  </q-card>

  <div class="mb-20 flex justify-center absolute bottom-0 w-full">
    <q-btn outline color="primary" class="w-[165px] h-[50px]" @click="goBack()"
      >목록으로</q-btn
    >
  </div>
</template>

<style lang="scss" scoped></style>

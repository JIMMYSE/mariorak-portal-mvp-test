<!-- 공지사항 > 상세 -->

<script setup lang="ts">
import { formatDate } from 'src/utils/date-util';

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
        <h3 class="text-body font-medium">{{ data?.title }}</h3>
        <div
          class="mt-[10px] h-4 text-body2 leading-4 text-info font-pretendard flex items-center gap-2"
        >
          <span>{{ data?.manager_name }}</span>
          |
          <span> {{ formatDate(data?.created_at) }}</span>
        </div>
        <!-- line -->
        <div
          class="absolute inset-x-4 bottom-0 h-[1px] border-b-[1px] border-b-[#E6E6E6]"
        />
      </q-card-section>
      <q-card-section v-if="data?.file" class="text-primary pb-5">
        <a
          :href="data?.file?.origin_addr"
          class="flex items-center gap-2 font-pretendard text-body2 underline"
          :download="data?.file?.file_name"
        >
          <q-icon name="img:/icons/file.svg" class="w-[9px] h-[12px]" />
          <span>{{ data?.file?.file_name }} [다운로드]</span>
        </a>
        <!-- line -->
        <div
          class="absolute inset-x-4 bottom-0 h-[1px] border-b-[1px] border-b-[#E6E6E6]"
        />
      </q-card-section>
      <q-card-section
        class="mt-[14px] flex-1 grow text-black font-pretendard text-body2 whitespace-pre-wrap"
      >
        <div>
          {{ data?.description }}
        </div>
      </q-card-section>
    </q-card>
    <div class="flex-1"></div>
    <div class="flex justify-center mt-10 mb-20">
      <a-btn
        class="w-[165px] h-[50px] text-[15px]"
        :label="$t('label.toList')"
        color="primary"
        outline
        @click="goBack()"
      />
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>

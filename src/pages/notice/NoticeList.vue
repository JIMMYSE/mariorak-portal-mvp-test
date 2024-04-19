<!-- 공지사항 목록 -->

<script setup lang="ts">
import { formatDate } from 'src/utils/date-util';
import { ref } from 'vue';
import { noticeList } from 'src/assets/data/dummyData';
import { computed } from 'vue';
import { useWindowSize } from '@vueuse/core';

// 공지사항
const data = ref([...noticeList]);
const currentPage = ref(1);
const { height } = useWindowSize();
const rowsPerPage = computed(() => Math.floor((height.value - 50 - 54) / 65));
const list = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  const end = currentPage.value * rowsPerPage.value;
  return data.value.slice(start, end);
});
const maxPages = computed(() =>
  Math.ceil(data.value.length / rowsPerPage.value)
);
</script>

<template>
  <q-page class="column">
    <!-- <span v-if="isPending">Loading...</span> -->
    <!-- <span v-else-if="isError">Error: {{ error?.message }}</span> -->
    <!-- <q-card class="text-grey-5 q-mb-lg" flat v-else-if="data"> -->
    <q-list>
      <q-item
        v-for="(item, i) in list"
        :key="`item-${i}`"
        :label="item.ntc_nm"
        clickable
        v-ripple
        class="w-full h-[65px] relative"
        :to="{ name: 'notice-detail', params: { id: item.id } }"
      >
        <q-item-section>
          <h3 class="text-[13px] font-medium line-clamp-1">
            {{ item.ntc_nm }}
          </h3>
          <div
            class="text-caption text-grey-4 font-pretendard flex items-center gap-2"
          >
            <span>교육훈련처</span>
            |
            <span> {{ formatDate(item.crt_dt) }}</span>
            <template v-if="item.file">
              |
              <span>첨부파일</span>
              <q-icon
                name="img:/src/assets/icons/file.svg"
                class="w-[9px] h-3"
              />
            </template>
          </div>
        </q-item-section>
        <div
          class="absolute inset-x-4 bottom-0 h-[1px] border-b-[1px] border-b-[#E6E6E6]"
        />
      </q-item>
    </q-list>
    <div class="column items-center bottom-0 absolute w-full bg-white h-[54px]">
      <q-pagination
        v-model="currentPage"
        :max="maxPages"
        max-pages="7"
        :boundary-numbers="false"
        flat
        class="pagination"
        active-color="secondary"
        active-design="flat"
        color="info"
      />
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
:deep(.q-pagination) {
  .q-btn {
    min-width: 25px !important;
  }
  .q-btn__content {
    font-size: 13px;
  }
}
</style>

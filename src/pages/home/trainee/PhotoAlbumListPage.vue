<!-- 공지사항 목록 -->

<script setup lang="ts">
import { formatDate } from 'src/utils/date-util';
import { ref } from 'vue';
import { photoAlbumList } from 'src/assets/data/dummyData';
import { computed } from 'vue';
import { useWindowSize } from '@vueuse/core';
import { Id } from 'src/services/common/api-model';

type Props = {
  // 훈련병 아이디
  id: Id;
};

const props = defineProps<Props>();

// 공지사항
const data = ref([...photoAlbumList]);
const currentPage = ref(1);
const { height } = useWindowSize();
const rowsPerPage = computed(() =>
  Math.floor((height.value - 50 - 54 - 48) / 65)
);
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
    <q-item class="border-b-4 border-grey-2 mx-4">
      <q-item-section class="text-body2 text-right text-grey-4"
        >신병 1대대 > 신병 849기</q-item-section
      >
    </q-item>
    <q-list>
      <q-item
        v-for="(item, i) in list"
        :key="`item-${i}`"
        :label="item.title"
        clickable
        v-ripple
        class="w-full h-[65px] relative"
        :to="{ name: 'photo-album-detail', params: { id: item.id } }"
      >
        <q-item-section>
          <h3 class="text-[13px] font-medium line-clamp-1">
            {{ item.title }}
          </h3>
          <div
            class="text-caption text-grey-4 font-pretendard flex items-center gap-2"
          >
            <span> {{ formatDate(item.created_at) }}</span>
            |
            <span> {{ item.crt_lc }}</span>
            <template v-if="item.file">
              |
              <span>첨부파일</span>
              <a-svg name="file" class="w-[9px] h-3" />
            </template>
          </div>
        </q-item-section>
        <!-- line -->
        <div
          class="absolute inset-x-4 bottom-0 h-[1px] border-b-[1px] border-b-[#E6E6E6]"
        ></div>
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

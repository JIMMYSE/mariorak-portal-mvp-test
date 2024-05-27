<!-- 공지사항 > 목록 -->

<script setup lang="ts">
import { useNoticeList } from 'src/composables/notice/notice';
import { formatDate } from 'src/utils/date-util';

const { request } = useSearchFilter({
  requestDefault: {
    filters: {
      ntc_type_cd: {
        eq: 'N',
      },
      expsr_yn: {
        eq: 1,
      },
    },
    sort: [{ crt_dt: 'asc' }],
  },
});

const { data: listData } = useNoticeList({
  searchRequest: request,
});
</script>

<template>
  <q-page class="column">
    <q-list>
      <q-item
        v-for="(item, i) in listData?.rows"
        :key="`item-${i}`"
        class="w-full h-[65px] relative"
        :label="item.ntc_nm"
        clickable
        v-ripple
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
              <a-svg name="file" class="w-[9px] h-3" />
            </template>
          </div>
        </q-item-section>
        <!-- line -->
        <div
          class="absolute inset-x-4 bottom-0 h-[1px] border-b-[1px] border-b-[#E6E6E6]"
        />
      </q-item>
    </q-list>

    <a-pagination
      :total-rows="listData?.total"
      :from="request.from"
      @on-change="({ from }) => (request.from = from)"
    />
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

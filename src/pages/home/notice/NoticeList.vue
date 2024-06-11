<!-- 공지사항 > 목록 -->

<script setup lang="ts">
import { formatDate } from 'src/utils/date-util';

const { request } = useSearchFilter({
  requestDefault: {
    filters: {
      categories_cd: {
        eq: '1',
      },
    },
    sort: [{ created_at: 'desc' }],
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
        :key="item.id"
        class="w-full h-[65px] relative"
        clickable
        v-ripple
        :to="{ name: 'notice-detail', params: { id: item.id } }"
      >
        <q-item-section>
          <h3 class="text-[13px] font-medium line-clamp-1">
            {{ item.title }}
          </h3>
          <div
            class="text-caption text-grey-4 font-pretendard flex items-center gap-2 mt-1"
          >
            <span>{{ item.manager_name }}</span>
            |
            <span> {{ formatDate(item.created_at) }}</span>
            <template v-if="item.file_id">
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
      class="absolute bottom-0"
      :total-rows="listData?.total"
      :from="request.from"
      @on-change="({ from }) => (request.from = from)"
    />
  </q-page>
</template>

<script lang="ts"></script>

<style lang="scss" scoped></style>

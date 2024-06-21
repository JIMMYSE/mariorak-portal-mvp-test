<!-- 훈련병 > 사진보기 > 사진 목록 -->

<script setup lang="ts">
import { formatDate } from 'src/utils/date-util';

type Props = {
  id: Id;
};

const props = defineProps<Props>();

const { request } = useSearchFilter({
  requestDefault: {
    filters: {
      educational_battalion_id: {
        eq: Number(props.id),
      },
    },
  },
});

const { data: listData } = usePhotoList({
  searchRequest: request,
});
</script>

<template>
  <q-page class="column">
    <!-- <q-item class="border-b-4 border-grey-2 mx-4">
      <q-item-section class="text-body2 text-right text-grey-4"
        >신병 1대대 > 신병 849기</q-item-section
      >
    </q-item> -->
    <q-list v-if="listData?.rows && listData?.rows.length">
      <q-item
        v-for="item in listData?.rows"
        :key="item.id"
        class="w-full h-[65px] relative"
        :label="item.title"
        clickable
        v-ripple
        :to="{ name: 'trainee-photo-detail', params: { id: item.id } }"
      >
        <q-item-section>
          <h3 class="text-[13px] font-medium line-clamp-1">
            {{ item.title }}
          </h3>
          <div
            class="text-caption text-grey-4 font-pretendard flex items-center gap-2"
          >
            <span> {{ formatDate(item.created_at) }}</span>
            <!-- |
            <span> {{ item.crt_lc }}</span> -->
            <!-- <template v-if="item.file">
              |
              <span>첨부파일</span>
              <a-svg name="file" class="w-[9px] h-3" />
            </template> -->
          </div>
        </q-item-section>
        <!-- line -->
        <div
          class="absolute inset-x-4 bottom-0 h-[1px] border-b-[1px] border-b-[#E6E6E6]"
        ></div>
      </q-item>
    </q-list>
    <div
      v-else
      class="flex justify-center items-center font-pretendard text-body2 text-grey-4"
      style="min-height: inherit"
    >
      <div>데이터가 없습니다.</div>
    </div>

    <a-pagination
      class="absolute bottom-0"
      :total-rows="listData?.total"
      :from="request.from"
      @on-change="({ from }) => (request.from = from)"
    />
  </q-page>
</template>

<style lang="scss" scoped></style>

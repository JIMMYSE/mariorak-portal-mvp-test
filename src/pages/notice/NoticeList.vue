<!-- 공지사항 목록 -->

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useSearchOption } from 'src/composables/common/api';
import {
  useNoticeInfiniteList,
  useNoticeList,
} from 'src/composables/notice/notice';
import { formatDate } from 'src/utils/date-util';
import { computed, ref } from 'vue';
import NoticeDetailPopup from './NoticeDetailPopup.vue';

const $q = useQuasar();

// 탭
const tab = ref('notice');

// 공지사항
const searchOption = useSearchOption({
  filters: {
    ntc_type_cd: {
      in: ['N'],
    },
    expsr_yn: {
      eq: 1,
    },
  },
  size: 10,
});
const {
  data: noticeData,
  error,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
  isPending,
  isError,
  refetch,
} = useNoticeInfiniteList(searchOption);

// FAQ
const faqSearchOption = useSearchOption({
  filters: {
    ntc_type_cd: {
      in: ['F'],
    },
    expsr_yn: {
      eq: 1,
    },
  },
  size: 10,
});
const { data: faqData } = useNoticeList(faqSearchOption);

// QPullToRefresh
const refresh = async (done: any) => {
  await refetch();
  done();
};

const moreButtonText = computed(() => {
  if (isFetchingNextPage.value) {
    return '로딩 중...';
  } else if (hasNextPage.value) {
    return '+ 더보기';
  } else {
    return '+ 더보기'; // 마지막 페이지
  }
});

function openDetailPopup(id: number) {
  $q.dialog({
    component: NoticeDetailPopup,
    componentProps: { id },
    fullWidth: true,
  }).onOk((nextId: number) => {
    if (nextId) {
      openDetailPopup(nextId);
    }
  });
}
</script>

<template>
  <q-page class="column">
    <q-tabs v-model="tab" class="px-6">
      <q-tab name="notice" label="공지사항" class="border-b border-b-primary" />
      <q-tab name="faq" label="FAQ" class="border-b border-b-primary" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="notice" class="p-0">
        <!-- <span v-if="isPending">Loading...</span> -->
        <!-- <span v-else-if="isError">Error: {{ error?.message }}</span> -->
        <!-- <q-card class="text-grey-5 q-mb-lg" flat v-else-if="data"> -->
        <q-card class="text-grey-5 q-mb-lg" flat>
          <q-card-section class="p-2">
            <q-list>
              <template v-for="(page, index) in noticeData?.pages" :key="index">
                <q-item
                  v-for="item in page.data"
                  :key="item.id"
                  :label="item.ntc_nm"
                  clickable
                  v-ripple
                  class="w-full h-[78px]"
                  @click="openDetailPopup(item.id)"
                >
                  <q-item-section>
                    <h3>
                      {{ item.ntc_nm }}
                    </h3>
                    <span class="text-caption text-grey-3">{{
                      formatDate(item.crt_dt)
                    }}</span>
                  </q-item-section>
                  <q-item-section side>
                    <a-btn-icon-enter />
                  </q-item-section>
                </q-item>
              </template>
            </q-list>
          </q-card-section>
          <q-card-section class="w-full text-center">
            <!-- 더보기 버튼 -->
            <q-btn
              class="text-body2 text-grey-3 font-medium"
              color="white"
              unelevated
              :loading="isFetching"
              v-show="hasNextPage"
              @click="() => fetchNextPage()"
              label="더보기"
            >
              <q-icon name="img:/images/icons/btn_list_open.svg"></q-icon>
            </q-btn>
          </q-card-section>
        </q-card>
      </q-tab-panel>
      <q-tab-panel name="faq" class="p-0">
        <q-card class="text-grey-5 q-mb-lg" flat>
          <q-card-section class="p-0">
            <q-list>
              <q-expansion-item
                v-for="item in faqData?.rows"
                :key="item.id"
                group="faq"
                class="px-2"
                expand-icon="img:/images/icons/btn_list_open.svg"
                expanded-icon="img:/images/icons/btn_list_close.svg"
              >
                <template #header>
                  <div class="flex-1 min-h-[78px] flex items-center">
                    <h3>
                      {{ item.ntc_nm }}
                    </h3>
                  </div>
                </template>
                <q-card>
                  <q-card-section
                    class="bg-gray-100 text-grey-4 leading-[24px] font-light"
                  >
                    {{ item.ntc_cn }}
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<style lang="scss" scoped></style>

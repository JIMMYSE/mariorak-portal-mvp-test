<!-- 공지사항 목록 -->

<script setup lang="ts">
import { useSearchRequest } from 'src/composables/common/api';
import { goTo } from 'src/composables/common/app';
import { useNoticeInfiniteList } from 'src/composables/notice/notice';
import { computed, ref } from 'vue';

const searchRequest = useSearchRequest();
const {
  data,
  error,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
  isPending,
  isError,
  refetch,
} = useNoticeInfiniteList(searchRequest);

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

function goToDetail(id: number) {
  goTo('/sample/' + id);
}

const tab = ref('notice');
</script>

<template>
  <QPage class="column">
    <QTabs v-model="tab">
      <QTab name="notice" label="공지사항" />
      <QTab name="faq" label="FAQ" />
    </QTabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="notice">
        <span v-if="isPending">Loading...</span>
        <span v-else-if="isError">Error: {{ error?.message }}</span>
        <QCard class="text-grey-5 q-mb-lg" flat bordered v-else-if="data">
          <QCardSection>
            <QCardSection>
              <ABtn
                class="full-width"
                label="등록(테스트)"
                size="md"
                @click="goTo('/sample/new')"
              />
            </QCardSection>
            <!-- <QPullToRefresh @refresh="refresh"> -->
            <QList>
              <template v-for="(group, index) in data.pages" :key="index">
                <QItem
                  class="justify-between"
                  clickable
                  v-ripple
                  v-for="item in group.data"
                  :key="item.id"
                  style="height: 100px"
                  @click="goToDetail(item.id)"
                >
                  <QItemSection>
                    {{ item.ntc_nm }}
                  </QItemSection>
                  <QItemSection class="col-1" style="width: fit-content">
                    <ABtn
                      label=">"
                      size="lg"
                      flat
                      text-color="grey-5"
                      style="width: fit-content"
                    />
                  </QItemSection>
                </QItem>
              </template>
            </QList>
            <!-- </QPullToRefresh> -->
          </QCardSection>
          <QCardSection>
            <div v-if="isFetching && !isFetchingNextPage">Fetching...</div>
            <ABtn
              class="full-width"
              :label="moreButtonText"
              :disable="!hasNextPage || isFetchingNextPage"
              @click="() => fetchNextPage()"
            >
            </ABtn>
          </QCardSection>
        </QCard>
      </q-tab-panel>
      <q-tab-panel name="faq">
        <span v-if="isPending">Loading...</span>
        <span v-else-if="isError">Error: {{ error?.message }}</span>
        <QCard class="text-grey-5 q-mb-lg" flat bordered v-else-if="data">
          <div v-if="isFetching && !isFetchingNextPage">Fetching...</div>
          <QCardSection>
            <QList>
              <QItem class="justify-between" style="height: 100px">
                <QItemSection> FAQ 제목 </QItemSection>
              </QItem>
              <QItem class="justify-between" style="height: 100px">
                <QItemSection> FAQ 제목 </QItemSection>
              </QItem>
              <QItem class="justify-between" style="height: 100px">
                <QItemSection> FAQ 제목 </QItemSection>
              </QItem>
            </QList>
          </QCardSection>
        </QCard>
      </q-tab-panel>
    </q-tab-panels>
  </QPage>
</template>

<style lang="scss" scoped></style>

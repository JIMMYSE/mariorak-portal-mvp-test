<script lang="ts" setup>
type Props = {
  prjId: number;
  mngrYn: boolean;
};
const props = defineProps<Props>();
const { maker } = useAuthStore();

// form setup
// 검색 필터
const { request } = useSearchFilter({
  requestDefault: {
    filters: {
      prj_id: {
        eq: props.prjId,
      },
    },
    from: 0,
    size: 10,
    sort: [
      {
        created_at: 'desc',
      },
      {
        prdc_news_id: 'desc',
      },
    ],
  },
});
const {
  values: form,
  setFieldValue,
  resetField,
} = useForm<SearchRequest>({
  validationSchema: toTypedSchema(SearchRequestSchema),
  initialValues: request,
});
const queryParam = ref(form);

// fetch
const {
  data: newsList,
  hasNextPage,
  fetchNextPage,
  isFetched,
  refetch,
} = useGameNewsList({
  searchRequest: queryParam,
  queryOption: {
    enabled: true,
  },
  setField: setFieldValue, // TODO 추후 형태 변경필요
});
onMounted(() => {
  refetch();
});

const openWindow = (url: string) => {
  window.open(url, '_blank');
};
</script>
<template>
  <div class="w-full">
    <section class="my-6">
      <div class="flex justify-between items-center">
        <div>
          <p class="text-[#222222] text-xl font-semibold leading-7">게임 뉴스 ({{ newsList?.pages[0].total ?? 0 }})</p>
          <p class="text-[#767676] text-sm font-normal leading-tight mt-[2px]">
            다른 플랫폼에 올라온 게임 뉴스 입니다.
          </p>
        </div>
        <q-btn v-if="mngrYn" size="md" round flat class="flex justify-center items-center" @click="goTo('')">
          <q-icon name="img:/icons/icon_add_plus.svg" size="40px" />
        </q-btn>
      </div>
      <div v-if="isFetched">
        <!-- 반복문 -->
        <g-p-news-content-item
          v-for="news in newsList?.pages.flatMap((item : any) => item.data)"
          :news="news"
          :key="news.prj_id"
          @click="openWindow(news.news_url)"
        />
      </div>
      <div class="flex justify-center" v-if="hasNextPage">
        <c-btn
          class="enter_btn rounded-[30px] text-primary font-semibold text-sm py-3 pl-10 pr-[30px] mt-[23px]"
          outline
          @click="fetchNextPage()"
          >더보기
          <c-icon name="down_arrow" size="18px" :color="'#056BF1'" :fill="false" />
        </c-btn>
      </div>
    </section>
  </div>
</template>

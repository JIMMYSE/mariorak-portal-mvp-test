<script lang="ts" setup>
const props = defineProps({
  seasonId: {
    type: [Number, String],
    required: true,
  },
});

const { request } = useSearchFilter({
  requestDefault: {
    filters: {
      clum_sesn_id: {
        eq: props.seasonId,
      },
    },
    from: 0,
    size: 1,
    sort: [
      {
        created_at: 'asc',
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
} = useColumnNewsList({
  searchRequest: queryParam,
  queryOption: {
    enabled: true,
  },
  setField: setFieldValue, // TODO 추후 형태 변경필요
});
</script>
<template>
  <div>
    <news-project-item
      v-for="news in newsList?.rows"
      :key="news.clum_id"
      :id="news.clum_id"
      :title="news.title"
      :img-src="news.thmn_file?.origin_addr"
      :date="news.created_at"
      :badge="getCommonCodeName('CLUM_CATE_CD', news.clum_cate_cd)"
    />
    <div class="flex justify-center" v-if="hasNextPage">
      <c-btn
        class="enter_btn rounded-[30px] text-primary font-semibold text-sm py-3 pl-10 pr-[30px] mt-[23px]"
        outline
        @click="fetchNextPage()"
        >더보기
        <c-icon name="down_arrow" size="18px" :color="'#056BF1'" :fill="false" />
      </c-btn>
    </div>
  </div>
</template>

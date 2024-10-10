<script lang="ts" setup>
const type = 'project';
// 검색 필터
const { request } = useSearchFilter({
  requestDefault: {
    from: 0,
    size: 10,
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
  data: searchProjectList,
  hasNextPage,
  fetchNextPage,
  isFetched,
  refetch,
} = useSearchLikeProjectList({
  searchRequest: queryParam,
  queryOption: {
    enabled: true,
  },
  setField: setFieldValue, // TODO 추후 형태 변경필요
});

onMounted(() => {
  refetch();
});
</script>
<template>
  <div class="px-6 q-gutter-y-md mt-16" v-if="isFetched">
    <search-g-p-item
      v-for="info in searchProjectList.pages.flatMap((item: any) => item.data)"
      :type="type"
      :key="info.prj_id"
      :badge="info?.tag_list ?? []"
      :title="info.title"
      :description="info.desc"
      :status="info?.prj_stt_cd ?? ''"
      :like="info.like_cnt"
      :img-src="info.thmn_file.convert_addr"
      :date="info.created_at"
      :id="info?.game_id ?? info.prj_id"
    />
    <div
      v-if="!searchProjectList.pages.flatMap((item: any) => item.data).length"
      class="h-80 flex justify-center items-center"
    >
      <not-find-item item-name="프로젝트" />
    </div>
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
</template>

<style lang="scss">
.q-tab .q-tab__label {
  font-size: 16px;
  color: #767676;
  font-weight: 500;
}
.q-tab {
  padding: 0;
  margin-right: 16px;
}
</style>

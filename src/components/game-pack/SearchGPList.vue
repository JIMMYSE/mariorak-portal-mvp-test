<script lang="ts" setup>
import { watchDebounced } from '@vueuse/core';

const { code } = useCommonCode('GAME_GNRE');

// 화면 구성
const searchkeyword = ref('');
const searchSort = ref('latest');
const options = [
  {
    label: '최신순',
    value: 'latest',
  },
  {
    label: '인기순',
    value: 'popular',
  },
];
// 검색 탭 리스트
const searchTab = ref('9999');
const searchTabList = computed(() => {
  const list = code?.value?.list || [];
  const tabList = list.map((item) => {
    return { label: item.cd_name, id: item.cd };
  });
  tabList.unshift({ label: '전체', id: '9999' });
  return tabList;
});

// form setup
// 검색 필터
const { request } = useSearchFilter({
  requestDefault: {
    search: {
      fields: ['title'],
      keyword: '',
    },
    from: 0,
    size: 10,
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
  data: searchProjectList,
  hasNextPage,
  fetchNextPage,
  isFetched,
  refetch,
} = useSearchProjectList({
  searchRequest: queryParam,
  queryOption: {
    enabled: true,
  },
  setField: setFieldValue, // TODO 추후 형태 변경필요
});

// 조회 조건
// 검색 탭 변경 시
watch(searchTab, (newVal) => {
  if (newVal != '9999') setFieldValue('filters.game_gnre_cd.eq', newVal);
  else resetField('filters');
  refetch();
});
// 검색 정렬 변경 시
watch(searchSort, (newVal) => {
  if (newVal == 'latest') setFieldValue('sort', [{ created_at: 'asc' }]);
  else setFieldValue('sort', [{ like: 'desc' }]);
  refetch();
});
// 검색어 변경 시
watchDebounced(
  searchkeyword,
  () => {
    setFieldValue('search.keyword', searchkeyword.value);
    refetch();
  },
  { debounce: 500, maxWait: 1000 }
);
</script>
<template>
  <q-tabs v-model="searchTab" dense class="pl-6">
    <q-tab
      v-for="tab in searchTabList"
      :key="tab.id"
      :name="tab.id"
      :label="tab.label"
    />
  </q-tabs>
  <div class="px-6">
    <div class="grid gap-1.5 mt-1">
      <c-search-input v-model="searchkeyword" />
    </div>
    <c-select
      v-model="searchSort"
      :options="options"
      map-options
      borderless
      class="w-[80px]"
      dense
    />
  </div>
  <div class="px-6 q-gutter-y-md" v-if="isFetched">
    <search-g-p-item
      v-for="info in searchProjectList.pages.flatMap((item: any) => item.data)"
      :key="info.prj_id"
      :badge="info?.tag_list ?? []"
      :title="info.title"
      :description="info.desc"
      :status="info.prj_stt_cd"
      :like="info.like_cnt"
      :img-src="info.thmn_file.convert_addr"
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

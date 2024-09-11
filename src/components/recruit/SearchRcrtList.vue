<script lang="ts" setup>
import { watchDebounced } from '@vueuse/core';

// #region props & globals
const props = defineProps<{
  pageType: 'project' | 'maker';
}>();

/** 프로젝트 여부 */
const isProject = computed(() => props.pageType === 'project');

// #endregion

// #region 검색 처리

/** 검색 카테고리 처리 */
const searchCategoryAction = createAction(() => {
  const { code } = props.pageType === 'project' ? useCommonCode('GAME_GNRE') : useCommonCode('MKR_ROL');

  const searchTab = ref('9999');
  const searchTabList = computed(() => {
    const list = code?.value?.list || [];
    const tabList = list.map((item) => {
      return { label: item.cd_name, id: item.cd };
    });
    tabList.unshift({ label: '전체', id: '9999' });
    return tabList;
  });

  // 검색 탭 변경 시
  watch(searchTab, (newVal) => {
    if (newVal != '9999') {
      searchConditionAction.form.setFieldValue(
        isProject.value ? 'filters.game_gnre_cd.eq' : 'filters.mkr_rol_cd.eq',
        newVal
      );
    } else {
      searchConditionAction.form.resetField('filters');
    }
    searchAction.refetch();
  });

  return {
    /** 선택된 tab 정보 */
    searchTab,

    /** 탭 검색 */
    searchTabList,
  };
});

/** 검색 조건 처리 */
const searchConditionAction = createAction(() => {
  const searchkeyword = ref('');
  const sortOptions = computed(() => {
    return isProject.value
      ? [
          {
            label: '최신순',
            value: 'created_at',
          },
          {
            label: '종료일순',
            value: 'end_dttm',
          },
        ]
      : [
          {
            label: '최신순',
            value: 'updated_at',
          },
          {
            label: '연차순',
            value: 'expr_year',
          },
        ];
  });
  const searchSort = ref(sortOptions.value[0].value);

  // #region form
  const { request } = useSearchFilter({
    requestDefault: {
      search: {
        fields: isProject.value ? ['title'] : ['nickname'],
        keyword: '',
      },
      from: 0,
      size: 10,
      sort: [
        {
          [searchSort.value]: 'asc',
        },
      ],
    },
  });

  const form = useForm<SearchRequest>({
    validationSchema: toTypedSchema(SearchRequestSchema),
    initialValues: request,
  });
  // #endregion

  // 검색 정렬 변경 시
  watch(searchSort, (newVal) => {
    form.setFieldValue('sort', [{ [newVal]: 'asc' }]);
    searchAction.refetch();
  });
  // 검색어 변경 시
  watchDebounced(
    searchkeyword,
    () => {
      form.setFieldValue('search.keyword', searchkeyword.value);
      searchAction.refetch();
    },
    { debounce: 500, maxWait: 1000 }
  );

  return {
    /** 정렬 입력 값 */
    searchSort,
    /** 정렬 키워드 */
    searchkeyword,
    /** 정렬 옵션 */
    sortOptions,
    /** form 객체 */
    form,
  };
});

/** 검색 처리 (Project) */
const searchAction = createAction(() => {
  const queryParam = ref(searchConditionAction.form.values);

  // fetch
  const {
    data: dataList,
    hasNextPage,
    fetchNextPage,
    isFetched,
    refetch,
  } = isProject.value
    ? useRecruitSearchProjectList({
        searchRequest: queryParam,
        queryOption: {
          enabled: isProject.value,
        },
        setField: searchConditionAction.form.setFieldValue, // TODO 추후 형태 변경필요
      })
    : useRecruitSearchMakerList({
        searchRequest: queryParam,
        queryOption: {
          enabled: !isProject.value,
        },
        setField: searchConditionAction.form.setFieldValue, // TODO 추후 형태 변경필요
      });

  const data = computed(() => dataList.value?.pages?.flatMap((item: any) => item.data));

  return {
    hasNextPage,
    fetchNextPage,
    isFetched,
    refetch,
    data,
  };
});

// #endregion
</script>
<template>
  <q-tabs v-model="searchCategoryAction.searchTab.value" dense class="pl-6">
    <q-tab v-for="tab in searchCategoryAction.searchTabList.value" :key="tab.id" :name="tab.id" :label="tab.label" />
  </q-tabs>
  <div class="px-6">
    <div class="grid gap-1.5 mt-1">
      <c-search-input v-model="searchConditionAction.searchkeyword.value" />
    </div>
    <c-select
      v-model="searchConditionAction.searchSort.value"
      :options="searchConditionAction.sortOptions.value"
      map-options
      borderless
      class="w-[80px]"
      dense
    />
  </div>

  <div class="px-6 q-gutter-y-md" v-if="searchAction.isFetched.value">
    <template v-if="isProject">
      <SearchProjectItem
        v-for="info in searchAction.data.value"
        :key="info.prj_id"
        :id="info.prj_id as number"
        :badge="info?.tag_list ?? []"
        :title="info.title as string"
        :rcrt-num="info.rcrt_mkr_num as number"
        :end-dttm="new Date(info.end_dttm)"
        :img-src="info.thmn_file.convert_addr"
      />
    </template>
    <template v-else>
      <SearchMakerItem
        v-for="info in searchAction.data.value"
        :key="info.mkr_id"
        :mkr-id="info.mkr_id as number"
        :mem-id="info.mem_id as number"
        :name="info.nickname as string"
        :skills="info.prfl?.skills as string[]"
        :job="info.mkr_rol_cd as string"
        :years="info.expr_year as number"
        :project-number="info.prj_num as number"
        :description="info.desc as string"
        :img-src="info.circle_file?.convert_addr as string"
      />
    </template>
  </div>

  <!-- 없는 아이템 예시 -->
  <not-find-item v-if="!searchAction.data.value?.length" :item-name="isProject ? '프로젝트' : '개발자'" />

  <div class="flex justify-center" v-if="searchAction.hasNextPage.value">
    <c-btn
      class="enter_btn rounded-[30px] text-primary font-semibold text-sm py-3 pl-10 pr-[30px] mt-[23px]"
      outline
      @click="searchAction.fetchNextPage()"
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

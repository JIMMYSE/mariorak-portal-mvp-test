<script lang="ts" setup>
type Props = {
  pjId: string;
};
const props = defineProps<Props>();
const searchSort = ref('latest');
const searchKeyword = ref('');
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

// form setup
// 검색 필터
const { request } = useSearchFilter({
  requestDefault: {
    filters: {
      prj_id: {
        eq: props.pjId,
      },
    },
    search: {
      fields: ['title', 'mem_nickname'],
      keyword: '',
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
  data: postList,
  hasNextPage,
  fetchNextPage,
  isFetched,
  refetch,
} = usePostList({
  searchRequest: queryParam,
  queryOption: {
    enabled: true,
  },
  setField: setFieldValue, // TODO 추후 형태 변경필요
});

// 조회 조건
// 검색 정렬 변경 시
// watch(searchSort, (newVal) => {
//   if (newVal == 'latest') setFieldValue('sort', [{ created_at: 'asc' }]);
//   else setFieldValue('sort', [{ like: 'desc' }]);
//   refetch();
// });
// 검색어 변경 시
watchDebounced(
  searchKeyword,
  () => {
    setFieldValue('search.keyword', searchKeyword.value);
    refetch();
  },
  { debounce: 500, maxWait: 1000 }
);
</script>
<template>
  <div class="w-full">
    <section class="mt-6">
      <div class="flex justify-between items-center">
        <div>
          <p class="text-[#222222] text-xl font-semibold leading-7">
            개발자 게시판 (135)
          </p>
          <p class="text-[#767676] text-sm font-normal leading-tight mt-[2px]">
            프로젝트에 참여한 개발자가 작성하는 게시판
          </p>
        </div>
        <q-btn
          size="md"
          round
          flat
          class="flex justify-center items-center"
          @click="goTo('/game-pack/project/1/board-edit')"
        >
          <q-icon name="img:/icons/icon_add_plus.svg" size="40px" />
        </q-btn>
      </div>
      <c-search-input v-model="searchKeyword" class="mt-[16px]" />
      <!-- <c-select
        v-model="searchSort"
        :options="options"
        map-options
        borderless
        class="w-[80px]"
        dense
      /> -->
      <div v-if="isFetched">
        <!-- 반복문 -->
        <g-p-board-content-item
          v-for="post in postList.pages.flatMap((item : any) => item.data)"
          :post="post"
          :key="post.id"
          @click="goTo('/game-pack/project/1/2')"
        />
      </div>
      <div class="flex justify-center" v-if="hasNextPage">
        <c-btn
          class="enter_btn rounded-[30px] text-primary font-semibold text-sm py-3 pl-10 pr-[30px] mt-[23px]"
          outline
          @click="fetchNextPage()"
          >더보기
          <c-icon
            name="down_arrow"
            size="18px"
            :color="'#056BF1'"
            :fill="false"
          />
        </c-btn>
      </div>
    </section>
  </div>
</template>

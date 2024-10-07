<script lang="ts" setup>
import { off } from 'process';

type Props = {
  gameId: string;
  prjId: number;
};
const props = defineProps<Props>();
const { maker } = useAuthStore();
// const searchSort = ref('latest');
const searchKeyword = ref('');
// const options = [
//   {
//     label: '최신순',
//     value: 'latest',
//   },
//   {
//     label: '인기순',
//     value: 'popular',
//   },
// ];

// form setup
// 검색 필터

const { request } = useSearchFilter({
  requestDefault: {
    from: 0,
    size: 10,
    sort: [
      {
        created_at: 'desc',
      },
      {
        like_cnt: 'desc',
      },
      {
        prdc_revw_id: 'desc',
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
  data: reviewList,
  hasNextPage,
  fetchNextPage,
  isFetched,
  refetch,
} = useReviewList(props.gameId, {
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
  <div class="w-full">
    <section class="my-6">
      <div class="flex justify-between items-center">
        <div>
          <p class="text-[#222222] text-xl font-semibold leading-7">
            서포터즈 리뷰 ({{ reviewList?.pages[0].total ?? 0 }})
          </p>
          <p class="text-[#767676] text-sm font-normal leading-tight mt-[2px]">
            게임을 체험한 서포터즈가 작성한 리뷰입니다
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
      <!-- <c-select
        v-model="searchSort"
        :options="options"
        map-options
        borderless
        class="w-[80px]"
        dense
      /> -->
      <div class="mt-2">
        <g-p-review-item
          v-for="review in reviewList?.pages.flatMap((item : any) => item.data)"
          :review="review"
          :key="review.post_id"
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

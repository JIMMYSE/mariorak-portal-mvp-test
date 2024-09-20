<script setup lang="ts">
// form setup
// 검색 필터
const { request } = useSearchFilter({
  requestDefault: {
    from: 0,
    size: 5,
    sort: [
      {
        created_at: 'desc',
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

const onClickPostCard = () => {
  notAvailableAlert();
};
</script>
<template>
  <ul class="custom-list cursor-pointer">
    <li v-for="post in postList?.pages.flatMap((item: any) => item.data)" :key="post.title" @click="onClickPostCard">
      <div class="text-[#222222] font-medium leading-snug">
        {{ post.title }}
      </div>

      <div class="flex justify-between mt-1">
        <div class="text-[#767676] text-sm">{{ formatDate(post.created_at) }}{{ post.mem_nickname }}</div>
        <div class="flex items-center">
          <q-icon :name="`img:/icons/icon_comment.svg`" size="20px" class="mr-1" />
          <div class="text-[#767676] text-sm pt-[1px]">
            {{ post.cmmt_cnt }}
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
<style lang="scss" scoped>
.custom-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.custom-list li {
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.custom-list li:not(:last-child) {
  border-bottom: 1px solid #f0f0f0;
}

.custom-list li:last-child {
  border-bottom: none;
}
</style>

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
  data: noticeList,
  isFetched,
  refetch,
} = useNoticeList({
  searchRequest: queryParam,
  queryOption: {
    enabled: true,
  },
});

const onClickPostCard = (id: number) => {
  goTo(`/notice/${id}`);
};
</script>
<template>
  <ul class="custom-list cursor-pointer">
    <li v-for="notice in noticeList?.rows" :key="notice.ntc_id" @click="onClickPostCard(notice.ntc_id)">
      <div class="text-[#222222] font-medium leading-snug">
        {{ notice.title }}
      </div>

      <div class="flex mt-1">
        <div class="text-[#767676] text-sm">{{ formatDate(notice.created_at) }} {{ notice.manager_name }}</div>
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
c

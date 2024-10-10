<script lang="ts" setup>
const { request } = useSearchFilter({
  requestDefault: {
    from: 0,
    size: null,
    sort: [
      {
        clum_sesn_id: 'asc',
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

const { data: seasonList, refetch } = useColumnSeasonList({
  searchRequest: queryParam,
  queryOption: {
    enabled: true,
  },
});

const searchSort = ref(1);
const options = seasonList?.value?.rows.map((item) => ({
  label: item.name,
  value: item.clum_sesn_id,
}));

// 검색 정렬 변경 시
watch(searchSort, (newVal) => {
  refetch();
});
</script>

<template>
  <q-page>
    <section>
      <div class="anchor-area h-[210px] w-full text-center flex items-center justify-center">
        <div>
          <p class="text-white text-3xl font-semibold leading-9">소식통</p>
          <p class="text-white text-sm font-normal leading-tight" style="color: #ffffff; opacity: 0.5">
            CCF 크루가 직접 소개하고 <br />
            알려 드립니다!
          </p>
        </div>
      </div>
    </section>
    <section class="mt-10">
      <h2 class="pl-6 text-[20px] font-semibold">
        <c-select v-model="searchSort" :options="options" map-options borderless class="w-[80px]" dense></c-select>
      </h2>
      <p class="pl-6 mt-[8px] text-[#767676] text-sm font-normal leading-tight">
        {{ seasonList?.rows[searchSort - 1].desc }}
      </p>
      <div class="mt-4">
        <news-project-item-list v-if="seasonList && seasonList.rows.length > 0" :season-id="searchSort" />
      </div>
    </section>
  </q-page>
</template>
<style lang="scss" scoped>
.anchor-area {
  background-image: url('/images/dummy/background_dummy.png');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>

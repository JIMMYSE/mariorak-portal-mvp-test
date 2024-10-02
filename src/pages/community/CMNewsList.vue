<script lang="ts" setup>
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

const { data: newsList, refetch } = useCommunityNewsList({
  searchRequest: queryParam,
  queryOption: {
    enabled: true,
  },
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
      <h2 class="pl-6 text-[20px] font-semibold">시즌 1</h2>
      <p class="pl-6 mt-[8px] text-[#767676] text-sm font-normal leading-tight">
        CCF 크루의 막내 귀염둥이 염둥이의 게임 정복기
      </p>
      <div class="mt-4">
        <search-g-p-list :type="'game'" />
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

<!-- 입대 안내 > 자주 묻는 질문 -->

<script lang="ts" setup>
const route = useRoute();
// 카테고리
const { options: categoryOptions } = useCommonCode('FAQ_CATE');

console.log('categoryOptions', categoryOptions);

const faqCategoryCode = computed(() =>
  categoryOptions.value.find((item) => item.label == route.meta.faqCategory)
);
const { request } = useSearchFilter({
  requestDefault: {
    filters: {
      faq_cate_cd: {
        eq: faqCategoryCode.value?.value,
      },
    },
    from: 0,
    size: 10,
    sort: [
      {
        created_at: 'desc',
      },
      {
        faq_id: 'desc',
      },
    ],
  },
});

// // 목록 조회
const { data: listData } = useFaqList({
  searchRequest: request,
});

const selectFaqId = ref<number | undefined>(undefined);
</script>

<template>
  <q-card-section class="p-0">
    <section class="mt-6 mbj-[9px]">
      <ul>
        <li
          v-for="item in listData?.rows"
          :key="item.faq_id"
          class="flex flex-col relative cursor-pointer"
        >
          <!-- QUESTION  -->
          <h3
            class="mx-6 py-[15px] text-[13px] font-medium relative"
            @click="
              selectFaqId =
                selectFaqId === item.faq_id ? undefined : item.faq_id
            "
          >
            {{ item.title }}
            <!-- ARROW ICON -->
            <q-icon
              size="23px"
              name="img:/icons/down_arrow.svg"
              class="absolute right-0 top-[14px]"
              :class="selectFaqId === item.faq_id ? 'rotate-180' : ''"
            />
          </h3>
          <!-- ANSWER -->
          <div
            class="-mt-[1px] bg-grey w-full shrink overflow-hidden p-6"
            :class="
              selectFaqId === item.faq_id ? 'flex-1' : 'flex-none basis-0 py-0'
            "
          >
            <p class="text-[#767676] text-sm font-normal">
              {{ item.cont }}
            </p>
          </div>
          <!-- LINE -->
          <div
            class="absolute inset-x-6 bottom-0 h-[1px] border-b-[1px] border-b-[#E6E6E6]"
          />
        </li>
      </ul>
    </section>
  </q-card-section>
</template>

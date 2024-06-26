<!-- 입대 안내 > 자주 묻는 질문 -->

<script lang="ts" setup>
// 카테고리
const {
  code,
  cdList: categoryCdList,
  options: categoryOptions,
} = useCommonCode('FAQ_CATEGORY');

const { request } = useSearchFilter({
  requestDefault: {
    filters: {
      categories_cd: {
        eq: categoryOptions.value[0].value,
      },
    },
    size: 100,
  },
});

// 목록 조회
const { data: listData } = useFaqList({
  searchRequest: request,
});

// 상세 조회
const detailId = ref<Id>(undefined);
const { data: detailData } = useFaqDetail(detailId);

const selectedCategory = computed({
  get: () => request.value.filters!.categories_cd!.eq,
  set: (value: string) => {
    request.value.filters!.categories_cd!.eq = value;
  },
});
</script>

<template>
  <q-page class="pt-[22px]">
    <ul
      class="mx-6 grid grid-cols-2 place-items-center h-[120px] border border-grey-1 bg-grey gap-[1px]"
    >
      <li
        v-for="item in categoryOptions"
        :key="item.value"
        class="text-subtitle1 font-pretendard hover:text-primary size-full flex justify-center items-center bg-white cursor-pointer"
        :class="
          item.value === selectedCategory ? 'text-primary' : 'text-grey-4'
        "
        @click="
          detailId = undefined;
          selectedCategory = item.value;
        "
      >
        {{ item.label }}
      </li>
    </ul>

    <div class="mt-6 w-screen left-0 absolute h-[10px] bg-grey"></div>

    <section class="mt-6 mb-[9px]">
      <h3 class="py-[25px] px-6 text-sm font-medium text-grey-4">
        자주 묻는 질문 top 10
      </h3>
      <ul>
        <li
          v-for="item in listData?.rows"
          :key="item.id"
          class="flex flex-col relative cursor-pointer"
        >
          <!-- QUESTION  -->
          <h3
            class="mx-6 py-[25px] text-[13px] font-medium relative"
            @click="detailId = detailId === item.id ? undefined : item.id"
          >
            {{ item.title }}
            <!-- ARROW ICON -->
            <q-icon
              size="30px"
              name="img:/icons/down_arrow.svg"
              class="absolute right-0 top-[21px]"
              :class="detailId === item.id ? 'rotate-180' : ''"
            />
          </h3>
          <!-- ANSWER -->
          <div
            v-if="detailData"
            class="-mt-[1px] bg-grey w-full shrink overflow-hidden p-6"
            :class="detailId === item.id ? 'flex-1' : 'flex-none basis-0 py-0'"
          >
            <p class="text-sm font-pretendard">
              {{ detailData.description }}
            </p>
            <!-- ATTACHMENT FILE -->
            <p
              v-if="detailData.file"
              class="relative underline underline-offset-2 pl-[17px] mt-10 font-pretendard text-sm text-primary"
            >
              <q-icon name="img:/icons/icon_file.svg" size="12px" />
              <a
                :href="detailData.file.convert_addr ?? undefined"
                target="_blank"
                >{{ detailData.file.file_name }}</a
              >
            </p>
          </div>
          <!-- LINE -->
          <div
            class="absolute inset-x-6 bottom-0 h-[1px] border-b-[1px] border-b-[#E6E6E6]"
          />
        </li>
      </ul>
    </section>
  </q-page>
</template>

<style lang="scss" scoped></style>

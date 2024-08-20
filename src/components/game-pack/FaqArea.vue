<!-- 입대 안내 > 자주 묻는 질문 -->

<script lang="ts" setup>
// 카테고리
// const {
//   code,
//   cdList: categoryCdList,
//   options: categoryOptions,
// } = useCommonCode('FAQ_CATEGORY');

// const { request } = useSearchFilter({
//   requestDefault: {
//     filters: {
//       categories_cd: {
//         eq: categoryOptions.value[0].value,
//       },
//     },
//     size: 100,
//   },
// });

// // 목록 조회
// const { data: listData } = useFaqList({
//   searchRequest: request,
// });

// // 상세 조회
// const detailId = ref<Id>(undefined);
// const { data: detailData } = useFaqDetail(detailId);

// const selectedCategory = computed({
//   get: () => request.value.filters!.categories_cd!.eq,
//   set: (value: string) => {
//     request.value.filters!.categories_cd!.eq = value;
//   },
// });
</script>

<template>
  <q-card-section class="p-0">
    <section class="mt-6 mb-[9px]">
      <ul>
        <li
          v-for="item in listData?.rows"
          :key="item.id"
          class="flex flex-col relative cursor-pointer"
        >
          <!-- QUESTION  -->
          <h3
            class="mx-6 py-[15px] text-[13px] font-medium relative"
            @click="detailId = detailId === item.id ? undefined : item.id"
          >
            {{ item.title }}
            <!-- ARROW ICON -->
            <q-icon
              size="23px"
              name="img:/icons/down_arrow.svg"
              class="absolute right-0 top-[14px]"
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
<script lang="ts">
const listData = {
  rows: [
    { id: 1, title: '입대 전 준비해야 할 서류는 무엇인가요?' },
    { id: 2, title: '군 복무 기간은 얼마나 되나요?' },
    { id: 3, title: '입대 시 지참해야 할 물품은 무엇인가요?' },
    { id: 4, title: '훈련소에서 휴대폰 사용이 가능한가요?' },
    { id: 5, title: '군 복무 중 휴가는 어떻게 주어지나요?' },
    { id: 6, title: '특기병 지원은 어떻게 하나요?' },
    { id: 7, title: '현역 판정을 받았는데 공익근무요원으로 복무할 수 있나요?' },
    { id: 8, title: '군 복무 중 학점 취득이 가능한가요?' },
    { id: 9, title: '군 복무 중 자격증 취득 지원 제도가 있나요?' },
    { id: 10, title: '병역특례 제도에 대해 알고 싶습니다.' },
  ],
};

const detailId = ref<number | undefined>(undefined);

const detailData = {
  id: 1,
  title: '입대 전 준비해야 할 서류는 무엇인가요?',
  description:
    '입대 전 준비해야 할 주요 서류는 다음과 같습니다:\n\n1. 현역 입영 통지서\n2. 주민등록증\n3. 학력증명서 (최종학력 졸업증명서 또는 재학증명서)\n4. 자격증 사본 (해당되는 경우)\n5. 가족관계증명서\n6. 통장 사본 (급여 지급용)\n7. 의료보험증 사본\n\n이외에도 개인에 따라 추가 서류가 필요할 수 있으니, 입영통지서에 기재된 내용을 꼭 확인하시기 바랍니다.',
};
</script>
<style lang="scss" scoped></style>

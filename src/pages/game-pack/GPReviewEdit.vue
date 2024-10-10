<script lang="ts" setup>
import { ReviewCreateType } from 'src/types/gamepack/review-model';

const route = useRoute();
const gameId = route.params.id.toString();

const { data: gameDetail, refetch, isFetching } = useGameDetail(gameId);

const badgeContainer = ref<HTMLElement | null>(null);
const { height } = useElementSize(badgeContainer);
const isEllipsis = ref(true);

const badgeList = ref<string[]>([]);

let i = 0;
const addBadge = setInterval(() => {
  if (!gameDetail.value?.tag_list?.length) clearInterval(addBadge);

  if (height.value < 25) {
    if (gameDetail.value?.tag_list[i]) badgeList.value.push(gameDetail.value?.tag_list[i]);
  }
  if (i == gameDetail.value?.tag_list?.length - 1) {
    clearInterval(addBadge);
  }
  i++;
}, 20);

watch(height, (newHeight) => {
  if (newHeight >= 25) {
    clearInterval(addBadge);
    isEllipsis.value = true;
    let b = badgeList.value.pop();
    console.log('>>>pop', b);
  }
});

/** 등록 */
const {
  values: form,
  handleSubmit,
  meta,
} = useForm<ReviewCreateType>({
  validationSchema: toTypedSchema(ReviewCreateFrontType),
  initialValues: {
    cont: '',
  },
});

const { mutateAsync, isSuccess } = useReviewCreate(gameId);

const onSubmit = handleSubmit(async () => {
  mutateAsync({
    ...form,
  });

  watch(isSuccess, (value) => {
    if (value) {
      goBack();
    }
  });
});
</script>
<template>
  <section class="px-6" v-if="!isFetching">
    <div class="flex no-wrap">
      <div class="relative">
        <c-img :src="gameDetail.thmn_file.convert_addr" class="rounded-xl h-[78px] w-[139px]" />
      </div>

      <div class="text-caption q-mb-xs flex-grow pl-2">
        <div class="flex-col flex justify-between felx-col h-[78px]">
          <div class="text-[#222222] text-sm font-semibold leading-tight ellipsis-2-lines">
            {{ gameDetail.title }}
            <div class="flex text-[#b5b5b5] text-xs leading-none">
              {{ formatDate(gameDetail.created_at) }}
            </div>
          </div>
          <div class="row justify-between">
            <div class="flex items-center q-col-gutter-x-xs" ref="badgeContainer" v-if="badgeList.length > 0">
              <q-badge color="grey" text-color="black" v-for="item in badgeList" :label="item" :key="item" />
              <c-icon name="icon_kebap" v-if="isEllipsis" />
            </div>
            <div v-else class="h-[25px]"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="px-6 w-full max-w-[512px]">
    <c-input
      class="w-full border-0 rounded-sm h-[480px]"
      type="textarea"
      :maxlength="1000"
      input-class="h-[420px]"
      name="cont"
      placeholder="리뷰를 작성해 주세요."
      :outlined="false"
      :rounded="false"
      border-radius="100px"
      inline-counter
      check-badwords
      :clearable="false"
    />
  </section>
  <section class="fixed inset-x-0 bottom-0 p-3">
    <div class="flex justify-center items-center" style="padding-inline: 1%">
      <c-btn
        class="rounded-[10px] font-semibold text-base mt-[30px] w-full py-[14px] bottom-0 max-w-[512px]"
        color="primary"
        :disable="!meta.valid"
        @click="onSubmit"
        >등록하기
      </c-btn>
    </div>
  </section>
</template>

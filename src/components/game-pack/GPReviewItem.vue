<script lang="ts" setup>
import { ref } from 'vue';
type Props = {
  review: any;
};
const props = defineProps<Props>();
const { options } = useCommonCode('MKR_ROL');
const role = computed(() => {
  return options.value.find((option: any) => option.cd === props.review.mkr_rol_cd)?.label;
});

const { mutateAsync: onLike } = useLike('review', props.review.prdc_revw_id);
const { mutateAsync: onUnlike } = useUnLike('reivew');

// 좋아요/좋아요 취소
const onClickLikeButton = async () => {
  console.log(likeStatus.value);
  if (likeStatus.value.is_liked) {
    await onUnlike(ref(props.review.prdc_revw_id));
    likeStatus.value = { is_liked: false, like_cnt: likeStatus.value.like_cnt - 1 };
  } else {
    await onLike({});
    likeStatus.value = { is_liked: true, like_cnt: likeStatus.value.like_cnt + 1 };
  }
};

// 로컬 좋아요 상태
const likeStatus = ref({ is_liked: false, like_cnt: 0 });
watch(
  () => props.review,
  (value) => {
    likeStatus.value = { is_liked: value.is_liked, like_cnt: value.like_cnt };
  },
  { immediate: true }
);
</script>

<template>
  <div class="flex flex-col" v-if="review">
    <div class="flex items-center py-[15px] border-b-[1px] border-[#f0f0f0]">
      <div>
        <c-img
          :src="review.prfl_img.convert_addr"
          :alt="review.mem_nickname"
          class="w-[40px] h-[40px] rounded-full"
        ></c-img>
      </div>

      <div class="flex justify-between items-end ml-[12px] flex-1">
        <div>
          <p class="text-[#222222] text-base font-semibold leading-snug">
            {{ review.mem_nickname }}
          </p>
          <p class="text-[#767676] text-sm font-normal leading-tight">
            {{ role }}
          </p>
        </div>

        <div @click="onClickLikeButton" class="cursor-pointer">
          <div
            class="w-[55px] h-7 bg-[#d8e5f8] rounded-[14px] ml-auto flex justify-center items-center"
            v-if="likeStatus.is_liked"
          >
            <div class="flex items-center justify-center">
              <q-icon name="img:/icons/icon_thumbup_blue.svg" size="15px" class="mr-1" />
              <p class="text-primary text-sm font-medium font-['Pretendard'] leading-tight mt-1">
                {{ likeStatus.like_cnt }}
              </p>
            </div>
          </div>
          <div class="w-[55px] h-7 bg-[#F0F0F0] rounded-[14px] ml-auto flex justify-center items-center" v-else>
            <div class="flex items-center justify-center">
              <q-icon name="img:/icons/icon_thumbup_grey.svg" size="15px" class="mr-1" />
              <p class="text-[#b5b5b5] text-sm font-medium font-['Pretendard'] leading-tight mt-1">
                {{ likeStatus.like_cnt }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <p class="mt-[10px] text-[#767676] text-sm font-normal leading-tight w-full">{{ review.cont }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

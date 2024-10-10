<script lang="ts" setup>
import { PostType } from 'src/types/community/post-model';

type Props = {
  post: PostType;
};

const { options: postOptions } = useCommonCode('POST_TY');
const postType = (type: string) => {
  return postOptions.value.find((item: Option) => item.value === type)?.label;
};
const props = defineProps<Props>();
</script>
<template>
  <div class="py-[16px] border-b border-[#f0f0f0]">
    <div class="flex justify-between items-end">
      <div>
        <p class="text-[#222222] text-base font-medium leading-snug">
          [{{ postType(props.post.post_ty_cd) }}] {{ props.post.title }}
        </p>
        <p class="text-[#767676] text-sm font-normal leading-tight mt-1">
          {{ formatDate(props.post.created_at) }} {{ props.post.mem_nickname }}
        </p>
      </div>
      <div>
        <q-icon name="img:/icons/icon_comment.svg" size="20px" />
        <span class="text-[#767676] text-sm font-normal leading-tight">{{ props.post.cmmt_cnt }}</span>
      </div>
    </div>
  </div>
</template>

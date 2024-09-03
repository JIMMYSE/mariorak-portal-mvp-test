<script lang="ts" setup>
import { PostType } from 'src/types/community/post-model';

type Props = {
  post: PostType;
};
const props = defineProps<Props>();
</script>
<template>
  <div class="py-[16px] border-b border-[#f0f0f0]">
    <div class="flex justify-between items-end">
      <div>
        <p class="text-[#222222] text-base font-medium leading-snug">
          {{ post.title }}
        </p>
        <p class="text-[#767676] text-sm font-normal leading-tight">
          {{ formatDate(post.created_at) }} {{ post.mem_nickname }}
        </p>
      </div>
      <div>
        <q-icon name="img:/icons/icon_comment.svg" size="20px" />
        <span class="text-[#767676] text-sm font-normal leading-tight">{{
          post.cmmt_cnt
        }}</span>
      </div>
    </div>
  </div>
</template>

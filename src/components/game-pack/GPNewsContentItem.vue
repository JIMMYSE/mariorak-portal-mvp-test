<script lang="ts" setup>
import { GameNewsType } from 'src/types/community/news-model';

type Props = {
  news: GameNewsType;
};
const props = defineProps<Props>();
</script>
<template>
  <div class="flex no-wrap mt-3">
    <div class="relative">
      <c-img :src="props.news.thmn_file.convert_addr" class="h-[78px] w-[139px]" />
    </div>

    <div class="text-caption q-mb-xs flex-grow pl-2">
      <div class="flex-col flex h-[78px]">
        <div>
          <div class="text-[#222222] text-sm font-semibold leading-tight ellipsis-2-lines">
            {{ props.news.title }}
          </div>
        </div>
        <div class="row justify-between">
          <div class="flex text-[#767676]">
            {{ formatDate(props.news.created_at) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

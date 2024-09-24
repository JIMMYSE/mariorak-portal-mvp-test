<script setup lang="ts">
type Props = {
  title: string;
  desc: string;
  height: string;
};
const props = defineProps<Props>();
</script>
<template>
  <div :style="`height : ${height}`">
    <p class="text-[#222222] text-[16px] font-semibold leading-snug mt-[8px] ellipsis-2-lines">
      {{ props?.title }}
    </p>
    <p
      class="text-[#696969] text-xs font-normal leading-4 mt-[6px] ellipsis-2-lines"
      v-html="filterHtml(props?.desc)"
    ></p>
  </div>
</template>

<script setup lang="ts">
type Props = {
  title: string;
  content: string;
};
defineProps<Props>();
</script>

<template>
  <div class="absolute inset-[12px] top-auto text-left">
    <div
      class="font-medium mb-1 text-white leading-0 text-ellipsis line-clamp-1 drop-shadow-sm"
    >
      {{ title }}
    </div>
    <p
      class="text-caption text-grey-3 leading-2 font-light text-ellipsis line-clamp-2 drop-shadow-sm"
    >
      {{ content }}
    </p>
  </div>
</template>

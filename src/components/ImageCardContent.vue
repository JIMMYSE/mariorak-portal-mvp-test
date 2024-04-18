<script setup lang="ts">
type Props = {
  subtitle: string;
  title: string;
  content: string;
};
defineProps<Props>();
</script>

<template>
  <div class="absolute top-[159px] color-white q-px-md text-left">
    <p
      class="text-[12px] mb-[7px] font-light leading-[14px] text-ellipsis line-clamp-1 drop-shadow-sm"
    >
      {{ subtitle }}
    </p>
    <p
      class="text-[24px] font-medium mb-[22px] leading-6 text-ellipsis line-clamp-1 drop-shadow-sm"
      style="height: 28px; text-align: start"
    >
      {{ title }}
    </p>
    <p
      class="text-body2 leading-5 font-light text-ellipsis line-clamp-4 drop-shadow-sm"
    >
      {{ content }}
    </p>
  </div>
</template>

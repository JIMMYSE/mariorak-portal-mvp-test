<!-- 컴포넌트 > 폼 > 입력 필드 -->

<script setup lang="ts">
type Props = {
  label: string;
};
defineProps<Props>();
</script>

<template>
  <section class="mt-4">
    <div class="text-[13px] text-grey-3 leading-8 pl-1">{{ label }}</div>
    <slot />
    <slot name="bottom" />
  </section>
</template>

<style scoped></style>

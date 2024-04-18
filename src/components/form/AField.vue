<script setup lang="ts">
type Props = {
  label: string;
};
defineProps<Props>();
</script>

<template>
  <section class="mt-[20px]">
    <div class="text-caption text-grey-4 leading-5 pl-[2px]">{{ label }}</div>
    <slot />
    <slot name="bottom" />
  </section>
</template>

<style scoped></style>

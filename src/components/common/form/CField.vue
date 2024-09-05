<!-- 컴포넌트 > 폼 > 입력 필드 -->

<script setup lang="ts">
type Props = {
  label: string;
  required?: boolean;
};
defineProps<Props>();
</script>

<template>
  <section class="mt-4">
    <div class="text-[#767676] text-xs leading-8">
      {{ label
      }}<span
        v-if="required"
        class="text-[#ea2d2d] text-xs pl-[2px] mb-1 top-[2px]"
        ><c-asterisk
      /></span>
    </div>
    <slot />
    <slot name="bottom" />
  </section>
</template>

<style scoped></style>

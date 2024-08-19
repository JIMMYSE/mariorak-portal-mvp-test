<!-- 공통 Select -->
<!-- vee-validate v4 + yup -->

<script setup lang="ts">
import { QSelectProps } from 'quasar';
import { useForwardProps } from 'radix-vue';

type Props = QSelectProps;

const props = withDefaults(defineProps<Props>(), {
  emitValue: true,
});

const forwarded = useForwardProps(props);
</script>

<template>
  <QSelect v-bind="forwarded">
    <slot></slot>
  </QSelect>
</template>

<style scoped lang="scss"></style>

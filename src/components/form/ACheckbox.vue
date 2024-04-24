<!-- 공통 Checkbox -->
<!-- vee-validate v4 + yup -->

<script setup lang="ts">
import { QCheckboxProps } from 'quasar';
import { useForwardProps } from 'radix-vue';

type Props = QCheckboxProps;

const props = withDefaults(defineProps<Props>(), {});

const forwarded = useForwardProps(props);
</script>

<template>
  <QCheckbox
    v-bind="forwarded"
    checked-icon="img:/src/assets/icons/checkbox_a.svg"
    unchecked-icon="img:/src/assets/icons/checkbox_d.svg"
    size="32px"
  >
    <slot />
  </QCheckbox>
</template>

<style scoped lang="scss"></style>

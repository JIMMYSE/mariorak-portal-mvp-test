<script lang="ts" setup>
import { QBtnProps } from 'quasar';
import { useForwardPropsEmits } from 'radix-vue';
type Props = {
  icon: string;
  size: string;
} & QBtnProps;

const props = defineProps<Props>();
const emits = defineEmits(['click', 'keydown', 'mousedown', 'keyup']);
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <QBtn v-bind="forwarded" :icon="undefined" flat padding="8px">
    <QIcon :name="icon" :size="size" />
  </QBtn>
</template>

<style lang="scss" scoped></style>

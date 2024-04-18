<script lang="ts" setup>
import { QBtnProps } from 'quasar';
import { useForwardPropsEmits } from 'radix-vue';
type Props = QBtnProps;

const props = defineProps<Props>();
const emits = defineEmits(['click', 'keydown', 'mousedown', 'keyup']);
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <QBtn v-bind="forwarded" :icon="undefined" flat padding="8px">
    <QIcon name="img:/images/icons/btn_enter.svg" size="18px" />
  </QBtn>
</template>

<style lang="scss" scoped></style>

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
  <q-btn v-bind="forwarded" :icon="undefined" flat size="sm" class="p-0">
    <q-icon :name="icon" :size="size" />
  </q-btn>
</template>

<style lang="scss" scoped></style>

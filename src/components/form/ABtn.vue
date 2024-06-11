<script setup lang="ts">
import { QBtnProps } from 'quasar';
import { useForwardPropsEmits } from 'radix-vue';

const props = withDefaults(defineProps<QBtnProps>(), {
  unelevated: true,
  color: 'primary',
  noCaps: true,
});
const emits = defineEmits(['click', 'keydown', 'mousedown', 'keyup', 'submit']);
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <q-btn v-bind="forwarded"><slot /></q-btn>
</template>

<style lang="scss"></style>

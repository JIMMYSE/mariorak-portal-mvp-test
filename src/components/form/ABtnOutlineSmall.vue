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
  <q-btn
    v-bind="forwarded"
    rounded
    outline
    color="primary"
    class="text-caption font-light h-6 min-h-6 px-[10px] leading-4"
    label=""
  >
    <span class="h-[14px]">{{ props.label }}</span>
  </q-btn>
</template>

<style scoped></style>

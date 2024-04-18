<script setup lang="ts">
import { QItemProps } from 'quasar';
import { useForwardPropsEmits } from 'radix-vue';

type Props = { label?: string } & QItemProps;
const props = defineProps<Props>();
const emits = defineEmits(['click', 'keydown', 'mousedown', 'keyup']);
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <q-item
    class="mb-3 bg-grey-1 h-[70px] pl-5"
    v-bind="forwarded"
    flat
    clickable
    v-ripple
  >
    <q-item-section class="w-full" avatar>
      <p class="font-light text-base text-grey-5">{{ label }}</p>
      <slot />
    </q-item-section>
    <q-item-section avatar class="p-0 items-end">
      <ABtnIconEnter />
    </q-item-section>
  </q-item>
</template>

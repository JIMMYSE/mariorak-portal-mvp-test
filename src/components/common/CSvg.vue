<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  src: {
    type: String,
    default: '',
  },
});
const path = props.src ? props.src + '/' : '';
const file = `${path}${props.name}`;
const modules = import.meta.glob('../../assets/icons/**/*.svg', {
  as: 'raw',
  eager: true,
});
const svg = computed(() => {
  return (
    modules['../../assets/icons/' + file + '.svg'] ??
    modules['../../assets/icons/icon-logo-cone.svg']
  );
});
</script>
<template>
  <i v-html="svg" />
</template>

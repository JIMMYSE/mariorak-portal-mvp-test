<script setup lang="ts">
type Props = {
  count?: number;
};
withDefaults(defineProps<Props>(), { count: 1 });
</script>
<template>
  <span class="font-[monospace]" v-for="i in count" :key="i">*</span>
</template>

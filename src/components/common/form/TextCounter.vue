<template>
  <span class="text-counter text-grey-3" v-if="maxBytes">
    {{ textBytes?.toLocaleString() }}/{{ maxBytes?.toLocaleString() }}
  </span>
  <span class="text-counter text-grey-3" v-if="maxLength">
    {{ modelValue?.length.toLocaleString() }}/{{ maxLength?.toLocaleString() }}
  </span>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { computed, watch } from 'vue';

interface Props {
  modelValue: string;
  maxLength: number | undefined | null;
  maxBytes: number | undefined | null;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
});

const emit = defineEmits(['update:modelValue']);

const inputValue = useVModel(props, 'modelValue', emit);

const textBytes = computed(() => {
  return getTextByteCount(inputValue.value);
});

watch(inputValue, function onModelUpdated(value) {
  if ('string' === typeof value && value.length) {
    const s = props.maxBytes
      ? cutTextToBytes(value, props.maxBytes)
      : props.maxLength
      ? value.substring(0, props.maxLength)
      : undefined;

    if (s) inputValue.value = s;
  }
});

function getTextByteCount(inputString: string): number {
  if (inputString == null) return 0;
  let count = 0;
  let currentIndex = 0;
  while (currentIndex < inputString.length) {
    const currentCharCode = inputString.charCodeAt(currentIndex);
    // Check if the current character is ASCII (0-127)
    if (currentCharCode < 128) {
      count += 1;
    } else {
      count += 2;
    }
    currentIndex++;
  }
  return count;
}

function cutTextToBytes(str: string, end: number) {
  let count = 0;
  return str
    .split('')
    .map((t) => [t.charCodeAt(0) < 128, t])
    .filter(([isAscii]) => {
      if (isAscii) {
        count += 1;
      } else {
        count += 2;
      }
      return count <= end;
    })
    .map(([, t]) => t)
    .join('');
}
</script>

<style scoped>
.text-counter {
  position: static;
  right: 10px;
  bottom: 0.8rem;
  font-size: 15px;
}
</style>

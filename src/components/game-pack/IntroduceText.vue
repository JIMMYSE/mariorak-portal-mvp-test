<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';

type Props = {
  intro?: string;
};
const props = defineProps<Props>();

const isExpanded = ref(false);
const showButton = ref(false);
const textRef = ref<HTMLParagraphElement | null>(null);

onMounted(async () => {
  await nextTick();
  if (textRef.value) {
    const lineHeight = parseInt(
      window.getComputedStyle(textRef.value).lineHeight
    );
    const height = textRef.value.clientHeight;

    console.log('lineHeight:', lineHeight);
    console.log('height:', height);

    // 텍스트 높이가 3줄 이상일 경우만 더보기 버튼 표시
    showButton.value = height > lineHeight * 3;
    console.log('showButton:', showButton.value);
  }
});

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<template>
  <div class="relative">
    <p
      ref="textRef"
      :class="{
        'line-clamp-3': !isExpanded && showButton,
        'transition-all duration-300 ease-in-out': true,
      }"
      class="text-[#767676] text-sm font-normal leading-tight"
    >
      {{ props.intro }}
    </p>
    <button
      v-if="showButton"
      @click="toggleExpand"
      class="text-[#056bf1] text-sm font-medium underline leading-tight"
    >
      {{ isExpanded ? '접기' : '더보기' }}
    </button>
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';

// const props = defineProps<{
//   text: string;
// }>();

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
    showButton.value = height > lineHeight * 3;
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
      안녕하세요~~~재미난 웹툰 ㅋㅋ아이재미 정말...재미있으세요? 하하~ 오늘은
      즐거워요 안녕하세요~~~재미난 웹툰 ㅋㅋ아이재미 정말...재미있으세요? 하하~
      오늘은 즐거워요안녕하세요~~~재미난 웹툰 ㅋㅋ아이재미 정말...재미있으세요?
      하하~ 오늘은 즐거워요안녕하세요~~~재미난 웹툰 ㅋㅋ아이재미
      정말...재미있으세요? 하하~ 오늘은 즐거워요
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
  overflow: hidden;
}
</style>

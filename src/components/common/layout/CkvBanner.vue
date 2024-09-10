<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

type Props = {
  imgList: {
    src: string;
    id: number;
    title: string;
    desc: string;
    link?: string;
  }[];
  counter?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  counter: false,
});

const slideInfo = ref<any>({
  currentSlideIndex: 0,
  slidesCount: props.imgList.length,
});

const isDragging = ref(false);
const startX = ref(0);
const startY = ref(0);
const threshold = 10;

const startDrag = (event: MouseEvent) => {
  startX.value = event.clientX;
  startY.value = event.clientY;
  isDragging.value = false;
};

const endDrag = (event: MouseEvent) => {
  const diffX = Math.abs(event.clientX - startX.value);
  const diffY = Math.abs(event.clientY - startY.value);

  if (diffX > threshold || diffY > threshold) {
    isDragging.value = true;
  }
};

const moveToLink = () => {
  if (
    !isDragging.value &&
    props.imgList[slideInfo.value.currentSlideIndex].link
  ) {
    window.open(
      props.imgList[slideInfo.value.currentSlideIndex].link,
      '_blank'
    );
  }
};

const slideEvent = (info: any) => {
  slideInfo.value = info;
};
</script>

<template>
  <div class="relative">
    <Carousel
      :items-to-show="1"
      wrap-around
      @slide-end="slideEvent"
      @mousedown="startDrag"
      @mouseup="endDrag"
      @mouseleave="endDrag"
    >
      <slide
        v-for="img in imgList"
        :key="img.src"
        class="w-full h-full block"
        @click="moveToLink"
      >
        <main-card :image-src="img.src" :title="img.title" :desc="img.desc" />
      </slide>
    </Carousel>
    <div
      v-if="counter"
      class="absolute bottom-5 right-7 row text-[#b5b5b5] text-sm items-center"
    >
      <p
        class="text-white font-semibold leading-snug tracking-wider mr-1 text-lg"
      >
        {{ slideInfo.currentSlideIndex + 1 }}
      </p>
      / {{ slideInfo.slidesCount }}
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

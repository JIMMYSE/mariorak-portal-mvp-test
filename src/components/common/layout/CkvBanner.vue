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
const slideEvent = (info: any) => {
  console.log(info);
  slideInfo.value = info;
};

const moveToLink = () => {
  if (props.imgList[slideInfo.value.currentSlideIndex].link) {
    window.open(
      props.imgList[slideInfo.value.currentSlideIndex].link,
      '_blank'
    );
  }
};
</script>

<template>
  <div class="relative">
    <Carousel :items-to-show="1" wrap-around @slide-end="slideEvent">
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

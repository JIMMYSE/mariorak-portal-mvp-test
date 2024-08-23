<script setup lang="ts">
import { QCarouselProps } from 'quasar';
import { useForwardPropsEmits } from 'radix-vue';
import { computed, ref, onMounted } from 'vue';

type Props = { controlColorActive: string } & QCarouselProps;
const props = defineProps<Props>();
const emits = defineEmits(['update:modelValue']);
const forwarded = useForwardPropsEmits(props, emits);

const currentSlide = ref(props.modelValue || 0);
const totalSlides = ref(0);
const carouselRef = ref(null);

onMounted(() => {
  updateTotalSlides();
});

const updateTotalSlides = () => {
  if (carouselRef.value) {
    // @ts-expect-error-error
    totalSlides.value = carouselRef.value.panelsNumber || 0;
  }
};

// 배지 텍스트 계산
const badgeText = computed(() => {
  return `${(currentSlide.value as number) + 1} / ${totalSlides.value}`;
});
</script>

<template>
  <div class="carousel-container">
    <q-carousel
      ref="carouselRef"
      v-bind="forwarded"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      swipeable
      @update:model-value="currentSlide = $event"
    >
      <slot />
    </q-carousel>
    <div class="custom-navigation">
      <q-badge
        :color="controlColorActive"
        :label="badgeText"
        class="custom-badge"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.carousel-container {
  width: 100vw;
  position: relative;
}

.custom-navigation {
  position: absolute;
  bottom: 15px;
  right: 0;
  transform: translateX(-50%);
}

.custom-badge {
  padding: 4px 8px;
  font-size: 14px;
  border-radius: 12px;
  color: white;
}
</style>

<script setup lang="ts">
import { QCarouselProps } from 'quasar';
import { useForwardPropsEmits } from 'radix-vue';

type Props = { controlColorActive: string } & QCarouselProps;
const props = defineProps<Props>();
const emits = defineEmits(['update:modelValue']);
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <q-carousel
    v-bind="forwarded"
    transition-prev="slide-right"
    transition-next="slide-left"
    animated
    swipeable
    navigation
  >
    <slot />
  </q-carousel>
</template>

<style scoped lang="scss">
:deep(.q-carousel__navigation) {
  bottom: 0;
  height: 8px;

  .q-btn {
    min-height: 8px;
    min-width: 8px;
    margin: 2px 1.5px;
    padding: 0px;
    font-size: 8px !important;
    .q-icon {
      font-size: 8px !important;
      width: 100%;
      height: 100%;
    }
    width: 8px;
    border-radius: 90px;
    background-color: $grey-2;
    color: $grey-2;

    &.q-carousel__navigation-icon--active {
      color: v-bind(controlColorActive) !important;
      background-color: v-bind(controlColorActive) !important;
      width: 21px;
      // .q-btn__content {
      //   border-radius: 4px;
      //   background-color: v-bind(controlColorActive) !important;
      // }
    }
  }
}
</style>

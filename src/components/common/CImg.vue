<script lang="ts" setup>
import { QImgProps } from 'quasar';
import { useForwardPropsEmits } from 'radix-vue';
type Props = QImgProps;

const props = defineProps<Props>();
const emits = defineEmits(['load', 'error']);
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <q-img v-bind="forwarded">
    <template #error>
      <div class="absolute-full flex flex-center bg-grey-1 text-white">
        <c-icon :name="'icon_gallery'" />
      </div>
    </template>
    <template #loading>
      <div class="absolute-full flex flex-center bg-grey-1 text-white">
        <c-icon :name="'icon_gallery'" />
      </div>
    </template>
  </q-img>
</template>

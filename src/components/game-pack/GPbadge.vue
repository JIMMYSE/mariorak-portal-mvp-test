<script setup lang="ts">
type Props = {
  cd?: string;
  sectionCd: string;
};
const props = defineProps<Props>();

const prjStatusStyle = computed(() => {
  let color, bgColor;
  switch (props.cd) {
    case '10':
      color = '#767676';
      bgColor = '#F8F8F8';
      break;
    case '20':
      color = '#056BF1';
      bgColor = '#D8E5F8';
      break;
    case '30':
      color = '#FFF';
      bgColor = '#056BF1';
      break;
    case '40':
      color = '#FFF';
      bgColor = '#222';
      break;
  }
  return `color: ${color}; background-color: ${bgColor};`;
});
</script>
<template>
  <p class="rounded-lg text-center p-[2px]" :style="prjStatusStyle">
    {{ getCommonCodeName(props.sectionCd, props.cd) }}
  </p>
</template>

<script lang="ts" setup>
import { QIconProps } from 'quasar';
import { useForwardPropsEmits } from 'radix-vue';
import { HtmlHTMLAttributes } from 'vue';
/**
 * @name CIcon
 * @description
 *
 * @param {string} [color] - 기본 색상, 16진수('#B6B6B6') 사용
 * @param {string} [size]
 * @param {string} [activeColor] - 활성화 색상, 16진수('#B6B6B6') 사용
 * @param {boolean} [active] - The state of the icon.
 */
export interface CIconProps extends QIconProps {
  activeColor?: string;
  active?: boolean;
  label?: string;
  fill?: boolean;
  storke?: boolean;
}

const props = withDefaults(defineProps<CIconProps>(), {
  color: '#B6B6B6',
  size: '24px',
  name: 'icon_apple',
  activeColor: '#056BF1',
  active: false,
  label: '',
  fill: true,
  storke: true,
});
const forwarded = useForwardPropsEmits(props);
const originSvg = ref<string>('');
const loadSVG = async () => {
  try {
    const response = await fetch(`/icons/${props.name}.svg`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const svgText = await response.text();
    originSvg.value = svgText;
  } catch (error) {
    console.error('Error loading SVG:', error);
  }
};

const color = ref<string>(props.color);
watch(
  () => props.active,
  (v) => {
    {
      color.value = v ? props.activeColor : props.color;
    }
  },
  { immediate: true }
);

const changedSvg = computed(() => {
  const svgColor = props.active
    ? props.activeColor.replace('#', '%23')
    : props.color.replace('#', '%23');

  let newSvg = 'img:data:image/svg+xml;charset=utf8,' + originSvg.value;
  if (props.fill)
    newSvg = newSvg.replace(/fill="[^"]*"/g, `fill="${svgColor}"`);
  if (props.storke)
    newSvg = newSvg.replace(/stroke="[^"]*"/g, `stroke="${svgColor}"`);

  return newSvg;
});

loadSVG();
</script>
<template>
  <q-icon v-bind="forwarded" :name="changedSvg" />
  <p
    v-if="label"
    class="text-[10px] font-semibold pt-2"
    :style="`color:${color}`"
  >
    {{ label }}
  </p>
</template>
<style scoped lang="scss"></style>

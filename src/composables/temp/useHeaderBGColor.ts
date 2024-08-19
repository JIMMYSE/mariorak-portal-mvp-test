import { computed } from 'vue';
import { useRoute } from 'vue-router';

export function useHeaderBGColor() {
  const route = useRoute();
  const bgColor = computed(() => route.meta.bgColor ?? 'white');
  return {
    bgColor,
  };
}

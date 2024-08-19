import { normalizeDate } from '@vueuse/core';
import { Ref, ref, watch } from 'vue';

export function useDateAndTimeFor<T>(
  data: Ref<{ [k in keyof T]: any }>,
  key: keyof T
) {
  const date = ref('');
  const time = ref('');

  watch([date, time], ([date, time]) => {
    if (!date || !time) return;
    console.log('### new reserved_at', date, time);
    data.value[key] = normalizeDate(date + ' ' + time);
  });
  return [date, time];
}

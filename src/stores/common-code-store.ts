import { CodeList } from 'meta-airforce-dto';
import { MaybeRefOrGetter, ref, toValue } from 'vue';

export type CodeListType = InferType<typeof CodeList>;

export const useCommonCodeStore = defineStore(
  'code',
  () => {
    const codeList = ref<CodeListType[]>([]);

    function getCodeList() {
      return codeList.value;
    }

    function setCodeList(list: MaybeRefOrGetter<CodeListType[]>) {
      codeList.value = toValue(list);
    }

    return {
      codeList,
      getCodeList,
      setCodeList,
    };
  },
  { persist: true }
);

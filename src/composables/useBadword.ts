import FilterKo from 'src/utils/badwords-ko/src/badwords';
import { ref } from 'vue';

const API_FORZBIDDEN_WORD = '/v2/forbidden-words';
const forbiddenWords = ref([]);
const exclude = <any[]>[];

//@ts-expect-error - js 모듀 ts 변환필요
const filterKo = new FilterKo({ exclude });

export const showHasBadwordPopup = ref(false);
export const targetBadword = ref('');

export function useBadwords() {
  /**ap
   * * @description - 욕설 필터링
   * @param {string} word - code
   */
  function filterBadwords(word: string) {
    return filterKo.clean(word);
  }
  /**
   * @description - 욕설 포함 확인
   * @param {string} string - code
   */
  function findBadwordList(string: string) {
    try {
      return filterKo.isProfane(string);
    } catch (error: any) {
      return error;
    }
  }

  function hasBadword(string: string) {
    try {
      console.log(string, filterKo.isProfane(string));
      return filterKo.isProfane(string).length > 0;
    } catch (error: any) {
      return error;
    }
  }

  // fetch badwordList at firstTime
  async function fetchBadwords() {
    const { data, suspense } = useQueryFetch({
      url: API_FORZBIDDEN_WORD,
    });
    await suspense();
    forbiddenWords.value = data?.value.rows ?? [];
    filterKo.addWords(...forbiddenWords.value);
  }

  return { filterBadwords, hasBadword, findBadwordList, fetchBadwords };
}

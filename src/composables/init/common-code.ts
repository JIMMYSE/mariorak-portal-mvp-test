import { CodeList, CodeSearchRes } from 'meta-airforce-dto';
import { MaybeRefOrGetter } from 'vue';

export type CodeListType = InferType<typeof CodeList>;
export type CodeSearchResType = InferType<typeof CodeSearchRes>;

const url = '/code';
const CODE_QUERY_KEY = {
  LIST: 'codeList',
};

const searchRequest = useSearchRequest({
  size: 10000,
  sort: [
    {
      section_cd: 'asc',
    },
    {
      cd_seq: 'asc',
    },
  ],
});

/**
 * 공통코드 목록 가져오기
 */
export function useCommonCodeList() {
  const { codeList } = storeToRefs(useCommonCodeStore());
  return { codeList };
}

/**
 * 그룹코드 가져오기
 */
export function useCommonCode(
  section_cd: MaybeRefOrGetter<CodeListType['section_cd']>
) {
  const { codeList } = storeToRefs(useCommonCodeStore());
  const code = computed<CodeListType | undefined>(() => {
    return codeList.value.find((r) => r.section_cd === toValue(section_cd));
  });
  const options = computed<Option[]>(() => {
    return (
      code.value?.list?.map((r) => ({
        label: r.cd_name,
        value: r.cd,
      })) || []
    );
  });
  const cdList = computed<Option['value']>(() => {
    return code.value?.list?.map((r) => r.cd) || [];
  });
  return {
    code,
    cdList,
    options,
  };
}

/**
 * 코드명 조회
 */
export function useCommonCodeName(
  section_cd: MaybeRefOrGetter<CodeListType['section_cd']>,
  cd: MaybeRefOrGetter<string | null | undefined>
) {
  const { code } = useCommonCode(section_cd);
  const codeNm = computed(() => {
    return code.value?.list?.find((r) => r.cd === toValue(cd))?.cd_name ?? '';
  });
  return codeNm;
}

/**
 * 코드명 조회
 */
export function getCommonCodeName(
  section_cd: MaybeRefOrGetter<CodeListType['section_cd']>,
  cd: MaybeRefOrGetter<string | null | undefined>
) {
  if (toValue(cd) == null) return '';
  const { code } = useCommonCode(section_cd);
  return code.value?.list?.find((r) => r.cd === toValue(cd))?.cd_name ?? '';
}

/**
 * 공통코드 초기 실행(App.vue)
 * - 10분마다 재조회
 */
export function initCommonCodeList(listQueryKeyName = CODE_QUERY_KEY.LIST) {
  const isInitiated = ref(false);

  const { user, isLoggedIn } = useUserInfo();
  const { data } = useQueryFetchList<CodeSearchResType, SearchRequest>({
    url,
    searchRequest,
    listQueryKeyName,
    queryOption: {
      enabled: isLoggedIn,
      // staleTime: 5 * 1000,
      refetchInterval: 1000 * 60 * 10,
      // refetchOnMount: false,
      // refetchOnReconnect : false,
      // refetchOnWindowFocus: false,
      // retry: 2,
      // retryDelay: 2000,
    },
  });
  watch(
    () => [data.value, user.value],
    () => {
      if (data.value && user.value) {
        const { setCodeList } = useCommonCodeStore();
        setCodeList(data.value.rows);
        isInitiated.value = true;
      }
    }
  );

  return isInitiated;
}

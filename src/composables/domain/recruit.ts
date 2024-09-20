import {
  ProjectRecruitSearchResType,
  ProjectRecruitMakersResType,
  RecruitProjectDetailType,
  ProjectAppliementDetailResType,
} from 'src/types/gamepack/recruit-model';
import { MaybeRef, MaybeRefOrGetter } from 'vue';

const API_URL = '/v3/pr/recruit';
const QUERY_KEY = {
  PRODUCT_SEARCH: 'recruit-search-project',
  MAKER_SEARCH: 'recruit-search-maker',
  RECOMMENED_PROJECT: 'recruit-project-recommended',
  RECOMMENED_MAKER: 'recruit-maker-recommended',
  PROJECT_DETAIL: 'recruit-project-detail',
};

/**
 * 추천 프로젝트 목록 조회
 * @returns
 */
export const useRecruitRecommendedProjectList = () => {
  return useQueryFetch<ProjectRecruitSearchResType>({
    url: API_URL + '/recommended-project',
    queryKeyName: QUERY_KEY.RECOMMENED_PROJECT,
  });
};

/**
 * 추천 제작자 목록 조회
 * @returns
 */
export const useRecruitRecommendedMakerList = () => {
  return useQueryFetch<ProjectRecruitMakersResType>({
    url: API_URL + '/recommended-maker',
    queryKeyName: QUERY_KEY.RECOMMENED_MAKER,
  });
};

/**
 * 프로젝트 목록 조회
 * @param param0
 * @returns
 */
export const useRecruitSearchProjectList = ({
  searchRequest,
  queryOption,
  listQueryKeyName = QUERY_KEY.PRODUCT_SEARCH,
  setField,
}: {
  searchRequest: MaybeRef<SearchRequest>;
  queryOption?: QueryOption;
  listQueryKeyName?: string;
  setField: any;
}) => {
  return useQueryFetchInfiniteList<any, SearchRequest>({
    url: API_URL + '/project',
    searchRequest,
    queryKeyName: listQueryKeyName,
    setField,
  });
};

/**
 * 제작자 목록 조회
 * @param param0
 * @returns
 */
export const useRecruitSearchMakerList = ({
  searchRequest,
  queryOption,
  listQueryKeyName = QUERY_KEY.MAKER_SEARCH,
  setField,
}: {
  searchRequest: MaybeRef<SearchRequest>;
  queryOption?: QueryOption;
  listQueryKeyName?: string;
  setField: any;
}) => {
  return useQueryFetchInfiniteList<any, SearchRequest>({
    url: API_URL + '/maker',
    searchRequest,
    queryKeyName: listQueryKeyName,
    setField,
  });
};

/**
 * 프로젝트 상세 조회
 * @param id
 * @returns
 */
export const useProjectRecruitDetail = (id: MaybeRefOrGetter<number>, queryOption?: QueryOption) => {
  return useQueryFetchItem<RecruitProjectDetailType>({
    id: id,
    queryKeyName: QUERY_KEY.PROJECT_DETAIL,
    url: API_URL + '/detail',
    queryOption,
  });
};

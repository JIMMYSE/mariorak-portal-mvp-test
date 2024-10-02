<script lang="ts" setup>
import { RecommendedGameListType } from 'src/types/gamepack/game-model';
import { RecommendedProjectListType } from 'src/types/gamepack/project-model';
import { barStyle, thumbStyle } from 'src/utils/style-variable';

const goToListPage = () => {
  goToName('community-news-list');
};

const goToDetailPage = (news: any) => {
  const id = news?.game_id ?? news.prj_id;
  goTo(`/game-pack/game/${id}`);
};

const { request } = useSearchFilter({
  requestDefault: {
    filters: {
      clum_sesn_id: {
        eq: 1,
      },
    },
    from: 0,
    size: 5,
    sort: [
      {
        created_at: 'desc',
      },
    ],
  },
});

const {
  values: form,
  setFieldValue,
  resetField,
} = useForm<SearchRequest>({
  validationSchema: toTypedSchema(SearchRequestSchema),
  initialValues: request,
});

const queryParam = ref(form);

const { data: newsList, refetch } = useCommunityNewsList({
  searchRequest: queryParam,
  queryOption: {
    enabled: true,
  },
});
</script>
<template>
  <div>
    <div>
      <q-scroll-area style="height: 280px" :bar-style="barStyle" :thumb-style="thumbStyle">
        <div class="row no-wrap pl-6">
          <div
            class="game-card q-mr-md"
            v-for="news in newsList?.rows"
            :key="news.created_at"
            @click="goToDetailPage(news)"
          >
            <div class="absolute z-10 w-[60px] text-sm top-2 left-2">
              <GPbadge :cd="news.prj_stt_cd" section-cd="PRJ_STT" />
            </div>
            <c-img :src="news.thmn_file?.convert_addr" width="100%" class="rounded-xl game-image" />
            <div class="game-info q-mt-sm">
              <div class="text-caption q-mb-xs mt-[16px]">
                <span class="badge font-medium" v-for="badge in news.tag_list" :key="badge">{{ badge }}</span>
              </div>
              <p class="text-[#222222] text-[16px] font-semibold leading-snug mt-[8px]">
                {{ news.title }}
              </p>
              <p class="text-[#696969] text-xs font-normal leading-4 mt-[6px] ellipsis-2-lines">
                {{ formatDate(news.created_at) }}
              </p>
            </div>
          </div>
        </div>
      </q-scroll-area>
    </div>
    <div class="text-center mt-5">
      <c-btn
        @click="goToListPage()"
        class="enter_btn rounded-[30px] text-[#056bf1] font-semibold text-sm py-3 pl-10 pr-[30px]"
        outline
        >전체 목록 보기
        <c-icon name="icon_enter_arrow" size="14px" :color="'#056BF1'" :fill="false" />
      </c-btn>
    </div>
  </div>
</template>
<style scoped>
.game-card {
  width: 234px;
  overflow: hidden;
}

.game-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.game-info {
  color: white;
}

.badge {
  background-color: #f0f0f0;
  padding: 2px 6px;
  border-radius: 4px;
  margin-right: 5px;
  color: #222;
}
</style>

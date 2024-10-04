<script lang="ts" setup>
const { request } = useSearchFilter({
  requestDefault: {
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

const { data: conferenceList, refetch } = useCommunityConferenceList({
  searchRequest: queryParam,
  queryOption: {
    enabled: true,
  },
});

const goToDetailPage = (gp: any) => {
  const id = gp?.clum_id ?? gp.clum_id;
  goTo(`/game-pack/game/${id}`);
};
</script>
<template>
  <div>
    <div>
      <q-scroll-area style="height: 280px" :bar-style="barStyle" :thumb-style="thumbStyle">
        <div class="row no-wrap pl-6">
          <div
            class="game-card q-mr-md"
            v-for="conf in conferenceList?.rows"
            :key="conf.created_at"
            @click="goToDetailPage(conf)"
          >
            <div class="absolute z-10 w-[60px] text-sm top-2 left-2">
              <GPbadge :cd="conf.prj_stt_cd" section-cd="PRJ_STT" />
            </div>
            <c-img :src="conf.thmn_file?.convert_addr" width="100%" class="rounded-xl game-image" />
            <div class="game-info q-mt-sm">
              <div class="text-caption q-mb-xs mt-[16px]">
                <span class="badge font-medium" v-for="badge in conf.tag_list" :key="badge">{{ badge }}</span>
              </div>
              <p class="text-[#222222] text-[16px] font-semibold leading-snug mt-[8px]">
                {{ conf.title }}
              </p>
              <p class="text-[#696969] text-xs font-normal leading-4 mt-[6px] ellipsis-2-lines">
                {{ formatDate(conf.created_at) }}
              </p>
            </div>
          </div>
        </div>
      </q-scroll-area>
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

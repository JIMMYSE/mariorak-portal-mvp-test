<!-- 공지사항 > 상세 -->

<script setup lang="ts">
import { Id } from 'src/services/common/api-model';
import { formatDate } from 'src/utils/date-util';
import { filterHtml } from 'src/utils/html-filter';
import {
  useTermsDetail,
  TermsListResType,
} from 'src/composables/setting/setting';
import { useRoute } from 'vue-router';

const route = useRoute();
const pageType = computed(() =>
  route.name === 'service-terms' ? 'service' : 'privacy'
);

const { request } = useSearchFilter({
  requestDefault: {
    filters: {
      terms_type_cd: {
        in: ['1', '2', '3'],
      },
      is_required: {
        in: [true, false],
      },
    },
    search: {},
    from: 0,
    size: 10,
    sort: [
      {
        terms_type_cd: 'desc',
      },
    ],
  },
});

const { data: listData } = useTermsList({
  searchRequest: request,
});

const serviceTermsId = computed(() => {
  return listData?.value?.rows.find(
    (item: any) => item.is_active === true && item.terms_type_cd === '1'
  )?.id;
});

const privacyTermsId = computed(() => {
  return listData?.value?.rows.find(
    (item: any) => item.is_active === true && item.terms_type_cd === '2'
  )?.id;
});

const { data } = useTermsDetail(
  pageType.value === 'service' ? serviceTermsId : privacyTermsId
);
</script>

<template>
  <q-page class="">
    <p class="px-6 mt-[11px] text-pretendard text-sm text-secondary leading-5">
      {{ data?.contents }}
    </p>
    <div class="flex-1 mb-16"></div>
  </q-page>
</template>

<style lang="scss" scoped></style>

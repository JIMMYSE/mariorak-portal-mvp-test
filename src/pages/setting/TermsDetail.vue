<!-- 공지사항 > 상세 -->

<script setup lang="ts">
import { Id } from 'src/services/common/api-model';
import { formatDate } from 'src/utils/date-util';
import { filterHtml } from 'src/utils/html-filter';
import { useTermsDetail, useTermsList } from 'src/composables/setting/setting';
import { useRoute } from 'vue-router';

const route = useRoute();
const pageType = computed(() =>
  route.name === 'service-terms' ? 'service' : 'privacy'
);

const props = defineProps<{
  id?: Id;
}>();

const { data } = useTermsDetail(props.id);
</script>

<template>
  <q-page class="">
    <!-- <p class="px-6 mt-[11px] text-pretendard text-sm text-secondary leading-5">
      {{ data?.contents }}
    </p> -->
    <div flat>
      <div class="tiptap-editor" v-html="$filterHtml(data?.contents)"></div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>

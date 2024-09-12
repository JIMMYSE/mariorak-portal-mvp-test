<script lang="ts" setup>
import { useRouteHash } from '@vueuse/router';

import RecruitDetailApplyPanel from './panel/RecruitDetailApplyPanel.vue';
import RecruitDetailProjectPanel from './panel/RecruitDetailProjectPanel.vue';
import RecruitDetailMakerPanel from './panel/RecruitDetailMakerPanel.vue';

const routeHash = useRouteHash();
const route = useRoute();

const tab = ref(null);
const tabs = [
  { label: '프로젝트', name: 'project' },
  { label: '개발자', name: 'maker' },
  // { label: 'PD', name: 'pd' },
  { label: '요청내역', name: 'apply' },
];

function onHashChanged() {
  const t = tabs.find((t) => `#${t.name}` === routeHash.value);
  tab.value = t?.name || tabs[0].name;
}
onHashChanged();
watch(routeHash, (v) => {
  onHashChanged();
});
watch(tab, (v) => {
  const t = tabs.find((t) => t.name === v);
  if (t) {
    routeHash.value = `#${t.name}`;
  }
});
</script>
<template>
  <q-page>
    <c-tabs v-model="tab" :tabs="tabs" />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="project">
        <recruit-detail-project-panel />
      </q-tab-panel>
      <q-tab-panel name="maker">
        <recruit-detail-maker-panel />
      </q-tab-panel>
      <q-tab-panel name="apply">
        <recruit-detail-apply-panel />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

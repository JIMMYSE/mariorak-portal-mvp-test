<script lang="ts" setup>
import RecruitDetailApplyPanel from './panel/RecruitDetailApplyPanel.vue';
import RecruitDetailProjectPanel from './panel/RecruitDetailProjectPanel.vue';
import RecruitDetailMakerPanel from './panel/RecruitDetailMakerPanel.vue';

const tab = ref('PROJECT');
</script>
<template>
  <q-page>
    <c-tabs
      v-model="tab"
      :tabs="[
        { label: '프로젝트', name: 'PROJECT' },
        { label: '개발자', name: 'MAKER' },
        // { label: 'PD', name: 'PD' },
        { label: '요청내역', name: 'APPLY' },
      ]"
    />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="PROJECT">
        <recruit-detail-project-panel />
      </q-tab-panel>
      <q-tab-panel name="MAKER">
        <recruit-detail-maker-panel />
      </q-tab-panel>
      <q-tab-panel name="APPLY">
        <recruit-detail-apply-panel />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

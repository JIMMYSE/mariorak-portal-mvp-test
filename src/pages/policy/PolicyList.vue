<!-- 마이페이지 > 이용약관 -->

<script setup lang="ts">
import { useSearchRequest } from 'src/composables/common/api';
// import {
//   usePolicyDetail,
//   usePolicyDetailDialog,
//   usePolicyList,
// } from 'src/composables/policy/policy';
import { Id } from 'src/services/common/api-model';
import { ref } from 'vue';
import { wait } from 'src/utils/promise-util';
import { useLocalStorage } from '@vueuse/core';

const searchRequest = useSearchRequest({ from: 0, size: 999 });
// const { data: policyList, error } = usePolicyList(searchRequest);

const detailId = ref<Id | undefined>(undefined);
// const { data: detail, isFetching } = usePolicyDetail(detailId);

const url = useLocalStorage('debugging_host', 'http://192.168.1.90:9000');
async function openDetail(id: number) {
  detailId.value = id;
  await wait(100);

  // while (isFetching.value || !detail.value) {
  //   await wait(100);
  // }

  // usePolicyDetailDialog(detail.value).onDismiss(
  //   () => (detailId.value = undefined)
  // );
}

const hiddenButtonVisible = ref(Boolean(process.env.IS_DEV));
function onOpenDebuggingUrl() {
  window.open(url.value);
}
</script>

<template>
  <q-page class="column">
    <!-- <q-card v-if="policyList" class="q-mb-xl" flat>
      <q-card-section>
        <q-list>
          <a-item
            v-for="item in policyList.rows"
            :key="item.id"
            v-ripple
            clickable
            :label="item.trms_ttl"
            @click="openDetail(item.id)"
          />
          <q-item v-if="hiddenButtonVisible">
            <a-input v-model="url" class="w-full" dense />
            <q-btn
              icon="chevron_right"
              flat
              color="primary"
              @click="onOpenDebuggingUrl"
            />
          </q-item>
        </q-list>
      </q-card-section>
    </q-card> -->
  </q-page>
</template>

<style lang="scss" scoped></style>

<!-- 마이페이지 > 이용약관 -->

<script setup lang="ts">
import { useSearchOption } from 'src/composables/common/api';
import {
  usePolicyDetail,
  usePolicyDetailDialog,
  usePolicyList,
} from 'src/composables/policy/policy';
import { Id } from 'src/services/common/api-model';
import { ref } from 'vue';
import { wait } from 'src/utils/promise-util';
import { useLocalStorage } from '@vueuse/core';

const searchOption = useSearchOption({ from: 0, size: 999 });
const { data: policyList, error } = usePolicyList(searchOption);

const detailId = ref<Id | undefined>(undefined);
const { data: detail, isFetching } = usePolicyDetail(detailId);

const url = useLocalStorage('debugging_host', 'http://192.168.1.90:9000');
async function openDetail(id: number) {
  detailId.value = id;
  await wait(100);

  while (isFetching.value || !detail.value) {
    await wait(100);
  }

  usePolicyDetailDialog(detail.value).onDismiss(
    () => (detailId.value = undefined)
  );
}

const hiddenButtonVisible = ref(Boolean(process.env.IS_DEV));
function onOpenDebuggingUrl() {
  window.open(url.value);
}
</script>

<template>
  <q-page class="column">
    <q-card class="q-mb-xl" flat v-if="policyList">
      <q-card-section>
        <q-list>
          <a-item
            clickable
            v-ripple
            v-for="item in policyList.rows"
            :key="item.id"
            @click="openDetail(item.id)"
            :label="item.trms_ttl"
          />
          <q-item v-if="hiddenButtonVisible">
            <a-input v-model="url" class="w-full" dense />
            <q-btn
              @click="onOpenDebuggingUrl"
              icon="chevron_right"
              flat
              color="primary"
            />
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style lang="scss" scoped></style>

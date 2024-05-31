<!-- 서비스 약관 동의 -->

<script setup lang="ts">
import { useSearchRequest } from 'src/composables/common/api';
import { goBack, goToName } from 'src/composables/common/app';
// import {
//   PolicyListType,
//   usePolicyDetail,
//   usePolicyList,
// } from 'src/composables/policy/policy';
import { Id } from 'src/services/common/api-model';
import { useJoinStore } from 'src/stores/join-store';
import { reactive } from 'vue';
import { watchEffect } from 'vue';
import { computed } from 'vue';
import { ref } from 'vue';

const store = useJoinStore();
if (!store.hasMobileVerified()) {
  goBack();
}

const searchRequest = useSearchRequest({ from: 0, size: 999 });
// const { data } = usePolicyList(searchRequest);
const { data } = { data: { rows: [] } };
type ModelType = {
  plcy_id: number;
  type?: string;
  agre_yn: boolean;
  mandatory?: boolean;
};

const state = reactive<{ agreements: ModelType[] }>({ agreements: [] });
const checkAllModel = ref(false);

// watchEffect(() => {
//   if (!data.value) return;
//   if (state.agreements.length === 0) {
//     state.agreements = [
//       ...data.value.rows.map((item: PolicyListType) => ({
//         plcy_id: item.id,
//         mandatory: item.esntl_yn === 1,
//         agre_yn: false,
//       })),
//     ];
//   }
// });

function onChecked() {
  const allItemChecked = state.agreements.every((d) => d.agre_yn);
  checkAllModel.value = allItemChecked;
}

const allMandatoryItemsChecked = computed(
  () => !state.agreements?.some((d) => d.mandatory && !d.agre_yn)
);

function onCheckAll(value: boolean) {
  state.agreements = state.agreements.map((d) => ({ ...d, agre_yn: value }));
}

const detailId = ref<Id | undefined>(undefined);
// const { data: detail, isFetching } = usePolicyDetail(detailId);

function onSubmit() {
  if (!allMandatoryItemsChecked.value) {
    return;
  }
  store.setPolicyAgreements(state.agreements);
  goToName('join-nickname');
}
</script>

<template>
  <q-page class="flex flex-col">
    <section class="pt-10 px-6">
      <h3 class="text-h3 leading-[25px]">
        서로버스 메타버스를 이용하기 위해<br /><span class="text-primary">
          서비스 약관 동의</span
        >가 필요해요
      </h3>
      <q-list v-if="data" class="pt-[30px] flex flex-col gap-[10px]">
        <!-- <q-item
          v-for="(item, i) in data.rows"
          :key="item.id"
          class="border border-[#f1f1f1] min-h-[60px] p-[8px_9px_8px_6px]"
        >
          <q-item-section class="p-0 text-body2 font-light">
            <q-checkbox
              v-model="state.agreements[i].agre_yn"
              checked-icon="img:/images/icons/btn_checkbox_a.svg"
              unchecked-icon="img:/images/icons/btn_checkbox_d.svg"
              size="32px"
              @update:model-value="onChecked"
              >[{{ item.esntl_yn ? '필수' : '선택' }}]
              {{ item.trms_ttl }}</q-checkbox
            >
          </q-item-section>
        </q-item> -->
        <q-item
          class="border border-[#f1f1f1] min-h-[60px] p-[8px_9px_8px_6px] bg-[#f8f8f8]"
        >
          <q-item-section class="p-0 text-body2 font-light">
            <q-checkbox
              v-model="checkAllModel"
              checked-icon="img:/images/icons/btn_checkbox_a.svg"
              unchecked-icon="img:/images/icons/btn_checkbox_d.svg"
              size="32px"
              @update:model-value="onCheckAll"
            >
              위의 내용을 모두 읽었으며 이에 동의합니다.<br />(선택항목
              포함)</q-checkbox
            >
          </q-item-section>
        </q-item>
      </q-list>
    </section>
    <section class="fixed inset-x-0 bottom-0 p-6 bg-white row">
      <a-btn
        class="flex-1 h-[55px]"
        label="동의하고 계속하기"
        :disable="!allMandatoryItemsChecked"
        @click="onSubmit"
      />
    </section>
  </q-page>
</template>

<style scoped lang="scss"></style>

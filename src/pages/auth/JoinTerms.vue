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
// if (!store.hasMobileVerified()) {
//   goBack();
// }

const searchRequest = useSearchRequest({ from: 0, size: 999 });
// const { data } = usePolicyList(searchRequest);
const { data } = { data: { rows: [] } };
type ModelType = {
  plcy_id: number;
  type?: string;
  agre_yn: boolean;
  mandatory?: boolean;
};

const state = reactive<{ agreements: ModelType[] }>({
  agreements: [
    {
      plcy_id: 1,
      type: '만 14세 이상',
      agre_yn: false,
      mandatory: true,
    },
    {
      plcy_id: 2,
      type: '서비스 이용약관',
      agre_yn: false,
      mandatory: true,
    },
    {
      plcy_id: 3,
      type: '개인정보 수집 및 이용동의',
      agre_yn: false,
      mandatory: true,
    },
  ],
});
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
  <q-page class="flex flex-col bg-grey">
    <section class="pt-10 px-6 font-rokaf font-bold text-lg">
      <p>가입을 위한</p>
      <p><span class="text-primary">약관동의</span>를 진행해 주세요.</p>

      <q-list v-if="data" class="pt-[30px] flex flex-col">
        <q-item
          class="border border-[#f1f1f1] min-h-[60px] p-[8px_9px_8px_6px] bg-grey-1 rounded-md"
        >
          <q-item-section
            class="p-0 text-body2 font-rokaf font-medium text-base"
          >
            <a-checkbox
              v-model="checkAllModel"
              size="32px"
              @update:model-value="onCheckAll"
            >
              전체동의</a-checkbox
            >
          </q-item-section>
        </q-item>
        <q-item
          class="border border-[#f1f1f1] p-[8px_9px_8px_6px] rounded-md"
          v-for="item in state.agreements"
          :key="item.plcy_id"
        >
          <q-item-section
            class="p-0 text-body2 font-rokaf font-medium text-base"
          >
            <a-checkbox
              v-model="item.agre_yn"
              size="32px"
              @update:model-value="onChecked"
            >
              {{ item.mandatory ? '[필수] ' : '' }} {{ item.type }}</a-checkbox
            >
          </q-item-section>
        </q-item>
      </q-list>
    </section>
    <section class="fixed inset-x-0 bottom-0 p-4 bg-primary row">
      <a-btn class="flex-1" label="동의하고 계속하기" @click="onSubmit" />
    </section>
  </q-page>
</template>

<style scoped lang="scss"></style>

<!-- 회원가입 > 약관 동의 -->

<script setup lang="ts">
const joinStore = useJoinStore();
const { joinData } = storeToRefs(joinStore);
if (!joinData.value) goToName('join-email');

const { data: termsData } = useTermsRegistratnionTermsList();

const checkedIdList = ref<Id[]>([]);
const termsAgreementsList = computed(
  () =>
    termsData.value?.rows.map((o) => ({
      terms_id: o.id,
      is_agreed: checkedIdList.value.includes(o.id),
    })) ?? []
);

const is14YearsOldChecked = ref(false);
const isAllChecked = computed({
  get() {
    return !!(
      termsData.value?.rows.every((o) => checkedIdList.value.includes(o.id)) &&
      is14YearsOldChecked.value
    );
  },
  set(value: boolean) {
    is14YearsOldChecked.value = value;
    checkedIdList.value = value
      ? termsData.value?.rows.map((o) => o.id) ?? []
      : [];
  },
});

const isSubmitAllowed = computed(
  () =>
    is14YearsOldChecked.value &&
    termsData.value?.rows
      .filter((o) => o.is_required)
      .every((o) => checkedIdList.value.includes(o.id))
);

const onSubmit = () => {
  if (!joinData.value) return;
  joinData.value.terms_agreements = termsAgreementsList.value;
  goToName('join-nickname');
};

/** 상세 보기 */
const detailEnabled = ref(false);
const termsTypeCd = ref<Id>(undefined);
const { data: detail } = useTermsTypeCdDetail(termsTypeCd);
const openDetailDialog = async (cd: string) => {
  termsTypeCd.value = cd;
  detailEnabled.value = true;
};
</script>

<template>
  <q-page class="flex flex-col bg-grey">
    <section class="pt-10 px-6 font-medium text-[17px]">
      <p>가입을 위한</p>
      <p><span class="text-primary">약관동의</span>를 진행해 주세요.</p>

      <q-list class="pt-[30px] flex flex-col">
        <q-item
          class="border border-[#f1f1f1] min-h-[60px] p-[8px_9px_8px_6px] bg-grey-1 rounded-md"
        >
          <q-item-section
            class="p-0 text-body2 font-rokaf font-medium text-base"
          >
            <c-checkbox v-model="isAllChecked" size="32px">
              전체동의
            </c-checkbox>
          </q-item-section>
        </q-item>
        <q-item class="border border-[#f1f1f1] p-[8px_9px_8px_6px] rounded-md">
          <q-item-section
            class="p-0 text-body2 font-rokaf font-medium text-base"
          >
            <c-checkbox v-model="is14YearsOldChecked">
              [필수] 만 14세 이상
            </c-checkbox>
          </q-item-section>
        </q-item>
        <q-item
          class="border border-[#f1f1f1] p-[8px_9px_8px_6px] rounded-md"
          v-for="item in termsData?.rows"
          :key="item.id"
        >
          <q-item-section
            class="p-0 text-body2 font-rokaf font-medium text-base"
          >
            <c-checkbox v-model="checkedIdList" size="32px" :val="item.id">
              {{ item.is_required ? '[필수] ' : '' }}
              {{ item.title }}
            </c-checkbox>
          </q-item-section>
          <q-item-section side>
            <a
              href="#"
              class="text-body2 font-light underline"
              @click.prevent="openDetailDialog(item.terms_type_cd)"
            >
              보기
            </a>
          </q-item-section>
        </q-item>
      </q-list>
    </section>
    <section
      class="fixed inset-x-0 bottom-0 p-4 bg-primary row h-[64px]"
      :class="{
        'bg-primary': isSubmitAllowed,
        'bg-grey-2': !isSubmitAllowed,
      }"
    >
      <button
        type="button"
        class="text-center text-white font-base font-medium size-full flex justify-center items-center"
        :disabled="!isSubmitAllowed"
        @click="onSubmit"
      >
        계속하기
      </button>
    </section>

    <!-- 팝업 -->
    <c-dialog-content
      v-model="detailEnabled"
      :title="detail?.title"
      :text="detail?.contents"
    />
  </q-page>
</template>

<style scoped lang="scss"></style>

<!-- 회원가입 > 약관 동의 -->

<script setup lang="ts">
const joinStore = useJoinStore();
const { joinData } = storeToRefs(joinStore);

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
  // if (!joinData.value) return;
  // joinData.value.terms_agreements = termsAgreementsList.value;
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
  <q-page class="flex flex-col bg-white">
    <section class="pt-24 px-6 font-semibold text-[24px]">
      <p>저희 CCF를</p>
      <p>이용하기 위한 약관이에요</p>
      <p
        class="text-[#767676] text-sm font-normal font-['Pretendard'] leading-tight mt-[6px]"
      >
        아래 약관을 자세히 확인해 주세요
      </p>

      <q-list class="pt-[30px] flex flex-col">
        <q-item
          class="border border-[#f8f8f8] min-h-[54px] p-[2px_9px_2px_6px] bg-[#f7f7f7] rounded-[10px] text-[16px]"
        >
          <q-item-section
            class="p-0 text-body2 font-pretendard text-base font-semibold"
          >
            <c-checkbox
              v-model="isAllChecked"
              size="32px"
              :class="{ 'text-[#056bf1]': isAllChecked }"
            >
              약관 전체 동의 (선택 항목 포함)
            </c-checkbox>
          </q-item-section>
        </q-item>
        <q-item class="p-[0px_9px_0px_6px] rounded-md min-h-[40px] mt-[24px]">
          <q-item-section
            class="p-0 text-body2 font-pretendard font-normal text-[14px]"
          >
            <c-checkbox v-model="is14YearsOldChecked">
              [필수] 회원 이용약관
            </c-checkbox>
          </q-item-section>
          <q-item-section side>
            <a href="#" class="text-body2 font-light underline">
              <q-icon name="img:/icons/arrow.svg" size="20px" />
            </a>
          </q-item-section>
        </q-item>
        <q-item
          class="p-[0px_9px_0px_6px] rounded-md min-h-[40px]"
          v-for="item in termsData?.rows"
          :key="item.id"
        >
          <q-item-section
            class="p-0 text-body2 font-pretendard font-normal text-[14px]"
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
              <q-icon name="img:/icons/arrow.svg" size="20px" />
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

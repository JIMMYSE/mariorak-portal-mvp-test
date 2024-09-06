<!-- 회원가입 > 약관 동의 -->

<script setup lang="ts">
const joinStore = useJoinStore();
const { joinData } = storeToRefs(joinStore);

const { request } = useSearchFilter({
  requestDefault: {
    filters: {
      is_active: {
        eq: true,
      },
    },
    from: 0,
    size: 10,
    sort: [
      {
        sequence: 'asc',
      },
    ],
  },
});

const { data: termsData } = useTermsList({ searchRequest: request });

const checkedIdList = ref<Id[]>([]);
const termsAgreementsList = computed(
  () =>
    termsData.value?.rows.map((o: any) => ({
      terms_id: o.id,
      is_agreed: checkedIdList.value.includes(o.id),
    })) ?? []
);

const isAllChecked = computed({
  get() {
    return !!termsData.value?.rows.every((o: any) =>
      checkedIdList.value.includes(o.id)
    );
  },
  set(value: boolean) {
    checkedIdList.value = value
      ? termsData.value?.rows.map((o: any) => o.id) ?? []
      : [];
  },
});

const isSubmitAllowed = computed(() =>
  termsData.value?.rows
    .filter((o: any) => o.is_mandatory)
    .every((o: any) => checkedIdList.value.includes(o.id))
);

const onSubmit = () => {
  if (!joinData.value) return;
  joinData.value.policies = termsAgreementsList.value
    .filter((o: any) => o.is_agreed)
    .map((o: any) => o.terms_id);
  goToName('join-nickname');
};

/** 상세 보기 */
const detailEnabled = ref(false);
const detail = ref<{ title: string; content: string } | null>(null);
const openDetailDialog = async (title: string, content: string) => {
  detail.value = { title, content };
  detailEnabled.value = true;
};
</script>

<template>
  <q-page class="flex flex-col bg-white">
    <section class="pt-24 px-6 font-semibold text-[24px]">
      <p>저희 CCF를</p>
      <p>이용하기 위한 약관이에요</p>
      <p class="text-[#767676] text-sm leading-tight mt-[6px]">
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
        <q-item
          class="p-[0px_9px_0px_6px] rounded-md min-h-[40px]"
          v-for="item in termsData?.rows"
          :key="item.id"
        >
          <q-item-section
            class="p-0 text-body2 font-pretendard font-normal text-[14px]"
          >
            <c-checkbox v-model="checkedIdList" size="32px" :val="item.id">
              {{ item.is_mandatory ? '[필수] ' : '' }}
              {{ item.title }}
            </c-checkbox>
          </q-item-section>
          <q-item-section side>
            <a
              href="#"
              class="text-body2 font-light underline"
              @click.prevent="openDetailDialog(item.title, item.content)"
            >
              <q-icon name="img:/icons/arrow.svg" size="20px" />
            </a>
          </q-item-section>
        </q-item>
      </q-list>
    </section>
    <section class="fixed inset-x-0 bottom-0 p-4">
      <div class="flex justify-center items-center" style="padding-inline: 1%">
        <button
          type="button"
          class="text-center text-white font-base font-medium w-full max-w-[512px] h-[50px] rounded-md"
          :class="{
            'bg-primary': isSubmitAllowed,
            'bg-grey-2': !isSubmitAllowed,
          }"
          :disabled="!isSubmitAllowed"
          @click="onSubmit"
        >
          계속하기
        </button>
      </div>
    </section>

    <!-- 팝업 -->
    <c-dialog-content
      v-model="detailEnabled"
      :title="detail?.title"
      :html="detail?.content"
    />
  </q-page>
</template>

<style scoped lang="scss"></style>

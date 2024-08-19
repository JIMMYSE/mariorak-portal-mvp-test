<!-- 훈련병 > 즐겨찾기 > 등록 > 상세정보 등록 -->

<script setup lang="ts">
import moment from 'moment-timezone';
import { MyBookmarkCreateType } from 'src/composables/domain/bookmark';

type Props = {
  id: number;
  battalionName: string;
  className: string;
};
const props = defineProps<Props>();

const emit = defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();

const organization = computed(
  () => `[${props.battalionName}] ${props.className}`
);

const {
  meta,
  errors,
  errorBag,
  values: form,
  setValues,
  setFieldValue,
  handleSubmit,
} = useForm<MyBookmarkCreateType>({
  validationSchema: toTypedSchema(MyBookmarkCreate),
});
setFieldValue('educational_battalion_id', props.id);
setFieldValue('battalion_name', props.battalionName);

/** 생년월일 유효성 */
const birthDate = computed(() => {
  return moment(`${form.year}-${form.month}-${form.date}`, 'YYYY-M-D');
});
const isBirthDateValid = computed(() => {
  return form.year && form.month && form.date && birthDate.value.isValid();
});
watch(
  birthDate,
  (d) => {
    setFieldValue(
      'birth_date',
      isBirthDateValid.value ? d.format('YYYYMMDD') : ''
    );
  },
  { immediate: true }
);

/** 등록 */
const { mutateAsync, isSuccess } = useBookmarkRegister();
const onSubmit = handleSubmit(async () => {
  // {
  //   "educational_battalion_id": 8,
  //   "battalion_name": "신병1대대",
  //   "company_name": "1중대",
  //   "platoon_name": "1소대",
  //   "trainee_no": 123,
  //   "name": "홍길동",
  //   "birth_date": "20010524"
  // }

  mutateAsync({
    ...form,
    company_name: form.companyNo + '중대',
    platoon_name: form.platoonNo + '소대',
  });

  watch(isSuccess, (value) => {
    if (value) onDialogOK();
  });
});
</script>

<template>
  <q-dialog ref="dialogRef" full-width maximized @hide="onDialogHide">
    <q-card class="full-width !max-h-[calc(100vh+64px+67px)] bg-grey">
      <!-- HEADER -->
      <q-card-section
        class="fixed top-0 inset-x-0 flex justify-between items-center z-10 h-[50px] bg-grey"
      >
        <div class="w-px"></div>
        <!-- TITLE TEXT -->
        <div class="text-[17px] font-medium">즐겨찾기 등록</div>
        <c-btn-icon v-close-popup icon="img:/icons/close.svg" size="30px" />
      </q-card-section>
      <q-card-section class="mt-[50px] mb-32">
        <h2 class="text-[17px] font-medium leading-[26px] mt-10 px-2">
          등록할 훈련병의 <br />
          <span class="text-primary">상세정보</span>를 입력해 주세요
        </h2>

        <form class="flex flex-col gap-4 text-body2 font-pretendard mt-4 px-2">
          <label for="organization">
            <h4 class="ml-[5px] text-grey-3 text-[13px] font-medium">소속</h4>
            <div
              class="w-full px-6 bg-white rounded-[23px] flex flex-nowrap items-center h-11"
            >
              {{ organization }}
            </div>
            <div
              class="input-error-custom relative flex flex-nowrap justify-between items-center w-full h-11 mt-[6px] pl-4 pr-10 bg-white rounded-[23px] text-grey-3"
            >
              <c-input
                class="w-1/3 p-0 m-0"
                input-class="text-right"
                name="companyNo"
                mask="##"
                fill-mask=" "
                unmasked-value
                placeholder="입력"
                dense
                borderless
                :outlined="false"
                :clearable="false"
                :error="
                  !!(
                    errorBag.companyNo ||
                    errorBag.platoonNo ||
                    errorBag.trainee_no
                  )
                "
                :error-message="'소속을 입력해 주세요.'"
                autofocus
              >
                <template #after>
                  <span class="text-sm text-grey-4">중대</span>
                </template>
              </c-input>
              <c-input
                class="w-1/3 p-0 m-0"
                input-class="text-right"
                name="platoonNo"
                mask="###"
                fill-mask=" "
                unmasked-value
                placeholder="입력"
                dense
                borderless
                :outlined="false"
                :clearable="false"
                no-error
              >
                <template #after>
                  <span class="text-sm text-grey-4">소대</span>
                </template>
              </c-input>
              <c-input
                class="w-1/3 p-0 m-0"
                input-class="text-right"
                name="trainee_no"
                mask="####"
                fill-mask=" "
                unmasked-value
                placeholder="입력"
                dense
                borderless
                :outlined="false"
                :clearable="false"
                no-error
              >
                <template #after>
                  <span class="text-sm text-grey-4">번</span>
                </template>
              </c-input>
            </div>
          </label>
          <label for="birth">
            <h4 class="ml-[5px] text-grey-3 text-[13px] font-medium">
              생년월일
            </h4>
            <div
              class="input-error-custom relative flex flex-nowrap justify-between items-center w-full h-11 pl-4 pr-10 mb-2 bg-white rounded-[23px] text-grey-3"
            >
              <c-input
                class="w-1/3 p-0 m-0"
                input-class="text-right"
                name="year"
                mask="####"
                fill-mask=" "
                unmasked-value
                placeholder="입력"
                dense
                borderless
                :outlined="false"
                :clearable="false"
                :error="!!(errorBag.year || errorBag.month || errorBag.date)"
                :error-message="'생년월일을 확인해 주세요.'"
              >
                <template #after>
                  <span class="text-sm text-grey-4">년</span>
                </template>
              </c-input>
              <c-input
                class="w-1/3 p-0 m-0"
                input-class="text-right"
                name="month"
                mask="##"
                fill-mask=" "
                unmasked-value
                placeholder="입력"
                dense
                borderless
                :outlined="false"
                :clearable="false"
                no-error
              >
                <template #after>
                  <span class="text-sm text-grey-4">월</span>
                </template>
              </c-input>
              <c-input
                class="w-1/3 p-0 m-0"
                input-class="text-right"
                name="date"
                mask="##"
                fill-mask=" "
                unmasked-value
                placeholder="입력"
                dense
                borderless
                :outlined="false"
                :clearable="false"
                no-error
              >
                <template #after>
                  <span class="text-sm text-grey-4">일</span>
                </template>
              </c-input>
            </div>
          </label>
          <label for="name">
            <h4 class="ml-[5px] text-grey-3 text-[13px] font-medium">이름</h4>
            <c-input
              name="name"
              :maxlength="19"
              placeholder="이름을 입력해 주세요."
            />
          </label>
          <p class="text-grey-3 text-[12px] text-center">
            입력한 정보가 정확하지 않을 경우 사진보기 메뉴를 정상적으로
            <br />이용할 수 없거나, 작성한 편지가 훈련병에게 전달되지 <br />않을
            수 있습니다.
          </p>
        </form>
      </q-card-section>
      <div
        class="fixed inset-x-0 bottom-0 h-16 leading-16 w-full font-medium text-base z-10"
      >
        <q-btn
          class="size-full"
          color="primary"
          square
          unelevated
          :disable="!meta.valid"
          @click="onSubmit"
          >등록완료</q-btn
        >
      </div>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss">
.input-error-custom .q-input {
  :deep() {
    .q-field__bottom {
      width: 300px;
    }
  }
}
</style>

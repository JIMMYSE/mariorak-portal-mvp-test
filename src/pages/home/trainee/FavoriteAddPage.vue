<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { ref } from 'vue';

type Props = {
  battalion: string;
  division: string;
};
const props = defineProps<Props>();

const emit = defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();

const organization = ref(`[${props.battalion}] 병 ${props.division}`);
const info = ref({ name: '', organization, birth: '2024-04-30' });

function onSubmit() {
  onDialogOK(info.value);
}
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
        <a-btn-icon
          v-close-popup
          icon="img:/src/assets/icons/close.svg"
          size="30px"
        />
      </q-card-section>
      <q-card-section class="mt-[50px] mb-32">
        <h2 class="text-[17px] font-medium leading-[26px] mt-10 px-2">
          등록할 훈련병의 <br />
          <span class="text-primary">상세정보</span>를 입력해 주세요
        </h2>

        <form
          action=""
          class="flex flex-col gap-4 text-body2 font-pretendard mt-4 px-2"
        >
          <label for="organization">
            <h4 class="ml-[5px] text-grey-3 text-[13px] font-medium">소속</h4>
            <div
              class="w-full px-6 bg-white rounded-[23px] flex flex-nowrap items-center h-11"
            >
              {{ organization }}
            </div>
            <div
              class="mt-[6px] w-full px-6 bg-white rounded-[23px] flex flex-nowrap justify-between items-center h-11 text-grey-3"
            >
              <label for="company"
                ><input
                  name="company"
                  type="text"
                  placeholder="입력"
                  class="w-12 text-black text-right mr-4"
                />
                중대</label
              >
              <label for="platoon"
                ><input
                  name="platoon"
                  type="text"
                  placeholder="입력"
                  class="w-12 text-black text-right mr-4"
                />
                소대</label
              >
              <label for="number"
                ><input
                  name="number"
                  type="text"
                  placeholder="입력"
                  class="w-12 text-black text-right mr-4"
                />
                번</label
              >
            </div>
          </label>
          <label for="birth">
            <h4 class="ml-[5px] text-grey-3 text-[13px] font-medium">
              생년월일
            </h4>
            <div
              class="w-full px-6 bg-white rounded-[23px] flex flex-nowrap justify-between items-center h-11 text-grey-3"
            >
              <label for="year"
                ><input
                  name="year"
                  type="text"
                  placeholder="입력"
                  class="w-12 text-black text-right mr-4"
                />
                년</label
              >
              <label for="month"
                ><input
                  name="month"
                  type="text"
                  placeholder="입력"
                  class="w-12 text-black text-right mr-4"
                />
                월</label
              >
              <label for="day"
                ><input
                  name="day"
                  type="text"
                  placeholder="입력"
                  class="w-12 text-black text-right mr-4"
                />
                일</label
              >
            </div>
          </label>
          <label for="name">
            <h4 class="ml-[5px] text-grey-3 text-[13px] font-medium">이름</h4>
            <a-input
              v-model="info.name"
              placeholder="이름을 입력해 주세요."
            ></a-input>
            <!-- <div -->
            <!--   class="mt-[6px] w-full px-6 bg-white rounded-[23px] flex flex-nowrap justify-between items-center h-11 text-grey-3" -->
            <!-- > -->
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
          @click="onSubmit"
          >등록완료</q-btn
        >
      </div>
    </q-card>
  </q-dialog>
</template>
<style scoped lang="scss"></style>

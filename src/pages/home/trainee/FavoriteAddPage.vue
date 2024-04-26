<script setup lang="ts">
import { title } from 'process';
import { useDialogPluginComponent } from 'quasar';
import { Message } from 'src/services/common/common-model';
import { ref } from 'vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

// export interface ADialogProps {
//   type?: 'alert' | 'confirm';
//   dialogTitle?: Message;
//   title?: Message;
//   htmlTitle?: Message;
//   text?: Message;
//   htmlText?: Message;
//   contentComponent?: any;
//   okLabel?: Message;
//   cancelLabel?: Message;
//   persistent?: boolean;
//   buttons?: { label: string; value: unknown; color?: string }[];
// }

type Props = {
  battalion: string;
  division: string;
};
const props = defineProps<Props>();

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const organization = ref(`[${props.battalion}] 병 ${props.division}`);
const info = ref({ name: '' });
</script>

<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" full-width maximized>
    <q-card
      class="full-width !max-h-[calc(100vh+64px+67px)] flex flex-col bg-grey px-2"
    >
      <!-- HEADER -->
      <q-card-section
        class="fixed top-0 inset-x-0 flex justify-between items-center z-10 h-[50px]"
      >
        <div class="w-px"></div>
        <!-- TITLE TEXT -->
        <div class="text-[17px] font-medium">즐겨찾기 등록</div>
        <a-btn-icon
          icon="img:/src/assets/icons/close.svg"
          size="30px"
          v-close-popup
        />
      </q-card-section>
      <q-card-section class="flex-1 mt-[50px]">
        <h2 class="text-[17px] font-medium leading-[26px] mt-10">
          등록할 훈련병의 <br />
          <span class="text-primary">상세정보</span>를 입력해 주세요
        </h2>

        <form
          action=""
          class="flex flex-col gap-4 text-body2 font-pretendard mt-4"
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
                  class="w-12"
                />
                중대</label
              >
              <label for="platoon"
                ><input
                  name="platoon"
                  type="text"
                  placeholder="입력"
                  class="w-12"
                />
                소대</label
              >
              <label for="number"
                ><input
                  name="number"
                  type="text"
                  placeholder="입력"
                  class="w-12"
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
              class="mt-[6px] w-full px-6 bg-white rounded-[23px] flex flex-nowrap justify-between items-center h-11 text-grey-3"
            >
              <label for="year"
                ><input
                  name="year"
                  type="text"
                  placeholder="입력"
                  class="w-12"
                />
                년</label
              >
              <label for="month"
                ><input
                  name="month"
                  type="text"
                  placeholder="입력"
                  class="w-12"
                />
                월</label
              >
              <label for="day"
                ><input
                  name="day"
                  type="text"
                  placeholder="입력"
                  class="w-12"
                />
                일</label
              >
            </div>
          </label>
          <label for="name">
            <h4 class="ml-[5px] text-grey-3 text-[13px] font-medium">이름</h4>
            <a-input
              placeholder="이름을 입력해 주세요."
              v-model="info.name"
            ></a-input>
            <!-- <div -->
            <!--   class="mt-[6px] w-full px-6 bg-white rounded-[23px] flex flex-nowrap justify-between items-center h-11 text-grey-3" -->
            <!-- > -->
          </label>
          <p class="text-grey-3 text-[12px]">
            입력한 정보가 정확하지 않을 경우 사진보기 메뉴를 정상적으로 이용할
            수 없거나, 작성한 편지가 훈련병에게 전달되지 않을 수 있습니다.
          </p>
        </form>
      </q-card-section>
      <q-card-section class="flex flex-col p-0">
        <div class="h-[67px]"></div>

        <div class="flex-1" />
        <div
          :to="{ name: '' }"
          class="h-16 leading-16 q-btn--standard w-full font-medium text-base"
        >
          <q-btn class="size-full" color="primary" square unelevated
            >등록완료</q-btn
          >
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<style scoped lang="scss"></style>

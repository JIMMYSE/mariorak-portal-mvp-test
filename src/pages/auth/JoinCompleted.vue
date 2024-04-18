<script lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { goToName } from 'src/composables/common/app';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'JoinCompleted',
  setup: (props) => {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();
    return { props, dialogRef, onDialogHide, onDialogOK, onDialogCancel };
  },
  emits: [...useDialogPluginComponent.emits],
  methods: {
    onOk() {
      goToName('main');
    },
  },
});
</script>

<template>
  <q-dialog
    ref="dialogRef"
    v-bind="props"
    full-width
    full-height
    :maximized="true"
    @hide="onDialogHide"
  >
    <q-card
      class="flex flex-col items-center pb-[87px] min-h-[calc(100vh-87px)] relative !bg-white flex-nowrap"
    >
      <!-- HEADER -->
      <q-card-section
        class="fixed top-0 inset-x-0 row justify-between items-center bg-white z-10 min-h-[74px]"
      >
        <div></div>
        <!-- TITLE TEXT -->
        <div class="text-[18px] font-medium">회원가입 완료</div>
        <q-icon
          name="img:/images/icons/btn_close.svg"
          class="cursor-pointer"
          size="35px"
          @click="onOk"
        />
      </q-card-section>
      <q-card-section class="flex flex-col items-center px-6 flex-1 pt-[74px]">
        <q-icon
          name="img:/images/icons/btn_connect.png"
          size="30px"
          class="mt-8"
        ></q-icon>
        <h3 class="text-xl font-medium mt-4">
          서로버스에 오신 것을 환영합니다!
        </h3>
        <p
          class="mt-2 px-[50px] text-center text-xs font-light leading-[18px] text-grey-3"
        >
          전주, 익산을 배경으로 펼쳐지는 멋진 세상으로 지금 떠나보세요.
        </p>
      </q-card-section>

      <q-img
        src="/images/avatars/자산_1마룡이.png"
        height="288px"
        fit="contain"
        class="mb-[70px]"
      />
      <section class="fixed inset-x-0 bottom-0 p-4 bg-white">
        <a-btn
          class="w-full h-[55px]"
          label="서로버스 시작하기"
          @click="onOk"
        />
      </section>
    </q-card>
  </q-dialog>
</template>

<style lang="css" scoped></style>

<!-- 비밀번호 재설정 -->

<!-- 마이페이지 > 비밀번호 변경 -->

<script setup lang="ts">
import { goToName } from 'src/composables/common/app';
async function onSuccess(values: { email: string; password: string }) {
  console.log('onSubmit', values);
}

const onSubmit = () => {
  goToName('setting');
};

const { fields } = useAuthForm({
  needPasswordConfirm: false,
  onSuccess,
});
const { password, passwordProps, passwordConfirm, passwordConfirmProps } =
  fields;
</script>

<template>
  <q-page class="px-6 bg-grey inset-x-0">
    <div class="pt-[40px] text-h2 font-rokaf font-bold">
      <p>비밀번호 변경을 위한</p>
      <p><span class="text-primary">새 비밀번호</span>를 입력해 주세요.</p>
    </div>
    <q-form @submit.prevent="onSubmit" class="mt-5">
      <a-field label="비밀번호" class="mt-[30px]">
        <a-input
          v-model="password"
          name="password"
          type="password"
          placeholder="영문 대소문자, 숫자포함 최소 10자리"
          autofocus
          v-bind="passwordProps"
        />
      </a-field>
      <a-field label="비밀번호 확인">
        <a-input
          type="password"
          v-model="passwordConfirm"
          placeholder="비밀번호 확인"
          :inline-counter="false"
          v-bind="passwordConfirmProps"
        />
      </a-field>
    </q-form>
    <div class="absolute bottom-0 bg-primary w-full h-[64px] left-0">
      <button
        type="submit"
        @click="onSubmit"
        class="text-center text-white font-base font-medium size-full flex justify-center items-center"
      >
        확인
      </button>
    </div>
  </q-page>
</template>

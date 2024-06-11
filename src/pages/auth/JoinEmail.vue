<script lang="ts" setup>
import { goToName } from 'src/composables/common/app';
async function onSuccess(values: { email: string; password: string }) {
  console.log('onSubmit', values);
}

const { fields, formMeta, onSubmit } = useAuthForm({
  needPasswordConfirm: true,
  onSuccess,
});
const {
  email,
  emailProps,
  password,
  passwordProps,
  passwordConfirm,
  passwordConfirmProps,
} = fields;
</script>

<template>
  <q-page class="px-6 bg-grey">
    <div class="pt-[40px] text-h2 font-rokaf font-bold text-lg">
      <p>이메일 인증을 위한</p>
      <p><span class="text-primary">가입정보</span>를 입력해 주세요.</p>
    </div>
    <q-form @submit.prevent="onSubmit">
      <a-field label="아이디 (이메일)" class="mt-[30px]">
        <a-input
          type="text"
          v-model="email"
          :placeholder="$t('label.id')"
          autofocus
          :inline-counter="false"
          v-bind="emailProps"
        />
      </a-field>
      <a-field label="비밀번호">
        <a-input
          type="password"
          v-model="password"
          :placeholder="$t('label.password')"
          :inline-counter="false"
          v-bind="passwordProps"
        />
      </a-field>
      <a-field label="비밀번호 확인">
        <a-input
          type="password"
          v-model="passwordConfirm"
          :placeholder="$t('label.passwordConfirm')"
          :inline-counter="false"
          v-bind="passwordConfirmProps"
        />
      </a-field>
    </q-form>
    <div class="absolute bottom-0 bg-primary w-full h-[64px] left-0">
      <button
        class="text-center text-white font-base font-medium size-full flex justify-center items-center"
        @click="goToName('join-policy')"
      >
        다음
      </button>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
